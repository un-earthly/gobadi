import { Button, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles/Registration.styles.js"
import { useTranslation } from "react-i18next";
import { RadioButton } from 'react-native-paper';
import { useState } from "react";
import { commonStyles } from "./styles/Common.styles.js";

const RegistrationScreen = ({ navigation }) => {
    const { t, i18n } = useTranslation();
    const [checked, setChecked] = useState('first');

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
                    {t("registration")}
                </Text>
                <View style={commonStyles.input_container}>
                    <Text style={commonStyles.label}>{t("mobile")}</Text>
                    <TextInput
                        style={commonStyles.input}
                        id="phone"
                        placeholder={t("your_phone")}
                    />
                </View>
                <View style={styles.role_container}>
                    <Text style={styles.role_container_label}>
                        {t("role")}
                    </Text>
                    <View style={styles.role_item_container}>
                        <TouchableOpacity style={styles.role_item} onPress={() => setChecked('first')}>
                            <RadioButton
                                value="first"
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('first')}
                            />
                            <Text>{t("donee")}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.role_item} onPress={() => setChecked('second')}>

                            <RadioButton
                                value="second"
                                status={checked === 'second' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('second')}
                            />
                            <Text>
                                {t("donor")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={commonStyles.btn_container}>
                        <Button
                            onPress={() => navigation.navigate("Dashboard")}
                            color="#6D30ED"
                            title={t("registration")}
                        />
                    </View>
                    <View style={commonStyles.footer}>
                        <Text>
                            {t("already_have_account")} ?{" "}
                        </Text>
                        <TouchableOpacity onPress={() =>
                            navigation.navigate('Login')
                        }>
                            <Text style={{
                                color: '#6D30ED',
                                textDecorationLine: "underline",
                                fontSize: 16
                            }}>
                                {t("login")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}
export default RegistrationScreen;