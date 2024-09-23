import React, { useState } from "react";
import {
    Image,
    ScrollView,
    View,
    StyleSheet
} from "react-native";
import { useTranslation } from "react-i18next";
import { Button, Text, TextInput, HelperText, ProgressBar } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import RenderRoleItem from "../../components/ScreenBasedComponent/Auth/RenderRole.js";
import veterinaries from "../../mock-data/veterinaries.json";
import roles from "../../mock-data/roles.json";
import Toast from "react-native-toast-message";
import { useAuth } from "../../context/AuthContext.js";
import * as ImagePicker from 'expo-image-picker';
import { app, storage } from "../../../firebaseConfig.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { bangladeshDistricts } from '../../../districts'
import { Dropdown } from "react-native-paper-dropdown";


const RegistrationScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const { register, isLoading } = useAuth();
    const [step, setStep] = useState(0);
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [formData, setFormData] = useState({
        role: 'consumer',
        personalInfo: {
            mobile: '',
            name: '',
            age: '',
            district: '',
            nid: '',
            photo: null,
        },
        consumerInfo: {
            veterinaries: {},
        },
        providerInfo: {
            designation: '',
            organization: '',
            experience: '',
        },
        security: {
            password: '',
            confirmPassword: '',
        }
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (section, field, value) => {
        setFormData(prevState => ({
            ...prevState,
            [section]: {
                ...prevState[section],
                [field]: value
            }
        }));
        // Clear error when user starts typing
        setErrors(prevErrors => ({
            ...prevErrors,
            [section]: {
                ...prevErrors[section],
                [field]: ''
            }
        }));
    };

    const validateStep = () => {
        const newErrors = {};
        let isValid = true;

        const requiredFields = {
            0: [],
            1: ['mobile', 'name', 'age', 'district', 'nid'],
            2: formData.role === 'consumer' ? [] : ['designation', 'organization', 'experience'],
            3: ['password', 'confirmPassword'],
        };

        const currentSection = (() => {
            if (step === 2 && formData.role === 'consumer') {
                return [0, 'personalInfo', 'consumerInfo', 'security'][step];
            } else if (step === 2 && formData.role === 'provider') {
                return [0, 'personalInfo', 'providerInfo', 'security'][step];
            }
            console.log(step)
            return [0, 'personalInfo', 0, 'security'][step];
        })();
        for (const field of requiredFields[step]) {
            if (!formData[currentSection][field]) {
                newErrors[currentSection] = {
                    ...newErrors[currentSection],
                    [field]: t("errors.required"),
                };
                isValid = false;
            }
        }

        // Additional validation for step 2
        if (step === 2 && formData.role === 'consumer') {
            const hasVeterinaryPreference = Object.values(formData.consumerInfo.veterinaries).some(value => value && parseInt(value) > 0);
            if (!hasVeterinaryPreference) {
                newErrors.consumerInfo = {
                    ...newErrors.consumerInfo,
                    veterinaries: t("errors.atLeastOneVeterinary"),
                };
                isValid = false;
            }
        }

        // Additional validation for step 3
        if (step === 3) {
            const { password, confirmPassword } = formData.security;
            if (password !== confirmPassword) {
                newErrors.security = {
                    ...newErrors.security,
                    confirmPassword: t("errors.passwordMismatch"),
                };
                isValid = false;
            }
            if (password.length < 4) {
                newErrors.security = {
                    ...newErrors.security,
                    password: t("errors.passwordTooShort"),
                };
                isValid = false;
            }
        }

        setErrors(newErrors);
        return isValid;
    };


    const handleNext = () => {
        console.log(formData)
        if (validateStep()) {
            setErrors({});
            setStep(prevStep => prevStep + 1);
        }
    };


    const handlePrevious = () => {
        setStep(prevStep => prevStep - 1);
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


    const handleRegistration = async () => {
        if (!validateStep()) return;

        try {
            const { personalInfo, consumerInfo, providerInfo, security } = formData;
            const registrationData = {
                mobile: personalInfo.mobile,
                password: security.password,
                role: formData.role,
                name: personalInfo.name,
                age: personalInfo.age ,
                district: personalInfo.district,
                avatar: personalInfo.photo,
                nid: personalInfo.nid,
                designation: formData.role === 'provider' ? providerInfo.designation : null,
                organization: formData.role === 'provider' ? providerInfo.organization : null,
                experience: formData.role === 'provider' ? Number(providerInfo.experience) : null,
                cow: formData.role === 'consumer' ? Number(consumerInfo.veterinaries.cow || 0) : null,
                hen: formData.role === 'consumer' ? Number(consumerInfo.veterinaries.hen || 0) : null,
                fish: formData.role === 'consumer' ? Number(consumerInfo.veterinaries.fish || 0) : null,
                duck: formData.role === 'consumer' ? Number(consumerInfo.veterinaries.duck || 0) : null,
                goat: formData.role === 'consumer' ? Number(consumerInfo.veterinaries.goat || 0) : null,
            };
            // console.log("registrationData", registrationData);

            const response = await register(registrationData);
            if (response) {

                Toast.show({
                    type: 'success',
                    text1: t("success.registrationSuccessful"),
                    text2: `${t("success.registrationSuccessful")}`,
                    visibilityTime: 10000,
                    topOffset: 50,
                    position: 'top',
                });

            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: t("errors.registrationFailed"),
                text2: error.message || t("errors.registrationFailed")
            });
        }
    };

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                const photoUrl = await uploadImage(result.assets[0].uri);
                handleInputChange('personalInfo', 'photo', photoUrl);
            }
        } catch (error) {
            console.error('Error picking or uploading image:', error);
            Toast.show({
                type: 'error',
                text1: 'Image Upload Failed',
                text2: error.message || 'There was an error uploading the image.',
            });
        }
    };


    const renderInput = (section, field, label, placeholder, props = {}) => (
        <View>
            <TextInput
                label={t(`${section}.${label}`)}
                placeholder={t(`${section}.${placeholder}`)}
                value={formData[section][field]}
                onChangeText={(value) => handleInputChange(section, field, value)}
                style={styles.input}
                error={errors[section] && errors[section][field]}
                {...props}
            />
            <HelperText type="error" visible={errors[section] && errors[section][field]}>
                {errors[section] && errors[section][field]}
            </HelperText>
        </View>
    );

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>{t("role.title")}</Text>
                        <Text style={styles.stepDescription}>{t("role.description")}</Text>
                        <View style={styles.roleContainer}>
                            {roles.map((role) => (
                                <RenderRoleItem
                                    key={role.value}
                                    checked={formData.role}
                                    setChecked={(value) => setFormData(prev => ({ ...prev, role: value }))}
                                    role={role}
                                />
                            ))}
                        </View>
                    </View>
                );
            case 1:
                return (
                    <View style={styles.stepContent}>

                        {formData.personalInfo.photo && <Image
                            source={{ uri: formData.personalInfo.photo }}
                            style={{ width: 100, height: 100 }}
                        />}
                        <Text style={styles.stepTitle}>{t("personalInfo.title")}</Text>
                        <Text style={styles.stepDescription}>{t("personalInfo.description")}</Text>
                        {renderInput('personalInfo', 'mobile', "mobile", "mobilePlaceholder", { keyboardType: "phone-pad" })}
                        {renderInput('personalInfo', 'name', "name", "namePlaceholder")}
                        {renderInput('personalInfo', 'nid', "nid", "nidPlaceholder")}
                        {renderInput('personalInfo', 'age', "age", "agePlaceholder", { keyboardType: "numeric" })}

                        <Dropdown

                            label={t("district")}
                            placeholder="Select District..."
                            value={selectedDistrict}
                            onSelect={(itemValue) => {
                                setSelectedDistrict(itemValue);
                                handleInputChange('personalInfo', 'district', itemValue);
                            }}
                            options={bangladeshDistricts.map(district => ({ label: district.name_bn, value: district.name }))}
                        />

                        <Button onPress={pickImage} mode="outlined" style={[styles.button, { marginTop: 30 }]}>
                            {t("personalInfo.uploadPhoto")}
                        </Button>
                    </View>
                );
            case 2:
                return formData.role === 'consumer' ? (
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>{t("consumerInfo.title")}</Text>
                        <Text style={styles.stepDescription}>{t("consumerInfo.description")}</Text>
                        <Text style={styles.subsectionTitle}>{t("consumerInfo.veterinaryPreferences")}</Text>
                        {veterinaries.map(e => (
                            <TextInput
                                key={e.id}
                                label={t(`veterinary.${e.id}`)}
                                placeholder={t(`veterinary.${e.id}Count`)}
                                value={formData.consumerInfo.veterinaries[e.id]}
                                onChangeText={(value) => handleInputChange('consumerInfo', 'veterinaries', { ...formData.consumerInfo.veterinaries, [e.id]: value })}
                                style={styles.input}
                                keyboardType="numeric"
                            />
                        ))}
                        {errors.consumerInfo && errors.consumerInfo.veterinaries && (
                            <HelperText type="error" visible={true}>
                                {errors.consumerInfo.veterinaries}
                            </HelperText>
                        )}
                    </View>
                ) : (
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>{t("providerInfo.title")}</Text>
                        <Text style={styles.stepDescription}>{t("providerInfo.description")}</Text>
                        {renderInput('providerInfo', 'designation', "designation", "designationPlaceholder")}
                        {renderInput('providerInfo', 'organization', "organization", "organizationPlaceholder")}
                        {renderInput('providerInfo', 'experience', "experience", "experiencePlaceholder", { keyboardType: "numeric" })}
                    </View>
                );
            case 3:
                return (
                    <View style={styles.stepContent}>
                        <Text style={styles.stepTitle}>{t("security.title")}</Text>
                        <Text style={styles.stepDescription}>{t("security.description")}</Text>
                        <TextInput
                            label={t("security.password")}
                            placeholder={t("security.passwordPlaceholder")}
                            value={formData.security.password}
                            onChangeText={(value) => handleInputChange('security', 'password', value)}
                            secureTextEntry={!showPassword}
                            right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
                            style={styles.input}
                            error={errors.security?.password ? true : false}
                        />
                        <HelperText type="error" visible={errors?.security && errors?.security?.password}>
                            {errors?.security && errors?.security?.password}
                        </HelperText>
                        <TextInput
                            label={t("security.confirmPassword")}
                            placeholder={t("security.confirmPasswordPlaceholder")}
                            value={formData.security.confirmPassword}
                            onChangeText={(value) => handleInputChange('security', 'confirmPassword', value)}
                            secureTextEntry={!showPassword}
                            right={<TextInput.Icon icon={showPassword ? "eye-off" : "eye"} onPress={() => setShowPassword(!showPassword)} />}
                            style={styles.input}
                            error={errors.security?.confirmPassword ? true : false}
                        />
                        <HelperText type="error" visible={errors?.security && errors?.security?.confirmPassword}>
                            {errors?.security && errors?.security?.confirmPassword}
                        </HelperText>
                    </View>
                );
            default:
                return null;
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <ProgressBar progress={(step + 1) / 4} color="#6200ee" style={styles.progressBar} />
                {renderStepContent()}
                <View style={styles.buttonContainer}>
                    {step > 0 && (
                        <Button mode="outlined" onPress={handlePrevious} style={styles.button}>
                            {t("navigation.previous")}
                        </Button>
                    )}
                    {step < 3 ? (
                        <Button mode="contained" onPress={handleNext} style={styles.button}>
                            {t("navigation.next")}
                        </Button>
                    ) : (
                        <Button mode="contained" onPress={handleRegistration} style={styles.button} loading={isLoading}>
                            {t("navigation.register")}
                        </Button>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        padding: 20,
    },
    progressBar: {
        marginBottom: 20,
    },
    stepContent: {
        marginBottom: 20,
    },
    stepTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    stepDescription: {
        fontSize: 16,
        marginBottom: 20,
    },
    roleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    input: {
        marginBottom: 15,
    },
    subsectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        marginHorizontal: 5,

    },
    photo: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        marginTop: 10,
    },
});

export default RegistrationScreen;