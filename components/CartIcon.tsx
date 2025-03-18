import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ShoppingBag } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { useCartStore } from '@/store/cart-store';
import { useRouter } from 'expo-router';

export default function CartIcon() {
  const totalItems = useCartStore(state => state.getTotalItems());
  const router = useRouter();

  const handlePress = () => {
    router.push('/cart');
  };

  if (totalItems === 0) {
    return null;
  }

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <ShoppingBag size={24} color={theme.colors.text} />
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{totalItems}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: theme.spacing.md,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: theme.colors.gold,
    borderRadius: 12,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: theme.colors.buttonText || theme.colors.background,
    fontSize: 10,
    fontWeight: 'bold',
  },
});