import { create } from 'zustand';
import { supabase } from '@/utils/supabase';
import { User } from '@supabase/supabase-js';

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  checkSession: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,

  setUser: (user) => set({ user, isLoading: false }),

  signInWithGoogle: async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Login error:', error);
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  checkSession: async () => {
    set({ isLoading: true });
    try {
      const { data: { session } } = await supabase.auth.getSession();
      set({ user: session?.user || null, isLoading: false });

      // 세션 변화 감지 리스너 등록
      supabase.auth.onAuthStateChange((_event, session) => {
        set({ user: session?.user || null });
      });
    } catch (error) {
      console.error('Session check error:', error);
      set({ user: null, isLoading: false });
    }
  },
}));
