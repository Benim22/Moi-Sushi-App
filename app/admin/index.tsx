import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator,
  TextInput
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { useUserStore } from '@/store/user-store';
import { supabase } from '@/lib/supabase';
import { 
  Users, 
  ShoppingBag, 
  Settings, 
  Edit, 
  Trash, 
  Plus,
  Search,
  Filter
} from 'lucide-react-native';

export default function AdminScreen() {
  const { isAdmin, isLoggedIn } = useUserStore();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('menu');
  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!isLoggedIn || !isAdmin) {
      Alert.alert(
        "Åtkomst nekad",
        "Du har inte behörighet att se denna sida",
        [
          { text: "OK", onPress: () => router.replace('/') }
        ]
      );
    } else {
      // Load menu items
      fetchMenuItems();
    }
  }, [isLoggedIn, isAdmin]);

  const fetchMenuItems = async () => {
    setLoading(true);
    try {
      // In a real app, this would fetch from Supabase
      // For now, we'll use mock data
      const mockMenuItems = [
        { id: 1, name: 'California Roll', price: '109,00 kr', category: 'Mois Rolls', popular: true },
        { id: 2, name: 'Salmon Roll', price: '115,00 kr', category: 'Mois Rolls', popular: false },
        { id: 3, name: 'Shrimp Roll', price: '129,00 kr', category: 'Mois Rolls', popular: true },
        { id: 4, name: 'Veggo Roll', price: '109,00 kr', category: 'Mois Rolls', popular: false },
        { id: 5, name: 'Spicy Beef', price: '135,00 kr', category: 'Mois Pokebowls', popular: true },
      ];
      
      // Simulate network delay
      setTimeout(() => {
        setMenuItems(mockMenuItems);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setLoading(false);
      Alert.alert('Fel', 'Kunde inte hämta menyn');
    }
  };

  const handleDeleteItem = (id) => {
    Alert.alert(
      "Radera menyobjekt",
      "Är du säker på att du vill radera detta menyobjekt?",
      [
        { text: "Avbryt", style: "cancel" },
        { 
          text: "Radera", 
          style: "destructive",
          onPress: () => {
            // In a real app, this would delete from Supabase
            setMenuItems(menuItems.filter(item => item.id !== id));
            Alert.alert("Raderat", "Menyobjektet har raderats");
          }
        }
      ]
    );
  };

  const handleEditItem = (id) => {
    // In a real app, this would navigate to an edit form
    router.push(`/admin/edit-item?id=${id}`);
  };

  const filteredMenuItems = menuItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.gold} />
          <Text style={styles.loadingText}>Laddar...</Text>
        </View>
      );
    }

    switch (activeTab) {
      case 'menu':
        return (
          <View style={styles.contentContainer}>
            <View style={styles.searchContainer}>
              <View style={styles.searchInputContainer}>
                <Search size={20} color={theme.colors.subtext} style={styles.searchIcon} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Sök i menyn..."
                  placeholderTextColor={theme.colors.subtext}
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>
              <TouchableOpacity style={styles.filterButton}>
                <Filter size={20} color={theme.colors.text} />
              </TouchableOpacity>
            </View>
            
            <View style={styles.headerRow}>
              <Text style={[styles.headerCell, { flex: 2 }]}>Namn</Text>
              <Text style={[styles.headerCell, { flex: 1 }]}>Pris</Text>
              <Text style={[styles.headerCell, { flex: 1.5 }]}>Kategori</Text>
              <Text style={[styles.headerCell, { flex: 1 }]}>Åtgärder</Text>
            </View>
            
            {filteredMenuItems.length === 0 ? (
              <Text style={styles.emptyText}>Inga menyobjekt hittades</Text>
            ) : (
              filteredMenuItems.map((item) => (
                <View key={item.id} style={styles.menuItemRow}>
                  <View style={[styles.menuItemCell, { flex: 2 }]}>
                    <Text style={styles.menuItemName}>{item.name}</Text>
                    {item.popular && (
                      <View style={styles.popularBadge}>
                        <Text style={styles.popularText}>Populär</Text>
                      </View>
                    )}
                  </View>
                  <Text style={[styles.menuItemCell, { flex: 1 }]}>{item.price}</Text>
                  <Text style={[styles.menuItemCell, { flex: 1.5 }]}>{item.category}</Text>
                  <View style={[styles.menuItemCell, { flex: 1, flexDirection: 'row' }]}>
                    <TouchableOpacity 
                      style={styles.actionButton}
                      onPress={() => handleEditItem(item.id)}
                    >
                      <Edit size={18} color={theme.colors.text} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      style={[styles.actionButton, styles.deleteButton]}
                      onPress={() => handleDeleteItem(item.id)}
                    >
                      <Trash size={18} color={theme.colors.error || "#ff3b30"} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
            
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => router.push('/admin/add-item')}
            >
              <Plus size={20} color="#fff" />
              <Text style={styles.addButtonText}>Lägg till ny</Text>
            </TouchableOpacity>
          </View>
        );
      case 'users':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.comingSoonText}>Användarhantering kommer snart</Text>
          </View>
        );
      case 'orders':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.comingSoonText}>Orderhantering kommer snart</Text>
          </View>
        );
      case 'settings':
        return (
          <View style={styles.contentContainer}>
            <Text style={styles.comingSoonText}>Inställningar kommer snart</Text>
          </View>
        );
      default:
        return null;
    }
  };

  if (!isLoggedIn || !isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          title: 'Admin Panel',
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerShadowVisible: false,
        }}
      />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'menu' && styles.activeTab]}
          onPress={() => setActiveTab('menu')}
        >
          <ShoppingBag 
            size={24} 
            color={activeTab === 'menu' ? theme.colors.gold : theme.colors.text} 
          />
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'menu' && styles.activeTabText
            ]}
          >
            Meny
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'users' && styles.activeTab]}
          onPress={() => setActiveTab('users')}
        >
          <Users 
            size={24} 
            color={activeTab === 'users' ? theme.colors.gold : theme.colors.text} 
          />
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'users' && styles.activeTabText
            ]}
          >
            Användare
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'orders' && styles.activeTab]}
          onPress={() => setActiveTab('orders')}
        >
          <ShoppingBag 
            size={24} 
            color={activeTab === 'orders' ? theme.colors.gold : theme.colors.text} 
          />
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'orders' && styles.activeTabText
            ]}
          >
            Ordrar
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'settings' && styles.activeTab]}
          onPress={() => setActiveTab('settings')}
        >
          <Settings 
            size={24} 
            color={activeTab === 'settings' ? theme.colors.gold : theme.colors.text} 
          />
          <Text 
            style={[
              styles.tabText, 
              activeTab === 'settings' && styles.activeTabText
            ]}
          >
            Inställningar
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {renderContent()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    margin: theme.spacing.md,
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.md,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.gold,
  },
  tabText: {
    fontSize: 12,
    color: theme.colors.text,
    marginTop: 4,
  },
  activeTabText: {
    color: theme.colors.gold,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: theme.spacing.md,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
  },
  searchIcon: {
    marginLeft: theme.spacing.md,
  },
  searchInput: {
    flex: 1,
    padding: theme.spacing.md,
    color: theme.colors.text,
  },
  filterButton: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  headerCell: {
    fontWeight: 'bold',
    color: theme.colors.text,
    fontSize: 14,
  },
  menuItemRow: {
    flexDirection: 'row',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  menuItemCell: {
    padding: theme.spacing.xs,
    justifyContent: 'center',
  },
  menuItemName: {
    fontWeight: '500',
    color: theme.colors.text,
    fontSize: 14,
  },
  popularBadge: {
    backgroundColor: theme.colors.gold,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  popularText: {
    color: theme.colors.buttonText || '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  actionButton: {
    padding: 6,
    marginRight: 6,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.darkCard || 'rgba(0,0,0,0.05)',
  },
  deleteButton: {
    backgroundColor: 'rgba(255,59,48,0.1)',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.gold,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
  },
  addButtonText: {
    color: theme.colors.buttonText || '#fff',
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },
  emptyText: {
    textAlign: 'center',
    color: theme.colors.subtext,
    padding: theme.spacing.xl,
  },
  comingSoonText: {
    textAlign: 'center',
    fontSize: 18,
    color: theme.colors.text,
    padding: theme.spacing.xl,
  },
});