import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    optionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 20
    },
    image: {
        height: 32,
        width: 32,
        marginLeft: 10,
    },
    scrollViewContainer: {
        alignItems: 'center',
    },
    serviceDetails: {
        borderWidth: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
        padding: 8,
        borderRadius: 4,
        marginBottom: 20
    },
    toPay: {
        backgroundColor: "#D9D9d9",
        alignItems: "start",
        width: "90%",
        padding: 16,
        borderRadius: 4,
        marginBottom: 20
    }
});