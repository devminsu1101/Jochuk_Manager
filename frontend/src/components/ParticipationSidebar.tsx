'use client';

import React from 'react';
import { useMatchStore } from '@/store/useMatchStore';
import { DraggablePlayer } from './DraggablePlayer';
import styles from './ParticipationSidebar.module.css';

export const ParticipationSidebar: React.FC = () => {
  const players = useMatchStore((state) => state.players);
  const lineups = useMatchStore((state) => state.lineups);

  // 선수별 출전 쿼터 계산
  const getPlayCount = (playerId: string) => {
    let count = 0;
    lineups.forEach((lineup) => {
      if (Object.values(lineup.assignedPlayers).includes(playerId)) {
        count++;
      }
    });
    return count;
  };

  return (
    <div className={styles.sidebarContent}>
      <h3>참여 명단 ({players.length}명)</h3>
      <div className={styles.playerList}>
        {players.map((player) => {
          const count = getPlayCount(player.id);
          return (
            <DraggablePlayer
              key={player.id}
              id={player.id}
              name={player.name}
              position={player.primaryPosition}
              playCount={count}
            />
          );
        })}
      </div>
    </div>
  );
};
