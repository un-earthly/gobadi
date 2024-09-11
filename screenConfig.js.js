// import LoginScreen from '../screens/auth/Login.screen';
// import RegistrationScreen from '../screens/auth/Registration.screen';
// import UploadImageScreen from '../screens/uploadImage/UploadImage.screen';
// import { ProceedFurtherScreen } from '../screens/proceedFurther/ProceedFurther.screen';
// import { ServiceProviderListScreen } from '../screens/serviceProvider/serviceProviderList.screen';
// import CheckoutScreen from '../screens/checkout/Checkout.screen';
// import ProfileScreen from '../screens/profile/Profile.screen';
// import ProviderDashboard from '../screens/dashboard/ProviderDashboard.screen';
// import ServiceRequestsScreen from '../screens/serviceRequests/ServiceRequests.screen';
// import ConsumerScheduleScreen from '../screens/consumerSchedule/consumerSchedule.screen';
// import ChatPage from '../screens/chat/Chat.screen';
// import MenuScreen from '../screens/menu/Menu.screen';
// import AppointmentScreen from '../screens/appointments/appointment.screen';
// import ConsumerDashboard from '../screens/dashboard/ConsumerDashboard.screen';

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
    { name: 'Login', component: LoginScreen },
    { name: 'Registration', component: RegistrationScreen },
];

export const consumerScreens = [
    { name: 'Dashboard', component: ConsumerDashboard, titleKey: 'consumer_dashboard_header' },
    { name: 'Menu', component: MenuScreen, titleKey: 'service' },
    { name: 'UploadImage', component: UploadImageScreen, titleKey: 'upload_vetenaries_images' },
    { name: 'ProceedFurther', component: ProceedFurtherScreen, titleKey: 'changes_in_behavior' },
    { name: 'ServiceProviderList', component: ServiceProviderListScreen, titleKey: 'service_providers_list' },
    { name: 'Checkout', component: CheckoutScreen },
    { name: 'Profile', component: ProfileScreen },
    { name: 'Chat', component: ChatScreen, titleKey: 'message' },
    { name: 'ConsumerSchedule', component: ConsumerScheduleScreen, titleKey: 'order_confirmation_page' },
];

export const providerScreens = [
    { name: 'Dashboard', component: ProviderDashboard },
    { name: 'Appointments', component: AppointmentsPage },
    { name: 'Profile', component: ProfileScreen },
    { name: 'Chat', component: ChatScreen, titleKey: 'message' },
    { name: 'ServiceRequests', component: ServiceRequestsScreen },
];