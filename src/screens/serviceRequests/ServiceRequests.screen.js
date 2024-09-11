import { useTranslation } from "react-i18next";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/Global.styles";
import { styles } from "./styles/ServiceRequests.styles";
import BottomBar from "../../components/common/BottomBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUserData } from "../../utility";

const ProviderCard = ({ provider }) => (
    <View key={provider.id} style={styles.providerCard}>
        <View style={styles.avatarContainer}>
            <Image source={{ uri: provider.avatar }} style={styles.avatar} />
        </View>
        <View style={styles.providerInfo}>
            <View>
                <Text style={styles.providerName}>{provider.name}</Text>
                <Text style={styles.providerSpecialization}>{provider.specialization}</Text>
            </View>
            <Text style={styles.providerDate}>12/04/24</Text>
        </View>
    </View>
);


export default function ServiceRequestsScreen({ navigation }) {
    const { t } = useTranslation();
    const [requests, setRequests] = useState([])
   


    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView contentContainerStyle={globalStyles.bottom_bar_height}>
                <View>
                    {requests.map(provider => (
                        <ProviderCard key={provider.id} provider={provider} />
                    ))}

                </View>
            </ScrollView>
            <BottomBar navigation={navigation} />
        </SafeAreaView>
    );
}


