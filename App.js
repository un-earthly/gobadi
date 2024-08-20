import { I18nextProvider, useTranslation } from 'react-i18next';
import './i18n';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegistrationScreen from './src/screens/auth/Registration.screen';
import LoginScreen from './src/screens/auth/Login.screen';
import UploadImageScreen from './src/screens/uploadImage/UploadImage.screen';
import { ProceedFurtherScreen } from './src/screens/proceedFurther/ProceedFurther.screen';
import { ServiceProviderListScreen } from './src/screens/serviceProvider/serviceProviderList.screen';
import CheckoutScreen from './src/screens/checkout/Checkout.screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProfileScreen from './src/screens/profile/Profile.screen';
import ConsumerProfileScreen from './src/screens/profile/Profile.Consumer.screen';
import ProviderDashboard from './src/screens/dashboard/ProviderDashboard.screen';
import ServiceRequestsScreen from './src/screens/serviceRequests/ServiceRequests.screen';
import ConsumerScheduleScreen from './src/screens/consumerSchedule/consumerSchedule.screen';
import CustomAppBar from './src/components/common/CustomAppBar';
import ChatPage from './src/screens/chat/Chat.screen';
import MenuScreen from './src/screens/menu/Menu.screen';
import { useState } from 'react';
const Stack = createNativeStackNavigator();
import Toast from 'react-native-toast-message';
import { getUserData } from './src/utility';
import AppointmentScreen from './src/screens/appointments/appointment.screen';
import { Provider } from 'react-native-paper';
export default function App() {
  const { i18n, t } = useTranslation();
  const [role, setRole] = useState(null);
  const [initialRoute, setInitialRoute] = useState('Login');


  (async () => {
    try {
      const userData = await getUserData();
      if (userData && userData.token) {
        setRole(userData.role);
        setInitialRoute('Dashboard');
      }
    } catch (error) {
      console.error('Failed to load user data:', error);
    }
  })();

  return (
    <I18nextProvider i18n={i18n}>
      <SafeAreaProvider>
        <Provider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName={initialRoute}>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={({ navigation, route, options }) => ({
                  header: (props) => <></>,
                })}
              />
              <Stack.Screen
                name="Registration"
                component={RegistrationScreen}
                options={({ navigation, route, options }) => ({
                  header: (props) => <></>,
                })}
              />
              {role === "provider" ? <Stack.Screen
                name="Dashboard"
                component={ProviderDashboard}
                options={({ navigation, route, options }) => ({
                  header: (props) => <CustomAppBar screen={"dashboard"} {...props} />,
                })}
              />
                :
                <Stack.Screen
                  name="Dashboard"
                  component={ConsumerProfileScreen}
                  options={({ navigation, route, options }) => ({
                    header: (props) => <CustomAppBar {...props} />,
                    title: t("consumer_dashboard_header")
                  })}
                />}
              {role === "consumer" ? <Stack.Screen
                name="Menu"
                component={MenuScreen}
                options={({ navigation, route, options }) => ({
                  header: (props) => <CustomAppBar screen={"menu"} {...props} />,
                  title: t("service")
                })}
              /> :
                <Stack.Screen
                  name="Appointments"
                  component={AppointmentScreen}
                  options={({ navigation, route, options }) => ({
                    header: (props) => <CustomAppBar screen={"Appointments"} {...props} />,
                    title: t("appointments")
                  })}
                />
              }
              <Stack.Screen
                name="UploadImage"
                component={UploadImageScreen}
                options={({ navigation, route, options }) => ({
                  header: (props) => <CustomAppBar {...props} />,
                  title: t("upload_vetenaries_images")
                })}
              />
              <Stack.Screen
                name="ProceedFurther"
                component={ProceedFurtherScreen}
                options={({ navigation, route, options }) => ({
                  header: (props) => <CustomAppBar {...props} />,
                  title: t("changes_in_behavior"),
                })}
              />
              <Stack.Screen
                name="ServiceProviderList"
                component={ServiceProviderListScreen}
                options={({ navigation, route, options }) => ({
                  header: (props) => <CustomAppBar {...props} />,
                  title: t("service_providers_list")
                })}
              />
              <Stack.Screen
                name="Checkout"
                component={CheckoutScreen}
                options={({ navigation, route, options }) => ({
                  header: (props) => <CustomAppBar {...props} />,
                  title: t("checkout")
                })}
              />
              {role === "consumer" ? <Stack.Screen
                name="ConsumerProfile"
                component={ConsumerProfileScreen}
                options={({ navigation, route, options }) => ({
                  header: (props) => <CustomAppBar {...props} />,
                  title: t("profile")
                })}
              /> : <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={({ navigation, route, options }) => ({
                  header: (props) => <CustomAppBar {...props} />,
                  title: t("profile")
                })}
              />}
              <Stack.Screen
                name="Chat"
                component={ChatPage}
                options={({ navigation, route, options }) => ({
                  header: (props) => <CustomAppBar {...props} />,
                  title: t("message")
                })}
              />
              {/* */}
              {/* <Stack.Screen
              name="ConsumerDashboard"
              component={ConsumerDashboard}
              options={({ navigation, route, options }) => ({
                header: (props) => <CustomAppBar {...props} />,
                title: t("profile")
              })}
            /> */}
              <Stack.Screen
                name="ServiceRequests"
                component={ServiceRequestsScreen}
                options={({ navigation, route, options }) => ({
                  header: (props) => <CustomAppBar {...props} />,
                  title: t("service_requests")
                })}
              />
              <Stack.Screen
                name="ConsumerSchedule"
                component={ConsumerScheduleScreen}
                options={({ navigation, route, options }) => ({
                  header: (props) => <CustomAppBar {...props} />,
                  title: t("order_confirmation_page")
                })}
              />
            </Stack.Navigator>
            <Toast />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    </I18nextProvider >

  );
}

