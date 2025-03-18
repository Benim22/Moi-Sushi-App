import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Dimensions
} from 'react-native';
import { X, AlertCircle } from 'lucide-react-native';
import { theme } from '@/constants/theme';
import { MenuItem } from '@/mocks/menu';

interface MenuItemInfoModalProps {
  isVisible: boolean;
  onClose: () => void;
  item: MenuItem | null;
}

const { width } = Dimensions.get('window');

export default function MenuItemInfoModal({ 
  isVisible, 
  onClose, 
  item 
}: MenuItemInfoModalProps) {
  if (!item) return null;

  const hasNutritionalValues = item.nutritionalValues && 
    Object.values(item.nutritionalValues).some(value => value !== undefined);

  const hasAllergens = item.allergens && item.allergens.length > 0;

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color={theme.colors.text} />
          </TouchableOpacity>
          
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <Image 
              source={{ uri: item.image }} 
              style={styles.image} 
              resizeMode="cover"
            />
            
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>{item.price} kr</Text>
              <Text style={styles.description}>{item.description}</Text>
              
              {hasNutritionalValues && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Näringsvärde</Text>
                  <View style={styles.nutritionalGrid}>
                    {item.nutritionalValues?.calories !== undefined && (
                      <View style={styles.nutritionalItem}>
                        <Text style={styles.nutritionalValue}>{item.nutritionalValues.calories}</Text>
                        <Text style={styles.nutritionalLabel}>kcal</Text>
                      </View>
                    )}
                    {item.nutritionalValues?.protein !== undefined && (
                      <View style={styles.nutritionalItem}>
                        <Text style={styles.nutritionalValue}>{item.nutritionalValues.protein}g</Text>
                        <Text style={styles.nutritionalLabel}>Protein</Text>
                      </View>
                    )}
                    {item.nutritionalValues?.carbs !== undefined && (
                      <View style={styles.nutritionalItem}>
                        <Text style={styles.nutritionalValue}>{item.nutritionalValues.carbs}g</Text>
                        <Text style={styles.nutritionalLabel}>Kolhydrater</Text>
                      </View>
                    )}
                    {item.nutritionalValues?.fat !== undefined && (
                      <View style={styles.nutritionalItem}>
                        <Text style={styles.nutritionalValue}>{item.nutritionalValues.fat}g</Text>
                        <Text style={styles.nutritionalLabel}>Fett</Text>
                      </View>
                    )}
                    {item.nutritionalValues?.sugar !== undefined && (
                      <View style={styles.nutritionalItem}>
                        <Text style={styles.nutritionalValue}>{item.nutritionalValues.sugar}g</Text>
                        <Text style={styles.nutritionalLabel}>Socker</Text>
                      </View>
                    )}
                    {item.nutritionalValues?.salt !== undefined && (
                      <View style={styles.nutritionalItem}>
                        <Text style={styles.nutritionalValue}>{item.nutritionalValues.salt}g</Text>
                        <Text style={styles.nutritionalLabel}>Salt</Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
              
              {hasAllergens && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Allergener</Text>
                  <View style={styles.allergensContainer}>
                    <AlertCircle size={20} color={theme.colors.warning || "#f1c40f"} style={styles.allergenIcon} />
                    <Text style={styles.allergensText}>
                      {item.allergens?.join(', ')}
                    </Text>
                  </View>
                </View>
              )}
              
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Kategori</Text>
                <View style={styles.categoryBadge}>
                  <Text style={styles.categoryText}>
                    {item.category === 'moisRolls' ? 'Mois Rolls' : 
                     item.category === 'helfriterade' ? 'Helfriterade Maki' :
                     item.category === 'pokebowls' ? 'Pokébowls' :
                     item.category === 'nigiri' ? 'Nigiri' :
                     item.category === 'combo' ? 'Nigiri Combo' :
                     item.category === 'delikatesser' ? 'Exotiska Delikatesser' :
                     item.category === 'barn' ? 'Barnmenyer' :
                     item.category === 'smatt' ? 'Smått Och Gott' :
                     item.category === 'saser' ? 'Våra Såser' :
                     item.category === 'drycker' ? 'Uppfriskande Drycker' :
                     item.category === 'nigiriPar' ? 'Nigiri i Par' : item.category}
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width * 0.9,
    maxHeight: '80%',
    backgroundColor: theme.colors.background,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
  contentContainer: {
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.gold,
    marginBottom: theme.spacing.md,
  },
  description: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
    marginBottom: theme.spacing.lg,
  },
  section: {
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  nutritionalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.xs,
  },
  nutritionalItem: {
    width: '33.33%',
    paddingHorizontal: theme.spacing.xs,
    marginBottom: theme.spacing.md,
  },
  nutritionalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
  },
  nutritionalLabel: {
    fontSize: 14,
    color: theme.colors.subtext,
    textAlign: 'center',
    marginTop: 4,
  },
  allergensContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
  },
  allergenIcon: {
    marginRight: theme.spacing.sm,
  },
  allergensText: {
    fontSize: 16,
    color: theme.colors.text,
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: theme.colors.gold,
    alignSelf: 'flex-start',
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
  },
  categoryText: {
    color: theme.colors.buttonText || theme.colors.background,
    fontWeight: '600',
    fontSize: 14,
  },
});