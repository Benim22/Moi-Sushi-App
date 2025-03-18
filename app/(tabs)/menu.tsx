import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native';
import { globalStyles } from '@/constants/theme';
import MenuCard from '@/components/MenuCard';
import { menuItems, categories } from '@/mocks/menu';
import { theme } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryFilter from '@/components/CategoryFilter';
import { Stack } from 'expo-router';
import CartIcon from '@/components/CartIcon';

export default function MenuScreen() {
  const [selectedCategory, setSelectedCategory] = useState('moisRolls');
  const [filteredItems, setFilteredItems] = useState(menuItems.filter(item => item.category === 'moisRolls'));

  useEffect(() => {
    setFilteredItems(menuItems.filter(item => item.category === selectedCategory));
  }, [selectedCategory]);

  return (
    <SafeAreaView style={globalStyles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          headerTitle: '',
          headerRight: () => <CartIcon />,
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerShadowVisible: false,
        }}
      />
      
      <ScrollView style={globalStyles.container}>
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://cloud.appwrite.io/v1/storage/buckets/678c0f710007dd361cec/files/67ccd62d00368913f38e/view?project=678bfed4002a8a6174c4' }} 
            style={styles.logoImage}
          />
          <Text style={styles.headerTitle}>Vår Meny</Text>
          <Text style={styles.headerSubtitle}>Förnyad och förbättrad</Text>
        </View>

        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        
        <View style={styles.menuContainer}>
          {filteredItems.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  logoImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: theme.spacing.md,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  headerSubtitle: {
    fontSize: 16,
    color: theme.colors.subtext,
  },
  menuContainer: {
    padding: theme.spacing.lg,
  },
});