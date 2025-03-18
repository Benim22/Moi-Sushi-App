import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { theme } from '@/constants/theme';
import { useUserStore } from '@/store/user-store';
import { useOrdersStore } from '@/store/orders-store';
import { useRouter } from 'expo-router';
import { 
  User, 
  Settings, 
  ShoppingCart, 
  Heart, 
  Clock, 
  LogOut, 
  ChevronRight,
  Shield
} from 'lucide-react-native';
import UserStatistics from './UserStatistics';

export default function UserMenu() {
  const { user, profile, isLoggedIn, isAdmin, logout } = useUserStore();
  const { statistics } = useOrdersStore();
  const router = useRouter();

  if (!isLoggedIn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mitt konto</Text>
        
        <View style={styles.notLoggedInContainer}>
          <User size={60} color={theme.colors.subtext} />
          <Text style={styles.notLoggedInText}>
            Du är inte inloggad
          </Text>
          <TouchableOpacity 
            style={styles.loginButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.loginButtonText}>Logga in</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  const menuItems = [
    {
      title: 'Mina uppgifter',
      icon: <User size={24} color={theme.colors.text} />,
      onPress: () => router.push('/profile-details'),
    },
    {
      title: 'Inställningar',
      icon: <Settings size={24} color={theme.colors.text} />,
      onPress: () => router.push('/settings'),
    },
    {
      title: 'Kundkorg',
      icon: <ShoppingCart size={24} color={theme.colors.text} />,
      onPress: () => router.push('/cart'),
    },
    {
      title: 'Favoriter',
      icon: <Heart size={24} color={theme.colors.text} />,
      onPress: () => router.push('/favorites'),
    },
    {
      title: 'Orderhistorik',
      icon: <Clock size={24} color={theme.colors.text} />,
      onPress: () => router.push('/order-history'),
    },
  ];

  if (isAdmin) {
    menuItems.push({
      title: 'Admin Panel',
      icon: <Shield size={24} color={theme.colors.gold} />,
      onPress: () => router.push('/admin'),
      isAdmin: true,
    });
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Mitt konto</Text>
      
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          {profile?.avatar_url ? (
            <Image 
              source={{ uri: profile.avatar_url }} 
              style={styles.profileImage} 
            />
          ) : (
            <View style={styles.profileImagePlaceholder}>
              <Text style={styles.profileInitial}>
                {profile?.name ? profile.name[0].toUpperCase() : 'U'}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{profile?.name || 'Användare'}</Text>
          <Text style={styles.profileEmail}>{profile?.email || user?.email}</Text>
        </View>
      </View>

      <UserStatistics 
        favoriteItem={statistics.favoriteItem || undefined}
        totalSpent={statistics.totalSpent}
        totalOrders={statistics.totalOrders}
        totalBookings={0} // This will need to be implemented when you have booking functionality
      />
      
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity 
            key={index}
            style={[
              styles.menuItem, 
              index === menuItems.length - 1 && styles.menuItemLast,
              item.isAdmin && styles.adminMenuItem
            ]}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              {item.icon}
              <Text style={[
                styles.menuItemText,
                item.isAdmin && styles.adminMenuItemText
              ]}>
                {item.title}
              </Text>
            </View>
            <ChevronRight size={20} color={item.isAdmin ? theme.colors.gold : theme.colors.subtext} />
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={async () => {
          await logout();
          router.replace('/');
        }}
      >
        <LogOut size={20} color={theme.colors.error || "#ff3b30"} />
        <Text style={styles.logoutText}>Logga ut</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xl,
  },
  notLoggedInContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    marginVertical: theme.spacing.xl,
  },
  notLoggedInText: {
    fontSize: 18,
    color: theme.colors.text,
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
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  profileImageContainer: {
    marginRight: theme.spacing.lg,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  profileImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: theme.colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.buttonText || '#fff',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: theme.colors.subtext,
  },
  menuContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.xl,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  adminMenuItem: {
    backgroundColor: theme.colors.darkCard || 'rgba(0,0,0,0.05)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
  },
  adminMenuItemText: {
    color: theme.colors.gold,
    fontWeight: '600',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.error || "#ff3b30",
  },
  logoutText: {
    color: theme.colors.error || "#ff3b30",
    fontWeight: '600',
    fontSize: 16,
    marginLeft: theme.spacing.sm,
  },
});