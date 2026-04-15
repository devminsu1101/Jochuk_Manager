'use client';

import React, { useState } from 'react';
import { useMatchStore } from '@/store/useMatchStore';
import { PlayerListItem } from './PlayerListItem';
import styles from './ParticipationSidebar.module.scss';

export const ParticipationSidebar: React.FC = () => {
  const players = useMatchStore((state) => state.players);
  const lineups = useMatchStore((state) => state.lineups);
  const { addDummyPlayers, updatePlayer, deletePlayer, deleteAllPlayers } = useMatchStore();

  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editPrimary, setEditPrimary] = useState('');
  const [editSecondary, setEditSecondary] = useState('');

  const getPlayCount = (playerId: string) => {
    let count = 0;
    lineups.forEach((lineup) => {
      const assignedIdsInFormation = Object.values(lineup.assignedPlayers);
      if (assignedIdsInFormation.includes(playerId)) {
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
    }
  };

  return (
    <div className={styles.sidebarContent}>
      <div className={styles.header}>
        <h3>참여 명단 ({players.length})</h3>
        <div className={styles.buttonGroup}>
          <button onClick={() => addDummyPlayers()} className={`${styles.actionBtn} ${styles.sampleBtn}`}>
            샘플
          </button>
          <button onClick={() => deleteAllPlayers()} className={`${styles.actionBtn} ${styles.clearBtn}`}>
            멸종
          </button>
        </div>
      </div>

      <div className={styles.playerList}>
        {players.map((player) => (
          <PlayerListItem
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
        {players.length === 0 && (
          <p style={{ textAlign: 'center', color: '#999', fontSize: '0.85rem', marginTop: '2rem' }}>
            등록된 선수가 없습니다.
          </p>
        )}
      </div>

      {editingPlayerId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h4>선수 정보 수정</h4>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', marginBottom: '4px' }}>이름</label>
              <input value={editName} onChange={(e) => setEditName(e.target.value)} className={styles.inputField} />
              
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', marginBottom: '4px' }}>주 포지션</label>
              <input value={editPrimary} onChange={(e) => setEditPrimary(e.target.value)} className={styles.inputField} />
              
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#666', marginBottom: '4px' }}>부 포지션 (쉼표 구분)</label>
              <input value={editSecondary} onChange={(e) => setEditSecondary(e.target.value)} className={styles.inputField} />
              
              <div className={styles.modalActions}>
                <button onClick={handleUpdate} className={styles.saveBtn}>저장하기</button>
                <button onClick={() => setEditingPlayerId(null)} className={styles.cancelBtn}>취소</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
