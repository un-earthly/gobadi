import AppointmentsPage from "./src/screens/appointments/Appointment.screen";
import LoginScreen from "./src/screens/auth/Login.screen";
import RegistrationScreen from "./src/screens/auth/Registration.screen";
import ChatScreen from "./src/screens/chat/Chat.screen";
import CheckoutScreen from "./src/screens/checkout/Checkout.screen";
import ConsumerScheduleScreen from "./src/screens/consumerSchedule/consumerSchedule.screen";
import ConsumerDashboard from "./src/screens/dashboard/ConsumerDashboard.screen";
import ProviderDashboard from "./src/screens/dashboard/ProviderDashboard.screen";
import MenuScreen from "./src/screens/menu/Menu.screen";
import { ProceedFurtherScreen } from "./src/screens/proceedFurther/ProceedFurther.screen";
import ProfileScreen from "./src/screens/profile/Profile.screen";
import { ServiceProviderListScreen } from "./src/screens/serviceProvider/serviceProviderList.screen";
import ServiceRequestsScreen from "./src/screens/serviceRequests/ServiceRequests.screen";
import UploadImageScreen from "./src/screens/uploadImage/UploadImage.screen";


export const authScreens = [
    { name: 'Login', component: LoginScreen, titleKey: 'screens.login' },
    { name: 'Registration', component: RegistrationScreen, titleKey: 'screens.registration' },
];

export const consumerScreens = [
    { name: 'Dashboard', component: ConsumerDashboard, titleKey: 'screens.consumer_dashboard_header' },
    { name: 'Menu', component: MenuScreen, titleKey: 'screens.service' },
    { name: 'UploadImage', component: UploadImageScreen, titleKey: 'screens.upload_vetenaries_images' },
    { name: 'ProceedFurther', component: ProceedFurtherScreen, titleKey: 'screens.changes_in_behavior' },
    { name: 'ServiceProviderList', component: ServiceProviderListScreen, titleKey: 'screens.service_providers_list' },
    { name: 'Checkout', component: CheckoutScreen, titleKey: 'screens.checkout' },
    { name: 'Profile', component: ProfileScreen, titleKey: 'screens.profile' },
    { name: 'Chat', component: ChatScreen, titleKey: 'screens.message' },
    { name: 'ConsumerSchedule', component: ConsumerScheduleScreen, titleKey: 'screens.consumer_schedule' },
];

export const providerScreens = [
    { name: 'Dashboard', component: ProviderDashboard, titleKey: 'screens.provider_dashboard_header' },
    { name: 'Appointments', component: AppointmentsPage, titleKey: 'screens.appointments' },
    { name: 'Profile', component: ProfileScreen, titleKey: 'screens.profile' },
    { name: 'Chat', component: ChatScreen, titleKey: 'screens.message' },
    { name: 'ServiceRequests', component: ServiceRequestsScreen, titleKey: 'screens.service_requests' },
];

