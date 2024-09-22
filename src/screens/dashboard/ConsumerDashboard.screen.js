import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Badge, Card, Text, Divider } from "react-native-paper";
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import BottomBar from "../../components/common/BottomBar";
import { globalStyles } from "../../styles/Global.styles";
import { getUserData } from "../../utility";
import axios from "axios";
import { userProfileUrl } from "../../api/routes";
import RenderCalendar from '../../components/ScreenBasedComponent/Home/RenderCalender';
import AppointmentModal from '../../components/ScreenBasedComponent/Home/AppointmentModal';

// Static data for missing APIs
const staticAppointments = [
    {
        _id: '1',
        title: 'Cattle Vaccination',
        category: 'Veterinary',
        subCategory: 'Vaccination',
        status: 'upcoming',
        provider: {
            name: 'Dr. John Doe',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        fee: 150
    },
    {
        _id: '2',
        title: 'Poultry Check-up',
        category: 'Veterinary',
        subCategory: 'General Check-up',
        status: 'pending',
        provider: {
            name: 'Dr. Jane Smith',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
        },
        fee: 100
    },
    {
        _id: '3',
        title: 'Fish Pond Maintenance',
        category: 'Aquaculture',
        subCategory: 'Maintenance',
        status: 'confirmed',
        provider: {
            name: 'Mike Johnson',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        fee: 200
    }
];

const staticReviews = [
    {
        _id: '1',
        provider: {
            name: 'Dr. John Doe',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        rating: 5,
        text: 'Excellent service! Dr. Doe was very thorough and professional.'
    },
    {
        _id: '2',
        provider: {
            name: 'Dr. Jane Smith',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
        },
        rating: 4,
        text: 'Great experience overall. Dr. Smith was knowledgeable and helpful.'
    },
    {
        _id: '3',
        provider: {
            name: 'Mike Johnson',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        rating: 5,
        text: 'Mike did an excellent job with our fish pond. Highly recommended!'
    }
];

const AppointmentCard = ({ appointment }) => {
    return (
        <Card style={styles.card}>
            <Card.Title
                title={appointment.title}
                subtitle={`${appointment.category} - ${appointment.subCategory}`}
                right={() => (
                    <Badge style={styles.badge} size={24} status={appointment.status === 'pending' ? 'secondary' : 'primary'}>
                        {appointment.status}
                    </Badge>
                )}
            />
            <Card.Content>
                <View style={styles.row}>
                    <Avatar.Image size={48} source={{ uri: appointment.provider.avatar }} />
                    <View style={styles.info}>
                        <Text style={styles.name}>{appointment.provider.name}</Text>
                        <Text style={styles.role}>Provider</Text>
                    </View>
                </View>
            </Card.Content>
            <Card.Actions style={styles.actions}>
                <Text style={styles.fee}>${appointment.fee}</Text>
            </Card.Actions>
        </Card>
    );
};

const ReviewCard = ({ review }) => {
    return (
        <Card style={styles.reviewCard}>
            <Card.Content>
                <View style={styles.reviewHeader}>
                    <Avatar.Image size={40} source={{ uri: review.provider.avatar }} />
                    <View style={styles.reviewInfo}>
                        <Text style={styles.reviewName}>{review.provider.name}</Text>
                        <View style={styles.ratingContainer}>
                            {[...Array(5)].map((_, i) => (
                                <FontAwesome key={i} name={i < review.rating ? "star" : "star-o"} size={16} color="#FFD700" />
                            ))}
                        </View>
                    </View>
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
            </Card.Content>
        </Card>
    );
};
const renderAppointmentCard = (appointment) => (
    <Card key={appointment.id} style={styles.appointmentCard}>
        <Card.Content>
            <Text style={styles.appointmentTitle}>{appointment.title}</Text>
            <Text>{t("time")}: {appointment.time}</Text>
            <Text>{t("client")}: {appointment.clientName}</Text>
        </Card.Content>
    </Card>
);
export default function ConsumerDashboard({ navigation }) {
    const { t } = useTranslation();
    const [appointments, setAppointments] = useState([]);
    const [userData, setUserData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [calendarView, setCalendarView] = useState('daily');
    const [selectedDate, setSelectedDate] = useState('');
    const [todayAppointments, setTodayAppointments] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchUserData = async () => {
        try {
            const { user } = await getUserData();
            console.log({ user })
            if (user?._id) {
                const userId = user._id;
                const userResponse = await axios.get(userProfileUrl(userId));
                setUserData(userResponse.data);
                setAppointments(staticAppointments);
            } else {
                console.error("User data or user ID not found in storage");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    const fetchReviews = async () => {
        try {
            const { user } = await getUserData();
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE}/api/reviews/${user._id}/provider`);
            setReviews(response.data);

        }
        catch (err) {
            console.error("Error fetching reviews:", err);
        }
    };
    const handleDateSelect = (date) => {
        setSelectedDate(date.dateString);
        setModalVisible(true);
    };
    useEffect(() => {
        fetchUserData();
        fetchReviews();
    }, []);

    return (
        <View style={globalStyles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <Avatar.Image size={80} source={{ uri: userData?.avatar }} />
                    <View style={styles.headerInfo}>
                        <Text style={styles.userName}>{userData?.name}</Text>
                        <View style={styles.locationContainer}>
                            <MaterialIcons name="location-on" size={16} color="#6D30ED" />
                            <Text style={styles.location}>{userData?.district || t("not_added")}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>{t("livestockCount")}</Text>
                    <View style={styles.livestockContainer}>
                        {["cow", "goat", "hen", "duck", "fish"].map((animal, idx) => (
                            <View key={idx} style={styles.livestockItem}>
                                <Text style={styles.livestockName}>{t(animal)}</Text>
                                <Text style={styles.livestockCount}>{userData && userData[animal]}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>{t("dashboard.upcomingAppointments")}</Text>
                        {/* <TouchableOpacity onPress={() => navigation.navigate("Appointments")}>
                            <Text style={styles.seeAll}>{t("dashboard.seeAll")}</Text>
                        </TouchableOpacity> */}
                    </View>
                    <RenderCalendar
                        calendarView={calendarView}
                        setCalendarView={setCalendarView}
                        selectedDate={selectedDate}
                        handleDateSelect={handleDateSelect}
                        todayAppointments={todayAppointments}
                        renderAppointmentCard={renderAppointmentCard}
                        t={t}
                        styles={styles}
                    />
                </View>

                <View style={styles.sectionContainer}>
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t("dashboard.reviews")}</Text>
                        {reviews.length > 0 ? (
                            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                                {reviews.map(renderReviewCard)}
                            </ScrollView>
                        ) : (
                            <Text style={styles.noDataText}>{t("dashboard.no_reviews_yet")}</Text>
                        )}
                    </View>
                </View>

                <View style={styles.sectionContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>{t("dashboard.appointmentHistory")}</Text>
                        {/* <TouchableOpacity onPress={() => navigation.navigate("AppointmentHistory")}>
                            <Text style={styles.seeAll}>{t("dashboard.seeAll")}</Text>
                        </TouchableOpacity> */}
                    </View>
                    <Text style={styles.noDataText}>{t("dashboard.appointmentHistoryComingSoon")}</Text>
                </View>
            </ScrollView>
            <BottomBar navigation={navigation} />

            <AppointmentModal
                visible={modalVisible}
                onDismiss={() => setModalVisible(false)}
                selectedDate={selectedDate}
                t={t}
                navigation={navigation}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    headerInfo: {
        marginLeft: 20,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    userLocation: {
        fontSize: 16,
        color: 'gray',
    },
    sectionContainer: {
        margin: 10,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    location: {
        marginLeft: 4,
        color: '#6D30ED',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    seeAll: {
        color: '#6D30ED',
    },
    livestockContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    livestockItem: {
        backgroundColor: "#FFEFF7",
        borderRadius: 4,
        padding: 10,
        alignItems: "center",
        width: '18%',
        marginBottom: 10,
    },
    livestockName: {
        fontSize: 12,
    },
    livestockCount: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    card: {
        marginBottom: 10,
    },
    badge: {
        alignSelf: 'center',
        marginRight: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    info: {
        marginLeft: 10,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    role: {
        fontSize: 12,
        color: 'gray',
    },
    actions: {
        justifyContent: 'flex-end',
    },
    fee: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    reviewCard: {
        marginBottom: 10,
    },
    reviewHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    reviewInfo: {
        marginLeft: 10,
    },
    reviewName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    ratingContainer: {
        flexDirection: 'row',
    },
    reviewText: {
        fontSize: 14,
    },
    noDataText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginTop: 10,
    },
    weeklyView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    weeklyButton: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
    },
});