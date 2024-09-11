import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Platform, ActivityIndicator } from 'react-native';
import { Text, Card, Button, Modal, Portal, IconButton, Surface } from 'react-native-paper';
import { useTranslation } from "react-i18next";
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar from "../../components/common/BottomBar";
import { globalStyles } from "../../styles/Global.styles";
import { getUserData } from '../../utility';
import axios from 'axios';

export default function AppointmentsPage({ navigation }) {
    const { t } = useTranslation();
    const [serviceRequests, setServiceRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [appointmentDate, setAppointmentDate] = useState(new Date());
    const [appointmentTime, setAppointmentTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const { _id } = await getUserData();
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE}/api/appointments/provider/${_id}`);
            setServiceRequests(response.data);
        } catch (error) {
            console.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleScheduleAppointment = (request) => {
        setSelectedRequest(request);
        if (request.appointmentSchedule) {
            const appointmentDate = new Date(request.appointmentSchedule);
            setAppointmentDate(appointmentDate);
            setAppointmentTime(appointmentDate);
        }
        setIsModalVisible(true);
    };

    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || appointmentDate;
        setShowDatePicker(Platform.OS === 'ios');
        setAppointmentDate(currentDate);
    };

    const onTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || appointmentTime;
        setShowTimePicker(Platform.OS === 'ios');
        setAppointmentTime(currentTime);
    };

    const confirmAppointment = async () => {
        try {
            setIsLoading(true);
            const appointmentSchedule = new Date(
                appointmentDate.getFullYear(),
                appointmentDate.getMonth(),
                appointmentDate.getDate(),
                appointmentTime.getHours(),
                appointmentTime.getMinutes()
            );

            const updateData = {
                appointmentSchedule,
                status: 'scheduled'
            };
            const url = `${process.env.EXPO_PUBLIC_BASE}/api/appointments/${selectedRequest._id}/`
            await axios.put(url, updateData);

            setIsModalVisible(false);
            fetchData(); // Refresh the appointments list
        } catch (error) {
            console.error('Error updating appointment:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.title}>{t("appointment_requests")}</Text>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    serviceRequests.map((request) => (
                        <Card key={request._id} style={styles.card}>
                            <Card.Content>
                                <Text style={styles.cardTitle}>{request.title}</Text>
                                <Text>{t("category")}: {request.category}</Text>
                                <Text>{t("sub_category")}: {request.subCategory}</Text>
                                <Text>{t("status")}: {t(`status_${request.status}`)}</Text>
                                <Text>{t("fee")}: {request.fee}</Text>
                                {request.appointmentSchedule && (
                                    <Text>{t("scheduled_for")}: {new Date(request.appointmentSchedule).toLocaleString()}</Text>
                                )}
                            </Card.Content>
                            <Card.Actions>
                                <Button
                                    mode="contained"
                                    onPress={() => handleScheduleAppointment(request)}
                                >
                                    {request.appointmentSchedule ? t("reschedule_appointment") : t("schedule_appointment")}
                                </Button>
                            </Card.Actions>
                        </Card>
                    ))
                )}
            </ScrollView>

            <Portal>
                <Modal visible={isModalVisible} onDismiss={() => setIsModalVisible(false)} contentContainerStyle={styles.modalContainer}>
                    <Surface style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>
                                {selectedRequest?.appointmentSchedule ? t("reschedule_appointment") : t("schedule_appointment")}
                            </Text>
                            <IconButton icon="close" size={24} onPress={() => setIsModalVisible(false)} />
                        </View>

                        <View style={styles.dateTimeContainer}>
                            <View style={styles.dateTimeItem}>
                                <Text style={styles.dateTimeLabel}>{t("date")}</Text>
                                <Button
                                    mode="outlined"
                                    onPress={() => setShowDatePicker(true)}
                                    style={styles.dateTimeButton}
                                >
                                    {appointmentDate.toLocaleDateString()}
                                </Button>
                                {showDatePicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={appointmentDate}
                                        mode="date"
                                        is24Hour={false}
                                        display="default"
                                        onChange={onDateChange}
                                    />
                                )}
                            </View>

                            <View style={styles.dateTimeItem}>
                                <Text style={styles.dateTimeLabel}>{t("time")}</Text>
                                <Button
                                    mode="outlined"
                                    onPress={() => setShowTimePicker(true)}
                                    style={styles.dateTimeButton}
                                >
                                    {appointmentTime.toLocaleTimeString()}
                                </Button>
                                {showTimePicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={appointmentTime}
                                        mode="time"
                                        is24Hour={false}
                                        display="default"
                                        onChange={onTimeChange}
                                    />
                                )}
                            </View>
                        </View>

                        <View style={styles.modalActions}>
                            <Button mode="outlined" onPress={() => setIsModalVisible(false)} style={styles.actionButton}>
                                {t("cancel")}
                            </Button>
                            <Button mode="contained" onPress={confirmAppointment} style={styles.actionButton}>
                                {t("confirm")}
                            </Button>
                        </View>
                    </Surface>
                </Modal>
            </Portal>

            <BottomBar navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 80, // Adjust this value based on your BottomBar height
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        marginBottom: 15,
        marginHorizontal: 10,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContent: {
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        width: '100%',
        maxWidth: 400,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    dateTimeContainer: {
        marginBottom: 20,
    },
    dateTimeItem: {
        marginBottom: 15,
    },
    dateTimeLabel: {
        fontSize: 16,
        marginBottom: 5,
    },
    dateTimeButton: {
        width: '100%',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 1,
        marginHorizontal: 5,
    },
});