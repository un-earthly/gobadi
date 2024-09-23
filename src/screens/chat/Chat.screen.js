import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '../../../firebaseConfig';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, where, getFirestore } from 'firebase/firestore';
import { signInWithCustomToken, getAuth } from 'firebase/auth';
import axios from 'axios';
import { Button, IconButton, Surface } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';

const ChatScreen = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { t } = useTranslation()
    const { user: data } = useAuth()
    const user = data.user
    const fetchAppointments = useCallback(async () => {
        if (!user) return;
        setIsLoading(true);
        setError(null);
        try {
            const endpoint = user.role === 'provider' ? 'provider' : 'consumer';
            console.log(`${process.env.EXPO_PUBLIC_BASE}/api/rooms/${endpoint}`, user)
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE}/api/rooms/${endpoint}`, {
                headers: { Authorization: data.token }
            });
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setError('Failed to load appointments. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchAppointments();
        }
    }, [user, fetchAppointments]);

    useEffect(() => {
        if (selectedAppointment && user) {
            const unsubscribe = setupChatListener(selectedAppointment._id, (updatedMessages) => {
                setMessages(updatedMessages);
            });

            return () => unsubscribe();
        }
    }, [selectedAppointment, user]);

    const setupChatListener = (appointmentId, callback) => {
        const q = query(
            collection(db, 'chats', appointmentId, 'messages'),
            orderBy('createdAt', 'desc')
        );

        return onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate()
            }));
            callback(messages);
        }, (error) => {
            console.error("Error listening to messages: ", error);
            setError('Unable to load messages. Please check your connection and permissions.');
        });
    };
    const sendMessage = async () => {
        if (newMessage.trim() && selectedAppointment && user) {
            try {
                await addDoc(collection(db, 'chats', selectedAppointment._id, 'messages'), {
                    text: newMessage,
                    createdAt: serverTimestamp(),
                    userId: user._id,
                    userRole: user.role
                });
                setNewMessage('');
            } catch (error) {
                console.error("Error sending message: ", error);
                setError('Failed to send message. Please check your permissions and try again.');
            }
        }
    };
    const renderAppointment = ({ item }) => (
        <TouchableOpacity onPress={() => setSelectedAppointment(item)} style={styles.appointmentItem}>
           
            <Text style={styles.appointmentTitle}>{item.title}</Text>
            <Text style={styles.appointmentInfo}>
                {user.role === 'provider' ? `${t('consumer')}: ${item.consumer.name}` : `${t('provider')}: ${item.provider.name}`}
            </Text>
            <Text style={styles.appointmentInfo}>{t("appointment_date")}: {new Date(`${item.appointmentSchedule.date}`).getFullYear() + "/" + new Date(`${item.appointmentSchedule.date}`).getDate() + "/" + new Date(`${item.appointmentSchedule.date}`).getMonth() + " " + `${item.appointmentSchedule.slot}`}</Text>
        </TouchableOpacity>
    );

    const renderMessage = ({ item }) => {
        const isCurrentUser = user && item.userId === user._id;
        return (
            <View style={[
                styles.messageContainer,
                isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage
            ]}>
                <Text style={styles.userName}>{item.userRole}</Text>
                <Text style={styles.messageText}>{item.text}</Text>
            </View>
        );
    };

    if (isLoading) {
        return (
            <View style={styles.centeredContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centeredContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <Button mode="contained" onPress={fetchAppointments} style={styles.retryButton}>
                    Retry
                </Button>
            </View>
        );
    }

    if (!selectedAppointment) {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>{t("your_messages")}</Text>
                {appointments.length === 0 ? (
                    <Surface style={styles.surface}>
                        <View style={styles.content}>
                            <IconButton icon="alert-circle-outline" size={40} color="#6200ea" />
                            <Text style={styles.text}>{t("noMessageFound")}</Text>
                        </View>
                    </Surface>
                ) : (
                    <FlatList
                        data={appointments}
                        keyExtractor={item => item._id}
                        renderItem={renderAppointment}
                    />
                )}
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setSelectedAppointment(null)} style={styles.backButton}>
                <Text style={styles.backButtonText}>← Back to Appointments</Text>
            </TouchableOpacity>
            <FlatList
                data={messages}
                inverted
                keyExtractor={item => item.id}
                renderItem={renderMessage}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={newMessage}
                    onChangeText={setNewMessage}
                    placeholder="Type a message"
                />
                <Button mode="contained" onPress={sendMessage} disabled={!user || newMessage.trim() === ''}>
                    Send
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    appointmentItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    appointmentTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    appointmentInfo: {
        fontSize: 14,
        color: '#666',
    },
    messageContainer: {
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
        maxWidth: '80%',
    },
    currentUserMessage: {
        alignSelf: 'flex-end',
        backgroundColor: '#DCF8C6',
    },
    otherUserMessage: {
        alignSelf: 'flex-start',
        backgroundColor: '#FFFFFF',
    },
    userName: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
    },
    backButton: {
        padding: 10,
        marginBottom: 10,
    },
    backButtonText: {
        fontSize: 16,
        color: 'blue',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginBottom: 10,
    },
    retryButton: {
        marginTop: 10,
    },
    noAppointmentsText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    surface: {
        padding: 20,
        margin: 20,
        borderRadius: 8,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    content: {
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#6200ea',
    },
});

export default ChatScreen;
