import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider, useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import './i18n';
import CustomAppBar from './src/components/common/CustomAppBar';
import { consumerScreens, providerScreens, authScreens } from './screenConfig.js';
import { AuthProvider, useAuth } from './src/context/AuthContext';

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const { t } = useTranslation();
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <ActivityIndicator />;
  }

  const screenConfig = user?.role === 'provider' ? providerScreens : consumerScreens;

  return (
    <Stack.Navigator initialRouteName={user ? 'Dashboard' : 'Login'}>
      {!user && authScreens.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{ headerShown: false }}
        />
      ))}
      {user && screenConfig.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={({ navigation }) => ({
            header: (props) => (
              <CustomAppBar
                screen={screen.name.toLowerCase()}
                {...props}
              />
            ),
            title: t(screen.titleKey || screen.name.toLowerCase())
          })}
        />
      ))}
    </Stack.Navigator>
  );
};

const App = () => {
  const { i18n } = useTranslation();

  return (
    <AuthProvider>
      <Provider theme={{
        dark: false
      }}
        settings={{
          theme: 'light',
        }}
      >
        <I18nextProvider i18n={i18n}>
          <SafeAreaProvider>
            <NavigationContainer>
              <AppContent />
            </NavigationContainer>
            <Toast />
          </SafeAreaProvider>
        </I18nextProvider>
      </Provider>
    </AuthProvider>
  );
};

export default App;