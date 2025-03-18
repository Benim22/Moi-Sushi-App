import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import { MenuItem } from '@/mocks/menu';
import { useUserStore } from './user-store';

interface FavoriteItem {
  id: string;
  menuItemId: string;
  userId: string;
  createdAt: string;
  menuItem: MenuItem;
}

interface FavoritesState {
  favorites: FavoriteItem[];
  isLoading: boolean;
  
  addFavorite: (menuItem: MenuItem) => Promise<void>;
  removeFavorite: (menuItemId: string) => Promise<void>;
  isFavorite: (menuItemId: string) => boolean;
  fetchFavorites: () => Promise<void>;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()((set, get) => ({
  favorites: [],
  isLoading: false,
  
  addFavorite: async (menuItem: MenuItem) => {
    const user = useUserStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    
    try {
      // Add to Supabase
      const { data, error } = await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          menu_item_id: menuItem.id,
        })
        .select('*')
        .single();
      
      if (error) throw error;
      
      // Add to local state
      set((state) => ({
        favorites: [
          ...state.favorites,
          {
            id: data.id,
            menuItemId: data.menu_item_id,
            userId: data.user_id,
            createdAt: data.created_at,
            menuItem,
          },
        ],
      }));
    } catch (error) {
      console.error('Error adding favorite:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  removeFavorite: async (menuItemId: string) => {
    const user = useUserStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    
    try {
      // Remove from Supabase
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('menu_item_id', menuItemId);
      
      if (error) throw error;
      
      // Remove from local state
      set((state) => ({
        favorites: state.favorites.filter(
          (favorite) => favorite.menuItemId !== menuItemId
        ),
      }));
    } catch (error) {
      console.error('Error removing favorite:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  isFavorite: (menuItemId: string) => {
    return get().favorites.some((favorite) => favorite.menuItemId === menuItemId);
  },
  
  fetchFavorites: async () => {
    const user = useUserStore.getState().user;
    if (!user) return;
    
    set({ isLoading: true });
    
    try {
      // Fetch favorites from Supabase
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id);
      
      if (error) throw error;
      
      if (data) {
        // We need to fetch the menu items for each favorite
        // In a real app, you would have a proper API for this
        // Here we'll use the mock data
        const { getMenuItems } = await import('@/mocks/menu');
        const menuItems = getMenuItems();
        
        const favorites = data.map((favorite) => {
          const menuItem = menuItems.find(
            (item) => item.id === favorite.menu_item_id
          );
          
          return {
            id: favorite.id,
            menuItemId: favorite.menu_item_id,
            userId: favorite.user_id,
            createdAt: favorite.created_at,
            menuItem: menuItem!,
          };
        }).filter(favorite => favorite.menuItem); // Filter out any favorites where menu item wasn't found
        
        set({ favorites });
      }
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  clearFavorites: () => {
    set({ favorites: [] });
  },
}));