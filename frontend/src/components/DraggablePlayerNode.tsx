'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import styles from './SoccerPitch.module.css';

interface DraggablePlayerNodeProps {
  playerId: string;
  name: string;
  quarterId: number;
  positionKey: string;
  avatarUrl?: string;
  isMini?: boolean;
}

export const DraggablePlayerNode: React.FC<DraggablePlayerNodeProps> = ({ 
  playerId, name, quarterId, positionKey, avatarUrl, isMini = false 
}) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `node-player-${quarterId}-${positionKey}`,
    data: { playerId, fromQuarterId: quarterId, fromPositionKey: positionKey },
    disabled: isMini // 미니 뷰에서는 드래그 비활성화
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
    zIndex: 999,
  } : undefined;

  const nodeClass = isMini ? styles.nodeCircleMini : styles.nodeCircle;

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...(isMini ? {} : listeners)} 
      {...(isMini ? {} : attributes)} 
      className={nodeClass}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className={styles.nodeAvatar} />
      ) : (
        <span style={{ fontSize: isMini ? '0.5rem' : '0.8rem' }}>{name.substring(0, 2)}</span>
      )}
    </div>
  );
};
