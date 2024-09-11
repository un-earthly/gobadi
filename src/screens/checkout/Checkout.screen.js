import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
import { globalStyles } from "../../styles/Global.styles";
import { useTranslation } from "react-i18next";
import { Button, RadioButton } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar from "../../components/common/BottomBar";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from "react";
import paymentOptionsData from '../../mock-data/paymentOptions.json';
import DropDownPicker from 'react-native-dropdown-picker';
import { styles } from "./styles/Checkout.styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function CheckoutScreen({ route, navigation }) {
    const { t } = useTranslation();
    const [checked, setChecked] = useState('first');
    const [paymentOptions, setPaymentOptions] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [serviceTypeItems, setServiceTypeItems] = useState([
        { label: 'Video Call', value: 'video call' },
        { label: 'Audio Call', value: 'audio call' },
        { label: 'Chat', value: 'chat' }
    ]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [fee, setFee] = useState(route.params?.fee);
    const [consumer, setConsumer] = useState(null);
    useEffect(() => {
        setPaymentOptions(paymentOptionsData);
        // Function to retrieve user data from AsyncStorage
        const getUserData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {
                    setConsumer(JSON.parse(userData)?._id);
                }
            } catch (error) {
                console.error("Failed to retrieve user data from AsyncStorage:", error);
            }
        };

        getUserData();
    }, []);

    const handleProceed = async () => {
        // Log the information to simulate an API call
        console.log("Submitting data to API...");
        console.log({
            paymentMethod: checked === "first" ? "bkash" : "nagad",
            selectedTypes,
            consumer,
            title: route.params?.specialization + " " + t("by_service"),
            ...route.params
        });


        try {
            // Example API call (commented out for now)
            await axios.post(`${process.env.EXPO_PUBLIC_BASE}/api/appointments`, {
                paymentMethod: checked === "first" ? "bkash" : "nagad",
                serviceBy: selectedTypes,
                consumer,
                title: route.params?.specialization + " " + t("by_service"),
                ...route.params
            });

            // Navigate to the ConsumerSchedule screen after successful submission
            navigation.navigate("ConsumerSchedule", {
                paymentMethod: checked,
                selectedTypes,
                consumer,
                ...route.params
            });
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView contentContainerStyle={[
                globalStyles.bottom_bar_height,
                styles.scrollViewContainer
            ]}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20, width: '90%' }}>
                    {/* Text and Dropdown Container */}
                    <View style={{ flexDirection: "row", gap: 12, alignItems: "center", justifyContent: "center" }}>
                        <View style={[styles.serviceDetails, { flex: 7, height: 50, justifyContent: "center" }]}>
                            <Text style={{ fontSize: 16 }}>
                                {route.params?.specialization + " " + t("by_service")}
                            </Text>
                        </View>
                        <DropDownPicker
                            multiple={true}
                            min={0}
                            max={3}
                            open={dropdownOpen}
                            value={selectedTypes}
                            items={serviceTypeItems}
                            setOpen={setDropdownOpen}
                            setValue={setSelectedTypes}
                            setItems={setServiceTypeItems}
                            placeholder={t("select_service_type")}
                            mode="BADGE" // Displays selected items as badges
                            showArrowIcon
                            style={[styles.dropdown, { height: 50 }]} // Set the height to match
                            containerStyle={{ flex: 3 }}
                            badgeColors={{ backgroundColor: '#6D30ED' }}
                            labelStyle={{ color: 'white' }}
                        />
                    </View>

                </View>

                <View style={styles.toPay}>
                    <Text style={{ fontSize: 18 }}>
                        {t("amount_to_pay")}:
                    </Text>
                    <Text style={{ fontSize: 18 }}>
                        {fee} ৳
                    </Text>
                </View>

                <View style={styles.optionsContainer}>
                    {paymentOptions.map((option, index) => (
                        <View key={index} style={styles.option}>
                            <RadioButton
                                value={option.value}
                                status={checked === option.value ? 'checked' : 'unchecked'}
                                onPress={() => setChecked(option.value)}
                            />
                            <Text>{option.title}</Text>
                            <Image style={styles.image} source={{ uri: option.imageUri }} />
                        </View>
                    ))}
                </View>

                <View style={{ width: "90%" }}>
                    <Button
                        buttonColor="#6D30ED"
                        textColor="white"
                        onPress={handleProceed}
                        disabled={!checked} // Disable button if no payment method is selected
                    >
                        {t("proceed_to_pay")}
                    </Button>
                </View>
            </ScrollView>
            <BottomBar navigation={navigation} />
        </SafeAreaView>
    );
}
