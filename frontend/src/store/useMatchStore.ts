import { create } from 'zustand';
import { Player, QuarterLineup, MatchState } from '@/types';

interface MatchStore extends MatchState {
  activeQuarterId: number;
  setActiveQuarterId: (id: number) => void;
  setPlayers: (players: Player[]) => void;
  updateLineup: (quarterId: number, position: string, playerId: string | null) => void;
  setFormation: (quarterId: number, formation: string) => void;
}

export const useMatchStore = create<MatchStore>((set) => ({
  players: [],
  activeQuarterId: 1, // 기본값 1쿼터
  lineups: [1, 2, 3, 4].map((id) => ({
    quarterId: id,
    formation: '4-2-3-1',
    assignedPlayers: {},
  })),

  setActiveQuarterId: (id) => set({ activeQuarterId: id }),

  setPlayers: (players) => set({ players }),

  updateLineup: (quarterId, position, playerId) =>
    set((state) => ({
      lineups: state.lineups.map((lineup) => {
        if (lineup.quarterId !== quarterId) return lineup;
        const newAssignedPlayers = { ...lineup.assignedPlayers };
        if (playerId) {
          Object.keys(newAssignedPlayers).forEach((pos) => {
            if (newAssignedPlayers[pos] === playerId) {
              newAssignedPlayers[pos] = null;
            }
          });
        }
        newAssignedPlayers[position] = playerId;
        return { ...lineup, assignedPlayers: newAssignedPlayers };
      }),
    })),

  setFormation: (quarterId, formation) =>
    set((state) => ({
      lineups: state.lineups.map((lineup) =>
        lineup.quarterId === quarterId ? { ...lineup, formation, assignedPlayers: {} } : lineup
      ),
    })),
}));
