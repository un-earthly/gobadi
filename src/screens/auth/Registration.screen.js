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

const RegistrationScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const [checked, setChecked] = useState('first');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleRegistration = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.navigate("Dashboard");
        }, 2000);
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
                        id="phone"
                        placeholder={t("your_phone")}
                    />
                    {checked === 'first' && (
                        <View style={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            columnGap: 20,
                        }}>
                            {veterinaries.map(e => <View style={{ width: "46.7%" }}>
                                <Input
                                    label={t(e.label)}
                                    id={e.id}
                                    placeholder={t(e.placeholder)}
                                />
                            </View>)}
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
                                    checked={checked}
                                    setChecked={setChecked}
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

        </SafeAreaView>
    );
};

export default RegistrationScreen;
