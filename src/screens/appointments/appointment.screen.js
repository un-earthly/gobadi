import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Modal, Portal, TextInput } from 'react-native-paper';
import { useTranslation } from "react-i18next";
import axios from 'axios';
import { getUserData } from "../../utility";
import BottomBar from "../../components/common/BottomBar";
import { globalStyles } from "../../styles/Global.styles";
import { SafeAreaView } from 'react-native-safe-area-context';
import { dummyServiceRequests } from "../../mock-data/serviceRequests"
export default function AppointmentsPage({ navigation }) {
    const { t } = useTranslation();
    const [serviceRequests, setServiceRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');

    useEffect(() => {
        fetchServiceRequests();
    }, []);

    // const fetchServiceRequests = async () => {
    //     try {
    //         const storedUserData = await getUserData();
    //         if (storedUserData && storedUserData._id) {
    //             const response = await axios.get(`/api/users/${storedUserData._id}/service-requests`);
    //             setServiceRequests(response.data);
    //         } else {
    //             console.error("User ID not found");
    //         }
    //     } catch (error) {
    //         console.error("Error fetching service requests:", error);
    //     }
    // };

    const handleScheduleAppointment = (request) => {
        setSelectedRequest(request);
        setIsModalVisible(true);
    };
    const fetchServiceRequests = async () => {
        // Simulating an API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setServiceRequests(dummyServiceRequests);
    };
    // const confirmAppointment = async () => {
    //     try {
    //         // Implement your API call to schedule the appointment
    //         await axios.post(`/api/appointments`, {
    //             requestId: selectedRequest._id,
    //             date: appointmentDate,
    //             time: appointmentTime
    //         });
    //         // Refresh the service requests
    //         fetchServiceRequests();
    //         setIsModalVisible(false);
    //     } catch (error) {
    //         console.error("Error scheduling appointment:", error);
    //     }
    // };
    const confirmAppointment = async () => { }


    return (
        <SafeAreaView >
            {/* <View style={globalStyles.container}> */}
                <ScrollView contentContainerStyle={globalStyles.bottom_bar_height}>
                    <Text style={styles.title}>{t("appointment_requests")}</Text>
                    {serviceRequests.map((request) => (
                        <Card key={request._id} style={styles.card}>
                            <Card.Content>
                                <Text style={styles.cardTitle}>{request.service}</Text>
                                <Text>{t("requested_by")}: {request.userName}</Text>
                                <Text>{t("requested_date")}: {new Date(request.requestedDate).toLocaleDateString()}</Text>
                                <Text>{t("status")}: {request.status}</Text>
                            </Card.Content>
                            <Card.Actions>
                                <Button onPress={() => handleScheduleAppointment(request)}>
                                    {t("schedule_appointment")}
                                </Button>
                            </Card.Actions>
                        </Card>
                    ))}
                </ScrollView>

                <Portal>
                    <Modal visible={isModalVisible} onDismiss={() => setIsModalVisible(false)}>
                        <Card>
                            <Card.Content>
                                <Text style={styles.modalTitle}>{t("schedule_appointment")}</Text>
                                <TextInput
                                    label={t("date")}
                                    value={appointmentDate}
                                    onChangeText={setAppointmentDate}
                                    style={styles.input}
                                />
                                <TextInput
                                    label={t("time")}
                                    value={appointmentTime}
                                    onChangeText={setAppointmentTime}
                                    style={styles.input}
                                />
                            </Card.Content>
                            <Card.Actions>
                                <Button onPress={() => setIsModalVisible(false)}>{t("cancel")}</Button>
                                <Button onPress={confirmAppointment}>{t("confirm")}</Button>
                            </Card.Actions>
                        </Card>
                    </Modal>
                </Portal>

                <BottomBar navigation={navigation} />
            {/* </View> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    card: {
        marginBottom: 15,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    input: {
        marginBottom: 10,
    },
});