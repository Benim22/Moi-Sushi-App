import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  ActivityIndicator,
  Image,
  Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { theme } from '@/constants/theme';
import { useUserStore } from '@/store/user-store';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { supabase } from '@/lib/supabase';

export default function ProfileDetailsScreen() {
  const { profile, updateProfile, isLoading } = useUserStore();
  
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  
  useEffect(() => {
    if (profile) {
      setUserData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
      });
    }
  }, [profile]);
  
  const [uploading, setUploading] = useState(false);
  
  const handleSave = async () => {
    try {
      const { error } = await updateProfile({
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
      });
      
      if (error) throw error;
      
      Alert.alert(
        "Sparat",
        "Dina uppgifter har uppdaterats",
        [{ text: "OK" }]
      );
    } catch (error: any) {
      Alert.alert(
        "Fel",
        error.message || "Kunde inte uppdatera profilen"
      );
    }
  };
  
  const pickImage = async () => {
    if (Platform.OS === 'web') {
      Alert.alert("Inte tillgängligt", "Denna funktion är inte tillgänglig på webben");
      return;
    }
    
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets[0].uri) {
        await uploadImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert("Fel", "Kunde inte välja bild");
    }
  };
  
  const uploadImage = async (uri: string) => {
    if (!profile?.id) return;
    
    try {
      setUploading(true);
      
      // Convert image to blob
      const response = await fetch(uri);
      const blob = await response.blob();
      
      // Upload to Supabase Storage
      const fileExt = uri.split('.').pop();
      const fileName = `${profile.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, blob);
        
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);
        
      // Update profile with new avatar URL
      const { error: updateError } = await updateProfile({
        avatar_url: data.publicUrl,
      });
      
      if (updateError) throw updateError;
      
      Alert.alert("Klart", "Profilbild uppdaterad");
    } catch (error: any) {
      console.error('Error uploading image:', error);
      Alert.alert("Fel", "Kunde inte ladda upp bilden");
    } finally {
      setUploading(false);
    }
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          title: 'Mina Uppgifter',
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerShadowVisible: false,
        }}
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.profileImageSection}>
          <View style={styles.profileImageContainer}>
            {profile?.avatar_url ? (
              <Image 
                source={{ uri: profile.avatar_url }} 
                style={styles.profileImage} 
              />
            ) : (
              <View style={styles.profileImagePlaceholder}>
                <Text style={styles.profileInitial}>
                  {profile?.name ? profile.name[0].toUpperCase() : 'U'}
                </Text>
              </View>
            )}
            
            <TouchableOpacity 
              style={styles.cameraButton}
              onPress={pickImage}
              disabled={uploading}
            >
              {uploading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Camera size={18} color="#fff" />
              )}
            </TouchableOpacity>
          </View>
          
          <Text style={styles.changePhotoText}>Ändra profilbild</Text>
        </View>
        
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Namn</Text>
            <View style={styles.inputWrapper}>
              <User size={20} color={theme.colors.subtext} style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                value={userData.name}
                onChangeText={(text) => setUserData({...userData, name: text})}
                placeholder="Ditt namn"
                placeholderTextColor={theme.colors.subtext}
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-post</Text>
            <View style={styles.inputWrapper}>
              <Mail size={20} color={theme.colors.subtext} style={styles.inputIcon} />
              <TextInput 
                style={[styles.input, styles.disabledInput]}
                value={userData.email}
                editable={false}
                placeholder="Din e-post"
                placeholderTextColor={theme.colors.subtext}
              />
            </View>
            <Text style={styles.helperText}>E-post kan inte ändras</Text>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Telefon</Text>
            <View style={styles.inputWrapper}>
              <Phone size={20} color={theme.colors.subtext} style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                value={userData.phone}
                onChangeText={(text) => setUserData({...userData, phone: text})}
                placeholder="Ditt telefonnummer"
                placeholderTextColor={theme.colors.subtext}
                keyboardType="phone-pad"
              />
            </View>
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Adress</Text>
            <View style={styles.inputWrapper}>
              <MapPin size={20} color={theme.colors.subtext} style={styles.inputIcon} />
              <TextInput 
                style={styles.input}
                value={userData.address}
                onChangeText={(text) => setUserData({...userData, address: text})}
                placeholder="Din leveransadress"
                placeholderTextColor={theme.colors.subtext}
              />
            </View>
          </View>
        </View>
        
        <TouchableOpacity 
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={theme.colors.buttonText || "#fff"} />
          ) : (
            <Text style={styles.saveButtonText}>Spara ändringar</Text>
          )}
        </TouchableOpacity>
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
  profileImageSection: {
    alignItems: 'center',
    marginVertical: theme.spacing.xl,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: theme.spacing.md,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileImagePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInitial: {
    fontSize: 48,
    fontWeight: 'bold',
    color: theme.colors.buttonText || '#fff',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.gold,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: theme.colors.background,
  },
  changePhotoText: {
    fontSize: 16,
    color: theme.colors.gold,
    fontWeight: '600',
  },
  formContainer: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  inputContainer: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.xs,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.darkCard || theme.colors.background,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
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
  disabledInput: {
    color: theme.colors.subtext,
  },
  helperText: {
    fontSize: 12,
    color: theme.colors.subtext,
    marginTop: 4,
    marginLeft: 4,
  },
  saveButton: {
    backgroundColor: theme.colors.gold,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  saveButtonText: {
    color: theme.colors.buttonText || theme.colors.background,
    fontWeight: '600',
    fontSize: 16,
  },
});