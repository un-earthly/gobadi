import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { Image, ScrollView, StyleSheet, Text, View, Modal, TextInput, TouchableOpacity } from "react-native";
import { Appbar, Divider, ActivityIndicator, Button, Snackbar, Card } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { globalStyles } from "../../styles/Global.styles";
import BottomBar from "../../components/common/BottomBar";
import axios from 'axios';
import { getUserData } from '../../utility';
import { bangladeshDistricts } from '../../../districts';
import { Dropdown } from 'react-native-paper-dropdown';

export default function ProfileScreen({ navigation }) {
    const { t } = useTranslation();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [profileModalVisible, setProfileModalVisible] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({});
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const getBanglaDistrictName = (districtName) => {
        const district = bangladeshDistricts.find(d => d.name === districtName);
        return district ? district.name_bn : districtName;
    };
    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setIsLoading(true);
            const { user } = await getUserData();
            const response = await axios.get(`${process.env.EXPO_PUBLIC_BASE}/api/user/${user._id}`);
            setUser(response.data);
            setUpdatedUser(response.data);
            if (response.data.district) {
                setSelectedDistrict(response.data.district);
            }
        } catch (error) {
            showSnackbar(t("error_fetching_data"));
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
            setProfileModalVisible(false);
            showSnackbar(t("profile_updated_successfully"));
        } catch (error) {
            showSnackbar(t("error_updating_data"));
            console.error('Error updating user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdatePassword = async () => {
        if (newPassword !== confirmPassword) {
            setError(t("passwords_do_not_match"));
            return;
        }
        try {
            setIsLoading(true);

            // Send both oldPassword and newPassword in the request
            await axios.put(`${process.env.EXPO_PUBLIC_BASE}/api/auth/${user._id}/password`, {
                oldPassword: currentPassword,  // Add the old password here
                newPassword
            });

            setPasswordModalVisible(false);
            showSnackbar(t("password_updated_successfully"));
        } catch (error) {
            showSnackbar(t("error_updating_password"));
            console.error('Error updating password:', error);
        } finally {
            setIsLoading(false);
        }
    };


    const showSnackbar = (message) => {
        setSnackbarMessage(message);
        setSnackbarVisible(true);
    };

    const renderProfileModalContent = () => {
        return (
            <View style={styles.modalContent}>
                <ScrollView contentContainerStyle={styles.modalScrollView}>
                    <Text style={styles.modalTitle}>{t("update_profile")}</Text>
                    {renderInput("name", "text", "face-man")}
                    {renderInput("nid", "numeric", "card-account-details")}
                    {renderInput("mobile", "phone-pad", "phone")}
                    {renderInput("age", "numeric", "calendar")}

                    {user?.role === 'provider' && (
                        <>
                            {renderInput("organization", "text", "domain")}
                            {renderInput("designation", "text", "badge-account")}
                            {renderInput("experience", "numeric", "briefcase")}
                            {renderInput("availableTime", "text", "clock")}
                        </>
                    )}

                    {user?.role === 'consumer' && (
                        <>
                            {renderInput("fish", "numeric", "fish")}
                            {renderInput("hen", "numeric", "chicken")}
                            {renderInput("cow", "numeric", "cow")}
                            {renderInput("goat", "numeric", "goat")}
                            {renderInput("duck", "numeric", "duck")}
                        </>
                    )}

                    <View style={styles.modalButtons}>
                        <Button onPress={() => setProfileModalVisible(false)} style={styles.cancelButton} labelStyle={styles.buttonText}>
                            {t("cancel")}
                        </Button>
                        <Button onPress={handleUpdateProfile} mode="contained" style={styles.updateButton} labelStyle={styles.buttonText}>
                            {t("update")}
                        </Button>
                    </View>
                </ScrollView>
            </View>
        );
    };

    const renderPasswordModalContent = () => {
        return (
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{t("update_password")}</Text>
                {renderInput("newPassword", "default", "lock", newPassword, setNewPassword, true)}
                {renderInput("confirmPassword", "default", "lock-check", confirmPassword, setConfirmPassword, true)}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}
                <View style={styles.modalButtons}>
                    <Button onPress={() => setPasswordModalVisible(false)} style={styles.cancelButton} labelStyle={styles.buttonText}>
                        {t("cancel")}
                    </Button>
                    <Button onPress={handleUpdatePassword} mode="contained" style={styles.updateButton} labelStyle={styles.buttonText}>
                        {t("update_password")}
                    </Button>
                </View>
            </View>
        );
    };

    const renderInput = (field, keyboardType, icon, value, setValue, isPassword = false) => (
        <View style={styles.inputContainer}>
            <MaterialCommunityIcons name={icon} size={24} color="#6200ee" style={styles.inputIcon} />
            <TextInput
                style={styles.input}
                value={value || updatedUser[field]?.toString()}
                onChangeText={(text) => setValue ? setValue(text) : setUpdatedUser({ ...updatedUser, [field]: keyboardType === 'numeric' ? parseInt(text) || '' : text })}
                placeholder={t(field)}
                keyboardType={keyboardType}
                secureTextEntry={isPassword}
            />
        </View>
    );

    const renderInfoItem = (label, value, icon) => (
        <Card style={styles.infoCard}>
            <Card.Content style={styles.infoCardContent}>
                <MaterialCommunityIcons name={icon} size={24} color="#6200ee" />
                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoLabel}>{t(label)}</Text>
                    <Text style={styles.infoValue}>{value || t("not_added")}</Text>
                </View>
            </Card.Content>
        </Card>
    );

    if (isLoading) {
        return (
            <SafeAreaView style={[globalStyles.container, styles.loadingContainer]}>
                <ActivityIndicator size="large" color="#6200ee" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView contentContainerStyle={[globalStyles.bottom_bar_height, styles.scrollViewContent]}>
                <View style={styles.profileContainer}>
                    <Image
                        style={styles.avatar}
                        source={{ uri: user?.avatar || 'https://randomuser.me/api/portraits/men/64.jpg' }}
                    />
                    <Text style={styles.name}>{user?.name}</Text>
                    <Text style={styles.role}>{t(user?.role)}</Text>

                    <View style={styles.infoContainer}>
                        {renderInfoItem("nid", user?.nid, "card-account-details")}
                        {renderInfoItem("mobile", user?.mobile, "phone")}
                        {renderInfoItem("district", getBanglaDistrictName(user?.district), "map-marker")}
                        {renderInfoItem("age", user?.age, "calendar")}

                        {user?.role === 'provider' && (
                            <>
                                {renderInfoItem("organization", user?.organization, "domain")}
                                {renderInfoItem("designation", user?.designation, "badge-account")}
                                {renderInfoItem("experience", user?.experience, "briefcase")}
                                {renderInfoItem("available_time", user?.availableTime, "clock")}
                            </>
                        )}

                        {user?.role === 'consumer' && (
                            <>
                                {renderInfoItem("fish", user?.fish, "fish")}
                                {renderInfoItem("hen", user?.hen, "chicken")}
                                {renderInfoItem("cow", user?.cow, "cow")}
                                {renderInfoItem("goat", user?.goat, "goat")}
                                {renderInfoItem("duck", user?.duck, "duck")}
                            </>
                        )}
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button
                            mode="contained"
                            onPress={() => setProfileModalVisible(true)}
                            style={styles.updateButton}
                            labelStyle={styles.buttonText}
                            icon="account-edit"
                        >
                            {t("update_profile")}
                        </Button>
                        <Button
                            mode="outlined"
                            onPress={() => setPasswordModalVisible(true)}
                            style={styles.updateButton}
                            labelStyle={styles.buttonText}
                            icon="lock-reset"
                        >
                            {t("update_password")}
                        </Button>
                    </View>
                </View>
            </ScrollView>

            <Modal
                animationType="slide"
                transparent={true}
                visible={profileModalVisible}
                onRequestClose={() => setProfileModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    {renderProfileModalContent()}
                </View>
            </Modal>

            <Modal
                animationType="slide"
                transparent={true}
                visible={passwordModalVisible}
                onRequestClose={() => setPasswordModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    {renderPasswordModalContent()}
                </View>
            </Modal>

            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                style={styles.snackbar}
            >
                {snackbarMessage}
            </Snackbar>

            <BottomBar navigation={navigation} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileContainer: {
        padding: 16,
        alignItems: 'center',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 16,
    },
    name: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#333',
    },
    role: {
        fontSize: 18,
        color: '#6200ee',
        marginBottom: 24,
        textTransform: 'capitalize',
    },
    infoContainer: {
        width: '100%',
        marginBottom: 24,
    },
    infoCard: {
        marginBottom: 12,
        elevation: 3,
    },
    infoCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoTextContainer: {
        marginLeft: 16,
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    updateButton: {
        marginVertical: 8,
        flex: 1,
        marginHorizontal: 4,
        borderRadius: 8,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
    },
    modalScrollView: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        margin: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: '#6200ee',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        paddingVertical: 8,
        fontSize: 16,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    cancelButton: {
        flex: 1,
        marginRight: 8,
    },
    updateButton: {
        flex: 1,
        marginLeft: 8,
    },
    errorText: {
        color: 'red',
        marginBottom: 16,
        textAlign: 'center',
    },
    snackbar: {
        backgroundColor: '#333',
    },
});