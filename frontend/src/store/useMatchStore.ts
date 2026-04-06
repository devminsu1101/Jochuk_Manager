import { create } from 'zustand';
import { Player, QuarterLineup, MatchState } from '@/types';

interface MatchStore extends MatchState {
  matchId: string | null;
  activeQuarterId: number;
  isLoading: boolean;
  setMatchId: (id: string) => void;
  setActiveQuarterId: (id: number) => void;
  setPlayers: (players: Player[]) => void;
  fetchLineups: (id: string) => Promise<void>;
  fetchPlayers: () => Promise<void>;
  saveLineups: () => Promise<void>;
  updateLineup: (quarterId: number, position: string, playerId: string | null) => Promise<void>;
  setFormation: (quarterId: number, formation: string) => Promise<void>;
  setIsLoading: (loading: boolean) => void;
  addDummyPlayers: () => Promise<void>;
  updatePlayer: (playerId: string, name: string, primaryPosition: string, secondaryPositions: string[]) => Promise<void>;
  deletePlayer: (playerId: string) => Promise<void>;
  deleteAllPlayers: () => Promise<void>;
  setLineups: (lineups: QuarterLineup[]) => void;
}

export const useMatchStore = create<MatchStore>((set, get) => ({
  matchId: null,
  players: [],
  activeQuarterId: 1,
  isLoading: false,
  lineups: [1, 2, 3, 4].map((id) => ({
    quarterId: id,
    formation: '4-2-3-1',
    assignedPlayers: {},
  })),

  setMatchId: (id) => {
    set({ matchId: id });
    get().fetchPlayers();
    get().fetchLineups(id);
  },

  setActiveQuarterId: (id) => set({ activeQuarterId: id }),

  setPlayers: (players) => set({ players }),

  setIsLoading: (loading) => set({ isLoading: loading }),

  setLineups: (lineups) => set({ lineups }),

  fetchLineups: async (id) => {
    set({ isLoading: true });
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/matches/${id}/lineups`);
      if (response.ok) {
        const lineups = await response.json();
        console.log('불러온 라인업:', lineups);
        set({ lineups });
      }
    } catch (error) {
      console.error('라인업 불러오기 실패:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPlayers: async () => {
    const { matchId } = get();
    if (!matchId) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/matches/${matchId}/players`);
      if (response.ok) {
        const players = await response.json();
        set({ players });
      }
    } catch (error) {
      console.error('선수 목록 가져오기 실패:', error);
    }
  },

  saveLineups: async () => {
    const { matchId, lineups } = get();
    if (!matchId) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/matches/${matchId}/lineups/bulk`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lineups }),
      });
      if (!response.ok) throw new Error('벌크 저장 실패');
      console.log('전체 라인업 저장 성공');
    } catch (error) {
      console.error('전체 라인업 저장 실패:', error);
    }
  },

  addDummyPlayers: async () => {
    const { matchId } = get();
    if (!matchId) return;

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
      const response = await fetch(`${apiUrl}/api/matches/${matchId}/players/bulk`, {
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
    const { matchId } = get();
    if (!matchId) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/matches/${matchId}/players/${playerId}`, {
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
    const { matchId } = get();
    if (!matchId) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/matches/${matchId}/players/${playerId}`, {
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
    const { matchId } = get();
    if (!matchId) return;

    if (!window.confirm('모든 선수와 라인업을 삭제하시겠습니까?')) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/matches/${matchId}/players`, {
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

  updateLineup: async (quarterId, position, playerId) => {
    const { matchId } = get();
    if (!matchId) return;

    // 로컬 상태 즉시 업데이트
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
    }));

    // 전체 저장 호출
    get().saveLineups();
  },

  setFormation: async (quarterId, formation) => {
    const { matchId } = get();
    if (!matchId) return;

    // 로컬 상태 업데이트 (선수는 유지)
    set((state) => ({
      lineups: state.lineups.map((lineup) =>
        lineup.quarterId === quarterId ? { ...lineup, formation } : lineup
      ),
    }));

    // 전체 저장 호출
    get().saveLineups();
  },
}));
