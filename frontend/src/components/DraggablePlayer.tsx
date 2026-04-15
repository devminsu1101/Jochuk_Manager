'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import styles from './SoccerPitch.module.css';

interface DraggablePlayerProps {
  id: string;
  name: string;
  color?: string;
}

export const DraggablePlayer: React.FC<DraggablePlayerProps> = ({ id, name, color }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `subs-player-${id}`,
    data: { playerId: id },
  });

  return (
    <div 
      ref={setNodeRef} 
      style={{ 
        backgroundColor: color || '#666',
        opacity: isDragging ? 0 : 1, // 드래그 중 원본 숨김
        cursor: 'grab'
      }}
      {...listeners} 
      {...attributes} 
      className={styles.nodeCircle}
      title={name}
    >
      <span className={styles.playerInitial}>{name.charAt(0)}</span>
    </div>
  );
};
