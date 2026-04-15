'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import styles from './SoccerPitch.module.css';

interface DraggablePlayerNodeProps {
  playerId: string;
  name: string;
  quarterId: number;
  positionKey: string;
  color?: string;
  isMini?: boolean;
}

export const DraggablePlayerNode: React.FC<DraggablePlayerNodeProps> = ({ 
  playerId, name, quarterId, positionKey, color, isMini = false 
}) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `node-player-${quarterId}-${positionKey}`,
    data: { playerId, fromQuarterId: quarterId, fromPositionKey: positionKey },
    disabled: isMini
  });

  const nodeClass = isMini ? styles.nodeCircleMini : styles.nodeCircle;

  return (
    <div 
      ref={setNodeRef} 
      style={{ 
        backgroundColor: color || '#666',
        opacity: isDragging ? 0 : 1, // 드래그 중일 때 원본 숨김
        cursor: isMini ? 'default' : 'grab'
      }}
      {...(isMini ? {} : listeners)} 
      {...(isMini ? {} : attributes)} 
      className={nodeClass}
    >
      {!isMini && <span className={styles.playerInitial}>{name.charAt(0)}</span>}
    </div>
  );
};
