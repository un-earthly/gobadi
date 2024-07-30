import { useTranslation } from "react-i18next";
import { Image, ScrollView, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/Global.styles";
import { styles } from "./styles/ServiceRequests.styles";

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

export default function ServiceRequestsScreen() {
    const { t } = useTranslation();

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

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView>
                {/* <Text style={globalStyles.title}>{t("service_requests")}</Text> */}
                <View style={styles.providersContainer}>
                    {providers.map(provider => (
                        <ProviderCard key={provider.id} provider={provider} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


