export type Position = 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'LW' | 'RW' | 'ST' | 'SUB';

export interface Player {
  id: string;
  name: string;
  primaryPosition: Position;
  secondaryPositions: Position[];
  playCount: number; // 누적 참여 쿼터 수
}

export interface QuarterLineup {
  quarterId: number;
  formation: string;
  assignedPlayers: {
    [position: string]: string | null; // positionKey: playerId
  };
}

export interface MatchState {
  players: Player[];
  lineups: QuarterLineup[]; // 1~4 쿼터
}
