import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        width: "80%"
    },
    header: {
        fontSize: 28,
        textAlign: "center",
        fontWeight: "700",
        marginBottom: 30
    },
    sub_header: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 30
    },
    input_container: {
        direction: 'column',
        marginVertical: 8,
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 12,
        paddingVertical: 4
    },
    label: {
        fontWeight: "700",
        fontSize: 16,
        marginVertical: 4
    },
    btn_container: {
        marginVertical: 20
    },
    footer: {
        marginVertical: 12,
        flexDirection: "row",
        justifyContent: "center",
    },
    logo: {
        height: 60,
        width: "100%",
        objectFit: "contain",
        marginBottom: 20
    },
    link: {
        color: '#6D30ED',
        textDecorationLine: "underline",
        fontSize: 16
    }
})