import { Button, Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { Checkbox } from "react-native-paper";
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
            <ScrollView>
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
                        <Button color="#6D30ED"
                            onPress={() => navigation.navigate("Checkout")} title={t("submit")} />
                    </View>
                </View>
            </ScrollView>
            <BottomBar navigation={navigation} />

        </SafeAreaView>
    );
}
