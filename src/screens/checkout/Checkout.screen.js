import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { Button, RadioButton, Snackbar } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { globalStyles } from '../../styles/Global.styles';
import BottomBar from '../../components/common/BottomBar';
import AppointmentDetailsModal from '../../components/common/AppointmentDetailsModal';
import { getUserData } from '../../utility';
import paymentOptions from '../../mock-data/paymentOptions.json';

const availableSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'
];

export default function CheckoutScreen({ route, navigation }) {
    const { t } = useTranslation();
    const [paymentMethod, setPaymentMethod] = useState('bkash');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [serviceTypeItems, setServiceTypeItems] = useState([
        { label: t('video_call'), value: 'video call' },
        { label: t('audio_call'), value: 'audio call' },
        { label: t('chat'), value: 'chat' }
    ]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [consumer, setConsumer] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [slotModalVisible, setSlotModalVisible] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { user } = await getUserData();
                setConsumer(user._id);
            } catch (error) {
                console.error('Error fetching user data:', error);
                showSnackbar(t('error_fetching_user_data'));
            }
        };
        fetchUserData();
    }, []);

    const showSnackbar = useCallback((message) => {
        setSnackbarMessage(message);
        setSnackbarVisible(true);
    }, []);

    const handleDateSelect = useCallback((date) => {
        setSelectedDate(date.dateString);
        setSlotModalVisible(true);
    }, []);

    const handleSlotSelect = useCallback((slot) => {
        setSelectedSlot(slot);
        setSlotModalVisible(false);
    }, []);

    const handleProceed = useCallback(async () => {
        if (!selectedDate || !selectedSlot || selectedTypes.length === 0) {
            showSnackbar(t('please_fill_all_fields'));
            return;
        }

        try {
            await axios.post(`${process.env.EXPO_PUBLIC_BASE}/api/appointments`, {
                paymentMethod,
                serviceBy: selectedTypes,
                consumer,
                title: `${route.params?.designation} ${t('by_service')}`,
                appointmentSchedule: {
                    date: selectedDate,
                    slot: selectedSlot
                },
                ...route.params
            });
            setModalVisible(true);
            setTimeout(() => {
                setModalVisible(false);
                navigation.navigate('Dashboard');
            }, 3000);
        } catch (error) {
            console.error('Error submitting data:', error);
            showSnackbar(t('appointment_creation_failed'));
        }
    }, [paymentMethod, selectedTypes, consumer, selectedDate, selectedSlot, route.params, t, showSnackbar]);

    const renderPaymentOptions = useCallback(() => (
        <View style={styles.paymentOptionsContainer}>
            <Text style={styles.sectionTitle}>{t('payment_method')}</Text>
            <View style={styles.paymentOptionsRow}>
                {paymentOptions.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.paymentOption,
                            paymentMethod === option.value && styles.selectedPaymentOption
                        ]}
                        onPress={() => setPaymentMethod(option.value)}
                    >
                        <Image source={{ uri: option.imageUri }} style={styles.paymentIcon} />
                        <Text style={styles.paymentOptionText}>{t(option.title)}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    ), [paymentMethod, t]);

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView contentContainerStyle={[globalStyles.bottom_bar_height, styles.scrollViewContainer]}>
                {renderPaymentOptions()}

                <View style={styles.serviceTypeContainer}>
                    <Text style={styles.sectionTitle}>{t('service_type')}</Text>
                    <DropDownPicker
                        open={dropdownOpen}
                        value={selectedTypes}
                        items={serviceTypeItems}
                        setOpen={setDropdownOpen}
                        setValue={setSelectedTypes}
                        setItems={setServiceTypeItems}
                        multiple={true}
                        mode="BADGE"
                        badgeDotColors={['#e76f51', '#00b4d8', '#e9c46a']}
                        placeholder={t('select_service_types')}
                    />
                </View>

                <View style={styles.calendarContainer}>
                    <Text style={styles.sectionTitle}>{t('select_date')}</Text>
                    <Calendar
                        onDayPress={handleDateSelect}
                        markedDates={{
                            [selectedDate]: { selected: true, selectedColor: '#6D30ED' }
                        }}
                        minDate={new Date().toISOString().split('T')[0]}
                        theme={{
                            todayTextColor: '#6D30ED',
                            selectedDayBackgroundColor: '#6D30ED',
                            arrowColor: '#6D30ED',
                        }}
                    />
                </View>

                <View style={styles.selectedDateContainer}>
                    <Text style={styles.selectedDateText}>
                        {selectedDate ? `${t('selected_date')}: ${selectedDate}` : t('no_date_selected')}
                    </Text>
                    <Text style={styles.selectedSlotText}>
                        {selectedSlot ? `${t('selected_slot')}: ${selectedSlot}` : t('no_slot_selected')}
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={handleProceed}
                        disabled={!paymentMethod || selectedTypes.length === 0 || !selectedDate || !selectedSlot}
                        style={styles.proceedButton}
                    >
                        {t('proceed_to_pay')}
                    </Button>
                </View>
            </ScrollView>

            <Modal
                visible={slotModalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setSlotModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{t('select_time_slot')}</Text>
                        {availableSlots.map((slot, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.slotButton,
                                    selectedSlot === slot && styles.selectedSlotButton
                                ]}
                                onPress={() => handleSlotSelect(slot)}
                            >
                                <Text style={[
                                    styles.slotButtonText,
                                    selectedSlot === slot && styles.selectedSlotButtonText
                                ]}>{slot}</Text>
                            </TouchableOpacity>
                        ))}
                        <Button onPress={() => setSlotModalVisible(false)} style={styles.closeButton}>
                            {t('close')}
                        </Button>
                    </View>
                </View>
            </Modal>

            <BottomBar navigation={navigation} />
            <AppointmentDetailsModal
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                appointmentDetails={{
                    paymentMethod,
                    serviceBy: selectedTypes,
                    date: selectedDate,
                    slot: selectedSlot,
                    ...route.params
                }}
            />
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                duration={3000}
                style={styles.snackbar}
            >
                {snackbarMessage}
            </Snackbar>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        alignItems: 'center',
        paddingBottom: 20,
    },
    paymentOptionsContainer: {
        width: '90%',
        marginVertical: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    paymentOptionsRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 10,
    },
    paymentOption: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    selectedPaymentOption: {
        borderColor: '#6D30ED',
        backgroundColor: '#f0e6ff',
    },
    paymentOptionText: {
        fontSize: 14,
        marginTop: 5,
    },
    serviceTypeContainer: {
        width: '90%',
        marginVertical: 20,
        zIndex: 1000,
    },
    calendarContainer: {
        width: '90%',
        marginVertical: 20,
    },
    selectedDateContainer: {
        width: '90%',
        marginVertical: 10,
    },
    selectedDateText: {
        fontSize: 16,
        marginBottom: 5,
    },
    selectedSlotText: {
        fontSize: 16,
    },
    buttonContainer: {
        width: '90%',
        marginTop: 20,
    },
    proceedButton: {
        backgroundColor: '#6D30ED',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    slotButton: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    selectedSlotButton: {
        backgroundColor: '#f0e6ff',
    },
    slotButtonText: {
        fontSize: 16,
        textAlign: 'center',
    },
    selectedSlotButtonText: {
        color: '#6D30ED',
        fontWeight: 'bold',
    },
    closeButton: {
        marginTop: 15,
    },
    paymentIcon: {
        width: 40,
        height: 40,
    },
    snackbar: {
        backgroundColor: '#333',
    },
});