'use client';

import React, { useEffect } from 'react';
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
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
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  useEffect(() => {
    setPlayers(MOCK_PLAYERS);
  }, [setPlayers]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current as { quarterId: number, positionKey: string };

    if (!activeData || !overData) return;

    const playerId = activeData.playerId;
    const { quarterId: targetQuarterId, positionKey: targetPositionKey } = overData;

    // 노드 -> 노드 스왑인 경우
    if (activeData.fromPositionKey) {
      const fromQuarterId = activeData.fromQuarterId;
      const fromPositionKey = activeData.fromPositionKey;

      // 같은 쿼터 내에서의 스왑만 일단 지원 (필요 시 쿼터 간 이동도 가능)
      if (fromQuarterId === targetQuarterId) {
        const targetLineup = lineups.find(l => l.quarterId === targetQuarterId);
        const playerAtTarget = targetLineup?.assignedPlayers[targetPositionKey];

        // 1. 타겟 위치에 현재 선수 배치
        updateLineup(targetQuarterId, targetPositionKey, playerId);
        
        // 2. 원래 위치에 타겟에 있던 선수 배치 (Swap)
        if (playerAtTarget) {
          updateLineup(fromQuarterId, fromPositionKey, playerAtTarget);
        } else {
          updateLineup(fromQuarterId, fromPositionKey, null);
        }
      }
    } else {
      // 사이드바 -> 노드 배정
      updateLineup(targetQuarterId, targetPositionKey, playerId);
    }
  };

  const handleAutoAssign = async () => {
    alert('AI 자동 배정 로직(백엔드)을 연결 중입니다.');
    // TODO: Phase 4 FastAPI 연동
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <main className="main-layout">
        <div className="editor-container">
          {[1, 2, 3, 4].map((q) => (
            <div key={q} className="pitch-card">
              <span className="pitch-title">{q}쿼터</span>
              <SoccerPitch quarterId={q} />
            </div>
          ))}
        </div>
        
        <aside className="sidebar">
          <ParticipationSidebar />
          <div className="actions" style={{ marginTop: 'auto', paddingTop: '20px' }}>
            <button 
              onClick={handleAutoAssign}
              style={{ 
                width: '100%', 
                padding: '12px', 
                fontSize: '1.1rem', 
                cursor: 'pointer',
                background: '#2e7d32',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold'
              }}
            >
              AI 자동 배정
            </button>
          </div>
        </aside>
      </main>
    </DndContext>
  );
}
