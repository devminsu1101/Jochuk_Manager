import { create } from 'zustand';
import { Player, QuarterLineup, MatchState } from '@/types';
import { supabase } from '@/utils/supabase';

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
  autoAssign: (players: Player[], quarters: { quarterId: number; formation: string }[]) => Promise<void>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// 인증 헤더를 포함한 Fetch 헬퍼
const authFetch = async (url: string, options: RequestInit = {}) => {
  const { data: { session } } = await supabase.auth.getSession();
  const headers = {
    ...options.headers,
    'Authorization': `Bearer ${session?.access_token || ''}`,
    'Content-Type': 'application/json',
  };
  return fetch(url, { ...options, headers });
};

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
      const response = await fetch(`${API_BASE_URL}/api/matches/${id}/lineups`);
      if (response.ok) {
        const lineups = await response.json();
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
      const response = await fetch(`${API_BASE_URL}/api/matches/${matchId}/players`);
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
      const response = await authFetch(`${API_BASE_URL}/api/matches/${matchId}/lineups/bulk`, {
        method: 'PUT',
        body: JSON.stringify({ lineups }),
      });
      if (!response.ok) throw new Error('방장만 수정할 수 있습니다.');
    } catch (error) {
      console.error('전체 라인업 저장 실패:', error);
      alert('권한이 없거나 저장 중 오류가 발생했습니다.');
    }
  },

  autoAssign: async (players, quarters) => {
    const { matchId } = get();
    if (!matchId) return;

    set({ isLoading: true });
    try {
      const response = await authFetch(`${API_BASE_URL}/api/matches/${matchId}/auto-assign`, {
        method: 'POST',
        body: JSON.stringify({ players, quarters }),
      });

      if (!response.ok) throw new Error('AI 배정 실패 (방장 권한 필요)');
      
      const newLineups = await response.json();
      set({ lineups: newLineups });
      alert('AI가 쿼터별 라인업을 공평하게 배정했습니다!');
    } catch (error) {
      console.error(error);
      alert('AI 배정 중 오류가 발생했습니다.');
    } finally {
      set({ isLoading: false });
    }
  },

  addDummyPlayers: async () => {
    const { matchId } = get();
    if (!matchId) return;

    set({ isLoading: true });
    const dummyPlayers = [
      { name: '손흥민', primaryPosition: 'LW', secondaryPositions: ['ST', 'RW'] },
      { name: '김민재', primaryPosition: 'CB', secondaryPositions: ['RCB', 'LCB'] },
      { name: '이강인', primaryPosition: 'RW', secondaryPositions: ['CAM', 'RM'] },
      { name: '황희찬', primaryPosition: 'ST', secondaryPositions: ['LW', 'RW'] },
      { name: '황인범', primaryPosition: 'CM', secondaryPositions: ['CDM', 'CAM'] },
      { name: '이재성', primaryPosition: 'CAM', secondaryPositions: ['CM', 'LW'] },
      { name: '박용우', primaryPosition: 'CDM', secondaryPositions: ['CM'] },
      { name: '설영우', primaryPosition: 'LB', secondaryPositions: ['RB', 'LWB'] },
      { name: '조현우', primaryPosition: 'GK', secondaryPositions: [] },
    ];
    
    try {
      const response = await authFetch(`${API_BASE_URL}/api/matches/${matchId}/players/bulk`, {
        method: 'POST',
        body: JSON.stringify({ players: dummyPlayers }),
      });

      if (!response.ok) throw new Error('방장만 선수를 추가할 수 있습니다.');
      
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
      const response = await authFetch(`${API_BASE_URL}/api/matches/${matchId}/players/${playerId}`, {
        method: 'PUT',
        body: JSON.stringify({ name, primaryPosition, secondaryPositions }),
      });
      if (!response.ok) throw new Error('방장만 수정 가능합니다.');

      const updatedPlayer = await response.json();
      set((state) => ({
        players: state.players.map((p) => (p.id === playerId ? updatedPlayer : p)),
      }));
    } catch (error) {
      console.error(error);
      alert('권한이 없거나 수정 중 오류가 발생했습니다.');
    }
  },

  deletePlayer: async (playerId) => {
    const { matchId } = get();
    if (!matchId) return;

    try {
      const response = await authFetch(`${API_BASE_URL}/api/matches/${matchId}/players/${playerId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('방장만 삭제 가능합니다.');

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
      alert('권한이 없거나 삭제 중 오류가 발생했습니다.');
    }
  },

  deleteAllPlayers: async () => {
    const { matchId } = get();
    if (!matchId) return;

    if (!window.confirm('모든 선수와 라인업을 삭제하시겠습니까?')) return;
    try {
      const response = await authFetch(`${API_BASE_URL}/api/matches/${matchId}/players`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('방장만 전체 삭제 가능합니다.');

      set((state) => ({
        players: [],
        lineups: state.lineups.map((lineup) => ({
          ...lineup,
          assignedPlayers: {},
        })),
      }));
    } catch (error) {
      console.error(error);
      alert('권한이 없거나 전체 삭제 중 오류가 발생했습니다.');
    }
  },

  updateLineup: async (quarterId, position, playerId) => {
    const { matchId } = get();
    if (!matchId) return;

    // 로컬 상태 즉시 업데이트 (비동기 처리 전 사용자 피드백)
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

    // 전체 저장 호출 (권한 체크 포함)
    get().saveLineups();
  },

  setFormation: async (quarterId, formation) => {
    const { matchId } = get();
    if (!matchId) return;

    // 로컬 상태 업데이트
    set((state) => ({
      lineups: state.lineups.map((lineup) =>
        lineup.quarterId === quarterId ? { ...lineup, formation } : lineup
      ),
    }));

    // 전체 저장 호출 (권한 체크 포함)
    get().saveLineups();
  },
}));
