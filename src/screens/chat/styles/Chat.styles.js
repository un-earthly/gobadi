import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    section: {
        flex: 1,
        width: '100%'
    },
    header: {
        alignItems: 'center',
        justifyContent: "flex-start",
        padding: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    userName: {
        marginLeft: 10,
        fontSize: 18,
        color: '#333',
    },
});

export default styles;
