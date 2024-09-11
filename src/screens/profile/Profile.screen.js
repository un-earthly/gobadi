import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, Text, View, Modal, TextInput, TouchableOpacity } from "react-native";
import { Appbar, Divider, ActivityIndicator, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Feather } from '@expo/vector-icons';
import { globalStyles } from "../../styles/Global.styles";
import BottomBar from "../../components/common/BottomBar";
import axios from 'axios';
import { getUserData } from '../../utility';

export default function ProfileScreen({ navigation }) {
    const { t } = useTranslation();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setIsLoading(true);
            const { _id } = await getUserData();
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE}/api/user/${_id}`);
            setUser(response.data);
            setUpdatedUser(response.data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateProfile = async () => {
        try {
            setIsLoading(true);
            const response = await axios.put(`${process.env.EXPO_PUBLIC_BASE}/api/user/${user._id}`, updatedUser);
            setUser(response.data);
            setModalVisible(false);
        } catch (error) {
            console.error('Error updating user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const renderModalContent = () => {
        return (
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{t("update_profile")}</Text>
                <TextInput
                    style={styles.input}
                    value={updatedUser.name}
                    onChangeText={(text) => setUpdatedUser({ ...updatedUser, name: text })}
                    placeholder={t("name")}
                />
                {user?.role === 'provider' ? (
                    <>
                        <TextInput
                            style={styles.input}
                            value={updatedUser.specialization}
                            onChangeText={(text) => setUpdatedUser({ ...updatedUser, specialization: text })}
                            placeholder={t("specialization")}
                        />
                        <TextInput
                            style={styles.input}
                            value={updatedUser.fee?.toString()}
                            onChangeText={(text) => setUpdatedUser({ ...updatedUser, fee: text })}
                            placeholder={t("fee")}
                            keyboardType="numeric"
                        />
                    </>
                ) : (
                    <>
                        <TextInput
                            style={styles.input}
                            value={updatedUser.duck?.toString()}
                            onChangeText={(text) => setUpdatedUser({ ...updatedUser, duck: parseInt(text) || 0 })}
                            placeholder={t("duck")}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            value={updatedUser.hen?.toString()}
                            onChangeText={(text) => setUpdatedUser({ ...updatedUser, hen: parseInt(text) || 0 })}
                            placeholder={t("hen")}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            value={updatedUser.cow?.toString()}
                            onChangeText={(text) => setUpdatedUser({ ...updatedUser, cow: parseInt(text) || 0 })}
                            placeholder={t("cow")}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            value={updatedUser.goat?.toString()}
                            onChangeText={(text) => setUpdatedUser({ ...updatedUser, goat: parseInt(text) || 0 })}
                            placeholder={t("goat")}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            value={updatedUser.fish?.toString()}
                            onChangeText={(text) => setUpdatedUser({ ...updatedUser, fish: parseInt(text) || 0 })}
                            placeholder={t("fish")}
                            keyboardType="numeric"
                        />
                    </>
                )}
                <View style={styles.modalButtons}>
                    <Button onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                        {t("cancel")}
                    </Button>
                    <Button onPress={handleUpdateProfile} mode="contained" style={styles.updateButton}>
                        {t("update")}
                    </Button>
                </View>
            </View>
        );
    };

    if (isLoading) {
        return (
            <SafeAreaView style={globalStyles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView contentContainerStyle={globalStyles.bottom_bar_height}>
                <View style={styles.profileContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.avatar}
                            source={{ uri: user?.avatar || 'https://randomuser.me/api/portraits/men/64.jpg' }}
                        />
                    </View>
                    <Text style={styles.name}>{user?.name}</Text>
                    <Text style={styles.role}>{t(user?.role)}</Text>

                    {user?.role === 'provider' ? (
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoLabel}>{t("specialization")}</Text>
                            <Text style={styles.infoValue}>{user?.specialization}</Text>
                            <Text style={styles.infoLabel}>{t("fee")}</Text>
                            <Text style={styles.infoValue}>{user?.fee} {t("currency")}</Text>
                        </View>
                    ) : (
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoLabel}>{t("livestock")}</Text>
                            {user?.duck > 0 && <Text style={styles.infoValue}>{t("duck")}: {user?.duck}</Text>}
                            {user?.hen > 0 && <Text style={styles.infoValue}>{t("hen")}: {user?.hen}</Text>}
                            {user?.cow > 0 && <Text style={styles.infoValue}>{t("cow")}: {user?.cow}</Text>}
                            {user?.goat > 0 && <Text style={styles.infoValue}>{t("goat")}: {user?.goat}</Text>}
                            {user?.fish > 0 && <Text style={styles.infoValue}>{t("fish")}: {user?.fish}</Text>}
                        </View>
                    )}

                    <View style={styles.contactInfo}>
                        <View style={styles.contactItem}>
                            <Feather name="phone-call" size={24} color="black" />
                            <Text style={styles.contactText}>{t("call")}</Text>
                        </View>
                        <View style={styles.contactItem}>
                            <AntDesign name="videocamera" size={24} color="black" />
                            <Text style={styles.contactText}>{t("video_call")}</Text>
                        </View>
                        <View style={styles.contactItem}>
                            <Feather name="message-square" size={24} color="black" />
                            <Text style={styles.contactText}>{t("message")}</Text>
                        </View>
                    </View>

                    <Button
                        mode="contained"
                        onPress={() => setModalVisible(true)}
                        style={styles.updateProfileButton}
                    >
                        {t("update_profile")}
                    </Button>
                </View>
            </ScrollView>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                {renderModalContent()}
            </Modal>
            <BottomBar navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        padding: 20,
        alignItems: 'center',
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    imageContainer: {
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    role: {
        fontSize: 18,
        color: '#666',
        marginBottom: 20,
    },
    infoContainer: {
        width: '100%',
        marginBottom: 20,
    },
    infoLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    infoValue: {
        fontSize: 16,
        marginBottom: 10,
    },
    contactInfo: {
        width: '100%',
        marginBottom: 20,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    contactText: {
        marginLeft: 15,
        fontSize: 16,
    },
    updateProfileButton: {
        width: '100%',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        marginTop: 50,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flex: 1,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        flex: 1,
        marginRight: 10,
    },
    updateButton: {
        flex: 1,
        marginLeft: 10,
    },
});