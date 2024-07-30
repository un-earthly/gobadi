// src/ChatScreen.js

import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { GiftedChat, Bubble, Avatar } from 'react-native-gifted-chat';
import { SafeAreaView } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles/Global.styles';
import { useTranslation } from 'react-i18next';

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const { t } = useTranslation()
    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello, how can I assist you today?',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Service Provider',
                    avatar: 'https://randomuser.me/api/portraits/men/69.jpg',
                },
            },
            {
                _id: 2,
                text: 'Hi! I need help with my order.',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'Service Consumer',
                    avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
                },
            },
            {
                _id: 3,
                text: 'Sure, I can help with that. What seems to be the issue?',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'Service Provider',
                    avatar: 'https://randomuser.me/api/portraits/men/69.jpg',
                },
            },
            {
                _id: 4,
                text: 'The item I received is not as described.',
                createdAt: new Date(),
                user: {
                    _id: 1,
                    name: 'Service Consumer',
                    avatar: 'https://randomuser.me/api/portraits/men/29.jpg',
                },
            },
        ]);
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
    }, []);

    const renderBubble = (props) => (
        <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: '#9C27B0',
                },
                left: {
                    backgroundColor: '#E0E0E0',
                },
            }}
            textStyle={{
                right: {
                    color: '#fff',
                },
                left: {
                    color: '#000',
                },
            }}
        />
    );

    const renderAvatar = (props) => (
        <Avatar
            {...props}
            imageStyle={{
                left: { height: 40, width: 40, borderRadius: 20 },
                right: { height: 40, width: 40, borderRadius: 20 },
            }}
        />
    );

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={{
                flex: 1,
                width: '100%',
            }}>

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
                    // renderAvatar={renderAvatar}
                    showAvatarForEveryMessage={true}

                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
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

export default ChatScreen;
