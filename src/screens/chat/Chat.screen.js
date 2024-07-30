import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/Global.styles';
import { useTranslation } from 'react-i18next';
import chatData from '../../mock-data/chat.json';
import styles from './styles/Chat.styles';
import renderBubble from '../../components/ScreenBasedComponent/Chat/RenderBubble';
const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const { t } = useTranslation();


    useEffect(() => {
        setMessages(chatData.map(message => ({
            ...message,
            createdAt: new Date(message.createdAt),
        })));
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    }, []);



    return (
        <SafeAreaView style={globalStyles.container}>
            <View
                style={styles.section}
            >
                <View style={styles.header}>
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/men/69.jpg' }} // Profile picture of the user being texted
                        style={styles.avatar}
                    />
                    <Text style={styles.userName}>{t("name")}</Text>
                </View>
                <GiftedChat
                    messages={messages}
                    onSend={messages => onSend(messages)}
                    user={{
                        _id: 1,
                        name: 'Service Consumer',
                        avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
                    }}
                    renderBubble={renderBubble}
                    showAvatarForEveryMessage={true}
                />
            </View>
        </SafeAreaView>
    );
};

export default ChatScreen;
