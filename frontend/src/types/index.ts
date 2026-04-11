export type Position = 
  | 'GK' 
  | 'LB' | 'LCB' | 'CB' | 'RCB' | 'RB' | 'LWB' | 'RWB'
  | 'LCDM' | 'CDM' | 'RCDM' | 'CM' | 'LCM' | 'RCM'
  | 'LW' | 'CAM' | 'RW' | 'LM' | 'RM'
  | 'ST' | 'CF' | 'LS' | 'RS' 
  | 'SUB';

export interface Player {
  id: string;
  name: string;
  primaryPosition: Position;
  secondaryPositions: Position[];
  playCount: number;
  color: string;
}

export interface QuarterLineup {
  quarterId: number;
  formation: string;
  assignedPlayers: {
    [position: string]: string | null;
  };
}

export interface Match {
  id: string;
  title: string;
  matchDate: string;
  matchTime: string;
  isPublic: boolean;
  status: 'upcoming' | 'ongoing' | 'finished';
}

export interface MatchState {
  players: Player[];
  lineups: QuarterLineup[];
}
