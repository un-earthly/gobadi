import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Badge, Card, Text } from "react-native-paper";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import BottomBar from "../../components/common/BottomBar";
import { globalStyles } from "../../styles/Global.styles";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { cDstyles } from "./styles/ConsumerDashboard.styles";
import { useEffect, useId, useState } from "react";
import { getUserData } from "../../utility";
import axios from "axios";
import { userProfileUrl } from "../../api/routes";

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
                <View style={styles.row}>
                    <Avatar.Image size={48} source={{ uri: appointment.consumer.avatar }} />
                    <View style={styles.info}>
                        <Text style={styles.name}>{appointment.consumer.name}</Text>
                        <Text style={styles.role}>Consumer</Text>
                    </View>
                </View>
            </Card.Content>
            <Card.Actions style={styles.actions}>
                {/* <View style={styles.iconRow}>
                    {appointment.serviceBy.includes('video call') && <MaterialIcons name="videocam" size={24} color="black" />}
                    {appointment.serviceBy.includes('audio call') && <MaterialIcons name="phone" size={24} color="black" />}
                </View>
                <View style={styles.iconRow}>
                    <MaterialIcons name="calendar-today" size={24} color="black" />
                    <Text style={styles.date}>
                        {new Date(appointment.createdAt).toLocaleDateString()}
                    </Text>
                </View> */}
                <Text style={styles.fee}>${appointment.fee}</Text>
            </Card.Actions>
        </Card>
    );
};

export default function ConsumerDashboard({ navigation }) {
    const { t } = useTranslation();
    const [appointments, setAppointments] = useState();
    const [userData, setUserData] = useState(null);

    const fetchUserData = async () => {
        try {
            const storedUserData = await getUserData();
            if (storedUserData && storedUserData._id) {
                const userId = storedUserData._id;

                // Fetch user profile
                const appointmentResponse = await axios.get(process.env.EXPO_PUBLIC_BASE + "/api/appointments/consumer/" + userId);
                setAppointments(appointmentResponse.data);
                const userResponse = await axios.get(userProfileUrl(userId));
                setUserData(userResponse.data);

            } else {
                console.error("User data or user ID not found in storage");
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };
    useEffect(() => {
        fetchUserData()
    }, [])
    return (

        <View style={globalStyles.container}>
            <ScrollView>
                <View style={{
                    rowGap: 20
                }}>
                    <View style={{
                        flexDirection: "row",
                        columnGap: 12,
                    }}>

                        <View style={{ flex: 1 }}>

                            <View style={{
                                flexDirection: "row",
                                columnGap: 4,
                                flexWrap: "nowrap",
                            }}>

                                {["cow", "goat", "hen", "duck", "fish"].map((n, idx) => {
                                    return <View key={idx} style={{
                                        backgroundColor: "#FFEFF7",
                                        borderRadius: 4,
                                        paddingVertical: 4,
                                        paddingHorizontal: 6,
                                        alignItems: "center",
                                        width: 76,
                                        height: 60,
                                        alignItems: "center"
                                    }}>
                                        <Text style={{ fontSize: 12 }}>
                                            {t(n)}
                                        </Text>
                                        <Text style={{
                                            fontSize: 18,
                                            fontWeight: 'bold',
                                        }}>
                                            {userData && userData[n]}
                                        </Text>
                                    </View>
                                })}
                            </View>
                        </View>
                    </View>
                    {!appointments ? <View style={{ rowGap: 10 }}>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "space-between"
                        }}>
                            <Text style={{ fontSize: 20, fontWeight: '600' }}>
                                {t("appointments")}
                            </Text>
                            <View style={{
                                justifyContent: "center", alignItems: "center",
                                flexDirection: "row"
                            }}>
                                <Text style={{ color: "#6D30ED" }}> See All </Text><MaterialIcons name="keyboard-arrow-right" size={24} color="#6D30ED" />
                            </View>
                        </View>
                        <View style={cDstyles.container}>
                            <View style={cDstyles.content}>
                                <FontAwesome6 name="calendar-xmark" size={48} />
                                <Text style={cDstyles.title}>{t("noAppointmentsFound")}</Text>
                                <Text style={cDstyles.subtitle}>{t("scheduleClear")}</Text>
                            </View>
                            <TouchableOpacity style={[cDstyles.addButton]} onPress={() => navigation.navigate("Menu")}>
                                <FontAwesome6 name="plus" size={24} />
                                <Text style={cDstyles.buttonText}>{t("addNewAppointment")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View> : <View>
                        {appointments.map(e => <AppointmentCard key={e._id} appointment={e} />)}</View>}


                </View>
            </ScrollView>
            <BottomBar navigation={navigation} />
        </View>
    );
}


const styles = StyleSheet.create({
    card: {
        margin: 10,
        padding: 10,
    },
    badge: {
        alignSelf: 'center',
        marginRight: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    date: {
        marginLeft: 5,
        fontSize: 12,
        color: 'gray',
    },
    fee: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});