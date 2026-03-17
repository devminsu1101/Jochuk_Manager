export type Position = 'GK' | 'CB' | 'LB' | 'RB' | 'CDM' | 'CM' | 'CAM' | 'LW' | 'RW' | 'ST' | 'SUB';

export interface Player {
  id: string;
  name: string;
  primaryPosition: Position;
  secondaryPositions: Position[];
  playCount: number;
  avatarUrl?: string; // 프로필 이미지 추가
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
