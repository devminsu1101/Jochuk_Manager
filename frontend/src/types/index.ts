export type Position = 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'LW' | 'RW' | 'ST' | 'SUB';

export interface Player {
  id: string;
  name: string;
  primaryPosition: Position;
  secondaryPositions: Position[];
  playCount: number;
  color: string; // 고유 색상
}

export interface QuarterLineup {
  quarterId: number;
  formation: string;
  assignedPlayers: {
    [position: string]: string | null;
  };
}

export interface MatchState {
  players: Player[];
  lineups: QuarterLineup[];
}
