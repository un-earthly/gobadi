import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles/UploadImage.styles';
import { globalStyles } from '../../styles/Global.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar from '../../components/common/BottomBar';
import { Button } from 'react-native-paper';


export default function UploadImageScreen({ navigation }) {
    const { t } = useTranslation();
    const [images, setImages] = useState([]);

    const handleImagePick = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImages(result.assets.map(asset => ({ uri: asset.uri })));
        }
    };


    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView contentContainerStyle={globalStyles.bottom_bar_height}>
                <View>

                    <Text style={globalStyles.title}>
                        {t("upload_your_image")}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <Button
                            buttonColor="#6D30ED"
                            onPress={handleImagePick}
                            textColor="white"

                        >
                            {t("upload_image")}
                        </Button>
                    </View>
                    <View>
                        {
                            images.length > 0 && <>
                                <View style={styles.imageContainer}>
                                    {images.map((image, index) => (
                                        <Image key={index} source={{ uri: image.uri }} style={styles.image} />
                                    ))}
                                </View>
                                <View style={styles.buttonContainer}>
                                    <Button
                                        buttonColor="#6D30ED"
                                        textColor="white"
                                        onPress={() => { navigation.navigate("ProceedFurther") }}>
                                        {t("submit")}</Button>
                                </View>
                            </>
                        }
                    </View>
                </View>

            </ScrollView>
            <BottomBar navigation={navigation} />

        </SafeAreaView>
    );
}

