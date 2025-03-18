import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { globalStyles } from '@/constants/theme';
import { theme } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { useCartStore } from '@/store/cart-store';
import { Minus, Plus, Trash2 } from 'lucide-react-native';

export default function CartScreen() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const router = useRouter();

  const handleCheckout = () => {
    if (items.length === 0) {
      return;
    }
    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    router.push('/menu');
  };

  return (
    <SafeAreaView style={globalStyles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          headerTitle: 'Kundvagn',
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            color: theme.colors.text,
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
        }}
      />
      
      <ScrollView style={globalStyles.container}>
        <View style={styles.container}>
          {items.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>Din kundvagn är tom</Text>
              <Text style={styles.emptyText}>
                Lägg till några läckra rätter från vår meny för att komma igång.
              </Text>
              <Pressable 
                style={styles.continueButton} 
                onPress={handleContinueShopping}
              >
                <Text style={styles.continueButtonText}>Gå till menyn</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <View style={styles.itemsContainer}>
                {items.map((item) => (
                  <View key={item.id} style={styles.cartItem}>
                    <Image 
                      source={{ uri: item.menuItem.image }} 
                      style={styles.itemImage} 
                    />
                    <View style={styles.itemDetails}>
                      <Text style={styles.itemName}>{item.menuItem.name}</Text>
                      <Text style={styles.itemPrice}>{item.menuItem.price} kr</Text>
                      
                      <View style={styles.quantityContainer}>
                        <Pressable 
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus size={16} color={theme.colors.text} />
                        </Pressable>
                        
                        <Text style={styles.quantityText}>{item.quantity}</Text>
                        
                        <Pressable 
                          style={styles.quantityButton}
                          onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus size={16} color={theme.colors.text} />
                        </Pressable>
                        
                        <Pressable 
                          style={styles.removeButton}
                          onPress={() => removeItem(item.id)}
                        >
                          <Trash2 size={16} color={theme.colors.text} />
                        </Pressable>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              
              <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Delsumma</Text>
                  <Text style={styles.summaryValue}>{getTotalPrice()} kr</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Leveransavgift</Text>
                  <Text style={styles.summaryValue}>0 kr</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Totalt</Text>
                  <Text style={styles.totalValue}>{getTotalPrice()} kr</Text>
                </View>
              </View>
              
              <View style={styles.actionsContainer}>
                <Pressable 
                  style={styles.checkoutButton} 
                  onPress={handleCheckout}
                >
                  <Text style={styles.checkoutButtonText}>Gå till kassan</Text>
                </Pressable>
                
                <Pressable 
                  style={styles.continueButton} 
                  onPress={handleContinueShopping}
                >
                  <Text style={styles.continueButtonText}>Fortsätt handla</Text>
                </Pressable>
                
                <Pressable 
                  style={styles.clearButton} 
                  onPress={clearCart}
                >
                  <Text style={styles.clearButtonText}>Töm kundvagn</Text>
                </Pressable>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.subtext,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
  itemsContainer: {
    marginBottom: theme.spacing.xl,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.darkCard || theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: theme.borderRadius.sm,
  },
  itemDetails: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 14,
    color: theme.colors.gold,
    marginBottom: theme.spacing.sm,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  quantityText: {
    fontSize: 16,
    color: theme.colors.text,
    marginHorizontal: theme.spacing.sm,
  },
  removeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginLeft: 'auto',
  },
  summaryContainer: {
    backgroundColor: theme.colors.darkCard || theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  summaryLabel: {
    fontSize: 16,
    color: theme.colors.subtext,
  },
  summaryValue: {
    fontSize: 16,
    color: theme.colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.gold,
  },
  actionsContainer: {
    gap: theme.spacing.md,
  },
  checkoutButton: {
    backgroundColor: theme.colors.gold,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: theme.colors.buttonText || theme.colors.background,
    fontWeight: '600',
    fontSize: 16,
  },
  continueButton: {
    backgroundColor: theme.colors.darkCard || theme.colors.card,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.gold,
  },
  continueButtonText: {
    color: theme.colors.gold,
    fontWeight: '600',
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: 'transparent',
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
  },
  clearButtonText: {
    color: theme.colors.subtext,
    fontSize: 14,
  },
});