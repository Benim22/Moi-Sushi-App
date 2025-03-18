import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';

export type UserRole = 'user' | 'admin';

interface UserProfile {
  id: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  role: UserRole;
  avatar_url: string | null;
  created_at?: string;
  updated_at?: string;
}

interface UserState {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  
  setSession: (session: Session | null) => void;
  setUser: (user: User | null) => void;
  setProfile: (profile: UserProfile | null) => void;
  
  login: (email: string, password: string) => Promise<{ error: any | null }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any | null, user: User | null }>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  
  updateProfile: (userData: Partial<UserProfile>) => Promise<{ error: any | null }>;
  refreshProfile: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      session: null,
      user: null,
      profile: null,
      isLoggedIn: false,
      isAdmin: false,
      isLoading: false,
      
      setSession: (session) => {
        set({ 
          session,
          user: session?.user || null,
          isLoggedIn: !!session
        });
      },
      
      setUser: (user) => {
        set({ user });
      },
      
      setProfile: (profile) => {
        set({ 
          profile,
          isAdmin: profile?.role === 'admin'
        });
      },
      
      login: async (email, password) => {
        set({ isLoading: true });
        
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          
          if (!error && data.session) {
            set({ 
              session: data.session,
              user: data.user,
              isLoggedIn: true
            });
            
            await get().refreshProfile();
          }
          
          return { error };
        } catch (error) {
          return { error };
        } finally {
          set({ isLoading: false });
        }
      },
      
      signUp: async (email, password, name) => {
        set({ isLoading: true });
        
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                name,
              },
            },
          });
          
          if (!error && data.user) {
            const { error: profileError } = await supabase
              .from('profiles')
              .insert({
                id: data.user.id,
                name,
                email,
                phone: '',
                address: '',
                role: 'user',
              });
              
            if (profileError) {
              console.error('Error creating profile:', profileError);
            }
          }
          
          return { error, user: data.user };
        } catch (error) {
          return { error, user: null };
        } finally {
          set({ isLoading: false });
        }
      },
      
      loginWithGoogle: async () => {
        await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: 'moisushi://login-callback',
          },
        });
      },
      
      logout: async () => {
        set({ isLoading: true });
        
        try {
          await supabase.auth.signOut();
          
          set({
            session: null,
            user: null,
            profile: null,
            isLoggedIn: false,
            isAdmin: false,
          });
        } finally {
          set({ isLoading: false });
        }
      },
      
      updateProfile: async (userData) => {
        const { user } = get();
        
        if (!user) {
          return { error: new Error('User not authenticated') };
        }
        
        try {
          const { error } = await supabase
            .from('profiles')
            .update({
              name: userData.name,
              phone: userData.phone,
              address: userData.address,
            })
            .eq('id', user.id);
            
          if (!error) {
            await get().refreshProfile();
          }
          
          return { error };
        } catch (error) {
          return { error };
        }
      },
      
      refreshProfile: async () => {
        const { user } = get();
        
        if (!user) return;
        
        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
            
          if (!error && data) {
            set({ 
              profile: data as UserProfile,
              isAdmin: data.role === 'admin'
            });
          }
        } catch (error) {
          console.error('Error refreshing profile:', error);
        }
      },
    }),
    {
      name: 'moi-sushi-user',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        session: state.session,
        user: state.user,
        profile: state.profile,
        isLoggedIn: state.isLoggedIn,
        isAdmin: state.isAdmin,
      }),
    }
  )
);