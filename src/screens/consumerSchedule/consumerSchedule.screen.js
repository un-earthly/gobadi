import { useTranslation } from "react-i18next";
import { Image, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import { globalStyles } from "../../styles/Global.styles";
import { styles } from "./styles/consumerSchedule.styles";
import AntDesign from '@expo/vector-icons/AntDesign';
import BottomBar from "../../components/common/BottomBar";
import IconRow from "../../components/ScreenBasedComponent/ConsumerSchedule/IconRow";
import InfoRow from "../../components/ScreenBasedComponent/ConsumerSchedule/InfoRow";



const ConsumerScheduleScreen = ({ navigation }) => {
    const { t } = useTranslation();

    const images = [
        "https://img.freepik.com/premium-psd/brown-cow_76964-27039.jpg?uid=R38734096&ga=GA1.1.1663859300.1712593157&semt=sph",
        "https://img.freepik.com/free-photo/cows-standing-green-field-front-fuji-mountain-japan_335224-197.jpg?uid=R38734096&ga=GA1.1.1663859300.1712593157&semt=sph",
        "https://img.freepik.com/free-photo/black-white-cow-lying-down-grass_268835-811.jpg?uid=R38734096&ga=GA1.1.1663859300.1712593157&semt=sph",
        "https://img.freepik.com/premium-psd/brown-cow_76964-27039.jpg?uid=R38734096&ga=GA1.1.1663859300.1712593157&semt=sph"
    ];

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView>
                <View style={styles.container}>

                    <View style={styles.section}>
                        <View style={styles.infoContainer}>
                            <InfoRow label={t("name_header")} value={t("name")} />
                            <InfoRow label={t("location")} value={t("shylhet")} />
                            <InfoRow label={t("date")} value="10/12/2022" />
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={[globalStyles.title, styles.centerText]}>
                            {t("uploaded_pictures")}
                        </Text>
                        <View style={styles.imagesContainer}>
                            {images.map((uri, index) => (
                                <Image
                                    key={index}
                                    style={styles.image}
                                    source={{ uri }}
                                />
                            ))}
                        </View>
                    </View>
                    <View style={styles.contactSection}>
                        <View style={styles.section}>
                            <IconRow icon={Feather} label={t("call")} name="phone-call" />
                            <IconRow icon={AntDesign} label={t("video_call")} name="videocamera" />
                            <IconRow icon={AntDesign} label="11:00 - 8:00" name="clockcircleo" />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BottomBar navigation={navigation} />
        </SafeAreaView>
    );
}

export default ConsumerScheduleScreen;
