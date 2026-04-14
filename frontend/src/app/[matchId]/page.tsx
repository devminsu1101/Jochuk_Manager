'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { toPng } from 'html-to-image';
import { useMatchStore } from '@/store/useMatchStore';
import { useAuthStore } from '@/store/useAuthStore';
import { SoccerPitch } from '@/components/SoccerPitch';
import { ParticipationSidebar } from '@/components/ParticipationSidebar';
import { Lock, Info, Share2, Award, Download, Link as LinkIcon } from 'lucide-react';
import styles from './MatchDetail.module.css';

const actionButtonStyle = (bgColor: string): React.CSSProperties => ({
  width: '100%', padding: '12px', fontSize: '0.9rem', cursor: 'pointer',
  background: bgColor, color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s'
});

export default function MatchPage() {
  const params = useParams();
  const matchId = params.matchId as string;
  const { user } = useAuthStore();
  
  const { 
    setMatchId, 
    fetchPlayers,
    updateLineup, 
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
          // owner_id가 현재 사용자와 일치하면 방장으로 간주
          const isUserOwner = data.owner_id === user?.id;
          setIsOwner(isUserOwner);
          console.log("Ownership Check:", { matchOwner: data.owner_id, currentUser: user?.id, isOwner: isUserOwner });
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
        backgroundColor: activeQuarterId === 0 ? '#f0f2f5' : '#ffffff',
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
      <main className={styles.mainLayout}>
        {!isOwner && !isLoading && (
          <div className={styles.readonlyBanner}>
            <Lock size={14} />
            <span>읽기 전용 모드: 매치 관리자만 수정할 수 있습니다.</span>
          </div>
        )}
        
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <div className="spinner" />
            <p>데이터를 동기화 중입니다...</p>
          </div>
        )}

        <section className={styles.workspace}>
          <div className={styles.matchTitleHeader}>
            <h2>{matchInfo?.title || '로딩 중...'}</h2>
            {!isOwner && <span className={styles.viewOnlyTag}>View Only</span>}
            {isOwner && <span className={`${styles.viewOnlyTag} ${styles.owner}`} style={{background: '#dcfce7', color: '#166534', borderColor: '#bbf7d0'}}>Owner</span>}
          </div>

          {activeQuarterId === 0 ? (
            <div className={styles.fullViewContainer} ref={fullViewRef}>
              {[1, 2, 3, 4].map(q => {
                const subs = getSubsForQuarter(q);
                return (
                  <div key={q} className={styles.miniPitchCard}>
                    <div className={styles.miniPitchBox}>
                      <span className={styles.pitchTitle}>{q}쿼터</span>
                      <SoccerPitch quarterId={q} isMini={true} />
                    </div>
                    <div className={styles.miniSubsBox}>
                      <b style={{ color: '#d32f2f' }}>대기 명단:</b> {subs.map(p => p.name).join(', ') || '없음'}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.editorMainView} ref={captureRef}>
              <div className={styles.pitchWrapper}>
                <span className={styles.pitchTitle}>{activeQuarterId}쿼터 라인업</span>
                <SoccerPitch quarterId={activeQuarterId} />
              </div>

              <div className={styles.subsSidebar}>
                <h4 style={{ margin: 0, fontSize: '0.9rem', color: '#d32f2f', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  대기 ({getSubsForQuarter(activeQuarterId).length})
                </h4>
                <div style={{ overflowY: 'auto', marginTop: '12px' }}>
                  {getSubsForQuarter(activeQuarterId).length > 0 ? (
                    getSubsForQuarter(activeQuarterId).map(p => (
                      <div key={p.id} className={styles.miniPlayerBadge}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: p.color }} />
                        <span>{p.name}</span>
                      </div>
                    ))
                  ) : (
                    <p style={{fontSize: '0.8rem', color: '#999', textAlign: 'center', marginTop: '20px'}}>대기 선수 없음</p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className={styles.quarterTabsBottom}>
            <button 
              className={`${styles.tabButton} ${activeQuarterId === 0 ? styles.fullView : ''}`}
              onClick={() => setActiveQuarterId(0)}
            >
              전체 보기
            </button>
            <div style={{ width: '1px', height: '16px', background: '#e2e8f0', margin: '0 8px' }} />
            {[1, 2, 3, 4].map(q => (
              <button 
                key={q} 
                className={`${styles.tabButton} ${activeQuarterId === q ? styles.active : ''}`}
                onClick={() => setActiveQuarterId(q)}
              >
                {q}Q
              </button>
            ))}
          </div>
        </section>
        
        <aside className={styles.sidebar}>
          <ParticipationSidebar />
          <div className={styles.actions}>
            {showShareOptions && (
              <div className={styles.sharePopover}>
                <button onClick={handleSaveImage} className={styles.shareItem} disabled={isCapturing}>
                  <Download size={14} style={{marginRight: '8px'}} />
                  {isCapturing ? '저장 중...' : (activeQuarterId === 0 ? '전체 이미지 저장' : `${activeQuarterId}쿼터 이미지 저장`)}
                </button>
                <button onClick={handleCopyInviteLink} className={styles.shareItem}>
                  <LinkIcon size={14} style={{marginRight: '8px'}} />
                  선수 초대 링크 복사
                </button>
              </div>
            )}
            
            <button onClick={() => setShowShareOptions(!showShareOptions)} style={actionButtonStyle('#1976d2')}>
              <Share2 size={18} />
              공유 및 관리
            </button>
            
            <div style={{height: '10px'}} />

            {isOwner ? (
              <button onClick={handleAutoAssign} style={actionButtonStyle('#2e7d32')}>
                <Award size={18} />
                AI 자동 배정
              </button>
            ) : (
              <div className={styles.ownerOnlyNotice}>
                <Info size={14} />
                <span>방장만 수정할 수 있습니다.</span>
              </div>
            )}
          </div>
        </aside>
      </main>
    </DndContext>
  );
}
