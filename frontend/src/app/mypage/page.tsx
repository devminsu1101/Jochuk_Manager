'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, LogOut, Layout, Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/utils/supabase';
import styles from '../Overview.module.scss'; // 기존 스타일 재사용

interface Match {
  id: string;
  title: string;
  match_date: string;
  match_time: string;
  status: string;
  is_public: boolean;
  player_count: number;
}

export default function MyPage() {
  const router = useRouter();
  const { user, signOut, checkSession } = useAuthStore();
  const [myMatches, setMyMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    const fetchMyMatches = async () => {
      if (!user) return;
      setIsLoading(true);
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/matches/my`, {
          headers: { 
            'Authorization': `Bearer ${session?.access_token}`
          }
        });
        if (!response.ok) throw new Error('내 매치 목록 불러오기 실패');
        const data = await response.json();
        setMyMatches(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyMatches();
  }, [user]);

  if (!user && !isLoading) {
    return (
      <div className={styles.container} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
        <div style={{textAlign: 'center'}}>
          <p>로그인이 필요한 페이지입니다.</p>
          <button className={styles.loginButton} style={{marginTop: '1rem'}} onClick={() => router.push('/')}>메인으로 가기</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logoSection} onClick={() => router.push('/')}>
            <ArrowLeft size={20} style={{marginRight: '8px'}} />
            <h1>내 경기 관리</h1>
          </div>
          <div className={styles.userSection}>
            <div className={styles.userInfo}>
              <span className={styles.userName}>{user?.user_metadata?.full_name || user?.email}</span>
              <button className={styles.logoutButton} onClick={signOut} title="로그아웃">
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.matchListSection}>
          <div className={styles.sectionHeader}>
            <h3>내가 생성한 매치 ({myMatches.length})</h3>
          </div>

          {isLoading ? (
            <div className={styles.loadingState}>매치 정보를 불러오는 중입니다...</div>
          ) : myMatches.length > 0 ? (
            <div className={styles.matchList}>
              {myMatches.map(match => (
                <div key={match.id} className={styles.matchRow} onClick={() => router.push(`/${match.id}`)}>
                  <div className={styles.matchTime}>{match.match_time.substring(0, 5)}</div>
                  <div className={styles.matchMainInfo}>
                    <h5 className={styles.matchTitle}>{match.title}</h5>
                    <div className={styles.matchSubInfo}>
                      <span>{match.match_date} • 참여 인원 {match.player_count}명</span>
                    </div>
                  </div>
                  <div className={styles.matchStatus}>
                    <span className={`${styles.statusBadge} ${match.player_count >= 18 ? styles.statusClosed : styles.statusOpen}`}>
                      {match.player_count >= 18 ? '마감' : '관리중'}
                    </span>
                    <ChevronRight size={18} className={styles.rowArrow} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>📂</div>
              <p>아직 직접 생성한 매치가 없습니다.</p>
              <button 
                className={styles.emptyCreateBtn}
                onClick={() => router.push('/')}
              >
                첫 매치 만들러 가기
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
