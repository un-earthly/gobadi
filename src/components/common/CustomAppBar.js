import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, Switch, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useTranslation } from 'react-i18next';

const CustomAppBar = ({ navigation, route, options, screen }) => {
    const title =
        options.headerTitle !== undefined
            ? options.headerTitle
            : options.title !== undefined
                ? options.title
                : route.name;
    const { t } = useTranslation()
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    return (
        <SafeAreaView>
            <Appbar.Header style={{
                backgroundColor: "#6D30ED"
            }}>
                {
                    screen === "Dashboard" ? <View style={{
                        flexDirection: "row",
                        paddingHorizontal: 10,
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        <Appbar.Content
                            titleStyle={{
                                color: "#fff"
                            }}
                            title={t("provider_dashboard_header")}
                        />
                        <View style={{
                            flexDirection: 'row',
                            alignItems: "center"
                        }}>
                            <Switch value={isSwitchOn}
                                color="#fff"
                                trackColor={{
                                    true: '#ffffff70',
                                    false: '#80808080'
                                }}
                                thumbColor={isSwitchOn ? "#fff" : "#aaa"}
                                onValueChange={onToggleSwitch}
                            />
                            <Text style={{
                                color: "white"
                            }}>{t("online")}</Text>
                        </View>
                    </View> : <>
                        <Appbar.BackAction color='white' onPress={() => navigation.goBack()} />
                        <Appbar.Content titleStyle={{
                            color: "#fff"
                        }} title={title} />
                    </>
                }

            </Appbar.Header>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 60,
        backgroundColor: '#f4511e',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    title: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
    },
    backButton: {
        position: 'absolute',
        left: 10,
        padding: 10,
    },
    backButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default CustomAppBar;
