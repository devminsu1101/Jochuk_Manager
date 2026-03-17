'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { toPng } from 'html-to-image';
import { useMatchStore } from '@/store/useMatchStore';
import { SoccerPitch } from '@/components/SoccerPitch';
import { ParticipationSidebar } from '@/components/ParticipationSidebar';

export default function Home() {
  const { setPlayers, updateLineup, lineups, players, activeQuarterId, setActiveQuarterId } = useMatchStore();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);
  const fullViewRef = useRef<HTMLDivElement>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const fetchPlayers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/matches/match-123/players');
      if (!response.ok) throw new Error('선수 목록 가져오기 실패');
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPlayers();
    const interval = setInterval(fetchPlayers, 5000);
    return () => clearInterval(interval);
  }, [setPlayers]);

  const handleDragEnd = (event: DragEndEvent) => {
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
    const currentPlayers = useMatchStore.getState().players;
    if (currentPlayers.length < 11) {
      alert(`최소 11명의 선수가 필요합니다. (현재: ${currentPlayers.length}명)`);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/auto-assign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          players: currentPlayers,
          quarters: lineups.map(l => ({ quarterId: l.quarterId, formation: l.formation })),
        }),
      });

      if (!response.ok) throw new Error('API 호출 실패');
      const data = await response.json();
      data.forEach((item: { quarterId: number, assignedPlayers: { [pos: string]: string } }) => {
        Object.entries(item.assignedPlayers).forEach(([pos, pid]) => {
          updateLineup(item.quarterId, pos, pid);
        });
      });
      alert('AI 자동 배정이 완료되었습니다!');
    } catch (error) {
      alert('자동 배정 중 오류가 발생했습니다.');
    }
  };

  const handleSaveImage = async () => {
    const target = activeQuarterId === 0 ? fullViewRef.current : captureRef.current;
    if (target === null) return;
    
    try {
      const dataUrl = await toPng(target, { 
        cacheBust: true, 
        backgroundColor: activeQuarterId === 0 ? '#eee' : '#f0f2f5' 
      });
      const link = document.createElement('a');
      const filename = activeQuarterId === 0 ? 'full-lineup' : `q${activeQuarterId}-lineup`;
      link.download = `${filename}-${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
      setShowShareOptions(false);
    } catch (err) {
      alert('이미지 저장 중 오류가 발생했습니다.');
    }
  };

  const handleCopyInviteLink = () => {
    const inviteLink = `${window.location.origin}/register/match-123`;
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
        <section className="workspace">
          {/* 메인 영역 */}
          {activeQuarterId === 0 ? (
            /* [전체 보기 모드] */
            <div className="full-view-container" ref={fullViewRef}>
              {[1, 2, 3, 4].map(q => {
                const subs = getSubsForQuarter(q);
                return (
                  <div key={q} className="mini-pitch-card">
                    <div className="mini-pitch-box">
                      <span className="pitch-title">{q}쿼터</span>
                      <div style={{ transform: 'scale(0.7)', transformOrigin: 'top left', width: '143%', height: '143%', pointerEvents: 'none' }}>
                        <SoccerPitch quarterId={q} />
                      </div>
                    </div>
                    <div className="mini-subs-box">
                      <b style={{ color: '#d32f2f' }}>대기:</b> {subs.map(p => p.name).join(', ') || '없음'}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* [개별 편집 모드] */
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
                      {p.avatarUrl && <img src={p.avatarUrl} alt="" className="mini-avatar" />}
                      <span>{p.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 하단 쿼터 셀렉터 탭 */}
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
              <div style={{
                position: 'absolute', bottom: '130px', left: 0, right: 0,
                background: 'white', border: '1px solid #ddd', borderRadius: '8px',
                padding: '10px', boxShadow: '0 -4px 10px rgba(0,0,0,0.1)', zIndex: 100
              }}>
                <button onClick={handleSaveImage} style={shareItemStyle}>
                  {activeQuarterId === 0 ? '전체 라인업 저장' : '현재 쿼터 저장'}
                </button>
                <button onClick={handleCopyInviteLink} style={shareItemStyle}>플레이어 초대 링크 복사</button>
              </div>
            )}
            
            <button onClick={() => setShowShareOptions(!showShareOptions)} style={{ 
              ...actionButtonStyle, background: '#1976d2', marginBottom: '10px'
            }}>
              공유 및 관리
            </button>
            <button onClick={handleAutoAssign} style={actionButtonStyle}>
              AI 자동 배정
            </button>
          </div>
        </aside>
      </main>
    </DndContext>
  );
}

const actionButtonStyle: React.CSSProperties = {
  width: '100%', padding: '12px', fontSize: '1rem', cursor: 'pointer',
  background: '#2e7d32', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 'bold'
};

const shareItemStyle: React.CSSProperties = {
  width: '100%', padding: '10px', fontSize: '0.9rem', cursor: 'pointer',
  background: 'none', border: 'none', borderBottom: '1px solid #eee', textAlign: 'left', display: 'block'
};
