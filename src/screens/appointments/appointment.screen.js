import React from "react";
import { ScrollView, View, FlatList } from "react-native";
import { Text, Button, Card, Divider, List, Chip, FAB, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/Global.styles";
import { availableSlots } from "../../mock-data/appointments.json";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from "./style/appointment.styles";

const appointments = [
    { id: '1', type: 'Video Call', date: '2024-08-10', time: '10:00 AM', status: 'Pending' },
    { id: '2', type: 'Audio Call', date: '2024-08-10', time: '11:00 AM', status: 'Confirmed' },
    { id: '3', type: 'Message', date: '2024-08-11', time: '02:00 PM', status: 'Pending' },
];


export default function AppointmentScreen() {
    const theme = useTheme();

    const renderAppointmentItem = ({ item }) => (
        <Card key={item.id} style={styles.appointmentCard}>
            <Card.Content>
                <View style={styles.cardHeader}>
                    <Chip icon="medical-bag" style={[styles.chip, { backgroundColor: theme.colors.primary }]}>
                        <Text style={styles.chipText}>{item.type}</Text>
                    </Chip>
                    <Chip icon="clock-outline" style={[styles.chip, { backgroundColor: theme.colors.accent }]}>
                        <Text style={styles.chipText}>{item.status}</Text>
                    </Chip>
                </View>
                <Text style={styles.dateTime}>{item.date} at {item.time}</Text>
            </Card.Content>
            <Card.Actions>
                <Button
                    mode="contained"
                    onPress={() => console.log('Approved', item.id)}
                    icon="check"
                    style={styles.actionButton}
                >
                    Approve
                </Button>
                <Button
                    mode="outlined"
                    onPress={() => console.log('Rejected', item.id)}
                    icon="close"
                    style={styles.actionButton}
                >
                    Reject
                </Button>
            </Card.Actions>
        </Card>
    );
    const renderSlotItem = ({ item }) => (
        <List.Item
            key={item.id}
            title={item.date}
            description={item.time}
            left={props => <List.Icon {...props} icon="clock-outline" color={theme.colors.primary} />}
            right={props => <Icon {...props} name="chevron-right" size={24} color={theme.colors.primary} />}
            onPress={() => console.log('Selected slot', item.id)}
            style={styles.slotItem}
        />
    );

    return (
        <SafeAreaView style={[globalStyles.container, { backgroundColor: theme.colors.background }]}>
            <Text style={styles.title}>Appointment Management</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Requested Appointments</Text>
                <FlatList
                    data={appointments}
                    renderItem={renderAppointmentItem}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <Divider style={styles.divider} />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Available Slots</Text>
                <FlatList
                    data={availableSlots}
                    renderItem={renderSlotItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            </View>

            <FAB
                style={styles.fab}
                icon="plus"
                onPress={() => console.log('Add new appointment')}
            />
        </SafeAreaView>
    );
}
