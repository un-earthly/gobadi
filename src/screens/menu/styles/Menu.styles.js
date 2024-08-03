import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    menu_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        rowGap: 8,
        columnGap: 8,
    },
    menu_item_half: {
        width: '48%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#f3f4f6",
        height: 120,
        justifyContent: 'center',
        borderRadius: 5
    },
    menu_item_full: {
        width: '98%',
        alignItems: 'center',
        padding: 10,
        backgroundColor: "#f3f4f6",
        height: 120,
        justifyContent: 'center',
        borderRadius: 5
    },
    selected_item: {
        backgroundColor: '#f5f1ff',
        borderColor: "#c0c0ca",
        borderWidth: 4,
        borderRadius: 5
    },
    text: {
        fontSize: 16,
        color: 'black',
    },
    selected_item_header: {
        alignItems: 'center',
        marginVertical: 20,
    },
    selected_item_title: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    category_container: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        rowGap: 8,
        columnGap: 8,
    },
    category_item: {
        backgroundColor: '#f3f4f6',
        width: '48%',
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
});
