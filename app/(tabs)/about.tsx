import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { globalStyles } from '@/constants/theme';
import { theme } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import InstagramSection from '@/components/InstagramSection';

export default function AboutScreen() {
  return (
    <SafeAreaView style={globalStyles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          headerTitle: '',
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
          <Text style={styles.headerTitle}>Om Oss</Text>
        </View>
        
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80' }} 
            style={styles.heroImage}
          />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vår Historia</Text>
          <Text style={styles.paragraph}>
            Moi Sushi & Poké Bowl började som en liten sushirestaurang i hjärtat av Trelleborg. Grundad av 
            en passionerad kock med kärlek för japansk matkultur, har vår restaurang vuxit till att bli en 
            älskad kulinarisk destination i staden.
          </Text>
          <Text style={styles.paragraph}>
            Från våra ödmjuka början har vi alltid strävat efter att leverera autentiska smaker med en modern twist. 
            Vår resa har varit fylld av utmaningar och framgångar, men vår passion för att skapa utsökt 
            mat har aldrig vacklat.
          </Text>
          <Text style={styles.paragraph}>
            Idag är vi stolta över att vara en av de främsta sushi- och poké bowl-restaurangerna i Trelleborg, 
            där vi fortsätter att överraska och glädja våra gäster med färska, innovativa rätter.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vår Filosofi</Text>
          <Text style={styles.paragraph}>
            Vi tror på att använda endast de färskaste ingredienserna av högsta kvalitet. Varje rätt tillagas 
            med omsorg och precision, med respekt för traditionella japanska tekniker samtidigt som vi 
            tillför vår egen kreativa touch.
          </Text>
          <Text style={styles.paragraph}>
            Hållbarhet är också en central del av vår filosofi. Vi strävar efter att minimera vårt miljöavtryck 
            genom att använda lokala råvaror när det är möjligt och implementera miljövänliga rutiner i vår verksamhet.
          </Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vårt Team</Text>
          <Text style={styles.paragraph}>
            Bakom varje läcker rätt står vårt dedikerade team av kockar och servicepersonal. Med en gemensam 
            passion för mat och gästfrihet arbetar vi tillsammans för att skapa en minnesvärd upplevelse för 
            varje gäst som besöker oss.
          </Text>
          <Text style={styles.paragraph}>
            Vår kökschef, med över 15 års erfarenhet av japansk matlagning, leder vårt köksteam med precision 
            och kreativitet, medan vår servicepersonal säkerställer att varje besök är både välkomnande och njutbart.
          </Text>
        </View>
        
        <InstagramSection />
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
  },
  imageContainer: {
    width: '100%',
    height: 200,
    marginBottom: theme.spacing.lg,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  section: {
    padding: theme.spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: theme.colors.subtext,
    marginBottom: theme.spacing.md,
  },
});