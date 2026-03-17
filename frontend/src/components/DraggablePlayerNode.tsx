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
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `node-player-${quarterId}-${positionKey}`,
    data: { playerId, fromQuarterId: quarterId, fromPositionKey: positionKey },
    disabled: isMini
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0 : 1, // 드래그 중인 원본은 숨김 (CSS 드래그 효과와 겹치지 않게)
    zIndex: 999,
  } : undefined;

  const nodeClass = isMini ? styles.nodeCircleMini : styles.nodeCircle;

  return (
    <div 
      ref={setNodeRef} 
      style={{ ...style, backgroundColor: color || '#666' }}
      {...(isMini ? {} : listeners)} 
      {...(isMini ? {} : attributes)} 
      className={nodeClass}
    >
      {/* 텍스트 제거: 사용자 요청 반영 */}
    </div>
  );
};
