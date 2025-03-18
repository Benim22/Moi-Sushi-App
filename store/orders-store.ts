import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@/lib/supabase';
import { sendOrderNotification } from '@/lib/email';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  totalPrice: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  deliveryAddress: string;
}

interface OrdersState {
  orders: Order[];
  isLoading: boolean;
  statistics: {
    favoriteItem: {
      name: string;
      orderCount: number;
    } | null;
    totalSpent: number;
    totalOrders: number;
  };
  fetchOrders: () => Promise<void>;
  placeOrder: (address: string, phone: string, email: string, name: string) => Promise<{ success: boolean; error?: Error }>;
  calculateStatistics: () => void;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      isLoading: false,
      statistics: {
        favoriteItem: null,
        totalSpent: 0,
        totalOrders: 0,
      },

      fetchOrders: async () => {
        set({ isLoading: true });
        try {
          const { data: orders, error } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });

          if (error) throw error;

          set({ orders: orders || [] });
          get().calculateStatistics();
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          set({ isLoading: false });
        }
      },

      calculateStatistics: () => {
        const { orders } = get();
        
        // Calculate total spent and orders
        const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0);
        const totalOrders = orders.length;

        // Calculate favorite item
        const itemCounts: Record<string, number> = {};
        orders.forEach(order => {
          order.items.forEach(item => {
            itemCounts[item.name] = (itemCounts[item.name] || 0) + item.quantity;
          });
        });

        let favoriteItem = null;
        let maxCount = 0;
        
        Object.entries(itemCounts).forEach(([name, count]) => {
          if (count > maxCount) {
            maxCount = count;
            favoriteItem = { name, orderCount: count };
          }
        });

        set({
          statistics: {
            favoriteItem,
            totalSpent,
            totalOrders,
          }
        });
      },

      placeOrder: async (address: string, phone: string, email: string, name: string) => {
        set({ isLoading: true });
        try {
          // Your existing order placement logic here...
          
          // Send email notification
          await sendOrderNotification({
            name,
            email,
            phone,
            address,
          });

          // Refresh orders and statistics after placing new order
          await get().fetchOrders();

          set({ isLoading: false });
          return { success: true };
        } catch (error) {
          set({ isLoading: false });
          return { 
            success: false, 
            error: error instanceof Error ? error : new Error('Unknown error occurred') 
          };
        }
      },
    }),
    {
      name: 'moi-sushi-orders',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        orders: state.orders,
        statistics: state.statistics,
      }),
    }
  )
);