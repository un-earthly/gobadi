import { Image, ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Checkbox } from "react-native-paper";
import { useState } from "react";
import { globalStyles } from "../../styles/Global.styles";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./style/serviceProviderList.styles";
import BottomBar from "../../components/common/BottomBar";

const ProviderCard = ({ provider, checked, onPressCheckbox }) => (
    <View key={provider.id} style={styles.providerCard}>
        <View style={styles.avatarContainer}>
            <Image source={{ uri: provider.avatar }} style={styles.avatar} />
        </View>
        <View style={styles.providerInfo}>
            <View>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerSpecialization}>{provider.specialization}</Text>
            </View>
            <View style={styles.feeContainer}>
                <Text style={styles.providerFee}>{provider.fee} ৳</Text>
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={onPressCheckbox}
                />
            </View>
        </View>
    </View>
);

export function ServiceProviderListScreen({ navigation }) {
    const { t } = useTranslation();
    const [checked, setChecked] = useState({});

    const providers = [
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

    const handleCheckboxPress = (id) => {
        setChecked(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView contentContainerStyle={globalStyles.bottom_bar_height}>
                <View style={styles.contentContainer}>
                    <View style={styles.providersContainer}>
                        {providers.map(provider => (
                            <ProviderCard
                                key={provider.id}
                                provider={provider}
                                checked={checked[provider.id]}
                                onPressCheckbox={() => handleCheckboxPress(provider.id)}
                            />
                        ))}
                    </View>
                    <View style={styles.submitButtonContainer}>

                        <Button
                            buttonColor="#6D30ED"
                            textColor="white"
                            onPress={() => navigation.navigate("Checkout")} 
                        >
                            {t("submit")}
                        </Button>
                    </View>
                </View>
            </ScrollView>
            <BottomBar navigation={navigation} />

        </SafeAreaView>
    );
}
