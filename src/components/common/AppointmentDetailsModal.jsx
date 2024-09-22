import { StyleSheet, View } from "react-native";
import { Modal, Text } from "react-native";

const AppointmentDetailsModal = ({ modalVisible, setModalVisible, appointmentDetails }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Appointment Confirmed!</Text>
                    {appointmentDetails && (
                        <>
                            <Text>Payment Method: {appointmentDetails.paymentMethod}</Text>
                            <Text>Service Type: {appointmentDetails.serviceBy.join(', ')}</Text>
                            <Text>Time Slot: {appointmentDetails.selectedSlot}</Text>
                            <Text>Specialization: {appointmentDetails.specialization}</Text>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    )
};

export default AppointmentDetailsModal;



const styles = StyleSheet.create({
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
        alignItems: 'center',
        width: '80%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#333',
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
        color: '#555',
    },
    closeButton: {
        marginTop: 20,
        padding: 10,
        backgroundColor: '#6D30ED',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
