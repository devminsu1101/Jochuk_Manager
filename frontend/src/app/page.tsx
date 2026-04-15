'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Calendar, Clock, ChevronRight, User, LogOut, Layout } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/utils/supabase';
import styles from './Overview.module.scss';
import { HeroCarousel } from '@/components/HeroCarousel';

interface Match {
  id: string;
  title: string;
  match_date: string;
  match_time: string;
  status: string;
  is_public: boolean;
  owner_id?: string;
  player_count?: number;
}

export default function OverviewPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading, signInWithGoogle, signOut, checkSession } = useAuthStore();
  const [matches, setMatches] = useState<Match[]>([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // 새 매치 생성용 폼 상태
  const [newMatch, setNewMatch] = useState({
    title: '',
    matchDate: '',
    matchTime: '',
    isPublic: true
  });

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const fetchMatches = async (searchTerm = '') => {
    setIsLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const url = searchTerm 
        ? `${apiUrl}/api/matches?search=${encodeURIComponent(searchTerm)}`
        : `${apiUrl}/api/matches`;
        
      const response = await fetch(url);
      if (!response.ok) throw new Error('매치 목록 불러오기 실패');
      const data = await response.json();
      setMatches(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // 날짜별로 매치 그룹화
  const groupedMatches = matches.reduce((acc: { [key: string]: Match[] }, match) => {
    const date = match.match_date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(match);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedMatches).sort();

  const handleCreateMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
      return;
    }
    if (!newMatch.title || !newMatch.matchDate || !newMatch.matchTime) {
      alert('모든 필수 정보를 입력해주세요.');
      return;
    }

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/matches`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify(newMatch),
      });

      if (!response.ok) throw new Error('매치 생성 실패');
      
      const createdMatch = await response.json();
      setShowCreateModal(false);
      router.push(`/${createdMatch.id}`);
    } catch (error) {
      console.error(error);
      alert('매치 생성 중 오류가 발생했습니다. (로그인 세션을 확인해주세요)');
    }
  };

  const getStatusText = (match: Match) => {
    const count = match.player_count || 0;
    if (count >= 18) return '마감';
    if (count >= 14) return '마감임박';
    return '신청가능';
  };

  const getStatusClass = (match: Match) => {
    const count = match.player_count || 0;
    if (count >= 18) return styles.statusClosed;
    if (count >= 14) return styles.statusUrgent;
    return styles.statusOpen;
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoSection} onClick={() => router.push('/')}>
            <span style={{fontSize: '1.5rem'}}>⚽️</span>
            <h1>Jochuk Manager</h1>
          </div>
          <div className={styles.userSection}>
            {isAuthLoading ? (
              <div className={styles.authLoading}>...</div>
            ) : user ? (
              <div className={styles.userInfo}>
                <button 
                  className={styles.myPageBtn} 
                  onClick={() => router.push('/mypage')}
                  title="내 매치 관리"
                >
                  <Layout size={18} />
                  <span className={styles.userName}>{user.user_metadata?.full_name || user.email}</span>
                </button>
                <button className={styles.logoutButton} onClick={signOut} title="로그아웃">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button className={styles.loginButton} onClick={signInWithGoogle}>
                <User size={18} />
                <span>로그인</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <HeroCarousel />

        <section className={styles.heroSection}>
          <h2>팀 라인업 관리의 새로운 기준</h2>
          <p>공정한 출전 시간 배정과 전술 수립, 조축 매니저와 함께라면 쉽습니다.</p>
          
          <div className={styles.searchBarContainer}>
            <div className={styles.searchInputWrapper}>
              <Search className={styles.searchIcon} size={20} />
              <input 
                type="text" 
                placeholder="경기 제목으로 검색..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchMatches(search)}
              />
            </div>
            <button className={styles.searchBtn} onClick={() => fetchMatches(search)}>검색</button>
          </div>
        </section>

        <section className={styles.matchListSection}>
          <div className={styles.sectionHeader}>
            <h3>매치 목록</h3>
            <button 
              className={styles.createMatchBtn} 
              onClick={() => user ? setShowCreateModal(true) : alert('로그인 후 매치를 생성할 수 있습니다.')}
            >
              <Plus size={18} />
              새 매치 만들기
            </button>
          </div>

          {isLoading ? (
            <div className={styles.loadingState}>경기를 불러오는 중입니다...</div>
          ) : sortedDates.length > 0 ? (
            <div className={styles.dateGroups}>
              {sortedDates.map(date => (
                <div key={date} className={styles.dateGroup}>
                  <h4 className={styles.dateHeader}>
                    {new Date(date).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric', weekday: 'short' })}
                  </h4>
                  <div className={styles.matchList}>
                    {groupedMatches[date].map(match => (
                      <div key={match.id} className={styles.matchRow} onClick={() => router.push(`/${match.id}`)}>
                        <div className={styles.matchTime}>{match.match_time.substring(0, 5)}</div>
                        <div className={styles.matchMainInfo}>
                          <h5 className={styles.matchTitle}>{match.title}</h5>
                          <div className={styles.matchSubInfo}>
                            <span>참여 인원 {match.player_count || 0}명</span>
                          </div>
                        </div>
                        <div className={styles.matchStatus}>
                          <span className={`${styles.statusBadge} ${getStatusClass(match)}`}>
                            {getStatusText(match)}
                          </span>
                          <ChevronRight size={18} className={styles.rowArrow} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>⚽️</div>
              <p>아직 등록된 경기가 없네요!</p>
              <button 
                className={styles.emptyCreateBtn}
                onClick={() => user ? setShowCreateModal(true) : alert('로그인 후 매치를 생성할 수 있습니다.')}
              >
                첫 번째 매치 만들기
              </button>
            </div>
          )}
        </section>
      </main>

      {showCreateModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>새 매치 생성</h3>
            <form onSubmit={handleCreateMatch}>
              <div className={styles.formGroup}>
                <label>매치 제목</label>
                <input 
                  type="text" 
                  placeholder="예: 목요일 저녁 정기전" 
                  value={newMatch.title}
                  onChange={(e) => setNewMatch({...newMatch, title: e.target.value})}
                  required
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>날짜</label>
                  <input 
                    type="date" 
                    value={newMatch.matchDate}
                    onChange={(e) => setNewMatch({...newMatch, matchDate: e.target.value})}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>시간</label>
                  <input 
                    type="time" 
                    value={newMatch.matchTime}
                    onChange={(e) => setNewMatch({...newMatch, matchTime: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.checkbox}>
                  <input 
                    type="checkbox" 
                    checked={newMatch.isPublic}
                    onChange={(e) => setNewMatch({...newMatch, isPublic: e.target.checked})}
                  />
                  공개 매치로 설정
                </label>
              </div>
              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowCreateModal(false)}>취소</button>
                <button type="submit" className={styles.submitBtn}>생성하기</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
