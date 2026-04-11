'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { toPng } from 'html-to-image';
import { useMatchStore } from '@/store/useMatchStore';
import { useAuthStore } from '@/store/useAuthStore';
import { SoccerPitch } from '@/components/SoccerPitch';
import { ParticipationSidebar } from '@/components/ParticipationSidebar';
import { Lock, Info } from 'lucide-react';

const actionButtonStyle: React.CSSProperties = {
  width: '100%', padding: '12px', fontSize: '1rem', cursor: 'pointer',
  background: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold'
};

export default function MatchPage() {
  const params = useParams();
  const matchId = params.matchId as string;
  const { user } = useAuthStore();
  
  const { 
    setMatchId, 
    fetchPlayers,
    updateLineup, 
    setLineups,
    saveLineups,
    autoAssign,
    lineups, 
    players, 
    activeQuarterId, 
    setActiveQuarterId, 
    isLoading 
  } = useMatchStore();

  const [matchInfo, setMatchInfo] = useState<any>(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  
  const captureRef = useRef<HTMLDivElement>(null);
  const fullViewRef = useRef<HTMLDivElement>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  // 매치 상세 정보 및 권한 확인
  useEffect(() => {
    const fetchMatchDetail = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/matches/${matchId}`);
        if (response.ok) {
          const data = await response.json();
          setMatchInfo(data);
          // owner_id가 없거나(레거시) 현재 사용자와 일치하면 방장으로 간주
          setIsOwner(!data.owner_id || data.owner_id === user?.id);
        }
      } catch (error) {
        console.error('Match detail fetch error:', error);
      }
    };

    if (matchId) {
      setMatchId(matchId);
      fetchMatchDetail();
    }
  }, [matchId, user, setMatchId]);

  useEffect(() => {
    fetchPlayers();
    const interval = setInterval(fetchPlayers, 5000);
    return () => clearInterval(interval);
  }, [matchId, fetchPlayers]);

  const handleDragEnd = (event: DragEndEvent) => {
    if (!isOwner) return; // 방장이 아니면 드래그 무시

    const { active, over } = event;
    if (!over || activeQuarterId === 0) return;

    const activeData = active.data.current;
    const overData = over.data.current as { quarterId: number, positionKey: string };

    if (!activeData || !overData) return;

    const playerId = activeData.playerId;
    const { quarterId: targetQuarterId, positionKey: targetPositionKey } = overData;

    if (activeData.fromPositionKey) {
      const fromQuarterId = activeData.fromQuarterId;
      const fromPositionKey = activeData.fromPositionKey;

      if (fromQuarterId === targetQuarterId) {
        const targetLineup = lineups.find(l => l.quarterId === targetQuarterId);
        const playerAtTarget = targetLineup?.assignedPlayers[targetPositionKey];
        updateLineup(targetQuarterId, targetPositionKey, playerId);
        if (playerAtTarget) {
          updateLineup(fromQuarterId, fromPositionKey, playerAtTarget);
        } else {
          updateLineup(fromQuarterId, fromPositionKey, null);
        }
      }
    } else {
      updateLineup(targetQuarterId, targetPositionKey, playerId);
    }
  };

  const handleAutoAssign = async () => {
    if (!isOwner) return;
    await autoAssign(players, lineups.map(l => ({ quarterId: l.quarterId, formation: l.formation })));
  };

  const handleSaveImage = async () => {
    const target = activeQuarterId === 0 ? fullViewRef.current : captureRef.current;
    if (target === null || isCapturing) return;
    
    setIsCapturing(true);
    try {
      const dataUrl = await toPng(target, { 
        backgroundColor: activeQuarterId === 0 ? '#eee' : '#f0f2f5',
        pixelRatio: 2
      });
      
      const link = document.createElement('a');
      const filename = activeQuarterId === 0 ? 'full-lineup' : `q${activeQuarterId}-lineup`;
      link.download = `${filename}-${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
      setShowShareOptions(false);
    } catch (err) {
      console.error('Capture Error:', err);
      alert('이미지 저장에 실패했습니다.');
    } finally {
      setIsCapturing(false);
    }
  };

  const handleCopyInviteLink = () => {
    const inviteLink = `${window.location.origin}/register/${matchId}`;
    navigator.clipboard.writeText(inviteLink);
    alert('초대 링크가 클립보드에 복사되었습니다!');
    setShowShareOptions(false);
  };

  const getSubsForQuarter = (quarterId: number) => {
    const lineup = lineups.find(l => l.quarterId === quarterId);
    if (!lineup) return [];
    const assignedIds = Object.values(lineup.assignedPlayers);
    return players.filter(p => !assignedIds.includes(p.id));
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <main className="main-layout">
        {!isOwner && !isLoading && (
          <div className="readonly-banner">
            <Lock size={14} />
            <span>읽기 전용 모드: 이 매치를 수정할 권한이 없습니다.</span>
          </div>
        )}
        
        {isLoading && (
          <div className="loading-overlay">
            <div className="spinner" />
            <p>데이터를 불러오는 중입니다...</p>
          </div>
        )}

        <section className="workspace">
          <div className="match-title-header">
            <h2>{matchInfo?.title || '로딩 중...'}</h2>
            {!isOwner && <span className="view-only-tag">View Only</span>}
          </div>

          {activeQuarterId === 0 ? (
            <div className="full-view-container" ref={fullViewRef}>
              {[1, 2, 3, 4].map(q => {
                const subs = getSubsForQuarter(q);
                return (
                  <div key={q} className="mini-pitch-card">
                    <div className="mini-pitch-box">
                      <span className="pitch-title">{q}쿼터</span>
                      <SoccerPitch quarterId={q} isMini={true} />
                    </div>
                    <div className="mini-subs-box">
                      <b style={{ color: '#d32f2f' }}>대기:</b> {subs.map(p => p.name).join(', ') || '없음'}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="editor-main-view" ref={captureRef}>
              <div className="pitch-wrapper">
                <span className="pitch-title">{activeQuarterId}쿼터 라인업</span>
                <SoccerPitch quarterId={activeQuarterId} />
              </div>

              <div className="subs-sidebar">
                <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#d32f2f' }}>이번 쿼터 대기 ({getSubsForQuarter(activeQuarterId).length})</h4>
                <div style={{ overflowY: 'auto', marginTop: '10px' }}>
                  {getSubsForQuarter(activeQuarterId).map(p => (
                    <div key={p.id} className="mini-player-badge">
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: p.color }} />
                      <span>{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="quarter-tabs-bottom">
            <button 
              className={`tab-button ${activeQuarterId === 0 ? 'full-view' : ''}`}
              onClick={() => setActiveQuarterId(0)}
            >
              📊 전체 보기
            </button>
            <div style={{ width: '1px', height: '24px', background: '#ddd', margin: '0 10px' }} />
            {[1, 2, 3, 4].map(q => (
              <button 
                key={q} 
                className={`tab-button ${activeQuarterId === q ? 'active' : ''}`}
                onClick={() => setActiveQuarterId(q)}
              >
                {q}쿼터
              </button>
            ))}
          </div>
        </section>
        
        <aside className="sidebar">
          <ParticipationSidebar />
          <div className="actions" style={{ marginTop: 'auto', paddingTop: '20px', position: 'relative' }}>
            {showShareOptions && (
              <div className="share-popover">
                <button onClick={handleSaveImage} className="share-item" disabled={isCapturing}>
                  {isCapturing ? '저장 중...' : (activeQuarterId === 0 ? '전체 라인업 저장' : '현재 쿼터 저장')}
                </button>
                <button onClick={handleCopyInviteLink} className="share-item">플레이어 초대 링크 복사</button>
              </div>
            )}
            
            <button onClick={() => setShowShareOptions(!showShareOptions)} style={{ 
              ...actionButtonStyle, background: '#1976d2', marginBottom: '10px'
            }}>
              공유 및 관리
            </button>
            
            {isOwner && (
              <button onClick={handleAutoAssign} style={actionButtonStyle}>
                AI 자동 배정
              </button>
            )}
            
            {!isOwner && (
              <div className="owner-only-notice">
                <Info size={14} />
                <span>방장만 수정할 수 있습니다.</span>
              </div>
            )}
          </div>
        </aside>
      </main>

      <style jsx>{`
        .readonly-banner {
          position: fixed; top: 0; left: 0; right: 0; height: 32px;
          background: #fff3e0; color: #e65100; font-size: 0.8rem; font-weight: 600;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          z-index: 1000; border-bottom: 1px solid #ffe0b2;
        }
        .main-layout { padding-top: 32px; }
        .match-title-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .match-title-header h2 { margin: 0; font-size: 1.5rem; color: #1a1a1a; }
        .view-only-tag { background: #eee; color: #666; padding: 2px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
        .loading-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255, 255, 255, 0.7); display: flex; flexDirection: column; alignItems: center; justifyContent: center; z-index: 9999; }
        .spinner { width: 40px; height: 40px; border: 4px solid #f3f3f3; borderTop: 4px solid #3498db; borderRadius: 50%; animation: spin 1s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        .share-popover { position: absolute; bottom: 130px; left: 0; right: 0; background: white; border: 1px solid #ddd; borderRadius: 8px; padding: 10px; box-shadow: 0 -4px 10px rgba(0,0,0,0.1); z-index: 100; }
        .share-item { width: 100%; padding: 10px; fontSize: 0.9rem; cursor: pointer; background: none; border: none; borderBottom: 1px solid #eee; textAlign: left; display: block; }
        .owner-only-notice { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 12px; background: #f5f5f5; color: #888; border-radius: 4px; font-size: 0.85rem; font-weight: 500; }
      `}</style>
    </DndContext>
  );
}
