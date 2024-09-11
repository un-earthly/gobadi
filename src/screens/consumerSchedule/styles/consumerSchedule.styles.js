import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 80, // Adjust based on your BottomBar height
    },
    header: {
        backgroundColor: '#4A90E2',
        padding: 16,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 16,
        margin: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
        color: '#333333',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
    },
    infoLabel: {
        fontSize: 16,
        color: '#666666',
    },
    infoValue: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333333',
    },
    imageScroll: {
        flexDirection: 'row',
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 8,
        marginRight: 8,
    },
    iconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    iconLabel: {
        marginLeft: 16,
        fontSize: 16,
        color: '#333333',
    },
    imageContainer: {
        width: 120,
        height: 120,
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    imagePlaceholder: {
        backgroundColor: '#E1E1E1',
    },
    loader: {
        position: 'absolute',
        zIndex: 1,
    },
    errorText: {
        position: 'absolute',
        textAlign: 'center',
        fontSize: 12,
        color: '#FF0000',
    },
    noImagesText: {
        fontSize: 16,
        color: '#666666',
        fontStyle: 'italic',
    },
    
});