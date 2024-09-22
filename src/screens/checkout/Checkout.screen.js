// import { Image, ScrollView, Text, View, TouchableOpacity } from "react-native";
// import { globalStyles } from "../../styles/Global.styles";
// import { useTranslation } from "react-i18next";
// import { Button, RadioButton } from "react-native-paper";
// import { SafeAreaView } from 'react-native-safe-area-context';
// import BottomBar from "../../components/common/BottomBar";
// import { useEffect, useState } from "react";
// import paymentOptions from '../../mock-data/paymentOptions.json';
// import DropDownPicker from 'react-native-dropdown-picker';
// import axios from "axios";

// import { StyleSheet } from 'react-native';
// import AppointmentDetailsModal from "../../components/common/AppointmentDetailsModal";
// import { getUserData } from "../../utility";

// const availableSlots = [
//     "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"
// ];

// export default function CheckoutScreen({ route, navigation }) {
//     const { t } = useTranslation();
//     const [checked, setChecked] = useState('first');
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const [serviceTypeItems, setServiceTypeItems] = useState([
//         { label: t('video_call'), value: 'video call' },
//         { label: t('audio_call'), value: 'audio call' },
//         { label: t('chat'), value: 'chat' }
//     ]);
//     const [selectedTypes, setSelectedTypes] = useState([]);
//     const [fee, setFee] = useState(route.params?.fee);
//     const [consumer, setConsumer] = useState(null);
//     const [selectedSlot, setSelectedSlot] = useState(null);
//     const [appointmentDetails, setAppointmentDetails] = useState(null);
//     const [modalVisible, setModalVisible] = useState(false);


//     useEffect(() => {
//         const fetchUserData = async () => {
//             const { user } = await getUserData();
//             setConsumer(user._id)
//         };
//         fetchUserData();
//     }, []);
//     const handleProceed = async () => {
//         if (!selectedSlot) {
//             alert("Please select a time slot before proceeding.");
//             return;
//         }

//         try {
//             const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE}/api/appointments`, {
//                 paymentMethod: checked === "first" ? "bkash" : "nagad",
//                 serviceBy: selectedTypes,
//                 consumer,
//                 title: route.params?.specialization + " " + t("by_service"),
//                 ...route.params
//             });
//             setAppointmentDetails({
//                 paymentMethod: checked === "first" ? "bkash" : "nagad",
//                 serviceBy: selectedTypes,
//                 selectedSlot,
//                 ...route.params
//             });
//             setModalVisible(true);

//             setTimeout(() => {
//                 setModalVisible(false);
//                 navigation.navigate("Dashboard");
//             }, 3000);

//         } catch (error) {
//             console.error("Error submitting data:", error);
//             alert("Failed to create appointment. Please try again later.");
//         }
//     };

//     return (
//         <SafeAreaView style={globalStyles.container}>
//             <ScrollView contentContainerStyle={[
//                 globalStyles.bottom_bar_height,
//                 styles.scrollViewContainer
//             ]}>
//                 <View style={styles.paymentOptionsContainer}>
//                     <Text style={styles.sectionTitle}>{t("payment_method")}</Text>
//                     <View style={
//                         {
//                             flexDirection: "row",
//                             justifyContent: "space-between"
//                         }
//                     }>
//                         {paymentOptions.map((option, index) => (
//                             <View key={index} style={styles.paymentOption}>
//                                 <RadioButton
//                                     value={option.value}
//                                     status={checked === option.value ? 'checked' : 'unchecked'}
//                                     onPress={() => setChecked(option.value)}
//                                 />
//                                 <Image source={{ uri: option.imageUri }} style={styles.paymentIcon} />
//                                 <Text style={styles.paymentOptionText}>{option.title}</Text>
//                             </View>
//                         ))}
//                     </View>
//                 </View>

//                 {/* Service Type Selection */}
//                 <View style={styles.serviceTypeContainer}>
//                     <Text style={styles.sectionTitle}>{t("service_type")}</Text>
//                     <DropDownPicker
//                         open={dropdownOpen}
//                         value={selectedTypes}
//                         items={serviceTypeItems}
//                         setOpen={setDropdownOpen}
//                         setValue={setSelectedTypes}
//                         setItems={setServiceTypeItems}
//                         multiple={true}
//                         mode="BADGE"
//                         badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a"]}
//                     />
//                 </View>

//                 <View style={styles.slotSelectionContainer}>
//                     <Text style={styles.sectionTitle}>{t("select_time_slot")}</Text>
//                     <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                         {availableSlots.map((slot, index) => (
//                             <TouchableOpacity
//                                 key={index}
//                                 style={[
//                                     styles.slotButton,
//                                     selectedSlot === slot && styles.selectedSlotButton
//                                 ]}
//                                 onPress={() => setSelectedSlot(slot)}
//                             >
//                                 <Text style={[
//                                     styles.slotButtonText,
//                                     selectedSlot === slot && styles.selectedSlotButtonText
//                                 ]}>
//                                     {slot}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>
//                 </View>

//                 <View style={{ width: "90%" }}>
//                     <Button
//                         buttonColor="#6D30ED"
//                         textColor="white"
//                         onPress={handleProceed}
//                         disabled={!checked || !selectedSlot}
//                     >
//                         {t("proceed_to_pay")}
//                     </Button>
//                 </View>
//             </ScrollView>
//             <BottomBar navigation={navigation} />
//             <AppointmentDetailsModal appointmentDetails={appointmentDetails} modalVisible={modalVisible} setModalVisible={setModalVisible} />

//         </SafeAreaView>
//     );
// }


// export const styles = StyleSheet.create({
//     scrollViewContainer: {
//         flexGrow: 1,
//         alignItems: 'center',
//         paddingBottom: 20,
//     },
//     paymentOptionsContainer: {
//         width: '90%',
//         marginVertical: 20,
//     },
//     sectionTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     paymentOption: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginVertical: 10,
//     },
//     paymentIcon: {
//         width: 40,
//         height: 40,
//         marginRight: 10,
//     },
//     paymentOptionText: {
//         fontSize: 16,
//     },
//     serviceTypeContainer: {
//         width: '90%',
//         marginVertical: 20,
//     },
//     slotSelectionContainer: {
//         width: '90%',
//         marginVertical: 20,
//     },
//     slotButton: {
//         paddingHorizontal: 20,
//         paddingVertical: 10,
//         borderRadius: 20,
//         borderWidth: 1,
//         borderColor: '#6D30ED',
//         marginRight: 10,
//     },
//     selectedSlotButton: {
//         backgroundColor: '#6D30ED',
//     },
//     slotButtonText: {
//         color: '#6D30ED',
//     },
//     selectedSlotButtonText: {
//         color: 'white',
//     },
// });


import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { Button, RadioButton } from 'react-native-paper';
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
    const [checked, setChecked] = useState('first');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [serviceTypeItems, setServiceTypeItems] = useState([
        { label: t('video_call'), value: 'video call' },
        { label: t('audio_call'), value: 'audio call' },
        { label: t('chat'), value: 'chat' }
    ]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [fee, setFee] = useState(route.params?.fee);
    const [consumer, setConsumer] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [slotModalVisible, setSlotModalVisible] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            const { user } = await getUserData();
            setConsumer(user._id);
        };
        fetchUserData();
    }, []);

    const handleDateSelect = (date) => {
        setSelectedDate(date.dateString);
        setSlotModalVisible(true);
    };

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot);
        setSlotModalVisible(false);
    };

    const handleProceed = async () => {
        if (!selectedDate || !selectedSlot) {
            alert('Please select a date and time slot before proceeding.');
            return;
        }

        try {
            const appointmentDateTime = new Date(`${selectedDate}T${selectedSlot}`);
            const response = await axios.post(`${process.env.EXPO_PUBLIC_BASE}/api/appointments`, {
                paymentMethod: checked === 'first' ? 'bkash' : 'nagad',
                serviceBy: selectedTypes,
                consumer,
                title: `${route.params?.designation} ${t('by_service')}`,
                appointmentSchedule: {
                    date: appointmentDateTime,
                    slot: selectedSlot
                },
                ...route.params
            });

            setAppointmentDetails({
                paymentMethod: checked === 'first' ? 'bkash' : 'nagad',
                serviceBy: selectedTypes,
                appointmentSchedule: appointmentDateTime,
                slot: selectedSlot,
                ...route.params
            });
            setModalVisible(true);

            setTimeout(() => {
                setModalVisible(false);
                navigation.navigate('Dashboard');
            }, 3000);
        } catch (error) {
            console.error('Error submitting data:', error);
            alert('Failed to create appointment. Please try again later.');
        }
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView contentContainerStyle={[globalStyles.bottom_bar_height, styles.scrollViewContainer]}>
                <View style={styles.paymentOptionsContainer}>
                    <Text style={styles.sectionTitle}>{t('payment_method')}</Text>
                    <View style={styles.paymentOptionsRow}>
                        {paymentOptions.map((option, index) => (
                            <View key={index} style={styles.paymentOption}>
                                <RadioButton
                                    value={option.value}
                                    status={checked === option.value ? 'checked' : 'unchecked'}
                                    onPress={() => setChecked(option.value)}
                                />
                                <Image source={{ uri: option.imageUri }} style={styles.paymentIcon} />
                                <Text style={styles.paymentOptionText}>{t(option.title)}</Text>
                            </View>
                        ))}
                    </View>
                </View>

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
                    />
                </View>

                <View style={styles.selectedDateContainer}>
                    <Text style={styles.selectedDateText}>
                        {selectedDate ? `Selected Date: ${selectedDate}` : 'No date selected'}
                    </Text>
                    <Text style={styles.selectedSlotText}>
                        {selectedSlot ? `Selected Slot: ${selectedSlot}` : 'No slot selected'}
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <Button
                        mode="contained"
                        onPress={handleProceed}
                        disabled={!checked || !selectedDate || !selectedSlot}
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
                                style={styles.slotButton}
                                onPress={() => handleSlotSelect(slot)}
                            >
                                <Text style={styles.slotButtonText}>{slot}</Text>
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
                appointmentDetails={appointmentDetails}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />
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
        justifyContent: 'space-between',
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentOptionText: {
        fontSize: 16,
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
    slotButtonText: {
        fontSize: 16,
        textAlign: 'center',
    },
    closeButton: {
        marginTop: 15,
    },
    paymentIcon: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
});