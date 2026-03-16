'use client';

import React from 'react';
import { FORMATIONS } from '@/constants/formations';
import { useMatchStore } from '@/store/useMatchStore';
import { DroppableNode } from './DroppableNode';
import { DraggablePlayerNode } from './DraggablePlayerNode';
import styles from './SoccerPitch.module.css';

interface SoccerPitchProps {
  quarterId: number;
}

export const SoccerPitch: React.FC<SoccerPitchProps> = ({ quarterId }) => {
  const lineup = useMatchStore((state) => 
    state.lineups.find((l) => l.quarterId === quarterId)
  );
  const players = useMatchStore((state) => state.players);

  if (!lineup) return null;

  const formationData = FORMATIONS[lineup.formation] || FORMATIONS['4-4-2'];

  return (
    <div className={styles.pitch}>
      <div className={styles.pitchLines}>
        <div className={styles.centerCircle} />
        <div className={styles.penaltyAreaTop} />
        <div className={styles.penaltyAreaBottom} />
        <div className={styles.halfwayLine} />
      </div>

      {Object.entries(formationData).map(([posKey, style]) => {
        const assignedPlayerId = lineup.assignedPlayers[posKey];
        const player = players.find((p) => p.id === assignedPlayerId);

        return (
          <DroppableNode
            key={posKey}
            quarterId={quarterId}
            positionKey={posKey}
            style={{ top: style.top, left: style.left }}
          >
            {player ? (
              <DraggablePlayerNode 
                playerId={player.id} 
                name={player.name} 
                quarterId={quarterId} 
                positionKey={posKey} 
              />
            ) : (
              <div className={styles.nodeCircleEmpty} />
            )}
            <span className={styles.nodeLabel}>{player ? player.name : posKey}</span>
          </DroppableNode>
        );
      })}
    </div>
  );
};
