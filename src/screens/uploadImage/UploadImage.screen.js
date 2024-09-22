import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles/UploadImage.styles';
import { globalStyles } from '../../styles/Global.styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import BottomBar from '../../components/common/BottomBar';
import { Button, ActivityIndicator } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../../firebaseConfig';

const MAX_IMAGES = 10;

export default function UploadImageScreen({ route, navigation }) {

    const { t } = useTranslation();
    const [images, setImages] = useState([]);
    const [uploading, setUploading] = useState(false);

    const handleImagePick = async () => {
        const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
        const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (cameraPermission.status !== 'granted' || libraryPermission.status !== 'granted') {
            Alert.alert('Permission Denied', 'Sorry, we need camera and camera roll permissions to make this work!');
            return;
        }

        const options = ['Take a photo', 'Choose from gallery', 'Cancel'];
        Alert.alert(
            'Upload Image',
            'Choose an option',
            [
                {
                    text: options[0],
                    onPress: () => launchCamera(),
                },
                {
                    text: options[1],
                    onPress: () => launchImageLibrary(),
                },
                {
                    text: options[2],
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };


    const launchCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            quality: 1,
        });

        handleImageResult(result);
    };

    const launchImageLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
        });

        handleImageResult(result);
    };

    const handleImageResult = (result) => {
        if (!result.canceled) {
            const newImages = result.assets.map(asset => ({ uri: asset.uri }));
            if (images.length + newImages.length > MAX_IMAGES) {
                Alert.alert('Too Many Images', `You can only select up to ${MAX_IMAGES} images.`);
                setImages(prevImages => [...prevImages, ...newImages].slice(0, MAX_IMAGES));
            } else {
                setImages(prevImages => [...prevImages, ...newImages]);
            }
        }
    };

    const removeImage = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };


    const uploadImage = async (uri) => {
        try {
            const response = await fetch(uri);
            const blob = await response.blob();
            const filename = `${Date.now()}-photo.jpg`;
            const storageRef = ref(storage, filename);

            await uploadBytes(storageRef, blob);
            const url = await getDownloadURL(storageRef);
            return url;
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const handleUpload = async () => {
        if (images.length === 0) {
            Alert.alert('No Images', 'Please select at least one image to upload.');
            return;
        }

        setUploading(true);
        try {
            const uploadPromises = images.map(image => uploadImage(image.uri));
            const uploadedUrls = await Promise.all(uploadPromises);

            navigation.navigate("ProceedFurther", {
                images: uploadedUrls,
                ...route.params
            });

        } catch (error) {
            console.error('Error uploading images:', error);
            Alert.alert('Upload Failed', 'Failed to upload images. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView contentContainerStyle={globalStyles.bottom_bar_height}>
                <View>
                    <Text style={globalStyles.title}>
                        {t("upload_your_images")}
                    </Text>
                    <Text style={styles.subtitle}>
                        {t("select_up_to_x_images", { count: MAX_IMAGES })}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <Button
                            buttonColor="#6D30ED"
                            onPress={handleImagePick}
                            textColor="white"
                            disabled={images.length >= MAX_IMAGES || uploading}
                        >
                            {t("select_images")}
                        </Button>
                    </View>
                    <View style={styles.imageContainer}>
                        {images.map((image, index) => (
                            <View key={index} style={styles.imageWrapper}>
                                <Image source={{ uri: image.uri }} style={styles.image} />
                                <TouchableOpacity
                                    style={styles.removeButton}
                                    onPress={() => removeImage(index)}
                                    disabled={uploading}
                                >
                                    <Ionicons name="close-circle" size={24} color="red" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    {images.length > 0 && (
                        <View style={styles.buttonContainer}>
                            <Button
                                buttonColor="#6D30ED"
                                textColor="white"
                                onPress={handleUpload}
                                disabled={uploading}
                            >
                                {uploading ? (
                                    <ActivityIndicator color="white" />
                                ) : (
                                    t("upload_and_proceed")
                                )}
                            </Button>
                        </View>
                    )}
                </View>
            </ScrollView>
            <BottomBar navigation={navigation} />
        </SafeAreaView>
    );
}