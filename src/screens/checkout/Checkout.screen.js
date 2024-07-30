import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { globalStyles } from "../../styles/Global.styles";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { Appbar, PaperProvider, RadioButton } from "react-native-paper";
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar from "../../components/common/BottomBar";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from "react";

export default function CheckoutScreen({ navigation }) {
    const { t } = useTranslation();
    const [checked, setChecked] = useState('first');

    const selectedProviders = [
        {
            id: "1",
            avatar: "https://randomuser.me/api/portraits/men/62.jpg",
            name: "স্কট ডেভিস",
            specialization: "পশু বিশেষজ্ঞ",
            fee: "৫০",
        },
        {
            id: "2",
            avatar: "https://randomuser.me/api/portraits/women/79.jpg",
            name: "এল্লা হিল",
            specialization: "সিনিয়র পশু বিশেষজ্ঞ",
            fee: "১০০",
        },

    ];
    const paymentOptions = [
        { value: 'first', title: t("bkash"), imageUri: 'https://static.wixstatic.com/media/877d29_afba1c01d863451689ab0154cdf57808~mv2.png/v1/crop/x_714,y_0,w_1571,h_2000/fill/w_150,h_191,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/BKash-Icon-Logo_wine.png' },
        { value: 'second', title: t("nogod"), imageUri: 'https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/58/e0/30/58e03047-a611-cd93-e282-2a36d4ccdd3f/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1024x1024bb.png' }
    ];

    return <SafeAreaView style={globalStyles.container}>
        <ScrollView contentContainerStyle={{
            alignItems: 'center',
        }}>

            <View style={{
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "90%",
                padding: 8,
                borderRadius: 4,
                marginBottom: 20
            }}>
                <Text style={{

                }}>
                    {t("service_name")}
                </Text>
                <AntDesign name="down" size={16} color="black" />
            </View>
            <View style={{
                backgroundColor: "#D9D9d9",
                alignItems: "start",
                width: "90%",
                padding: 16,
                borderRadius: 4,
                marginBottom: 20
            }}>
                <Text style={{ fontSize: 18 }}>
                    {t("amount_to_pay")} :
                </Text>
                <Text style={{ fontSize: 18 }}>
                    100 ৳
                </Text>
            </View>
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",

            }}>
                {paymentOptions.map((option, index) => (
                    <View key={index} style={styles.optionContainer}>
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
                <Button onPress={() => navigation.navigate("ConsumerSchedule")} color="#6d30ed" title={t("proceed_to_pay")} />
            </View>
        </ScrollView>
        <BottomBar navigation={navigation} />
    </SafeAreaView>
};

const styles = StyleSheet.create({
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    image: {
        height: 32,
        width: 32,
        marginLeft: 10,
    }
});