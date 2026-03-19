import { create } from 'zustand';
import { Player, QuarterLineup, MatchState } from '@/types';

interface MatchStore extends MatchState {
  activeQuarterId: number;
  isLoading: boolean;
  setActiveQuarterId: (id: number) => void;
  setPlayers: (players: Player[]) => void;
  updateLineup: (quarterId: number, position: string, playerId: string | null) => void;
  setFormation: (quarterId: number, formation: string) => void;
  setIsLoading: (loading: boolean) => void;
  addDummyPlayers: () => Promise<void>;
  updatePlayer: (playerId: string, name: string, primaryPosition: string, secondaryPositions: string[]) => Promise<void>;
  deletePlayer: (playerId: string) => Promise<void>;
  deleteAllPlayers: () => Promise<void>;
}

export const useMatchStore = create<MatchStore>((set) => ({
  players: [],
  activeQuarterId: 1,
  isLoading: false,
  lineups: [1, 2, 3, 4].map((id) => ({
    quarterId: id,
    formation: '4-2-3-1',
    assignedPlayers: {},
  })),

  setActiveQuarterId: (id) => set({ activeQuarterId: id }),

  setPlayers: (players) => set({ players }),

  setIsLoading: (loading) => set({ isLoading: loading }),

  addDummyPlayers: async () => {
    set({ isLoading: true });
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const dummyPlayers = [
      { name: '손흥민', primaryPosition: 'LW', secondaryPositions: ['ST', 'RW'] },
      { name: '김민재', primaryPosition: 'CB', secondaryPositions: ['RCB', 'LCB'] },
      { name: '이강인', primaryPosition: 'RW', secondaryPositions: ['CAM', 'RM'] },
      { name: '황희찬', primaryPosition: 'ST', secondaryPositions: ['LW', 'RW'] },
      { name: '황인범', primaryPosition: 'CM', secondaryPositions: ['CDM', 'CAM'] },
      { name: '이재성', primaryPosition: 'CAM', secondaryPositions: ['CM', 'LW'] },
      { name: '박용우', primaryPosition: 'CDM', secondaryPositions: ['CM'] },
      { name: '설영우', primaryPosition: 'LB', secondaryPositions: ['RB', 'LWB'] },
      { name: '김영권', primaryPosition: 'CB', secondaryPositions: ['LCB'] },
      { name: '정승현', primaryPosition: 'CB', secondaryPositions: ['RCB'] },
      { name: '조현우', primaryPosition: 'GK', secondaryPositions: [] },
      { name: '조규성', primaryPosition: 'ST', secondaryPositions: ['CF'] },
      { name: '정우영', primaryPosition: 'RW', secondaryPositions: ['LW', 'CAM'] },
      { name: '홍현석', primaryPosition: 'CM', secondaryPositions: ['CAM'] },
      { name: '김태환', primaryPosition: 'RB', secondaryPositions: ['RWB'] },
    ];
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/matches/match-123/players/bulk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ players: dummyPlayers }),
      });

      if (!response.ok) throw new Error('샘플 데이터 등록 실패');
      
      const newPlayers = await response.json();
      set((state) => ({ 
        players: [...state.players, ...newPlayers],
        isLoading: false 
      }));
    } catch (error) {
      console.error(error);
      alert('샘플 데이터를 불러오는 중 오류가 발생했습니다.');
      set({ isLoading: false });
    }
  },

  updatePlayer: async (playerId, name, primaryPosition, secondaryPositions) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/matches/match-123/players/${playerId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, primaryPosition, secondaryPositions }),
      });
      if (!response.ok) throw new Error('선수 수정 실패');

      const updatedPlayer = await response.json();
      set((state) => ({
        players: state.players.map((p) => (p.id === playerId ? updatedPlayer : p)),
      }));
    } catch (error) {
      console.error(error);
      alert('선수 수정 중 오류가 발생했습니다.');
    }
  },

  deletePlayer: async (playerId) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/matches/match-123/players/${playerId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('선수 삭제 실패');

      set((state) => ({
        players: state.players.filter((p) => p.id !== playerId),
        lineups: state.lineups.map((lineup) => {
          const newAssignedPlayers = { ...lineup.assignedPlayers };
          Object.keys(newAssignedPlayers).forEach((pos) => {
            if (newAssignedPlayers[pos] === playerId) {
              newAssignedPlayers[pos] = null;
            }
          });
          return { ...lineup, assignedPlayers: newAssignedPlayers };
        }),
      }));
    } catch (error) {
    console.error(error);
    alert('선수 삭제 중 오류가 발생했습니다.');
    }
    },

    deleteAllPlayers: async () => {
    if (!window.confirm('모든 선수와 라인업을 삭제하시겠습니까?')) return;
    try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const response = await fetch(`${apiUrl}/api/matches/match-123/players`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('전체 삭제 실패');

    set((state) => ({
      players: [],
      lineups: state.lineups.map((lineup) => ({
        ...lineup,
        assignedPlayers: {},
      })),
    }));
    } catch (error) {
    console.error(error);
    alert('전체 삭제 중 오류가 발생했습니다.');
    }
    },

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
