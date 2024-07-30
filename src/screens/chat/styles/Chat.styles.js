import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    messageContainer: {
        flex: 1,
        padding: 10,
    },
    messageBubble: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: '70%',
    },
    userMessage: {
        backgroundColor: '#DCF8C6',
        alignSelf: 'flex-end',
    },
    botMessage: {
        backgroundColor: '#ECECEC',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        borderTopWidth: 1,
        borderColor: '#ECECEC',
    },
    textInput: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ECECEC',
        borderRadius: 20,
    },
    sendButton: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        paddingHorizontal: 20,
        backgroundColor: '#007AFF',
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#FFF',
        fontSize: 16,
    },
});


