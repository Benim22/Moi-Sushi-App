import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Linking } from 'react-native';
import { globalStyles } from '@/constants/theme';
import { theme } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import LocationSelector from '@/components/LocationSelector';
import DeliveryOptions from '@/components/DeliveryOptions';
import DeliveryServiceCard from '@/components/DeliveryServiceCard';
import CartIcon from '@/components/CartIcon';

export default function OrderScreen() {
  const [selectedLocation, setSelectedLocation] = useState('trelleborg');
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');

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
          <Text style={styles.headerTitle}>Beställ Online</Text>
          <Text style={styles.headerSubtitle}>Välj mellan leverans eller avhämtning</Text>
        </View>

        <View style={styles.locationCard}>
          <Text style={styles.locationTitle}>Plats ändrad till {selectedLocation === 'trelleborg' ? 'Trelleborg' : 'Ystad'}</Text>
          <Text style={styles.locationSubtitle}>
            {selectedLocation === 'ystad' 
              ? 'Endast Pokébowls är tillgängliga på denna plats.' 
              : 'Hela vår meny är tillgänglig på denna plats.'}
          </Text>
        </View>

        <LocationSelector 
          selectedLocation={selectedLocation}
          onSelectLocation={setSelectedLocation}
        />

        <DeliveryOptions 
          deliveryMethod={deliveryMethod}
          onSelectMethod={setDeliveryMethod}
        />

        {deliveryMethod === 'delivery' ? (
          <View style={styles.deliveryServices}>
            <Text style={styles.sectionTitle}>Välj leveranstjänst</Text>
            <Text style={styles.deliveryServicesSubtitle}>
              Vi samarbetar med följande leveranstjänster för att leverera vår mat direkt till din dörr.
            </Text>

            <DeliveryServiceCard 
              name="Uber Eats"
              logo="https://cloud.appwrite.io/v1/storage/buckets/678c0f710007dd361cec/files/67a7365b00396bd1708f/view?project=678bfed4002a8a6174c4"
              time="35-50 min"
              price="45 kr"
              url="https://www.ubereats.com"
            />

            <DeliveryServiceCard 
              name="Wolt"
              logo="https://cloud.appwrite.io/v1/storage/buckets/678c0f710007dd361cec/files/67a7365400237ee66773/view?project=678bfed4002a8a6174c4"
              time="25-40 min"
              price="35 kr"
              url="https://wolt.com"
            />

            <DeliveryServiceCard 
              name="Foodora"
              logo="https://cloud.appwrite.io/v1/storage/buckets/678c0f710007dd361cec/files/67a7365a002c60c2a215/view?project=678bfed4002a8a6174c4"
              time="30-45 min"
              price="39 kr"
              url="https://www.foodora.se"
            />
          </View>
        ) : (
          <View style={styles.pickupInfo}>
            <Text style={styles.sectionTitle}>Avhämtning</Text>
            <Text style={styles.pickupText}>
              Du kan beställa direkt från vår meny och hämta upp din mat i restaurangen. 
              Vi meddelar dig när din beställning är redo för avhämtning.
            </Text>
            
            <View style={styles.pickupCard}>
              <Text style={styles.pickupCardTitle}>Beställ via telefon</Text>
              <Text style={styles.pickupCardText}>
                Du kan även ringa in din beställning direkt till restaurangen.
              </Text>
              <Text style={styles.phoneNumber} onPress={() => Linking.openURL('tel:0410-28110')}>
                0410-28110
              </Text>
            </View>
          </View>
        )}
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
  locationCard: {
    backgroundColor: theme.colors.darkCard || theme.colors.card,
    padding: theme.spacing.lg,
    marginHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.lg,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  locationSubtitle: {
    fontSize: 14,
    color: theme.colors.subtext,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  deliveryServices: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  deliveryServicesSubtitle: {
    fontSize: 14,
    color: theme.colors.subtext,
    marginBottom: theme.spacing.lg,
  },
  pickupInfo: {
    paddingHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  pickupText: {
    fontSize: 16,
    color: theme.colors.subtext,
    marginBottom: theme.spacing.lg,
    lineHeight: 24,
  },
  pickupCard: {
    backgroundColor: theme.colors.darkCard || theme.colors.card,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
  },
  pickupCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  pickupCardText: {
    fontSize: 14,
    color: theme.colors.subtext,
    marginBottom: theme.spacing.md,
  },
  phoneNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.gold,
    textAlign: 'center',
  },
});