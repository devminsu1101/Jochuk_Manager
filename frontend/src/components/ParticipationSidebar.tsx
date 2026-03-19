'use client';

import React, { useState } from 'react';
import { useMatchStore } from '@/store/useMatchStore';
import { DraggablePlayer } from './DraggablePlayer';
import styles from './ParticipationSidebar.module.css';

export const ParticipationSidebar: React.FC = () => {
  const players = useMatchStore((state) => state.players);
  const lineups = useMatchStore((state) => state.lineups);
  const { addDummyPlayers, updatePlayer, deletePlayer, deleteAllPlayers } = useMatchStore();

  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrimary, setEditPrimary] = useState('');
  const [editSecondary, setEditSecondary] = useState('');
  const [showMenuId, setShowMenuId] = useState<string | null>(null);

  const getPlayCount = (playerId: string) => {
    let count = 0;
    lineups.forEach((lineup) => {
      if (Object.values(lineup.assignedPlayers).includes(playerId)) {
        count++;
      }
    });
    return count;
  };

  const handleEditClick = (player: any) => {
    setEditingPlayerId(player.id);
    setEditName(player.name);
    setEditPrimary(player.primaryPosition);
    setEditSecondary(player.secondaryPositions.join(', '));
    setShowMenuId(null);
  };

  const handleUpdate = async () => {
    if (!editingPlayerId) return;
    const secondary = editSecondary.split(',').map(s => s.trim()).filter(s => s !== '');
    await updatePlayer(editingPlayerId, editName, editPrimary, secondary);
    setEditingPlayerId(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('이 선수를 정말 삭제하시겠습니까?')) {
      await deletePlayer(id);
      setShowMenuId(null);
    }
  };

  return (
    <div className={styles.sidebarContent}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, fontSize: '1.1rem' }}>참여 명단 ({players.length})</h3>
        <div style={{ display: 'flex', gap: '5px' }}>
          <button 
            onClick={() => addDummyPlayers()}
            style={{ 
              fontSize: '0.75rem', padding: '5px 10px', cursor: 'pointer',
              backgroundColor: '#e3f2fd', border: '1px solid #90caf9', borderRadius: '4px',
              color: '#1976d2', fontWeight: 'bold'
            }}
          >
            샘플
          </button>
          <button 
            onClick={() => deleteAllPlayers()}
            style={{ 
              fontSize: '0.75rem', padding: '5px 10px', cursor: 'pointer',
              backgroundColor: '#ffebee', border: '1px solid #ef9a9a', borderRadius: '4px',
              color: '#d32f2f', fontWeight: 'bold'
            }}
          >
            멸종
          </button>
        </div>
      </div>

      <div className={styles.playerList}>
        {players.map((player) => (
          <DraggablePlayer
            key={player.id}
            id={player.id}
            name={player.name}
            position={player.primaryPosition}
            playCount={getPlayCount(player.id)}
            color={player.color}
            onEdit={() => handleEditClick(player)}
            onDelete={() => handleDelete(player.id)}
          />
        ))}
      </div>

      {editingPlayerId && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h4>선수 정보 수정</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="이름" style={inputStyle} />
              <input value={editPrimary} onChange={(e) => setEditPrimary(e.target.value)} placeholder="주 포지션 (예: ST)" style={inputStyle} />
              <input value={editSecondary} onChange={(e) => setEditSecondary(e.target.value)} placeholder="부 포지션 (쉼표로 구분)" style={inputStyle} />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button onClick={handleUpdate} style={{ ...actionButtonStyle, background: '#2e7d32' }}>저장</button>
                <button onClick={() => setEditingPlayerId(null)} style={{ ...actionButtonStyle, background: '#666' }}>취소</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
  backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000
};

const modalContentStyle: React.CSSProperties = {
  background: 'white', padding: '20px', borderRadius: '8px', width: '300px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
};

const inputStyle: React.CSSProperties = {
  padding: '8px', border: '1px solid #ddd', borderRadius: '4px'
};

const actionButtonStyle: React.CSSProperties = {
  flex: 1, padding: '10px', border: 'none', borderRadius: '4px', color: 'white', fontWeight: 'bold', cursor: 'pointer'
};
