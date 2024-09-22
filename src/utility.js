import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getUserData() {
    try {
        const userData = await AsyncStorage.getItem("userData");
        if (userData !== null) {
            // We have data!!

            const parsedUserData = JSON.parse(userData);
            // console.log('Retrieved user data:', parsedUserData);
            return parsedUserData;
        }
    } catch (error) {
        console.error('Error retrieving user data:', error);
    }
}

