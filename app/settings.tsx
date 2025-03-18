import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { theme } from '@/constants/theme';
import { Bell, Moon, Globe, Shield, Trash2, LogOut } from 'lucide-react-native';
import { useUserStore } from '@/store/user-store';
import { useSettingsStore } from '@/store/settings-store';

export default function SettingsScreen() {
  const router = useRouter();
  const { logout, isAdmin } = useUserStore();
  const { 
    notifications, 
    darkMode, 
    language, 
    toggleNotifications, 
    toggleDarkMode, 
    setLanguage 
  } = useSettingsStore();
  
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  
  const languages = [
    { code: 'sv', name: 'Svenska' },
    { code: 'en', name: 'English' },
    { code: 'fi', name: 'Suomi' }
  ];
  
  const handleLogout = async () => {
    Alert.alert(
      "Logga ut",
      "Är du säker på att du vill logga ut?",
      [
        {
          text: "Avbryt",
          style: "cancel"
        },
        {
          text: "Logga ut",
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace('/');
          }
        }
      ]
    );
  };
  
  const handleDeleteAccount = () => {
    Alert.alert(
      "Radera konto",
      "Är du säker på att du vill radera ditt konto? Denna åtgärd kan inte ångras.",
      [
        {
          text: "Avbryt",
          style: "cancel"
        },
        {
          text: "Radera",
          style: "destructive",
          onPress: () => {
            Alert.alert(
              "Kontot raderat",
              "Ditt konto har raderats. Du kommer nu att loggas ut.",
              [
                {
                  text: "OK",
                  onPress: async () => {
                    await logout();
                    router.replace('/');
                  }
                }
              ]
            );
          }
        }
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          title: 'Inställningar',
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerShadowVisible: false,
        }}
      />
      
      <ScrollView style={styles.scrollView}>
        <Text style={styles.sectionTitle}>Preferenser</Text>
        
        <View style={styles.preferencesContainer}>
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Bell size={24} color={theme.colors.text} />
              <Text style={styles.preferenceText}>Notifikationer</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={toggleNotifications}
              trackColor={{ false: theme.colors.border, true: theme.colors.gold }}
              thumbColor="#fff"
            />
          </View>
          
          <View style={styles.preferenceItem}>
            <View style={styles.preferenceLeft}>
              <Moon size={24} color={theme.colors.text} />
              <Text style={styles.preferenceText}>Mörkt läge</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={toggleDarkMode}
              trackColor={{ false: theme.colors.border, true: theme.colors.gold }}
              thumbColor="#fff"
            />
          </View>
          
          <TouchableOpacity 
            style={styles.preferenceItem}
            onPress={() => setShowLanguageOptions(!showLanguageOptions)}
          >
            <View style={styles.preferenceLeft}>
              <Globe size={24} color={theme.colors.text} />
              <Text style={styles.preferenceText}>Språk</Text>
            </View>
            <View style={styles.preferenceRight}>
              <Text style={styles.preferenceValue}>{language}</Text>
            </View>
          </TouchableOpacity>
          
          {showLanguageOptions && (
            <View style={styles.languageOptions}>
              {languages.map((lang) => (
                <TouchableOpacity
                  key={lang.code}
                  style={[
                    styles.languageOption,
                    language === lang.name && styles.selectedLanguageOption
                  ]}
                  onPress={() => {
                    setLanguage(lang.name);
                    setShowLanguageOptions(false);
                  }}
                >
                  <Text style={[
                    styles.languageOptionText,
                    language === lang.name && styles.selectedLanguageOptionText
                  ]}>
                    {lang.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
          
          {isAdmin && (
            <TouchableOpacity 
              style={styles.preferenceItem}
              onPress={() => router.push('/admin')}
            >
              <View style={styles.preferenceLeft}>
                <Shield size={24} color={theme.colors.gold} />
                <Text style={[styles.preferenceText, { color: theme.colors.gold }]}>
                  Admin Panel
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        
        <Text style={styles.sectionTitle}>Konto</Text>
        
        <View style={styles.accountContainer}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <LogOut size={20} color={theme.colors.error || "#ff3b30"} />
            <Text style={styles.logoutText}>Logga ut</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.deleteAccountButton}
            onPress={handleDeleteAccount}
          >
            <Trash2 size={20} color={theme.colors.error || "#ff3b30"} />
            <Text style={styles.deleteAccountText}>Radera konto</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.aboutContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
          <Text style={styles.copyrightText}>© 2023 Moi Sushi & Poké Bowl</Text>
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
    padding: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
  preferencesContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.xl,
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  preferenceLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  preferenceText: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: theme.spacing.md,
  },
  preferenceRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  preferenceValue: {
    fontSize: 16,
    color: theme.colors.subtext,
    marginRight: theme.spacing.sm,
  },
  languageOptions: {
    padding: theme.spacing.md,
    backgroundColor: theme.colors.darkCard || theme.colors.background,
  },
  languageOption: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    marginBottom: theme.spacing.xs,
  },
  selectedLanguageOption: {
    backgroundColor: theme.colors.gold + '33', // Adding transparency
  },
  languageOptionText: {
    fontSize: 16,
    color: theme.colors.text,
  },
  selectedLanguageOptionText: {
    color: theme.colors.gold,
    fontWeight: '600',
  },
  accountContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    marginBottom: theme.spacing.xl,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  logoutText: {
    fontSize: 16,
    color: theme.colors.error || "#ff3b30",
    marginLeft: theme.spacing.md,
  },
  deleteAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  deleteAccountText: {
    fontSize: 16,
    color: theme.colors.error || "#ff3b30",
    marginLeft: theme.spacing.md,
  },
  aboutContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
  },
  versionText: {
    fontSize: 14,
    color: theme.colors.subtext,
    marginBottom: theme.spacing.sm,
  },
  copyrightText: {
    fontSize: 12,
    color: theme.colors.subtext,
  },
});