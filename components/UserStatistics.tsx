import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '@/constants/theme';
import { Award, Wallet, ShoppingBag, CalendarCheck } from 'lucide-react-native';

interface UserStatisticsProps {
  favoriteItem?: {
    name: string;
    orderCount: number;
  };
  totalSpent: number;
  totalOrders: number;
  totalBookings: number;
}

export default function UserStatistics({
  favoriteItem,
  totalSpent,
  totalOrders,
  totalBookings,
}: UserStatisticsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Min statistik</Text>
      
      <View style={styles.grid}>
        <View style={styles.statItem}>
          <View style={styles.iconContainer}>
            <Award size={24} color={theme.colors.gold} />
          </View>
          <Text style={styles.label}>Favoriträtt</Text>
          <Text style={styles.value} numberOfLines={2}>
            {favoriteItem?.name || 'Ingen data än'}
          </Text>
          {favoriteItem?.orderCount && (
            <Text style={styles.subtext}>
              Beställd {favoriteItem.orderCount} gånger
            </Text>
          )}
        </View>

        <View style={styles.statItem}>
          <View style={styles.iconContainer}>
            <Wallet size={24} color={theme.colors.gold} />
          </View>
          <Text style={styles.label}>Totalt spenderat</Text>
          <Text style={styles.value}>
            {totalSpent > 0 ? `${totalSpent} kr` : '0 kr'}
          </Text>
          <Text style={styles.subtext}>Alla beställningar</Text>
        </View>

        <View style={styles.statItem}>
          <View style={styles.iconContainer}>
            <ShoppingBag size={24} color={theme.colors.gold} />
          </View>
          <Text style={styles.label}>Beställningar</Text>
          <Text style={styles.value}>{totalOrders}</Text>
          <Text style={styles.subtext}>Totalt antal</Text>
        </View>

        <View style={styles.statItem}>
          <View style={styles.iconContainer}>
            <CalendarCheck size={24} color={theme.colors.gold} />
          </View>
          <Text style={styles.label}>Bordsbokningar</Text>
          <Text style={styles.value}>{totalBookings}</Text>
          <Text style={styles.subtext}>Totalt antal</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  statItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: theme.colors.darkCard || 'rgba(0,0,0,0.05)',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    alignItems: 'center',
    minHeight: 120,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.gold + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  label: {
    fontSize: 14,
    color: theme.colors.subtext,
    marginBottom: 4,
    textAlign: 'center',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 2,
  },
  subtext: {
    fontSize: 12,
    color: theme.colors.subtext,
    textAlign: 'center',
  },
});