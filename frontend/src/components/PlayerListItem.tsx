'use client';

import React from 'react';
import styles from './ParticipationSidebar.module.scss';

interface PlayerListItemProps {
  id: string;
  name: string;
  position: string;
  playCount: number;
  color?: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const PlayerListItem: React.FC<PlayerListItemProps> = ({
  name,
  position,
  playCount,
  color,
  onEdit,
  onDelete,
}) => {
  return (
    <div className={styles.playerItem}>
      <div className={styles.playerInfo}>
        <div 
          className={styles.colorBadge} 
          style={{ backgroundColor: color || '#666' }} 
        />
        <div className={styles.nameBox}>
          <span className={styles.playerName}>{name}</span>
          <span className={styles.playerPosition}>{position}</span>
        </div>
      </div>
      
      <div className={styles.playerStats}>
        <span className={styles.playCount}>{playCount}Q</span>
        <div className={styles.actions}>
          <button onClick={onEdit} className={styles.editBtn} title="수정">✎</button>
          <button onClick={onDelete} className={styles.deleteBtn} title="삭제">×</button>
        </div>
      </div>
    </div>
  );
};
