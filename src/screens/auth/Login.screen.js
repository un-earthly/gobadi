import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { commonStyles } from "./styles/Common.styles";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/ScreenBasedComponent/Auth/Input.js";
import axios from "axios";
import Toast from "react-native-toast-message";
import { loginUrl } from "../../api/routes.js";

export default function LoginScreen({ navigation }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const validateForm = () => {
        if (!phone || !password) {
            Toast.show({
                type: 'error',
                text1: t("validation_error"),
                text2: t("fields_required")
            });
            return false;
        }
        return true;
    };
    const handleLogin = async () => {
        if (!validateForm()) return;
        setLoading(true);
        try {

            const response = await axios.post(loginUrl, {
                mobile: phone,
                password
            });
            await AsyncStorage.setItem("userData", JSON.stringify(response.data));
            setLoading(false);
            navigation.navigate("Dashboard");
            Toast.show({
                type: 'success',
                text1: t("login_success"),
                text2: t("welcome_back")
            });
        } catch (error) {
            setLoading(false);
            Toast.show({
                type: 'error',
                text1: t("login_error"),
                text2: error.response?.data?.message || t("something_went_wrong")
            });
            console.error("Login error", error);
        }
    };
    return (
        <SafeAreaView style={commonStyles.container}>
            <ScrollView >

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
                        id="phone"
                        placeholder={t("your_phone")}
                        value={phone}
                        onChangeText={setPhone}
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
                            onPress={handleLogin}
                            buttonColor="#6D30ED"
                            textColor="white"
                            loading={loading}
                        >{t("login")}
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
