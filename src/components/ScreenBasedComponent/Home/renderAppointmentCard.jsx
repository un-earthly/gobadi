import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View, Text, ScrollView, FlatList, Modal, Image, StyleSheet, Dimensions } from 'react-native';
import { Card, Badge, Avatar, Button, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');

const RenderAppointmentCard = (appointment) => {
    const [modalVisible, setModalVisible] = useState(false);
    const formattedDate = new Date(appointment.appointmentSchedule.date).toLocaleDateString('bn-BD');
    const { t } = useTranslation();
    const openModal = () => setModalVisible(true);
    const closeModal = () => setModalVisible(false);

    const renderImageItem = ({ item }) => (
        <Image
            source={{ uri: item }}
            style={styles.image}
        />
    );

    const InfoRow = ({ icon, label, value }) => (
        <View style={styles.infoRow}>
            <Icon name={icon} size={20} color="#555" style={styles.icon} />
            <Text style={styles.label}>{label}:</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );

    const SectionTitle = ({ title }) => (
        <View style={styles.sectionTitleContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>
    );

    return (
        <Card style={styles.card} key={appointment._id}>
            <Card.Title
                title={appointment.title}
                titleStyle={styles.cardTitle}
                right={() => (
                    <Badge size={24} style={[{ backgroundColor: appointment.status === 'pending' ? '#f0ad4e' : '#5bc0de' }, { marginRight: 10 }]}>
                        {appointment.status === 'pending' ? 'অপেক্ষমান' : appointment.status}
                    </Badge>
                )}
            />
            <Card.Content>
                <View style={styles.providerInfo}>
                    <Avatar.Image size={40} source={{ uri: appointment.provider.avatar }} />
                    <View style={styles.providerTextInfo}>
                        <Text style={styles.providerName}>{appointment.provider.name}</Text>
                        <Text style={styles.providerDesignation}>{appointment.provider.designation}</Text>
                    </View>
                </View>

                <View style={styles.appointmentInfo}>
                    <InfoRow icon="calendar" label="তারিখ" value={formattedDate} />
                    <InfoRow icon="clock-outline" label="সময়" value={appointment.appointmentSchedule.slot} />
                </View>

                <View style={styles.animalInfo}>
                    <Text style={styles.animalInfoTitle}>পশুর বিবরণ</Text>
                    <View style={styles.badgeContainer}>
                        <Badge style={styles.badge}>{appointment.category}</Badge>
                        <Badge style={styles.badge}>{appointment.subCategory}</Badge>
                    </View>
                </View>
            </Card.Content>

            <Card.Actions style={styles.cardActions}>
                <Text style={styles.fee}>ফি: {appointment.fee} টাকা</Text>
                <Button mode="outlined" onPress={openModal} style={styles.detailsButton}>
                    বিস্তারিত দেখুন
                </Button>
            </Card.Actions>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={styles.modalTitle}>{appointment.title}</Text>

                            <SectionTitle title="অ্যাপয়েন্টমেন্ট তথ্য" />
                            <InfoRow icon="identifier" label="আইডি" value={appointment._id} />
                            <InfoRow icon="calendar" label="তারিখ" value={formattedDate} />
                            <InfoRow icon="clock-outline" label="সময়" value={appointment.appointmentSchedule.slot} />
                            <InfoRow icon="information-outline" label="অবস্থা" value={appointment.status === 'pending' ? 'অপেক্ষমান' : appointment.status} />
                            <InfoRow icon="cash" label="ফি" value={`${appointment.fee} টাকা`} />
                            <InfoRow icon="credit-card" label="পেমেন্ট পদ্ধতি" value={appointment.paymentMethod === "bkash" ? t("bkash") : t("nagad")} />
                            {appointment.notes && <InfoRow icon="note-text" label="নোট" value={appointment.notes} />}

                            <SectionTitle title="পশুর বিবরণ" />
                            <InfoRow icon="cow" label="ধরন" value={appointment.category} />
                            <InfoRow icon="turkey" label="উপ-ধরন" value={appointment.subCategory} />

                            <SectionTitle title="সেবা প্রদানকারীর তথ্য" />
                            <View style={styles.profileContainer}>
                                <Avatar.Image size={80} source={{ uri: appointment.provider.avatar }} />
                                <View style={styles.profileInfo}>
                                    <Text style={styles.profileName}>{appointment.provider.name}</Text>
                                    <Text style={styles.profileDesignation}>{appointment.provider.designation}</Text>
                                    <Text style={styles.profileOrganization}>{appointment.provider.organization}</Text>
                                </View>
                            </View>
                            <InfoRow icon="cake-variant" label="বয়স" value={`${appointment.provider.age} বছর`} />
                            <InfoRow icon="map-marker" label="জেলা" value={appointment.provider.district} />
                            <InfoRow icon="briefcase-check" label="অভিজ্ঞতা" value={`${appointment.provider.experience} বছর`} />

                            <SectionTitle title="গ্রাহকের তথ্য" />
                            <View style={styles.profileContainer}>
                                <Avatar.Image size={80} source={{ uri: appointment.consumer.avatar }} />
                                <View style={styles.profileInfo}>
                                    <Text style={styles.profileName}>{appointment.consumer.name}</Text>
                                    <Text style={styles.profileDistrict}>{appointment.consumer.district}</Text>
                                </View>
                            </View>
                            {appointment.consumer.age && <InfoRow icon="cake-variant" label="বয়স" value={`${appointment.consumer.age} বছর`} />}
                            <InfoRow icon="cow" label="গরু" value={`${appointment.consumer.cow}টি`} />
                            <InfoRow icon="turkey" label="মুরগি" value={`${appointment.consumer.hen}টি`} />
                            <InfoRow icon="fish" label="মাছ" value={`${appointment.consumer.fish}টি`} />
                            <InfoRow icon="duck" label="হাঁস" value={`${appointment.consumer.duck}টি`} />
                            <InfoRow icon="goat" label="ছাগল" value={`${appointment.consumer.goat}টি`} />

                            {appointment.images.length > 0 && (
                                <View>
                                    <SectionTitle title="ছবি" />
                                    <FlatList
                                        data={appointment.images}
                                        renderItem={renderImageItem}
                                        keyExtractor={(item, index) => index.toString()}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        contentContainerStyle={styles.imageList}
                                    />
                                </View>
                            )}

                            <Divider style={styles.divider} />
                        </ScrollView>
                        <Button mode="contained" onPress={closeModal} style={styles.closeButton}>
                            বন্ধ করুন
                        </Button>
                    </View>
                </View>
            </Modal>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        margin: 16,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    providerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    providerTextInfo: {
        marginLeft: 12,
    },
    providerName: {
        fontSize: 14,
        fontWeight: '600',
    },
    providerDesignation: {
        fontSize: 12,
        color: '#888',
    },
    appointmentInfo: {
        marginBottom: 12,
    },
    animalInfo: {
        marginBottom: 12,
    },
    animalInfoTitle: {
        fontWeight: '600',
        fontSize: 12,
        marginBottom: 4,
    },
    badgeContainer: {
        flexDirection: 'row',
    },
    badge: {
        marginRight: 8,
    },
    cardActions: {
        justifyContent: 'space-between',
    },
    fee: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    detailsButton: {
        marginLeft: 'auto',
    },
    modalOverlay: {
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
        maxHeight: '90%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitleContainer: {
        backgroundColor: '#f0f0f0',
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginVertical: 16,
        borderRadius: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    icon: {
        marginRight: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        width: 100,
    },
    value: {
        fontSize: 14,
        flex: 1,
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    profileInfo: {
        marginLeft: 16,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    profileDesignation: {
        fontSize: 14,
        color: '#555',
    },
    profileOrganization: {
        fontSize: 14,
        color: '#555',
    },
    profileDistrict: {
        fontSize: 14,
        color: '#555',
    },
    imageList: {
        paddingVertical: 8,
    },
    image: {
        width: width * 0.7,
        height: width * 0.5,
        marginRight: 10,
        borderRadius: 8,
    },
    divider: {
        marginVertical: 16,
    },
    closeButton: {
        marginTop: 20,
    },
});

export default RenderAppointmentCard;