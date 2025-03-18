import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  Pressable,
  Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { useFavoritesStore } from '@/store/favorites-store';
import { useUserStore } from '@/store/user-store';
import { Heart, Plus, Trash2 } from 'lucide-react-native';
import { useCartStore } from '@/store/cart-store';

export default function FavoritesScreen() {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();
  const { favorites, isLoading, fetchFavorites, removeFavorite } = useFavoritesStore();
  const { addItem } = useCartStore();
  
  useEffect(() => {
    if (isLoggedIn) {
      fetchFavorites();
    }
  }, [isLoggedIn]);
  
  const handleAddToCart = (menuItemId: string) => {
    const favorite = favorites.find(fav => fav.menuItemId === menuItemId);
    if (favorite) {
      addItem(favorite.menuItem);
    }
  };
  
  const handleRemoveFavorite = (menuItemId: string) => {
    removeFavorite(menuItemId);
  };
  
  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <Stack.Screen 
          options={{
            title: 'Favoriter',
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerShadowVisible: false,
          }}
        />
        
        <View style={styles.notLoggedInContainer}>
          <Heart size={60} color={theme.colors.subtext} />
          <Text style={styles.notLoggedInText}>
            Du måste vara inloggad för att se dina favoriter
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
          title: 'Favoriter',
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
      ) : favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Heart size={60} color={theme.colors.subtext} />
          <Text style={styles.emptyText}>
            Du har inga favoriter ännu
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
          data={favorites}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable 
              style={styles.favoriteItem}
              onPress={() => router.push(`/menu/${item.menuItemId}`)}
            >
              <Image 
                source={{ uri: item.menuItem.image }} 
                style={styles.itemImage} 
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.menuItem.name}</Text>
                <Text style={styles.itemPrice}>{item.menuItem.price} kr</Text>
                <Text style={styles.itemDescription} numberOfLines={2}>
                  {item.menuItem.description}
                </Text>
                
                <View style={styles.itemActions}>
                  <Pressable 
                    style={styles.addButton}
                    onPress={() => handleAddToCart(item.menuItemId)}
                  >
                    <Plus size={16} color={theme.colors.background} />
                    <Text style={styles.addButtonText}>Lägg till</Text>
                  </Pressable>
                  
                  <Pressable 
                    style={styles.removeButton}
                    onPress={() => handleRemoveFavorite(item.menuItemId)}
                  >
                    <Trash2 size={16} color={theme.colors.text} />
                  </Pressable>
                </View>
              </View>
            </Pressable>
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
  favoriteItem: {
    flexDirection: 'row',
    backgroundColor: theme.colors.darkCard || theme.colors.card,
    borderRadius: theme.borderRadius.md,
    overflow: 'hidden',
    marginBottom: theme.spacing.md,
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemDetails: {
    flex: 1,
    padding: theme.spacing.md,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: theme.colors.gold,
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    color: theme.colors.subtext,
    marginBottom: theme.spacing.sm,
  },
  itemActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: theme.colors.gold,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.sm,
  },
  addButtonText: {
    color: theme.colors.buttonText || theme.colors.background,
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 4,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});