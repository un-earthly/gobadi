import React from 'react';
import { useTranslation } from "react-i18next";
import { Text, View, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, AntDesign } from '@expo/vector-icons';
import { globalStyles } from "../../styles/Global.styles";
import { styles } from "./styles/consumerSchedule.styles";
import BottomBar from "../../components/common/BottomBar";
import { Image } from 'expo-image';

const IconRow = ({ icon: Icon, label, name, onPress }) => (
    <TouchableOpacity style={styles.iconRow} onPress={onPress}>
        <Icon name={name} size={24} color="#4A90E2" />
        <Text style={styles.iconLabel}>{label}</Text>
    </TouchableOpacity>
);

const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}:</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);



const ConsumerScheduleScreen = ({ route, navigation }) => {
    const { t } = useTranslation();
    const { images, category, subCategory, specialization, fee, paymentMethod } = route.params;
    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>{t("appointment_details")}</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{t("service_info")}</Text>
                    <InfoRow label={t("category")} value={category} />
                    <InfoRow label={t("sub_category")} value={subCategory} />
                    <InfoRow label={t("specialization")} value={specialization} />
                    <InfoRow label={t("fee")} value={`৳${fee}`} />
                    <InfoRow label={t("payment_method")} value={paymentMethod} />
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{t("uploaded_pictures")}</Text>
                    {images && images.length > 0 ? (
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
                            {images.map((uri, index) => {
                                return <View style={styles.imageContainer}>
                                    <Image
                                        style={styles.image}
                                        source={uri}
                                        placeholder={{ blurhash }}
                                        contentFit="cover"
                                        transition={1000}
                                    />
                                </View>
                            })}

                        </ScrollView>
                    ) : (
                        <Text style={styles.noImagesText}>{t("no_images_uploaded")}</Text>
                    )}
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>{t("contact_options")}</Text>
                    <IconRow icon={Feather} label={t("call")} name="phone-call" />
                    <IconRow icon={AntDesign} label={t("video_call")} name="videocamera" />
                    <IconRow icon={AntDesign} label={t("available_time")} name="clockcircleo" />
                </View>
            </ScrollView>
            <BottomBar navigation={navigation} />
        </SafeAreaView>
    );
}

export default ConsumerScheduleScreen;