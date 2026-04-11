'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Plus, Calendar, Clock, ChevronRight, User, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { supabase } from '@/utils/supabase';

interface Match {
  id: string;
  title: string;
  match_date: string;
  match_time: string;
  status: string;
  is_public: boolean;
}

export default function OverviewPage() {
  const router = useRouter();
  const { user, isLoading: isAuthLoading, signInWithGoogle, signOut } = useAuthStore();
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
      alert('새로운 매치가 생성되었습니다!');
      router.push(`/${createdMatch.id}`);
    } catch (error) {
      console.error(error);
      alert('매치 생성 중 오류가 발생했습니다. (로그인 세션을 확인해주세요)');
    }
  };

  return (
    <div className="overview-container">
      {/* Header */}
      <header className="overview-header">
        <div className="header-content">
          <div className="logo-section" onClick={() => router.push('/')} style={{cursor: 'pointer'}}>
            <div className="soccer-ball-icon">⚽️</div>
            <h1>Jochuk Manager</h1>
          </div>
          <div className="user-section">
            {isAuthLoading ? (
              <div className="auth-loading">...</div>
            ) : user ? (
              <div className="user-info">
                <span className="user-name">{user.user_metadata?.full_name || user.email}</span>
                <button className="logout-button" onClick={signOut} title="로그아웃">
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <button className="login-button" onClick={signInWithGoogle}>
                <User size={18} />
                <span>Google 로그인</span>
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="overview-main">
        {/* Hero Section & Search */}
        <section className="hero-section">
          <h2>함께 뛸 동료와 경기를 찾아보세요</h2>
          <p>오늘의 경기부터 다음 주 경기까지, 한눈에 확인하고 참여하세요.</p>
          
          <div className="search-bar-container">
            <div className="search-input-wrapper">
              <Search className="search-icon" size={20} />
              <input 
                type="text" 
                placeholder="경기 제목으로 검색..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchMatches(search)}
              />
            </div>
            <button className="search-btn" onClick={() => fetchMatches(search)}>검색</button>
          </div>
        </section>

        {/* Match List Section */}
        <section className="match-list-section">
          <div className="section-header">
            <h3>공개된 매치 ({matches.length})</h3>
            <button 
              className="create-match-btn" 
              onClick={() => user ? setShowCreateModal(true) : alert('로그인 후 매치를 생성할 수 있습니다.')}
            >
              <Plus size={18} />
              새 매치 만들기
            </button>
          </div>

          {isLoading ? (
            <div className="loading-state">경기를 불러오는 중입니다...</div>
          ) : matches.length > 0 ? (
            <div className="match-grid">
              {matches.map(match => (
                <div key={match.id} className="match-card" onClick={() => router.push(`/${match.id}`)}>
                  <div className="match-card-status">
                    <span className={`status-badge ${match.status}`}>{match.status === 'upcoming' ? '예정' : '진행중'}</span>
                  </div>
                  <h4 className="match-card-title">{match.title}</h4>
                  <div className="match-card-info">
                    <div className="info-item">
                      <Calendar size={14} />
                      <span>{match.match_date}</span>
                    </div>
                    <div className="info-item">
                      <Clock size={14} />
                      <span>{match.match_time}</span>
                    </div>
                  </div>
                  <div className="match-card-footer">
                    <span>자세히 보기</span>
                    <ChevronRight size={16} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>검색 결과가 없습니다. 직접 새로운 매치를 만들어보세요!</p>
            </div>
          )}
        </section>
      </main>

      {/* Create Match Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>새 매치 생성</h3>
            <form onSubmit={handleCreateMatch}>
              <div className="form-group">
                <label>매치 제목</label>
                <input 
                  type="text" 
                  placeholder="예: 목요일 저녁 정기전" 
                  value={newMatch.title}
                  onChange={(e) => setNewMatch({...newMatch, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>날짜</label>
                  <input 
                    type="date" 
                    value={newMatch.matchDate}
                    onChange={(e) => setNewMatch({...newMatch, matchDate: e.target.value})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>시간</label>
                  <input 
                    type="time" 
                    value={newMatch.matchTime}
                    onChange={(e) => setNewMatch({...newMatch, matchTime: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="form-group checkbox">
                <label>
                  <input 
                    type="checkbox" 
                    checked={newMatch.isPublic}
                    onChange={(e) => setNewMatch({...newMatch, isPublic: e.target.checked})}
                  />
                  공개 매치로 설정 (누구나 검색 가능)
                </label>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowCreateModal(false)}>취소</button>
                <button type="submit" className="submit-btn">생성하기</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .overview-container { min-height: 100vh; background-color: #f8f9fa; font-family: sans-serif; }
        .overview-header { background: white; border-bottom: 1px solid #eee; padding: 1rem 2rem; position: sticky; top: 0; z-index: 100; }
        .header-content { max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
        .logo-section { display: flex; align-items: center; gap: 0.5rem; }
        .logo-section h1 { font-size: 1.25rem; font-weight: 800; color: #1a1a1a; margin: 0; }
        .soccer-ball-icon { font-size: 1.5rem; }
        
        .user-section { display: flex; align-items: center; }
        .user-info { display: flex; align-items: center; gap: 1rem; }
        .user-name { font-size: 0.9rem; font-weight: 600; color: #444; }
        .logout-button { background: none; border: 1px solid #eee; padding: 0.4rem; border-radius: 50%; cursor: pointer; color: #666; transition: all 0.2s; }
        .logout-button:hover { background: #fee2e2; color: #ef4444; border-color: #fecaca; }

        .login-button { display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border: 1px solid #ddd; border-radius: 20px; background: white; cursor: pointer; font-weight: 600; transition: all 0.2s; }
        .login-button:hover { background: #f0f0f0; border-color: #ccc; }

        .overview-main { max-width: 1200px; margin: 0 auto; padding: 2rem; }
        
        .hero-section { text-align: center; padding: 3rem 0; }
        .hero-section h2 { font-size: 2.5rem; font-weight: 900; margin-bottom: 1rem; color: #1a1a1a; }
        .hero-section p { font-size: 1.1rem; color: #666; margin-bottom: 2.5rem; }
        
        .search-bar-container { display: flex; max-width: 700px; margin: 0 auto; gap: 0.5rem; }
        .search-input-wrapper { flex: 1; position: relative; display: flex; align-items: center; background: white; border: 2px solid #ddd; border-radius: 12px; transition: border-color 0.2s; }
        .search-input-wrapper:focus-within { border-color: #2e7d32; }
        .search-icon { position: absolute; left: 1rem; color: #999; }
        .search-input-wrapper input { width: 100%; border: none; padding: 1rem 1rem 1rem 3rem; border-radius: 12px; font-size: 1rem; outline: none; }
        .search-btn { padding: 0 2rem; background: #2e7d32; color: white; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; transition: background 0.2s; }
        .search-btn:hover { background: #1b5e20; }

        .match-list-section { padding-top: 3rem; }
        .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
        .section-header h3 { font-size: 1.5rem; font-weight: 700; color: #1a1a1a; margin: 0; }
        .create-match-btn { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.25rem; background: #1976d2; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; transition: background 0.2s; }
        .create-match-btn:hover { background: #1565c0; }

        .match-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.5rem; }
        .match-card { background: white; border: 1px solid #eee; border-radius: 16px; padding: 1.5rem; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .match-card:hover { transform: translateY(-4px); box-shadow: 0 10px 20px rgba(0,0,0,0.08); border-color: #1976d2; }
        .status-badge { font-size: 0.75rem; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 12px; text-transform: uppercase; }
        .status-badge.upcoming { background: #e3f2fd; color: #1976d2; }
        .match-card-title { font-size: 1.25rem; font-weight: 700; margin: 1rem 0; color: #1a1a1a; line-height: 1.4; }
        .match-card-info { display: flex; flex-direction: column; gap: 0.5rem; color: #666; font-size: 0.9rem; margin-bottom: 1.5rem; }
        .info-item { display: flex; align-items: center; gap: 0.5rem; }
        .match-card-footer { display: flex; justify-content: space-between; align-items: center; color: #1976d2; font-weight: 700; font-size: 0.9rem; border-top: 1px solid #f5f5f5; padding-top: 1rem; }

        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { background: white; padding: 2rem; border-radius: 20px; width: 100%; max-width: 500px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
        .modal-content h3 { font-size: 1.5rem; margin-top: 0; margin-bottom: 1.5rem; }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; font-size: 0.9rem; font-weight: 600; color: #666; margin-bottom: 0.5rem; }
        .form-group input[type="text"], .form-group input[type="date"], .form-group input[type="time"] { width: 100%; padding: 0.75rem; border: 1px solid #ddd; border-radius: 8px; font-size: 1rem; }
        .form-row { display: flex; gap: 1rem; }
        .form-row .form-group { flex: 1; }
        .form-group.checkbox label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; color: #333; }
        .modal-actions { display: flex; justify-content: flex-end; gap: 1rem; margin-top: 2rem; }
        .cancel-btn { padding: 0.75rem 1.5rem; background: #eee; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; }
        .submit-btn { padding: 0.75rem 2rem; background: #1976d2; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; }

        .empty-state, .loading-state { text-align: center; padding: 3rem; color: #666; font-size: 1.1rem; }
      `}</style>
    </div>
  );
}
