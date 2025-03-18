import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { theme } from '@/constants/theme';
import { sendContactNotification } from '@/lib/email';
import { MapPin, Phone, Mail, Clock } from 'lucide-react-native';

export default function ContactScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name || !email || !message) {
      Alert.alert('Fel', 'Vänligen fyll i alla obligatoriska fält');
      return;
    }

    setIsSubmitting(true);

    try {
      await sendContactNotification({
        name,
        email,
        message,
      });

      Alert.alert(
        'Meddelande skickat',
        'Tack för ditt meddelande! Vi återkommer till dig så snart som möjligt.',
        [{ text: 'OK', onPress: () => {
          setName('');
          setEmail('');
          setMessage('');
        }}]
      );
    } catch (error) {
      Alert.alert('Fel', 'Ett fel uppstod när ditt meddelande skulle skickas. Försök igen senare.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen
        options={{
          headerTitle: 'Kontakta oss',
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

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.title}>Kontakta oss</Text>
          <Text style={styles.subtitle}>
            Har du frågor eller funderingar? Kontakta oss via formuläret nedan eller använd våra kontaktuppgifter.
          </Text>

          <View style={styles.infoSection}>
            <View style={styles.infoItem}>
              <MapPin size={24} color={theme.colors.gold} />
              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>Adress</Text>
                <Text style={styles.infoContent}>Storgatan 1, 123 45 Stockholm</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Phone size={24} color={theme.colors.gold}/>
              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>Telefon</Text>
                <Text style={styles.infoContent}>08-123 45 67</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Mail size={24} color={theme.colors.gold}/>
              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>E-post</Text>
                <Text style={styles.infoContent}>info@moisushi.se</Text>
              </View>
            </View>

            <View style={styles.infoItem}>
              <Clock size={24} color={theme.colors.gold}/>
              <View style={styles.infoText}>
                <Text style={styles.infoTitle}>Öppettider</Text>
                <Text style={styles.infoContent}>
                  Mån-Fre: 11:00-21:00{'\n'}
                  Lör-Sön: 12:00-22:00
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Namn *</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Ditt namn"
                placeholderTextColor={theme.colors.subtext}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-post *</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Din e-postadress"
                placeholderTextColor={theme.colors.subtext}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Meddelande *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={message}
                onChangeText={setMessage}
                placeholder="Skriv ditt meddelande här"
                placeholderTextColor={theme.colors.subtext}
                multiline
                numberOfLines={6}
                textAlignVertical="top"
              />
            </View>

            <Pressable
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Skickar...' : 'Skicka meddelande'}
              </Text>
            </Pressable>

            <Text style={styles.disclaimer}>
              * Obligatoriska fält
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.subtext,
    marginBottom: theme.spacing.xl,
  },
  infoSection: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  infoText: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  infoContent: {
    fontSize: 14,
    color: theme.colors.subtext,
  },
  form: {
    gap: theme.spacing.md,
  },
  inputContainer: {
    gap: theme.spacing.xs,
  },
  label: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: '500',
  },
  input: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  textArea: {
    minHeight: 120,
    paddingTop: theme.spacing.md,
  },
  submitButton: {
    backgroundColor: theme.colors.gold,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  submitButtonDisabled: {
    opacity: 0.7,
  },
  submitButtonText: {
    color: theme.colors.buttonText || theme.colors.background,
    fontSize: 16,
    fontWeight: '600',
  },
  disclaimer: {
    fontSize: 14,
    color: theme.colors.subtext,
    textAlign: 'center',
    marginTop: theme.spacing.sm,
  },
});