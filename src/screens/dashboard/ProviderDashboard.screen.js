import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import BottomBar from "../../components/common/BottomBar";
import { globalStyles } from "../../styles/Global.styles";
import { useState, useEffect } from "react";
import { getUserData } from "../../utility";
import axios from "axios";
import { userProfileUrl, userRatingsUrl, userReviewsUrl } from "../../api/routes";
export default function ProviderDashboard({ navigation }) {
    const { t } = useTranslation();
    const [userData, setUserData] = useState(null);
    const [userReviews, setUserReviews] = useState([]);
    const [userRating, setUserRating] = useState(null);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const storedUserData = await getUserData();
            if (storedUserData && storedUserData._id) {
                const userId = storedUserData._id;

                // Fetch user profile
                const userResponse = await axios.get(userProfileUrl(userId));
                setUserData(userResponse.data);

                // Fetch user reviews
                const reviewsResponse = await axios.get(userReviewsUrl(userId));
                setUserReviews(reviewsResponse.data);

                // Fetch user rating
                const ratingResponse = await axios.get(userRatingsUrl(userId));
                setUserRating(ratingResponse.data);
            } else {
                console.error("User data or user ID not found in storage");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    return (

        <View style={globalStyles.container}>
            <ScrollView contentContainerStyle={globalStyles.bottom_bar_height}>
                {<View style={{
                    rowGap: 20
                }}>
                    <View style={{
                        flexDirection: "row",
                        columnGap: 12,
                    }}>
                        <Image
                            source={{
                                uri: "https://randomuser.me/api/portraits/men/32.jpg"
                            }}
                            style={{
                                height: "100%",
                                width: 100,
                                borderRadius: 8
                            }}
                        />
                        <View style={{ flex: 1 }}>
                            <View>
                                <Text style={{
                                    fontSize: 24,
                                    fontWeight: 'bold',
                                    marginBottom: 10
                                }}>
                                    {t("name")}
                                </Text>
                                <Text style={{ marginBottom: 10 }}>
                                    {t("senior_specialist")}
                                </Text>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                columnGap: 4,
                                flexWrap: "wrap",
                            }}>
                                <View style={{
                                    backgroundColor: "#F3EFFE",
                                    borderRadius: 4,
                                    paddingVertical: 4,
                                    paddingHorizontal: 6,
                                    alignItems: "center",
                                    width: 84
                                }}>
                                    <Text style={{ fontSize: 12 }}>
                                        {t("rating")}
                                    </Text>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginBottom: 10
                                    }}>
                                        4.5
                                    </Text>
                                    <Text style={{ marginBottom: 10 }}>
                                        <FontAwesome name="star" size={14} color="#F5C547" />
                                        <FontAwesome name="star" size={14} color="#F5C547" />
                                        <FontAwesome name="star" size={14} color="#F5C547" />
                                        <FontAwesome name="star" size={14} color="#F5C547" />
                                        <FontAwesome name="star-half-empty" size={14} color="#F5C547" />
                                    </Text>
                                </View>
                                <View style={{
                                    backgroundColor: "#FFEFF7",
                                    borderRadius: 4,
                                    paddingVertical: 4,
                                    paddingHorizontal: 6,
                                    alignItems: "center",
                                    width: 84
                                }}>
                                    <Text style={{ fontSize: 12 }}>
                                        {t("service_count")}
                                    </Text>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginBottom: 10
                                    }}>
                                        4.5
                                    </Text>
                                    <Text style={{ marginBottom: 10 }}>
                                        <FontAwesome name="star" size={12} color="#F5C547" />
                                        <FontAwesome name="star" size={12} color="#F5C547" />
                                        <FontAwesome name="star" size={12} color="#F5C547" />
                                        <FontAwesome name="star" size={12} color="#F5C547" />
                                        <FontAwesome name="star-half-empty" size={12} color="#F5C547" />
                                    </Text>
                                </View>
                                <View style={{
                                    backgroundColor: "#FFEFF7",
                                    borderRadius: 4,
                                    paddingVertical: 4,
                                    alignItems: "center",
                                    paddingHorizontal: 6,
                                    width: 84
                                }}>
                                    <Text style={{ fontSize: 12 }}>
                                        {t("points")}
                                    </Text>
                                    <Text style={{
                                        fontSize: 18,
                                        fontWeight: 'bold',
                                        marginBottom: 10
                                    }}>
                                        4.5
                                    </Text>
                                    <Text style={{ marginBottom: 10 }}>
                                        <FontAwesome name="star" size={14} color="#F5C547" />
                                        <FontAwesome name="star" size={14} color="#F5C547" />
                                        <FontAwesome name="star" size={14} color="#F5C547" />
                                        <FontAwesome name="star" size={14} color="#F5C547" />
                                        <FontAwesome name="star-half-empty" size={14} color="#F5C547" />
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{ rowGap: 10 }}>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>
                            {t("description")}
                        </Text>
                        <Text>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatum, exercitationem!
                        </Text>
                    </View>
                    <View style={{ rowGap: 10 }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Text style={{ fontSize: 20, fontWeight: '600' }}>
                                {t("reviews")}
                            </Text>
                            <View style={{
                                justifyContent: "center", alignItems: "center",
                                flexDirection: "row"
                            }}>
                                <Text style={{ color: "#6D30ED" }}> See All </Text><MaterialIcons name="keyboard-arrow-right" size={24} color="#6D30ED" />
                            </View>
                        </View>
                        <View style={{
                            backgroundColor: "#eee",
                            padding: 18,
                            borderRadius: 4,
                            rowGap: 10
                        }}>
                            <View style={{
                                justifyContent: "space-between",
                                flexDirection: "row",
                                alignItems: "center",
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    marginBottom: 10,
                                    columnGap: 12
                                }}>
                                    <Avatar.Image size={32} source={{
                                        uri: "https://randomuser.me/api/portraits/men/32.jpg"
                                    }} />
                                    <View>
                                        <Text style={{ fontWeight: 'bold' }}>
                                            {t("name")}
                                        </Text>
                                        <Text>
                                            A day ago
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <FontAwesome name="star" size={14} color="#F5C547" />
                                    <FontAwesome name="star" size={14} color="#F5C547" />
                                    <FontAwesome name="star" size={14} color="#F5C547" />
                                    <FontAwesome name="star" size={14} color="#F5C547" />
                                    <FontAwesome name="star-half-empty" size={14} color="#F5C547" />
                                </View>
                            </View>
                            <Text>
                                Lorem ipsum dolor sit ame Lorem, Lorem ipsum dolor sit amet.
                                ipsum dolor....
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '600' }}>
                            {t("service_time")}
                        </Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <View style={{
                                    backgroundColor: "#68C6ED30",
                                    width: 32,
                                    height: 32,
                                    borderRadius: 50,
                                    justifyContent: "center",
                                    alignItems: "center",
                                    margin: 10
                                }} >
                                    <FontAwesome name="map-marker" size={20} color="#68C6ED" />
                                </View>
                                <View>
                                    <Text>
                                        11:00 - 8:00 AM
                                    </Text>
                                </View>
                            </View>
                            <MaterialIcons name="keyboard-arrow-right" size={24} color="#68C6ED" />
                        </View>
                    </View>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 20 }}>
                            {t("service_requests")}
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("ServiceRequests")}>

                            <View style={{
                                flexDirection: "row",
                                columnGap: 10,
                            }}>
                                <Text style={{
                                    color: "#68C6ED"
                                }}>
                                    {t("click_here")}
                                </Text>
                                <FontAwesome name="long-arrow-right" size={24} color="#68C6ED" />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>}
            </ScrollView>
            <BottomBar navigation={navigation} />
        </View>
    );
}
