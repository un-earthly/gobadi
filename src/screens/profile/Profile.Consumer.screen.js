import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Appbar, Divider } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { globalStyles } from "../../styles/Global.styles";
import BottomBar from "../../components/common/BottomBar";
export default function ConsumerProfileScreen({ navigation }) {
    const { t } = useTranslation()
    return <SafeAreaView style={globalStyles.container}>
        <ScrollView contentContainerStyle={globalStyles.bottom_bar_height}>
            <View>
                <View style={{
                    marginVertical: 20,
                    rowGap: 20
                }}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: "https://randomuser.me/api/portraits/men/62.jpg" }}
                        />
                    </View>
                    <View>
                        <Text style={{
                            fontSize: 24,
                            fontWeight: 700,
                            textAlign: "center"
                        }}>
                            {t("service_consumer_details_title")}
                        </Text>
                    </View>
                    <View style={{
                        flexDirection: "row",
                        padding: 20
                    }}>
                        <View style={{
                            rowGap: 40,
                            width: "30%",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: "#bbb"
                            }}>
                                {t("name_header")}
                            </Text >
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: "#bbb"
                            }}>
                                {t("location")}
                            </Text>
                            <Text style={{
                                fontSize: 16,
                                fontWeight: 600,
                                color: "#bbb"
                            }}>
                                {t("mobile")}
                            </Text>
                        </View>
                        <View style={{
                            borderWidth: 1,
                            rowGap: 5,
                            borderRadius: 5,
                            padding: 20,
                            width: "70%",
                            borderColor: "lightgrey",

                        }}>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>

                                <MaterialCommunityIcons style={{
                                    marginBottom: 20,
                                }} name="city" size={24} color="black" />
                                <View style={{
                                    padding: 10,
                                }}>
                                    <Text >
                                        {t("name")}
                                    </Text>
                                    <Divider style={{
                                        marginTop: 20,
                                        width: 180
                                    }} />
                                </View>
                            </View>

                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <AntDesign style={{
                                    marginBottom: 20,
                                }} name="home" size={24} color="black" />
                                <View style={{
                                    padding: 10,
                                }}>
                                    <Text >
                                        {t("shylhet")}
                                    </Text>
                                    <Divider style={{
                                        width: 180,
                                        marginTop: 20
                                    }} />
                                </View>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <AntDesign name="clockcircleo" size={24} color="black" />
                                <Text style={{
                                    padding: 10,
                                }}>
                                    0123456789
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        margin: "auto",
                        rowGap: 20,

                    }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 600,
                            textAlign: "center"
                        }}>
                            {t("cattle_count_header")}
                        </Text>
                        <View style={{
                            // width: "100%"
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "60%"
                            }}>
                                <Text style={{
                                    textAlign: "left",
                                    fontSize: 18
                                }}>
                                    {t("goat")}
                                </Text>
                                <Text style={{
                                    textAlign: "left",
                                    fontSize: 18
                                }}>
                                    {t("count_two")}
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "60%"
                            }}>
                                <Text style={{
                                    textAlign: "left",
                                    fontSize: 18
                                }}>
                                    {t("hen")}
                                </Text>
                                <Text style={{
                                    textAlign: "left",
                                    fontSize: 18
                                }}>
                                    {t("count_two")}
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                width: "60%"
                            }}>
                                <Text style={{
                                    textAlign: "left",
                                    fontSize: 18
                                }}>
                                    {t("cow")}
                                </Text>
                                <Text style={{
                                    textAlign: "left",
                                    fontSize: 18
                                }}>
                                    {t("count_two")}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        </ScrollView>
        <BottomBar navigation={navigation} />
    </SafeAreaView>
}


const styles = StyleSheet.create({
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 150,
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    }
});
