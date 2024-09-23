import React from 'react';
import { StyleSheet, View, Modal, Text, ScrollView, Dimensions } from 'react-native';
import { Button, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const AppointmentDetailsModal = ({ modalVisible, setModalVisible }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            // onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <View style={styles.headerContainer}>
                            <Icon name="check-circle" size={60} color="#4CAF50" />
                            <Text style={styles.modalTitle}>অ্যাপয়েন্টমেন্ট নিশ্চিত হয়েছে!</Text>
                        </View>


                    </ScrollView>

                    <Button
                        mode="contained"
                        onPress={() => setModalVisible(false)}
                        style={styles.closeButton}
                        labelStyle={styles.closeButtonText}
                    >
                        ঠিক আছে
                    </Button>
                </View>
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
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        width: width * 0.9,
        maxWidth: 400,
        maxHeight: '80%',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 15,
        color: '#333',
        textAlign: 'center',
    },
    divider: {
        width: '100%',
        marginVertical: 20,
    },
    detailsContainer: {
        width: '100%',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    icon: {
        marginRight: 15,
    },
    infoContent: {
        flex: 1,
    },
    label: {
        fontSize: 16,
        color: '#888',
        marginBottom: 4,
    },
    value: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600',
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#6D30ED',
        borderRadius: 10,
        width: '100%',
    },
    closeButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AppointmentDetailsModal;