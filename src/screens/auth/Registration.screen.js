import React, { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    TouchableOpacity,
    View
} from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Text } from 'react-native-paper';
import { styles } from "./styles/Registration.styles.js";
import { commonStyles } from "./styles/Common.styles.js";
import { SafeAreaView } from "react-native-safe-area-context";
import RenderRoleItem from "../../components/ScreenBasedComponent/Auth/RenderRole.js";
import veterinaries from "../../mock-data/veterinaries.json";
import Input from "../../components/ScreenBasedComponent/Auth/Input.js";
import roles from "../../mock-data/roles.json";
import { registerUrl } from "../../api/routes.js";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import * as Clipboard from 'expo-clipboard';

const RegistrationScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        mobile: '',
        role: 'consumer',
        veterinaries: {}
    });

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleInputChange = (id, value) => {
        if (id === 'mobile') {
            setFormData({ ...formData, mobile: value });
        } else if (roles.some(role => role.id === id)) {
            setFormData({ ...formData, role: value });
        } else {
            setFormData({
                ...formData,
                veterinaries: {
                    ...formData.veterinaries,
                    [id]: value
                }
            });
        }
    };

    const validateForm = () => {
        const { mobile, role, veterinaries } = formData;
        if (!mobile || !role) {
            Toast.show({
                type: 'error',
                text1: t("error"),
                text2: t("phone_and_role_required")
            });
            return false;
        }
        if (formData.role === 'consumer' && !Object.values(veterinaries).some(value => value)) {
            Toast.show({
                type: 'error',
                text1: t("error"),
                text2: t("at_least_one_veterinary_field_required")
            });
            return false;
        }
        return true;
    };
    const handleRegistration = async () => {
        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(registerUrl, formData);
            setLoading(false);

            await AsyncStorage.setItem('userData', JSON.stringify(response.data));

            const handleCopyPassword = async () => {
                await Clipboard.setStringAsync(response.data.devPass);
                Toast.hide();
                navigation.navigate("Dashboard");
            };

            // Show Toast with Copy to Clipboard option
            Toast.show({
                type: 'success',
                text1: t("success"),
                text2: `${t("registration_successful")} " আপনার পাসওয়ার্ড হল " ${response.data.devPass}`,
                visibilityTime: 10000,
                onPress: handleCopyPassword,  // Trigger copying when user presses the Toast
                props: {
                    copyButton: true // Add any additional props you need
                },
                topOffset: 50, // Adjust this if needed
                position: 'top',
            });

        } catch (error) {
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: t("error"),
                text2: t("registration_failed")
            });
        }
    };


    return (
        <SafeAreaView style={commonStyles.container}>
            <ScrollView>

                <View style={commonStyles.wrapper}>
                    <Image
                        source={require("../../../assets/adaptive-icon.png")}
                        style={commonStyles.logo}
                    />
                    <Text style={commonStyles.sub_header}>
                        {t("registration")}
                    </Text>
                    <Input
                        label={t("mobile")}
                        id="mobile"
                        placeholder={t("your_phone")}
                        onChangeText={(value) => handleInputChange("mobile", value)}
                        value={formData.mobile}
                    />
                    {formData.role === 'consumer' && (
                        <View style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            columnGap: 20,
                        }}>
                            {veterinaries.map(e => (
                                <View key={e.id} style={{ width: "46.7%" }}>
                                    <Input
                                        label={t(e.label)}
                                        id={e.id}
                                        placeholder={t(e.placeholder)}
                                        onChangeText={(value) => handleInputChange(e.id, value)}
                                        value={formData.veterinaries[e.id]}
                                    />
                                </View>
                            ))}
                        </View>
                    )}
                    <View style={styles.role_container}>
                        <Text style={styles.role_container_label}>
                            {t("role")}
                        </Text>
                        <View style={styles.role_item_container}>
                            {
                                roles.map((role) => <RenderRoleItem
                                    key={role.value}
                                    checked={formData.role}
                                    setChecked={(value) => handleInputChange(role.id, value)}
                                    role={role}
                                />)
                            }
                        </View>
                        <Button
                            onPress={handleRegistration}
                            buttonColor="#6D30ED"
                            textColor="white"
                            loading={loading}
                        >
                            {t("registration")}
                        </Button>
                        <View style={commonStyles.footer}>
                            <Text>{t("already_have_account")} ?{" "}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                <Text style={commonStyles.link}>{t("login")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
            <Toast />
        </SafeAreaView>
    );
};

export default RegistrationScreen;
