import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        // color: '#333',
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
        // color: '#555',
    },
    appointmentCard: {
        width: 300,
        marginRight: 16,
        elevation: 4,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    chip: {
        paddingHorizontal: 8,
    },
    chipText: {
        color: 'white',
        fontWeight: '600',
    },
    dateTime: {
        marginTop: 8,
        fontSize: 16,
        // color: '#666',
    },
    actionButton: {
        marginHorizontal: 4,
    },
    divider: {
        marginVertical: 24,
    },
    slotItem: {
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
        marginBottom: 8,
        elevation: 2,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

