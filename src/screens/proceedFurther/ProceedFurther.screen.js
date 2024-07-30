import { Button, ScrollView, Text, View } from "react-native";
import { styles } from "./styles/ProceedFurther.styles";
import { useTranslation } from "react-i18next";
import { Foundation } from '@expo/vector-icons';
import { globalStyles } from "../../styles/Global.styles";
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar from "../../components/common/BottomBar";

export function ProceedFurtherScreen({ navigation }) {
    const { t } = useTranslation();
    const changes = [
        {
            id: 1,
            title: t("symptoms")
        },
        {
            id: 2,
            title: t("symptoms")
        },
        {
            id: 3,
            title: t("symptoms")
        },
        {
            id: 4,
            title: t("symptoms")
        },
        {
            id: 5,
            title: t("symptoms")
        },

    ];
    return <SafeAreaView style={globalStyles.container}>
        <ScrollView>
            <View style={{
                // padding: 10,
                rowGap: 20
            }}>
                <View>
                    <Text style={{
                        fontSize: 18,
                    }}>
                        {t("changes_in_cows_behavior")}
                    </Text>
                </View>
                <View style={{
                    rowGap: 8,
                }}>
                    {
                        changes.map((c) => (
                            <View key={c.id} style={{
                                flexDirection: "row",
                                columnGap: 8,
                            }}>
                                <Foundation name="target-two" size={24} color="black" />
                                <Text style={{
                                    fontSize: 14,
                                }}>{c.title}</Text>
                            </View>
                        ))
                    }
                </View>
                <Text>
                    {t("proceed_confirmation")}
                </Text>
                <Button color="#6D30ED"
                    onPress={() => navigation.navigate("ServiceProviderList")} title={t("step_forward")} />
            </View>
        </ScrollView>
        <BottomBar navigation={navigation} />

    </SafeAreaView>
}