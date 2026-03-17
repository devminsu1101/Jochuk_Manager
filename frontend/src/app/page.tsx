'use client';

import React, { useEffect, useRef, useState } from 'react';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { toPng } from 'html-to-image';
import { useMatchStore } from '@/store/useMatchStore';
import { SoccerPitch } from '@/components/SoccerPitch';
import { ParticipationSidebar } from '@/components/ParticipationSidebar';
import { Player } from '@/types';

const MOCK_PLAYERS: Player[] = [
  { id: '1', name: '김민수', primaryPosition: 'ST', secondaryPositions: ['LW'], playCount: 0 },
  { id: '2', name: '이철수', primaryPosition: 'GK', secondaryPositions: [], playCount: 0 },
  { id: '3', name: '박영희', primaryPosition: 'CB', secondaryPositions: ['RB'], playCount: 0 },
  { id: '4', name: '최강타', primaryPosition: 'CDM', secondaryPositions: ['CM'], playCount: 0 },
  { id: '5', name: '손흥민', primaryPosition: 'LW', secondaryPositions: ['ST'], playCount: 0 },
  { id: '6', name: '황희찬', primaryPosition: 'RW', secondaryPositions: ['ST'], playCount: 0 },
  { id: '7', name: '김민재', primaryPosition: 'CB', secondaryPositions: [], playCount: 0 },
  { id: '8', name: '이강인', primaryPosition: 'CAM', secondaryPositions: ['RW'], playCount: 0 },
  { id: '9', name: '백승호', primaryPosition: 'CM', secondaryPositions: ['CDM'], playCount: 0 },
  { id: '10', name: '설영우', primaryPosition: 'RB', secondaryPositions: ['LB'], playCount: 0 },
  { id: '11', name: '김진수', primaryPosition: 'LB', secondaryPositions: ['RB'], playCount: 0 },
  { id: '12', name: '조현우', primaryPosition: 'GK', secondaryPositions: [], playCount: 0 },
  { id: '13', name: '황인범', primaryPosition: 'CM', secondaryPositions: ['CAM'], playCount: 0 },
];

export default function Home() {
  const { setPlayers, updateLineup, lineups } = useMatchStore();
  const [showShareOptions, setShowShareOptions] = useState(false);
  const pitchContainerRef = useRef<HTMLDivElement>(null);
  
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
    // 5초마다 새로운 참여자 확인 (폴링)
    const interval = setInterval(fetchPlayers, 5000);
    return () => clearInterval(interval);
  }, [setPlayers]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

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
...
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          players: useMatchStore.getState().players,
          quarters: lineups.map(l => ({ quarterId: l.quarterId, formation: l.formation })),
        }),
      });
      if (!response.ok) throw new Error('API 호출 실패');
      const data = await response.json();
      data.forEach((item: any) => {
        Object.entries(item.assignedPlayers).forEach(([pos, pid]) => {
          updateLineup(item.quarterId, pos, pid as string);
        });
      });
      alert('AI 자동 배정이 완료되었습니다!');
    } catch (error) {
      alert('자동 배정 중 오류가 발생했습니다.');
    }
  };

  const handleSaveImage = async () => {
    if (pitchContainerRef.current === null) return;
    try {
      const dataUrl = await toPng(pitchContainerRef.current, { cacheBust: true, backgroundColor: '#e0e0e0' });
      const link = document.createElement('a');
      link.download = `soccer-lineup-${new Date().getTime()}.png`;
      link.href = dataUrl;
      link.click();
      setShowShareOptions(false);
    } catch (err) {
      alert('이미지 저장 중 오류가 발생했습니다.');
    }
  };

  const handleCopyInviteLink = () => {
    const inviteLink = `${window.location.origin}/register/match-123`; // 임시 매치 ID
    navigator.clipboard.writeText(inviteLink);
    alert('초대 링크가 클립보드에 복사되었습니다!');
    setShowShareOptions(false);
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <main className="main-layout">
        <div className="editor-container" ref={pitchContainerRef}>
          {[1, 2, 3, 4].map((q) => (
            <div key={q} className="pitch-card">
              <span className="pitch-title">{q}쿼터</span>
              <SoccerPitch quarterId={q} />
            </div>
          ))}
        </div>
        
        <aside className="sidebar">
          <ParticipationSidebar />
          <div className="actions" style={{ marginTop: 'auto', paddingTop: '20px', position: 'relative' }}>
            {showShareOptions && (
              <div style={{
                position: 'absolute', bottom: '130px', left: 0, right: 0,
                background: 'white', border: '1px solid #ddd', borderRadius: '8px',
                padding: '10px', boxShadow: '0 -4px 10px rgba(0,0,0,0.1)', zIndex: 100
              }}>
                <button onClick={handleSaveImage} style={shareItemStyle}>이미지로 저장</button>
                <button onClick={handleCopyInviteLink} style={shareItemStyle}>플레이어 초대 링크 복사</button>
              </div>
            )}
            
            <button onClick={() => setShowShareOptions(!showShareOptions)} style={{ 
              ...actionButtonStyle, background: '#1976d2', marginBottom: '10px'
            }}>
              공유하기
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
