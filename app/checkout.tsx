import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { globalStyles } from '@/constants/theme';
import { theme } from '@/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { useCartStore } from '@/store/cart-store';
import { useUserStore } from '@/store/user-store';
import { useOrdersStore } from '@/store/orders-store';
import { CreditCard, Smartphone, CashIcon, DollarSign } from 'lucide-react-native';

export default function CheckoutScreen() {
  const { items, getTotalPrice } = useCartStore();
  const { user, profile, isLoggedIn } = useUserStore();
  const { placeOrder, isLoading } = useOrdersStore();
  const router = useRouter();
  
  const [paymentMethod, setPaymentMethod] = useState<'restaurant'>('restaurant');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
      setPhone(profile.phone || '');
      setAddress(profile.address || '');
    } else if (user) {
      setEmail(user.email || '');
    }
  }, [profile, user]);
  
  const handlePlaceOrder = async () => {
    if (!name || !email || !phone || !address) {
      Alert.alert('Fel', 'Vänligen fyll i alla obligatoriska fält');
      return;
    }
    
    if (items.length === 0) {
      Alert.alert('Fel', 'Din kundvagn är tom');
      return;
    }
    
    const { success, error } = await placeOrder(address, phone, email, name);
    
    if (success) {
      Alert.alert(
        'Beställning mottagen', 
        'Tack för din beställning! Vi har skickat en bekräftelse till din e-post.',
        [
          { 
            text: 'OK', 
            onPress: () => {
              router.push('/order-history');
            } 
          }
        ]
      );
    } else {
      Alert.alert(
        'Fel',
        error?.message || 'Ett fel uppstod när din beställning skulle läggas'
      );
    }
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <SafeAreaView style={globalStyles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          headerTitle: 'Kassa',
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
      
      <ScrollView style={globalStyles.container}>
        <View style={styles.container}>
          {!isLoggedIn && (
            <View style={styles.loginPrompt}>
              <Text style={styles.loginPromptText}>
                Har du ett konto? Logga in för att förenkla din beställning.
              </Text>
              <Pressable style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Logga in</Text>
              </Pressable>
            </View>
          )}
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Leveransinformation</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Namn</Text>
              <TextInput
                style={styles.input}
                placeholder="Ditt namn"
                placeholderTextColor={theme.colors.subtext}
                value={name}
                onChangeText={setName}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>E-post</Text>
              <TextInput
                style={styles.input}
                placeholder="Din e-postadress"
                placeholderTextColor={theme.colors.subtext}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Telefon</Text>
              <TextInput
                style={styles.input}
                placeholder="Ditt telefonnummer"
                placeholderTextColor={theme.colors.subtext}
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />
            </View>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Leveransadress</Text>
              <TextInput
                style={styles.input}
                placeholder="Din leveransadress"
                placeholderTextColor={theme.colors.subtext}
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Betalningsmetod</Text>
            
            <Pressable 
              style={[
                styles.paymentOption,
                paymentMethod === 'restaurant' && styles.selectedPaymentOption
              ]}
              onPress={() => setPaymentMethod('restaurant')}
            >
              <DollarSign size={24} color={theme.colors.text} />
              <View style={styles.paymentOptionContent}>
                <Text style={styles.paymentOptionTitle}>Betala i restaurangen</Text>
                <Text style={styles.paymentOptionDescription}>
                  Betala när du hämtar din beställning i restaurangen
                </Text>
              </View>
              <View style={[
                styles.radioButton,
                paymentMethod === 'restaurant' && styles.radioButtonSelected
              ]}>
                {paymentMethod === 'restaurant' && <View style={styles.radioButtonInner} />}
              </View>
            </Pressable>
            
            <View style={styles.disabledPaymentContainer}>
              <View style={styles.disabledPaymentOption}>
                <Smartphone size={24} color={theme.colors.subtext} />
                <View style={styles.paymentOptionContent}>
                  <Text style={styles.disabledPaymentTitle}>Swish</Text>
                  <Text style={styles.disabledPaymentDescription}>
                    Inte tillgängligt för tillfället
                  </Text>
                </View>
                <View style={styles.disabledRadioButton} />
              </View>
              
              <View style={styles.disabledPaymentOption}>
                <CreditCard size={24} color={theme.colors.subtext} />
                <View style={styles.paymentOptionContent}>
                  <Text style={styles.disabledPaymentTitle}>Kort</Text>
                  <Text style={styles.disabledPaymentDescription}>
                    Inte tillgängligt för tillfället
                  </Text>
                </View>
                <View style={styles.disabledRadioButton} />
              </View>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Din beställning</Text>
            
            <View style={styles.orderSummary}>
              {items.map((item) => (
                <View key={item.id} style={styles.orderItem}>
                  <Text style={styles.orderItemQuantity}>{item.quantity}x</Text>
                  <Text style={styles.orderItemName}>{item.menuItem.name}</Text>
                  <Text style={styles.orderItemPrice}>
                    {item.menuItem.price * item.quantity} kr
                  </Text>
                </View>
              ))}
              
              <View style={styles.divider} />
              
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delsumma</Text>
                <Text style={styles.summaryValue}>{getTotalPrice()} kr</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Leveransavgift</Text>
                <Text style={styles.summaryValue}>0 kr</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>Totalt</Text>
                <Text style={styles.totalValue}>{getTotalPrice()} kr</Text>
              </View>
            </View>
          </View>
          
          <Pressable 
            style={[
              styles.placeOrderButton,
              isLoading && styles.disabledButton
            ]} 
            onPress={handlePlaceOrder}
            disabled={isLoading}
          >
            <Text style={styles.placeOrderButtonText}>
              {isLoading ? 'Bearbetar...' : 'Lägg beställning'}
            </Text>
          </Pressable>
          
          <Text style={styles.disclaimer}>
            Genom att lägga din beställning godkänner du våra köpvillkor och integritetspolicy.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  loginPrompt: {
    backgroundColor: theme.colors.darkCard || theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loginPromptText: {
    fontSize: 14,
    color: theme.colors.text,
    flex: 1,
    marginRight: theme.spacing.md,
  },
  loginButton: {
    backgroundColor: theme.colors.gold,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
  },
  loginButtonText: {
    color: theme.colors.buttonText || theme.colors.background,
    fontWeight: '600',
  },
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.lg,
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  label: {
    fontSize: 16,
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.darkCard || theme.colors.card,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    color: theme.colors.text,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.darkCard || theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedPaymentOption: {
    borderColor: theme.colors.gold,
  },
  paymentOptionContent: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  paymentOptionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 2,
  },
  paymentOptionDescription: {
    fontSize: 14,
    color: theme.colors.subtext,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: theme.colors.gold,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.colors.gold,
  },
  disabledPaymentContainer: {
    opacity: 0.7,
  },
  disabledPaymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.darkCard || theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  disabledPaymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.subtext,
    marginBottom: 2,
  },
  disabledPaymentDescription: {
    fontSize: 14,
    color: theme.colors.subtext,
  },
  disabledRadioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  orderSummary: {
    backgroundColor: theme.colors.darkCard || theme.colors.card,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
  },
  orderItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  orderItemQuantity: {
    width: 30,
    fontSize: 14,
    color: theme.colors.subtext,
  },
  orderItemName: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
  },
  orderItemPrice: {
    fontSize: 14,
    color: theme.colors.text,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.sm,
  },
  summaryLabel: {
    fontSize: 14,
    color: theme.colors.subtext,
  },
  summaryValue: {
    fontSize: 14,
    color: theme.colors.text,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.gold,
  },
  placeOrderButton: {
    backgroundColor: theme.colors.gold,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  disabledButton: {
    opacity: 0.7,
  },
  placeOrderButtonText: {
    color: theme.colors.buttonText || theme.colors.background,
    fontWeight: '600',
    fontSize: 16,
  },
  disclaimer: {
    fontSize: 12,
    color: theme.colors.subtext,
    textAlign: 'center',
    marginBottom: theme.spacing.xl,
  },
});