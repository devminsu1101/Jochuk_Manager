'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { toPng } from 'html-to-image';
import { useMatchStore } from '@/store/useMatchStore';
import { useAuthStore } from '@/store/useAuthStore';
import { SoccerPitch } from '@/components/SoccerPitch';
import { ParticipationSidebar } from '@/components/ParticipationSidebar';
import { DraggablePlayer } from '@/components/DraggablePlayer';
import { FORMATIONS } from '@/constants/formations';
import { Lock, Info, Share2, Award, Download, Link as LinkIcon } from 'lucide-react';
import styles from './MatchDetail.module.css';
import pitchStyles from '@/components/SoccerPitch.module.css';

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
    setFormation,
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
  const [activeId, setActiveId] = useState<string | null>(null);
  
  const captureRef = useRef<HTMLDivElement>(null);
  const fullViewRef = useRef<HTMLDivElement>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  useEffect(() => {
    const fetchMatchDetail = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
        const response = await fetch(`${apiUrl}/api/matches/${matchId}`);
        if (response.ok) {
          const data = await response.json();
          setMatchInfo(data);
          const isUserOwner = data.owner_id === user?.id;
          setIsOwner(isUserOwner);
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

  const handleDragStart = (event: DragStartEvent) => {
    if (!isOwner) return;
    const { active } = event;
    setActiveId(active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    if (!isOwner) return;

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
    if (!lineup) return players;
    const validPositions = Object.keys(FORMATIONS[lineup.formation] || {});
    const assignedIdsInFormation = validPositions
      .map(pos => lineup.assignedPlayers[pos])
      .filter(id => id !== null && id !== undefined);
    return players.filter(p => !assignedIdsInFormation.includes(p.id));
  };

  const activePlayer = players.find(p => {
    if (!activeId) return false;
    // 대기 명단에서 드래그 시작 시
    if (activeId.startsWith('subs-player-')) {
      return p.id === activeId.replace('subs-player-', '');
    }
    // 경기장 내에서 드래그 시작 시
    if (activeId.startsWith('node-player-')) {
      // activeId 형식: node-player-{Q}-{POS}
      const parts = activeId.split('-');
      const qId = parseInt(parts[2]);
      const posKey = parts[3];
      const lineup = lineups.find(l => l.quarterId === qId);
      return lineup?.assignedPlayers[posKey] === p.id;
    }
    return false;
  });

  const currentLineup = lineups.find(l => l.quarterId === activeQuarterId);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <main className={styles.mainLayout}>
        <div className={styles.stickyBottomActions}>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setShowShareOptions(!showShareOptions);
            }} 
            className={styles.tabButton} 
            style={{flex: 1, background: 'var(--primary)', color: 'white', border: 'none'}}
          >
            공유/관리
          </button>
          {isOwner && (
            <button onClick={handleAutoAssign} className={styles.tabButton} style={{flex: 1, background: 'var(--secondary)', color: 'white', border: 'none'}}>
              AI 자동배정
            </button>
          )}
        </div>

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
                      <b style={{ color: '#d32f2f' }}>대기:</b> {subs.map(p => p.name).join(', ') || '없음'}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className={styles.editorMainView} ref={captureRef}>
              <div className={styles.pitchWrapper}>
                <div className={styles.pitchHeader}>
                  <div className={styles.pitchHeaderLeft}>
                    <span className={styles.pitchTitle}>{activeQuarterId}쿼터 라인업</span>
                  </div>
                  
                  <div className={styles.quarterTabsInline}>
                    <button className={`${styles.tabButtonInline} ${activeQuarterId === 0 ? styles.fullView : ''}`} onClick={() => setActiveQuarterId(0)}>
                      전체
                    </button>
                    {[1, 2, 3, 4].map(q => (
                      <button key={q} className={`${styles.tabButtonInline} ${activeQuarterId === q ? styles.active : ''}`} onClick={() => setActiveQuarterId(q)}>
                        {q}Q
                      </button>
                    ))}
                  </div>

                  {isOwner && (
                    <div className={pitchStyles.formationContainer}>
                      {Object.keys(FORMATIONS).map(f => (
                        <button 
                          key={f}
                          className={`${pitchStyles.formationBtn} ${currentLineup?.formation === f ? pitchStyles.active : ''}`}
                          onClick={() => setFormation(activeQuarterId, f)}
                        >
                          {f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className={styles.pitchContainer}>
                  <SoccerPitch quarterId={activeQuarterId} />
                </div>
              </div>

              <div className={styles.horizontalSubsBar}>
                <div className={styles.subsBarHeader}>
                  <h4>대기 선수 ({getSubsForQuarter(activeQuarterId).length})</h4>
                </div>
                {players.length === 0 ? (
                  <div className={styles.emptyPlayersGuide}>
                    <Info size={20} style={{ color: '#1976d2' }} />
                    <p>등록된 선수가 없습니다. 초대 링크를 공유하세요!</p>
                    <button onClick={handleCopyInviteLink} className={styles.inviteBtnSmall}>
                      초대 링크 복사
                    </button>
                  </div>
                ) : (
                  <div className={styles.horizontalSubsGrid}>
                    {getSubsForQuarter(activeQuarterId).length > 0 ? (
                      getSubsForQuarter(activeQuarterId).map(p => (
                        <div key={p.id} className={styles.subsItem}>
                          <DraggablePlayer id={p.id} name={p.name} color={p.color} />
                          <span className={styles.subsName}>{p.name}</span>
                        </div>
                      ))
                    ) : (
                      <p style={{fontSize: '0.8rem', color: '#999', padding: '10px'}}>현재 쿼터에 모든 선수가 배치되었습니다.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
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
            <button onClick={(e) => { e.stopPropagation(); setShowShareOptions(!showShareOptions); }} style={actionButtonStyle('#1976d2')}>
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

        <DragOverlay zIndex={3000}>
          {activePlayer ? (
            <div className={pitchStyles.nodeCircle} style={{ backgroundColor: activePlayer.color, transform: 'scale(1.1)', opacity: 0.9, cursor: 'grabbing' }}>
              <span className={pitchStyles.playerInitial}>{activePlayer.name.charAt(0)}</span>
              <div className={pitchStyles.nodeLabel} style={{background: 'rgba(0,0,0,0.8)'}}>{activePlayer.name}</div>
            </div>
          ) : null}
        </DragOverlay>
      </main>
    </DndContext>
  );
}
