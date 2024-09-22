import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Modal, Text, Button, Card } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { getUserData } from '../../../utility';

const AppointmentModal = ({ visible, onDismiss, selectedDate, t, navigation }) => {
    const [appointments, setAppointments] = useState([])
    const fetchTodayAppointments = async () => {
        try {
            const { user } = await getUserData();

            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE}/api/appointments/${user.role}/${user._id}/day`);
            console.log(response.data);
            setAppointments(response.data)

        } catch (err) {
            console.error("Error fetching reviews:", err);
        }
    };
    useEffect(() => {
        fetchTodayAppointments()
    }, [])
    const renderAppointmentCard = (appointment) => (
        <Card key={appointment.id} style={styles.card}>
            <Card.Content>
                <View style={styles.cardHeader}>
                    <View>
                        <Text style={styles.cardTitle}>{appointment?.title}</Text>
                        <Text style={styles.cardSubtitle}>{appointment?.time}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: appointment?.status === 'Confirmed' ? '#E7F3FF' : '#FFF4E5' }]}>
                        <Text style={[styles.statusText, { color: appointment?.status === 'Confirmed' ? '#1E88E5' : '#FFA000' }]}>{appointment.status}</Text>
                    </View>
                </View>
                <View style={styles.cardDetails}>
                    <MaterialIcons name="person" size={16} color="#757575" />
                    <Text style={styles.cardDetailText}>{appointment?.clientName}</Text>
                </View>
            </Card.Content>
        </Card>
    );

    return (
        <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{selectedDate} {t("dashboard.appointments_for")} </Text>
                <ScrollView style={styles.scrollView}>
                    {appointments?.length > 0 ? appointments.map(renderAppointmentCard) :
                        <Text style={styles.noDataText}>{t("dashboard.no_appointments_today")}</Text>}
                </ScrollView>
                <Button mode="contained" onPress={() => { navigation.navigate("Appointments") }} style={styles.seeAllButton}>
                    {t("dashboard.see_all_appointments")}
                </Button>
                <Button mode="outlined" onPress={onDismiss} style={styles.closeButton}>
                    {t("dashboard.close")}
                </Button>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    scrollView: {
        maxHeight: 400,
    },
    card: {
        marginBottom: 15,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    cardSubtitle: {
        fontSize: 14,
        color: '#757575',
    },
    statusBadge: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    cardDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardDetailText: {
        marginLeft: 5,
        fontSize: 14,
        color: '#757575',
    },
    seeAllButton: {
        marginTop: 20,
        marginBottom: 10,
    },
    closeButton: {
        marginTop: 10,
    },
});

export default AppointmentModal;