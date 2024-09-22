import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Avatar, Button, Card, Provider as PaperProvider, Switch } from 'react-native-paper';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useTranslation } from "react-i18next";
import BottomBar from "../../components/common/BottomBar";
import { globalStyles } from "../../styles/Global.styles";
import { getUserData } from "../../utility";
import axios from "axios";
import { userProfileUrl } from "../../api/routes";
import RenderCalendar from '../../components/ScreenBasedComponent/Home/RenderCalender';
import AppointmentModal from '../../components/ScreenBasedComponent/Home/AppointmentModal';

export default function ProviderDashboard({ navigation }) {
    const { t } = useTranslation();
    const [userData, setUserData] = useState(null);
    const [dashboardData, setDashboardData] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [isOnline, setIsOnline] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [todayAppointments, setTodayAppointments] = useState([]);
    const [calendarView, setCalendarView] = useState('daily');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);



    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            await Promise.all([
                fetchUserData(),
                fetchDashboardData(),
                fetchReviews(),
                fetchTodayAppointments()
            ]);
        } catch (err) {
            setError(err.message || 'An error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    const fetchUserData = async () => {
        try {
            const { user } = await getUserData();
            if (user && user._id) {
                const userId = user._id;
                const userResponse = await axios.get(userProfileUrl(userId));
                setUserData(userResponse.data);
            } else {
                throw new Error("User data or user ID not found in storage");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw error;
        }
    };

    const fetchDashboardData = async () => {
        try {
            const { user } = await getUserData();
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE}/api/user/${user._id}/rating`);
            const response2 = await axios.get(`${process.env.EXPO_PUBLIC_BASE}/api/appointments/provider/${user._id}/count`);
            const response3 = await axios.get(`${process.env.EXPO_PUBLIC_BASE}/api/reviews/points/${user._id}`);
            setDashboardData({
                rating: response.data.rating,
                serviceCount: response2.data,
                points: response3.data.points
            });

        }
        catch (err) {
            console.error("Error fetching reviews:", err);
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

    const fetchTodayAppointments = async () => {
        try {
            const { user } = await getUserData();

            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE}/api/appointments/provider/${user._id}/day`);
            console.log(response.data)

        } catch (err) {
            console.error("Error fetching reviews:", err);
        }
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date.dateString);
        setModalVisible(true);
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

    const renderReviewCard = (review) => (
        <Card key={review.id} style={styles.reviewCard}>
            <Card.Content>
                <View style={styles.reviewHeader}>
                    <Text style={styles.reviewName}>{review.name || t("dashboard.anonymous")}</Text>
                    <Text style={styles.reviewDate}>{review.date || t("dashboard.date_not_specified")}</Text>
                </View>
                <View style={styles.ratingContainer}>
                    {[...Array(5)].map((_, i) => (
                        <FontAwesome
                            key={i}
                            name={i < (review.rating || 0) ? "star" : "star-o"}
                            size={14}
                            color="#F5C547"
                        />
                    ))}
                </View>
                <Text style={styles.reviewComment}>{review.comment || t("dashboard.no_comment")}</Text>
            </Card.Content>
        </Card>
    );

    useEffect(() => {
        fetchData();
    }, []);
    if (loading) {
        return (
            <View style={[globalStyles.container, styles.centerContent]}>
                <ActivityIndicator size="large" color="#6D30ED" />
                <Text style={styles.loadingText}>{t("dashboard.loading")}</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={[globalStyles.container, styles.centerContent]}>
                <Text style={styles.errorText}>{error}</Text>
                <Button mode="contained" onPress={fetchData} style={styles.retryButton}>
                    {t("dashboard.retry")}
                </Button>
            </View>
        );
    }
    return (
        <PaperProvider>
            <View style={globalStyles.container}>
                <ScrollView contentContainerStyle={globalStyles.bottom_bar_height}>
                    <View style={styles.header}>
                        <Avatar.Image size={80} source={{ uri: userData?.avatar }} />
                        <View style={styles.headerText}>
                            <Text style={styles.name}>{userData?.name}</Text>
                            <Text>{userData?.mobile}</Text>

                            <View style={styles.locationContainer}>
                                <MaterialIcons name="location-on" size={16} color="#6D30ED" />
                                <Text style={styles.location}>{userData?.district || t("not_added")}</Text>
                            </View>
                        </View>
                        <View style={styles.onlineStatusContainer}>
                            <Text>{isOnline ? t("dashboard.online") : t("dashboard.offline")}</Text>
                            <Switch value={isOnline} onValueChange={setIsOnline} />
                        </View>
                    </View>
                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{(dashboardData?.rating || 0)}</Text>
                            <Text style={styles.statLabel}>{t("dashboard.rating")}</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{dashboardData?.serviceCount || '0'}</Text>
                            <Text style={styles.statLabel}>{t("dashboard.service_count")}</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statValue}>{dashboardData?.points || '0'}</Text>
                            <Text style={styles.statLabel}>{t("dashboard.points")}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>{t("dashboard.appointments_overview")}</Text>

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
                </ScrollView>

                <AppointmentModal
                    visible={modalVisible}
                    onDismiss={() => setModalVisible(false)}
                    selectedDate={selectedDate}
                    t={t}
                    navigation={navigation}
                />

                <BottomBar navigation={navigation} />
            </View>
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        padding: 16,
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headerText: {
        flex: 1,
        marginLeft: 16,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
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
    onlineStatusContainer: {
        alignItems: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        backgroundColor: '#F3EFFE',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#6D30ED',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
    },
    appointmentCard: {
        marginBottom: 10,
    },
    appointmentTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    reviewCard: {
        marginRight: 10,
        width: 250,
    },
    reviewHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    reviewName: {
        fontWeight: 'bold',
    },
    reviewDate: {
        color: '#666',
        fontSize: 12,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 4,
    },
    reviewComment: {
        fontSize: 14,
    },
    centerContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        marginTop: 10,
    },
    noDataText: {
        fontSize: 14,
        color: '#666',
        fontStyle: 'italic',
    },
    calendarContainer: {
        marginBottom: 20,
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