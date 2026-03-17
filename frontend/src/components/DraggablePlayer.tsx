'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import styles from './ParticipationSidebar.module.css';

interface DraggablePlayerProps {
  id: string;
  name: string;
  position: string;
  playCount: number;
  color: string;
}

export const DraggablePlayer: React.FC<DraggablePlayerProps> = ({ id, name, position, playCount, color }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `player-${id}`,
    data: { playerId: id }
  });

  // 드래그 시 컬러 노드만 움직이도록 transform을 노드 래퍼에만 적용하거나 별도 처리
  // 여기서는 노드 자체만 드래그 가능하게 setNodeRef를 avatarWrapper에 걸겠습니다.
  const dragStyle = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 1000,
    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
    cursor: 'grabbing'
  } : undefined;

  return (
    <div className={styles.playerItem} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div 
        ref={setNodeRef}
        {...listeners} 
        {...attributes}
        className={styles.avatarWrapper} 
        style={{ 
          ...dragStyle,
          backgroundColor: color, 
          border: '2px solid #fff', 
          cursor: 'grab' 
        }}
      >
        <span style={{ color: '#fff', fontSize: '0.7rem', fontWeight: 'bold' }}>
          {name.substring(0, 1)}
        </span>
      </div>
      <div className={styles.playerInfo}>
        <span className={styles.playerName}>{name}</span>
        <span className={styles.playerPosition}>{position}</span>
      </div>
      <div className={styles.playStats}>
        {playCount}/4 쿼터
      </div>
    </div>
  );
};
