import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { loginUrl, registerUrl } from '../api/routes';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for user data in AsyncStorage on app start
        checkUserLoggedIn();
    }, []);

    const checkUserLoggedIn = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                setUser(JSON.parse(userData));
            }
        } catch (error) {
            console.error('Error checking user login status:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (mobile, password) => {
        setIsLoading(true);
        try {
            const response = await axios.post(loginUrl, { mobile, password });
            console.log(response.data)
            await AsyncStorage.setItem("userData", JSON.stringify(response.data));
            setUser(response.data.user);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (formData) => {
        setIsLoading(true);
        try {
            const response = await axios.post(registerUrl, formData);
            await AsyncStorage.setItem("userData", JSON.stringify(response.data));
            setUser(response.data.user);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.removeItem('userData');
            setUser(null);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const value = {
        user,
        isLoading,
        login,
        register,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};