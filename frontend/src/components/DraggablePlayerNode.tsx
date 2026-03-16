'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import styles from './SoccerPitch.module.css';

interface DraggablePlayerNodeProps {
  playerId: string;
  name: string;
  quarterId: number;
  positionKey: string;
}

export const DraggablePlayerNode: React.FC<DraggablePlayerNodeProps> = ({ playerId, name, quarterId, positionKey }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `node-player-${quarterId}-${positionKey}`,
    data: { playerId, fromQuarterId: quarterId, fromPositionKey: positionKey }
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
      className={styles.nodeCircle}
    >
      {name.substring(0, 2)}
    </div>
  );
};
