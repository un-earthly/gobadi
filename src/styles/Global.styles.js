import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    title: {
        fontSize: 24,
        marginVertical: 16,
        // fontWeight: "700"
    },
    nav_container: {
        backgroundColor: "#ccc",
        padding: 20,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
    },
    nav_header: {
        fontSize: 24,
        // fontWeight: "700",
        textAlign: "center"
    },
    bottom_bar_height: {
        paddingBottom: 80
    }
})