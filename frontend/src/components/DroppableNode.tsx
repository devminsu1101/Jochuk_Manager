'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from './SoccerPitch.module.scss';

interface DroppableNodeProps {
  quarterId: number;
  positionKey: string;
  children: React.ReactNode;
  style: React.CSSProperties;
}

export const DroppableNode: React.FC<DroppableNodeProps> = ({ quarterId, positionKey, children, style }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `node-${quarterId}-${positionKey}`,
    data: { quarterId, positionKey }
  });

  return (
    <div
      ref={setNodeRef}
      className={`${styles.node} ${isOver ? styles.nodeOver : ''}`}
      style={style}
    >
      {children}
    </div>
  );
};
