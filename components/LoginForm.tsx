import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  Pressable, 
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  Platform
} from 'react-native';
import { theme } from '@/constants/theme';
import { useUserStore } from '@/store/user-store';
import { useRouter } from 'expo-router';
import { Mail, Lock, User, LogIn, UserPlus, AlertCircle, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as WebBrowser from 'expo-web-browser';
import { supabase } from '@/lib/supabase';

WebBrowser.maybeCompleteAuthSession();

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  const { login, signUp, loginWithGoogle, isLoading } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    // Reset errors when switching modes
    setErrors({});
  }, [isLogin]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!email) newErrors.email = 'E-post krävs';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Ogiltig e-postadress';
    
    if (!password) newErrors.password = 'Lösenord krävs';
    else if (password.length < 6) newErrors.password = 'Lösenord måste vara minst 6 tecken';
    
    if (!isLogin && !name) newErrors.name = 'Namn krävs';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    try {
      if (isLogin) {
        const { error } = await login(email, password);
        if (error) throw error;
        router.back();
      } else {
        const { error, user } = await signUp(email, password, name);
        if (error) throw error;
        
        if (user) {
          Alert.alert(
            "Konto skapat",
            "Ditt konto har skapats! Kontrollera din e-post för verifieringslänk.",
            [{ text: "OK" }]
          );
          setIsLogin(true);
        }
      }
    } catch (error: any) {
      console.error('Auth error:', error);
      Alert.alert(
        "Fel",
        error.message || "Ett fel uppstod vid inloggning/registrering"
      );
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error: any) {
      console.error('Google login error:', error);
      Alert.alert("Fel", "Kunde inte logga in med Google");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{isLogin ? 'Logga in' : 'Skapa konto'}</Text>
        <TouchableOpacity 
          style={styles.closeButton}
          onPress={() => router.back()}
        >
          <X size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.formContainer}>
        {!isLogin && (
          <View style={styles.inputContainer}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>Namn</Text>
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>
            <View style={[styles.inputWrapper, errors.name ? styles.inputError : null]}>
              <User size={20} color={theme.colors.subtext} style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                placeholder="Ditt namn"
                placeholderTextColor={theme.colors.subtext}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>
        )}
        
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>E-post</Text>
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>
          <View style={[styles.inputWrapper, errors.email ? styles.inputError : null]}>
            <Mail size={20} color={theme.colors.subtext} style={styles.inputIcon} />
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
        </View>
        
        <View style={styles.inputContainer}>
          <View style={styles.labelContainer}>
            <Text style={styles.label}>Lösenord</Text>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
          </View>
          <View style={[styles.inputWrapper, errors.password ? styles.inputError : null]}>
            <Lock size={20} color={theme.colors.subtext} style={styles.inputIcon} />
            <TextInput 
              style={styles.input}
              placeholder="Ditt lösenord"
              placeholderTextColor={theme.colors.subtext}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>
        
        {isLogin && (
          <Pressable style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Glömt lösenord?</Text>
          </Pressable>
        )}
        
        <TouchableOpacity 
          style={styles.submitButton} 
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.colors.buttonText || "#fff"} />
          ) : (
            <View style={styles.buttonContent}>
              {isLogin ? (
                <LogIn size={20} color={theme.colors.buttonText || "#fff"} />
              ) : (
                <UserPlus size={20} color={theme.colors.buttonText || "#fff"} />
              )}
              <Text style={styles.submitButtonText}>
                {isLogin ? 'Logga in' : 'Skapa konto'}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>eller</Text>
          <View style={styles.dividerLine} />
        </View>
        
        <TouchableOpacity 
          style={styles.googleButton}
          onPress={handleGoogleLogin}
        >
          <View style={styles.googleIconContainer}>
            <Text style={styles.googleIcon}>G</Text>
          </View>
          <Text style={styles.googleButtonText}>
            {isLogin ? 'Logga in med Google' : 'Registrera med Google'}
          </Text>
        </TouchableOpacity>
        
        <Pressable 
          style={styles.switchMode} 
          onPress={() => setIsLogin(!isLogin)}
        >
          <Text style={styles.switchModeText}>
            {isLogin 
              ? 'Har du inget konto? Skapa ett här' 
              : 'Har du redan ett konto? Logga in här'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 450,
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.md,
    top: theme.spacing.md,
    padding: 5,
  },
  formContainer: {
    padding: theme.spacing.xl,
  },
  inputContainer: {
    marginBottom: theme.spacing.lg,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
  },
  errorText: {
    fontSize: 12,
    color: theme.colors.error || '#ff3b30',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.darkCard || theme.colors.background,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  inputError: {
    borderColor: theme.colors.error || '#ff3b30',
  },
  inputIcon: {
    marginLeft: theme.spacing.md,
  },
  input: {
    flex: 1,
    padding: theme.spacing.md,
    color: theme.colors.text,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.xl,
  },
  forgotPasswordText: {
    color: theme.colors.gold,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: theme.colors.gold,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: theme.colors.buttonText || theme.colors.background,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: theme.spacing.sm,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: theme.spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  dividerText: {
    color: theme.colors.subtext,
    paddingHorizontal: theme.spacing.md,
    fontSize: 14,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  googleIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
  },
  googleIcon: {
    color: '#4285F4',
    fontWeight: 'bold',
    fontSize: 16,
  },
  googleButtonText: {
    color: theme.colors.text,
    fontWeight: '600',
    fontSize: 16,
  },
  switchMode: {
    alignItems: 'center',
  },
  switchModeText: {
    color: theme.colors.gold,
    fontWeight: '600',
  },
});