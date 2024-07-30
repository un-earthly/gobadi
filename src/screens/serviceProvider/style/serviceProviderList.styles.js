import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    contentContainer: {
        rowGap: 20,
        paddingHorizontal: 10,
    },
    headerContainer: {
        padding: 10,
        rowGap: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "700",
    },
    providersContainer: {
        rowGap: 20,
    },
    providerCard: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    avatarContainer: {
        width: 70,
        height: 70,
        borderRadius: 35,
        overflow: "hidden",
        backgroundColor: "lightgray",
        justifyContent: "center",
        alignItems: "center",
    },
    avatar: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    providerInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        width: "80%",
        paddingHorizontal: 10,
        alignItems: "center",
    },
    providerName: {
        fontSize: 18,
    },
    providerSpecialization: {
        fontSize: 14,
    },
    feeContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    providerFee: {
        fontSize: 14,
    },
    submitButtonContainer: {
        marginTop: 20,
    },
});
