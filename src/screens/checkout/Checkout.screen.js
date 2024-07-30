import { Image, ScrollView, Text, View } from "react-native";
import { globalStyles } from "../../styles/Global.styles";
import { useTranslation } from "react-i18next";
import { Button, RadioButton } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar from "../../components/common/BottomBar";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useState } from "react";
import paymentOptionsData from '../../mock-data/paymentOptions.json';
import { styles } from "./styles/Checkout.styles";
export default function CheckoutScreen({ navigation }) {
    const { t } = useTranslation();
    const [checked, setChecked] = useState('first');
    const [paymentOptions, setPaymentOptions] = useState([]);

    useEffect(() => {
        setPaymentOptions(paymentOptionsData);
    }, []);

    return <SafeAreaView style={globalStyles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>

            <View style={styles.serviceDetails}>
                <Text>
                    {t("service_name")}
                </Text>
                <AntDesign name="down" size={16} color="black" />
            </View>
            <View style={styles.toPay}>
                <Text style={{ fontSize: 18 }}>
                    {t("amount_to_pay")} :
                </Text>
                <Text style={{ fontSize: 18 }}>
                    100 ৳
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
                        <Text>
                            {option.title}
                        </Text>
                        <Image style={styles.image} source={{ uri: option.imageUri }} />
                    </View>
                ))}
            </View>
            <View style={{
                width: "90%"
            }}>
                <Button
                    buttonColor="#6D30ED"
                    textColor="white"
                    onPress={() => navigation.navigate("ConsumerSchedule")}
                >
                    {t("proceed_to_pay")}
                </Button>
            </View>
        </ScrollView>
        <BottomBar navigation={navigation} />
    </SafeAreaView>
};
