import React, { useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { commonStyles } from "./styles/Common.styles";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/ScreenBasedComponent/Auth/Input.js";
import Toast from "react-native-toast-message";
import { useAuth } from '../../context/AuthContext';

export default function LoginScreen({ navigation }) {
    const { t } = useTranslation();
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading } = useAuth();

    const validateForm = () => {
        if (!mobile || !password) {
            Toast.show({
                type: 'error',
                text1: t("validation_error"),
                text2: t("fields_required")
            });
            return false;
        }
        return true;
    };

    const onLogin = async () => {
        if (validateForm()) {
            try {
                const response = await login(mobile, password);
                if (response) {

                    Toast.show({
                        type: 'success',
                        text1: t("success.registrationSuccessful"),
                        text2: `${t("success.registrationSuccessful")}`,
                        visibilityTime: 10000,
                        topOffset: 50,
                        position: 'top',
                    });
                    // navigation.navigate("Dashboard")
                }
            } catch (error) {
                Toast.show({
                    type: 'error',
                    text1: t("login_error"),
                    text2: error.message || t("something_went_wrong")
                });
            }
        }
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <ScrollView>
                <View style={commonStyles.wrapper}>
                    <Image
                        source={require("../../../assets/adaptive-icon.png")}
                        style={{
                            height: 60,
                            width: "100%",
                            objectFit: "contain",
                            marginBottom: 20
                        }}
                    />
                    <Text style={commonStyles.sub_header}>
                        {t("login")}
                    </Text>
                    <Input
                        label={t("mobile")}
                        id="mobile"
                        placeholder={t("your_phone")}
                        value={mobile}
                        onChangeText={setMobile}
                    />
                    <Input
                        label={t("password")}
                        id="password"
                        placeholder={t("your_password")}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <View style={commonStyles.btn_container}>
                        <Button
                            onPress={onLogin}
                            buttonColor="#6D30ED"
                            textColor="white"
                            loading={isLoading}
                        >
                            {t("login")}
                        </Button>
                    </View>
                    <View style={commonStyles.footer}>
                        <Text>
                            {t("dont_have_an_account")} ?{" "}
                        </Text>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('Registration')
                        }>
                            <Text style={commonStyles.link}>
                                {t("registration")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}