import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 30
    },
    section: {
        marginBottom: 40,
    },
    infoContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    infoRow: {
        flexDirection: "row",
        width: "60%",
        marginBottom: 10,
    },
    infoLabel: {
        fontSize: 18,
        width: "30%",
    },
    infoValue: {
        fontSize: 18,
        width: "50%",
    },
    centerText: {
        textAlign: "center",
    },
    imagesContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
    },
    image: {
        height: 180,
        width: 180,
    },
    contactSection: {
        alignItems: "center",
    },
    iconRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 20,
    },
    iconLabel: {
        fontSize: 16,
        marginLeft: 20,
    },
});
