'use client';

import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import styles from './ParticipationSidebar.module.css';

interface DraggablePlayerProps {
  id: string;
  name: string;
  position: string;
  playCount: number;
  color: string;
  onEdit: () => void;
  onDelete: () => void;
}

export const DraggablePlayer: React.FC<DraggablePlayerProps> = ({ id, name, position, playCount, color, onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `player-${id}`,
    data: { playerId: id }
  });

  const dragStyle = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: 1000,
    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
    cursor: 'grabbing'
  } : undefined;

  return (
    <div className={styles.playerItem} style={{ opacity: isDragging ? 0.5 : 1, position: 'relative' }}>
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
      <div className={styles.playStats} style={{ marginRight: '30px' }}>
        {playCount}/4 쿼터
      </div>
      
      <button 
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
        }}
        style={{
          position: 'absolute', right: '5px', top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#999',
          padding: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}
      >
        ⋮
      </button>

      {showMenu && (
        <div style={{
          position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-50%)',
          background: 'white', border: '1px solid #ddd', borderRadius: '4px', zIndex: 100,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column'
        }}>
          <button onClick={() => { onEdit(); setShowMenu(false); }} style={menuButtonStyle}>수정</button>
          <button onClick={() => { onDelete(); setShowMenu(false); }} style={{ ...menuButtonStyle, color: 'red' }}>삭제</button>
        </div>
      )}
    </div>
  );
};

const menuButtonStyle: React.CSSProperties = {
  padding: '6px 12px', background: 'none', border: 'none', borderBottom: '1px solid #eee', 
  cursor: 'pointer', textAlign: 'left', fontSize: '0.85rem', whiteSpace: 'nowrap'
};
