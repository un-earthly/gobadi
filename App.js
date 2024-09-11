import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { I18nextProvider, useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Toast from 'react-native-toast-message';

import './i18n';
import { loginUrl } from './src/api/routes';
import CustomAppBar from './src/components/common/CustomAppBar';
import { consumerScreens, providerScreens, authScreens } from './screenConfig.js';

const Stack = createNativeStackNavigator();

const App = () => {
  const { i18n, t } = useTranslation();
  const [role, setRole] = useState(null);
  const [initialRoute, setInitialRoute] = useState('Login');
  const [isLoading, setIsLoading] = useState(true);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const loadUserData = useCallback(async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        if (parsedUserData.token) {
          setRole(parsedUserData.role);
          setInitialRoute('Dashboard');
        } else {
          setRole(null);
          setInitialRoute('Login');
        }
      } else {
        setRole(null);
        setInitialRoute('Login');
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
      setRole(null);
      setInitialRoute('Login');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUserData();
  }, [loadUserData]);

  const handleLogin = async (navigation) => {
    setIsLoading(true);
    try {
      const response = await axios.post(loginUrl, { mobile: phone, password });
      await AsyncStorage.setItem("userData", JSON.stringify(response.data));
      setIsLoading(false);
      navigation.navigate("Dashboard");
      Toast.show({
        type: 'success',
        text1: t("login_success"),
        text2: t("welcome_back")
      });
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: 'error',
        text1: t("login_error"),
        text2: error.response?.data?.message || t("something_went_wrong")
      });
      console.error("Login error", error);
    }
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const screenConfig = role === 'provider' ? providerScreens : consumerScreens;

  return (
    <Provider>
      <I18nextProvider i18n={i18n}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
              {authScreens.map(screen => (
                <Stack.Screen
                  key={screen.name}
                  name={screen.name}
                  options={{ headerShown: false }}
                >
                  {(props) => (
                    <screen.component
                      {...props}
                      handleLogin={() => handleLogin(props.navigation)}
                      loading={isLoading}
                      password={password}
                      phone={phone}
                      setPassword={setPassword}
                      setPhone={setPhone}
                    />
                  )}
                </Stack.Screen>
              ))}
              {screenConfig.map(screen => (
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
            <Toast />
          </NavigationContainer>
        </SafeAreaProvider>
      </I18nextProvider>
    </Provider>
  );
};

export default App;