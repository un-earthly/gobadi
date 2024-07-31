import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { commonStyles } from "./styles/Common.styles";
import { useEffect, useState } from "react";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Input from "../../components/ScreenBasedComponent/Auth/Input.js";

export default function LoginScreen({ navigation }) {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate("Dashboard");
        }, 2000);
    };
    return (
        <SafeAreaView style={commonStyles.container}>
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
                />
                <Input
                    label={t("password")}
                    id="password"
                    placeholder={t("your_password")}
                />
                <View style={commonStyles.btn_container}>
                    <Button
                        onPress={handleLogin}
                        buttonColor="#6D30ED"
                        textColor="white"
                        loading={loading}
                    >{t("login")}</Button>
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
        </SafeAreaView>
    )
}
