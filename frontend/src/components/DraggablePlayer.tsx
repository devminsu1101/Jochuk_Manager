'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import styles from './ParticipationSidebar.module.css';

interface DraggablePlayerProps {
  id: string;
  name: string;
  position: string;
  playCount: number;
}

export const DraggablePlayer: React.FC<DraggablePlayerProps> = ({ id, name, position, playCount }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `player-${id}`,
    data: { playerId: id }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
    zIndex: 999,
  } : undefined;

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...listeners} 
      {...attributes} 
      className={styles.playerItem}
    >
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
