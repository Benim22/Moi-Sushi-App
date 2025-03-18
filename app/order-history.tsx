import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  Pressable,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { useOrdersStore } from '@/store/orders-store';
import { useUserStore } from '@/store/user-store';
import { Clock, ShoppingBag, ChevronRight } from 'lucide-react-native';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

export default function OrderHistoryScreen() {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();
  const { orders, isLoading, fetchOrders } = useOrdersStore();
  
  useEffect(() => {
    if (isLoggedIn) {
      fetchOrders();
    }
  }, [isLoggedIn]);
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'PPP', { locale: sv });
    } catch (error) {
      return dateString;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Väntar';
      case 'processing':
        return 'Bearbetas';
      case 'completed':
        return 'Levererad';
      case 'cancelled':
        return 'Avbruten';
      default:
        return status;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#f59e0b'; // Amber
      case 'processing':
        return '#3b82f6'; // Blue
      case 'completed':
        return '#10b981'; // Green
      case 'cancelled':
        return '#ef4444'; // Red
      default:
        return theme.colors.text;
    }
  };
  
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <Stack.Screen 
          options={{
            title: 'Orderhistorik',
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerShadowVisible: false,
          }}
        />
        
        <View style={styles.notLoggedInContainer}>
          <Clock size={60} color={theme.colors.subtext} />
          <Text style={styles.notLoggedInText}>
            Du måste vara inloggad för att se din orderhistorik
          </Text>
          <Pressable 
            style={styles.loginButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginButtonText}>Logga in</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          title: 'Orderhistorik',
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerShadowVisible: false,
        }}
      />
      
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.gold} />
        </View>
      ) : orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <ShoppingBag size={60} color={theme.colors.subtext} />
          <Text style={styles.emptyText}>
            Du har inga tidigare beställningar
          </Text>
          <Pressable 
            style={styles.browseButton}
            onPress={() => router.push('/menu')}
          >
            <Text style={styles.browseButtonText}>Bläddra i menyn</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.orderItem}
              onPress={() => router.push(`/order-details/${item.id}`)}
            >
              <View style={styles.orderHeader}>
                <View>
                  <Text style={styles.orderDate}>
                    {formatDate(item.createdAt)}
                  </Text>
                  <Text style={styles.orderId}>
                    Order #{item.id.substring(0, 8)}
                  </Text>
                </View>
                <View style={[
                  styles.statusBadge, 
                  { backgroundColor: getStatusColor(item.status) + '20' }
                ]}>
                  <Text style={[
                    styles.statusText, 
                    { color: getStatusColor(item.status) }
                  ]}>
                    {getStatusText(item.status)}
                  </Text>
                </View>
              </View>
              
              <View style={styles.orderDetails}>
                <Text style={styles.itemsCount}>
                  {item.items.length} {item.items.length === 1 ? 'artikel' : 'artiklar'}
                </Text>
                <Text style={styles.totalPrice}>
                  {item.totalPrice} kr
                </Text>
              </View>
              
              <View style={styles.orderFooter}>
                <Text style={styles.deliveryAddress} numberOfLines={1}>
                  {item.deliveryAddress}
                </Text>
                <ChevronRight size={20} color={theme.colors.subtext} />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  notLoggedInText: {
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
    marginVertical: theme.spacing.lg,
  },
  loginButton: {
    backgroundColor: theme.colors.gold,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.md,
  },
  loginButtonText: {
    color: theme.colors.buttonText || theme.colors.background,
    fontWeight: '600',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyText: {
    fontSize: 18,
    color: theme.colors.text,
    textAlign: 'center',
    marginVertical: theme.spacing.lg,
  },
  browseButton: {
    backgroundColor: theme.colors.gold,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: theme.borderRadius.sm,
    marginTop: theme.spacing.md,
  },
  browseButtonText: {
    color: theme.colors.buttonText || theme.colors.background,
    fontWeight: '600',
    fontSize: 16,
  },
  listContent: {
    padding: theme.spacing.lg,
  },
  orderItem: {
    backgroundColor: theme.colors.darkCard || theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  orderDate: {
    fontSize: 14,
    color: theme.colors.subtext,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  itemsCount: {
    fontSize: 14,
    color: theme.colors.text,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.gold,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.sm,
  },
  deliveryAddress: {
    fontSize: 14,
    color: theme.colors.subtext,
    flex: 1,
  },
});