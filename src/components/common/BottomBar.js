import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserData } from '../../utility';

const BOTTOM_APPBAR_HEIGHT = 80;

const BottomBar = ({ navigation }) => {
    const { bottom } = useSafeAreaInsets();
    const { t } = useTranslation();
    const [role, setRole] = React.useState(null);

    React.useEffect(() => {
        const fetchUserData = async () => {
            const data = await getUserData();
            setRole(data.role);
        };
        fetchUserData();
    }, []);

    const handleLogout = async () => {
        await AsyncStorage.removeItem('userData');
        navigation.navigate('Login');
    };

    const menuItems = [
        { icon: 'home-outline', label: t('dashboard'), navigateTo: 'Dashboard' },
        ...(role === "consumer" ? [{ icon: 'plus', label: t('service'), navigateTo: 'Menu' }] : []),
        ...(role === "provider" ? [{ icon: 'calendar-outline', label: t('appointments'), navigateTo: 'Appointments' }] : []),
        { icon: 'chat-outline', label: t('message'), navigateTo: 'Chat' },
        { icon: 'account-outline', label: t('profile'), navigateTo: 'Profile' },
        { icon: 'logout', label: t('logout'), action: handleLogout }
    ];

    return (
        <Appbar
            style={[
                styles.bottom,
                {
                    height: BOTTOM_APPBAR_HEIGHT + bottom,
                    backgroundColor: "#fff",
                    elevation: 5,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                },
            ]}
            safeAreaInsets={{ bottom }}
        >
            {menuItems.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => { item.action ? item.action() : navigation.navigate(item.navigateTo) }}>
                    <View style={styles.bottomMenuItem}>
                        <Appbar.Action style={{ marginBottom: 0 }} icon={item.icon} size={24} />
                        <Text>
                            {item.label}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </Appbar>
    );
};

const styles = StyleSheet.create({
    bottom: {
        backgroundColor: 'aquamarine',
        position: 'absolute',
        justifyContent: "space-between",
        left: 0,
        right: 0,
        bottom: 0,
    },
    fab: {
        position: 'absolute',
        right: 16,
    },
    bottomMenuItem: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 0
    }
});

export default BottomBar;
