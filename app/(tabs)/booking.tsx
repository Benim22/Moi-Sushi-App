import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { theme } from '@/constants/theme';
import { sendBookingNotification } from '@/lib/email';
import { Picker } from '@react-native-picker/picker';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

// Available time slots
const TIME_SLOTS = [
  '17:00', '17:30', 
  '18:00', '18:30', 
  '19:00', '19:30',
  '20:00', '20:30',
  '21:00', '21:30'
];

// Guest options
const GUEST_OPTIONS = Array.from({ length: 10 }, (_, i) => (i + 1).toString());

export default function BookingScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(TIME_SLOTS[0]);
  const [guests, setGuests] = useState('2');
  const [specialRequests, setSpecialRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('sv-SE'); // Returns YYYY-MM-DD format
  };

  const handleSubmit = async () => {
    if (!name || !email || !phone || !date || !time || !guests) {
      Alert.alert('Fel', 'Vänligen fyll i alla obligatoriska fält');
      return;
    }

    setIsSubmitting(true);

    try {
      await sendBookingNotification({
        name,
        email,
        phone,
        date: formatDate(date),
        time,
        guests,
        specialRequests,
      });

      Alert.alert(
        'Bokningsförfrågan mottagen',
        'Tack för din bokning! Vi kommer att kontakta dig för att bekräfta din reservation.',
        [{ text: 'OK', onPress: () => {
          setName('');
          setEmail('');
          setPhone('');
          setDate(new Date());
          setTime(TIME_SLOTS[0]);
          setGuests('2');
          setSpecialRequests('');
        }}]
      );
    } catch (error) {
      Alert.alert('Fel', 'Ett fel uppstod när din bokning skulle skickas. Försök igen senare.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen
        options={{
          headerTitle: 'Boka Bord',
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
          <Text style={styles.title}>Boka ett bord hos oss</Text>
          <Text style={styles.subtitle}>
            Fyll i formuläret nedan för att boka ett bord. Vi kommer att kontakta dig för att bekräfta din reservation.
          </Text>

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
              <Text style={styles.label}>Telefon *</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Ditt telefonnummer"
                placeholderTextColor={theme.colors.subtext}
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Datum *</Text>
              {Platform.OS === 'ios' ? (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  minimumDate={new Date()}
                  style={styles.datePickerIOS}
                />
              ) : (
                <>
                  <Pressable
                    style={styles.input}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text style={styles.dateText}>{formatDate(date)}</Text>
                  </Pressable>
                  {showDatePicker && (
                    <DateTimePicker
                      value={date}
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                      minimumDate={new Date()}
                    />
                  )}
                </>
              )}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Tid *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={time}
                  onValueChange={(itemValue) => setTime(itemValue)}
                  style={styles.picker}
                >
                  {TIME_SLOTS.map((slot) => (
                    <Picker.Item 
                      key={slot} 
                      label={slot} 
                      value={slot}
                      color={theme.colors.text}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Antal gäster *</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={guests}
                  onValueChange={(itemValue) => setGuests(itemValue)}
                  style={styles.picker}
                >
                  {GUEST_OPTIONS.map((num) => (
                    <Picker.Item 
                      key={num} 
                      label={`${num} ${num === '1' ? 'person' : 'personer'}`} 
                      value={num}
                      color={theme.colors.text}
                    />
                  ))}
                </Picker>
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Särskilda önskemål</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={specialRequests}
                onChangeText={setSpecialRequests}
                placeholder="T.ex. allergier eller andra önskemål"
                placeholderTextColor={theme.colors.subtext}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <Pressable
              style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Skickar...' : 'Skicka bokningsförfrågan'}
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
  pickerContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
  picker: {
    backgroundColor: theme.colors.card,
    color: theme.colors.text,
  },
  datePickerIOS: {
    backgroundColor: theme.colors.card,
    width: '100%',
  },
  dateText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  textArea: {
    minHeight: 100,
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