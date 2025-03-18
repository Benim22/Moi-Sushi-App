import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/useAuth';

export default function RootLayout() {
  // Initialize auth listener
  useAuth();

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ presentation: 'modal' }} />
        <Stack.Screen name="cart" options={{ headerShown: true, title: 'Kundkorg' }} />
        <Stack.Screen name="checkout" options={{ headerShown: true, title: 'Kassa' }} />
        <Stack.Screen name="settings" options={{ headerShown: true, title: 'Inställningar' }} />
        <Stack.Screen name="admin" options={{ headerShown: true, title: 'Admin' }} />
      </Stack>
    </SafeAreaProvider>
  );
}