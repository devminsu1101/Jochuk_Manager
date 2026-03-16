import { create } from 'zustand';
import { Player, QuarterLineup, MatchState } from '@/types';

interface MatchStore extends MatchState {
  setPlayers: (players: Player[]) => void;
  updateLineup: (quarterId: number, position: string, playerId: string | null) => void;
  setFormation: (quarterId: number, formation: string) => void;
}

export const useMatchStore = create<MatchStore>((set) => ({
  players: [],
  lineups: [1, 2, 3, 4].map((id) => ({
    quarterId: id,
    formation: '4-4-2',
    assignedPlayers: {},
  })),

  setPlayers: (players) => set({ players }),

  updateLineup: (quarterId, position, playerId) =>
    set((state) => ({
      lineups: state.lineups.map((lineup) => {
        if (lineup.quarterId !== quarterId) return lineup;

        const newAssignedPlayers = { ...lineup.assignedPlayers };

        // 1. 중복 방지: 해당 선수가 이 쿼터의 다른 포지션에 있다면 제거
        if (playerId) {
          Object.keys(newAssignedPlayers).forEach((pos) => {
            if (newAssignedPlayers[pos] === playerId) {
              newAssignedPlayers[pos] = null;
            }
          });
        }

        // 2. 새로운 포지션에 배정
        newAssignedPlayers[position] = playerId;

        return {
          ...lineup,
          assignedPlayers: newAssignedPlayers,
        };
      }),
    })),

  setFormation: (quarterId, formation) =>
    set((state) => ({
      lineups: state.lineups.map((lineup) =>
        lineup.quarterId === quarterId ? { ...lineup, formation, assignedPlayers: {} } : lineup
      ),
    })),
}));
