import { Image, ScrollView, Text, View } from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Checkbox } from "react-native-paper";
import { useState, useEffect } from "react";
import axios from 'axios';
import { globalStyles } from "../../styles/Global.styles";
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from "./style/serviceProviderList.styles";
import BottomBar from "../../components/common/BottomBar";

const ProviderCard = ({ provider, isChecked, onPressCheckbox }) => (
    <View key={provider._id} style={styles.providerCard}>
        <View style={styles.avatarContainer}>
            <Image source={{ uri: provider.avatar }} style={styles.avatar} />
        </View>
        <View style={styles.providerInfo}>
            <View>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerSpecialization}>{provider.designation}</Text>
            </View>
            <View style={styles.feeContainer}>
                <Text style={styles.providerFee}>{provider.fee} ৳</Text>
                <Checkbox
                    status={isChecked ? 'checked' : 'unchecked'}
                    onPress={onPressCheckbox}
                />
            </View>
        </View>
    </View>
);

export function ServiceProviderListScreen({ route, navigation }) {
    const { t } = useTranslation();
    const [providers, setProviders] = useState([]);
    const [selectedProvider, setSelectedProvider] = useState(null);

    useEffect(() => {
        // Fetch data from the API
        const fetchProviders = async () => {
            try {
                const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE}/api/user/service-providers`);
                setProviders(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchProviders();
    }, []);

    const handleCheckboxPress = (provider) => {
        setSelectedProvider(prevProvider =>
            prevProvider && prevProvider._id === provider._id ? null : provider
        );
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView contentContainerStyle={globalStyles.bottom_bar_height}>
                <View style={styles.contentContainer}>
                    <View style={styles.providersContainer}>
                        {providers.map(provider => (
                            <ProviderCard
                                key={provider._id}
                                provider={provider}
                                isChecked={selectedProvider?._id === provider._id}
                                onPressCheckbox={() => handleCheckboxPress(provider)}
                            />
                        ))}
                    </View>
                    <View style={styles.submitButtonContainer}>
                        <Button
                            buttonColor="#6D30ED"
                            textColor="white"
                            onPress={() => navigation.navigate("Checkout", {
                                provider: selectedProvider?._id,
                                fee: selectedProvider?.fee,
                                designation: selectedProvider?.designation,
                                ...route.params
                            })}
                            disabled={!selectedProvider}
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
