import { Button, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTranslation } from "react-i18next";
import { commonStyles } from "./styles/Common.styles";

export default function LoginScreen({ navigation }) {
    const { t, i18n } = useTranslation();

    return (
        <SafeAreaView style={commonStyles.container}>
            <View style={commonStyles.wrapper}>
                {/* <Text style={commonStyles.header}>
                    {t("app_name")}
                </Text> */}
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
                <View style={commonStyles.input_container}>
                    <Text style={commonStyles.label}>{t("mobile")}</Text>
                    <TextInput
                        style={commonStyles.input}
                        id="phone"
                        placeholder={t("your_phone")}
                    />
                </View>
                <View style={commonStyles.input_container}>
                    <Text style={commonStyles.label}>{t("password")}</Text>
                    <TextInput
                        style={commonStyles.input}
                        id="password"
                        placeholder={t("your_password")}
                    />
                </View>
                <View style={commonStyles.btn_container}>
                    <Button
                        onPress={() => navigation.navigate("Dashboard")}
                        color="#6D30ED"
                        title={t("login")}
                    />
                </View>
                <View style={commonStyles.footer}>
                    <Text>
                        {t("dont_have_an_account")} ?{" "}
                    </Text>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate('Registration')
                    }>
                        <Text style={{
                            color: '#6D30ED',
                            textDecorationLine: "underline",
                            fontSize: 16
                        }}>
                            {t("registration")}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
