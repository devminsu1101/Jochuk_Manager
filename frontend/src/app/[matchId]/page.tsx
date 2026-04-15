'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { toPng } from 'html-to-image';
import { useMatchStore } from '@/store/useMatchStore';
import { useAuthStore } from '@/store/useAuthStore';
import { SoccerPitch } from '@/components/SoccerPitch';
import { ParticipationSidebar } from '@/components/ParticipationSidebar';
import { DraggablePlayer } from '@/components/DraggablePlayer';
import { FORMATIONS } from '@/constants/formations';
import { Lock, Info, Share2, Award, Download, Link as LinkIcon, ArrowLeft, Layout, LogOut } from 'lucide-react';
import styles from './MatchDetail.module.scss';
import pitchStyles from '@/components/SoccerPitch.module.scss';

const actionButtonStyle = (bgColor: string): React.CSSProperties => ({
  width: '100%', padding: '12px', fontSize: '0.9rem', cursor: 'pointer',
  background: bgColor, color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold',
  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', transition: 'opacity 0.2s'
});

export default function MatchPage() {
  const params = useParams();
  const router = useRouter();
  const matchId = params.matchId as string;
  const { user, signOut } = useAuthStore();
  
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
      activationConstraint: { distance: 5 },
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
          setIsOwner(data.owner_id === user?.id);
        }
      } catch (error) { console.error('Match detail fetch error:', error); }
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
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    if (!isOwner) return;

    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current as { quarterId: number, positionKey: string };

    if (!activeData || !overData) return;

    const playerId = activeData.playerId;
    const { quarterId: targetQuarterId, positionKey: targetPositionKey } = overData;

    updateLineup(targetQuarterId, targetPositionKey, playerId);
  };

  const getSubsForQuarter = (quarterId: number) => {
    const lineup = lineups.find(l => l.quarterId === quarterId);
    if (!lineup) return players;
    const validPositions = Object.keys(FORMATIONS[lineup.formation] || {});
    const assignedIdsInFormation = validPositions.map(pos => lineup.assignedPlayers[pos]).filter(id => id);
    return players.filter(p => !assignedIdsInFormation.includes(p.id));
  };

  const activePlayer = players.find(p => 
    activeId?.includes(p.id)
  );

  const currentLineup = lineups.find(l => l.quarterId === activeQuarterId);

  return (
    <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <main className={styles.mainLayout}>
        <section className={styles.workspace}>
          <div className={styles.matchTitleHeader}>
            <h2>{matchInfo?.title || '로딩 중...'}</h2>
            {!isOwner && <span className={styles.viewOnlyTag}>View Only</span>}
          </div>

          <div className={styles.editorMainView}>
            <div className={styles.pitchWrapper}>
              <div className={styles.pitchHeader}>
                <div className={styles.pitchHeaderLeft}>
                  <span className={styles.pitchTitle}>
                    {activeQuarterId === 0 ? '전체 라인업' : `${activeQuarterId}쿼터 라인업`}
                  </span>
                </div>
                
                {isOwner && activeQuarterId !== 0 && (
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

                <div className={styles.quarterTabsInline}>
                  <button className={`${styles.tabButtonInline} ${activeQuarterId === 0 ? styles.fullView : ''}`} onClick={() => setActiveQuarterId(0)}>전체</button>
                  {[1, 2, 3, 4].map(q => (
                    <button key={q} className={`${styles.tabButtonInline} ${activeQuarterId === q ? styles.active : ''}`} onClick={() => setActiveQuarterId(q)}>{q}Q</button>
                  ))}
                </div>
              </div>
              
              {activeQuarterId === 0 ? (
                <div className={styles.fullViewContainer} ref={fullViewRef}>
                  {[1, 2, 3, 4].map(q => (
                    <div key={q} className={styles.miniPitchCard}>
                      <span className={styles.pitchTitle}>{q}쿼터</span>
                      <SoccerPitch quarterId={q} isMini={true} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.pitchContainer} ref={captureRef}>
                  <SoccerPitch quarterId={activeQuarterId} />
                </div>
              )}
            </div>

            {activeQuarterId !== 0 && (
              <div className={styles.horizontalSubsBar}>
                <div className={styles.subsBarHeader}><h4>대기 선수 ({getSubsForQuarter(activeQuarterId).length})</h4></div>
                {players.length === 0 ? (
                  <div className={styles.emptyPlayersGuide}><p>등록된 선수가 없습니다.</p></div>
                ) : (
                  <div className={styles.horizontalSubsGrid}>
                    {getSubsForQuarter(activeQuarterId).map(p => (
                      <div key={p.id} className={styles.subsItem}>
                        <DraggablePlayer id={p.id} name={p.name} color={p.color} />
                        <span className={styles.subsName}>{p.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
        
        <aside className={styles.sidebar}>
          <ParticipationSidebar />
          <div className={styles.actions}>
            <button onClick={() => setShowShareOptions(!showShareOptions)} style={actionButtonStyle('#1976d2')}><Share2 size={18} />공유 및 관리</button>
            {isOwner && <button onClick={() => autoAssign(players, lineups.map(l => ({ quarterId: l.quarterId, formation: l.formation })))} style={actionButtonStyle('#2e7d32')}><Award size={18} />AI 자동 배정</button>}
          </div>
        </aside>

        <DragOverlay zIndex={3000}>
          {activePlayer ? (
            <div className={pitchStyles.nodeCircle} style={{ backgroundColor: activePlayer.color, transform: 'scale(1.1)', opacity: 0.9 }}>
              <span className={pitchStyles.playerInitial}>{activePlayer.name.charAt(0)}</span>
            </div>
          ) : null}
        </DragOverlay>
      </main>
    </DndContext>
  );
}
