import React, { useState } from 'react';
import { ScrollView, Text, View, SafeAreaView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { styles } from './styles/Menu.styles';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import MenuItem from '../../components/ScreenBasedComponent/Home/MenuItem.compoenent';
import CategoryItem from '../../components/ScreenBasedComponent/Home/CategoryItem';
import { globalStyles } from '../../styles/Global.styles';
import BottomBar from '../../components/common/BottomBar';

const MenuScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const [selectedItem, setSelectedItem] = useState(null);

    const menuItems = [
        {
            id: 1,
            icon: <FontAwesome6 name="cow" size={24} color="black" />,
            title: t("cow"),
            categories: [
                { id: "101", title: t("bull") },
                { id: "102", title: t("water") },
                { id: "103", title: t("water") },
                { id: "104", title: t("cattle") }
            ]
        },
        {
            id: 2,
            icon: <MaterialIcons name="goat" size={24} color="black" />,
            title: t("goat"),
            categories: [
                { id: "201", title: t("bull") },
                { id: "202", title: t("water") },
                { id: "203", title: t("water") },
                { id: "204", title: t("cattle") }
            ]
        },
        {
            id: 3,
            icon: <MaterialCommunityIcons name="duck" size={24} color="black" />,
            title: t("duck"),
            categories: [
                { id: "301", title: t("bull") },
                { id: "302", title: t("water") },
                { id: "303", title: t("water") },
                { id: "304", title: t("cattle") }
            ]
        },
        {
            id: 4,
            icon: <FontAwesome6 name="the-red-yeti" size={24} color="black" />,
            title: t("hen"),
            categories: [
                { id: "401", title: t("bull") },
                { id: "402", title: t("water") },
                { id: "403", title: t("water") },
                { id: "404", title: t("cattle") }
            ]
        },
        {
            id: 5,
            icon: <FontAwesome6 name="fish" size={24} color="black" />,
            title: t("fish"),
            categories: [
                { id: "501", title: t("bull") },
                { id: "502", title: t("water") },
                { id: "503", title: t("water") },
                { id: "504", title: t("cattle") }
            ]
        },
    ];

    const handleMenuItemPress = (item) => {
        setSelectedItem(item);
    };

    const handleCategoryPress = () => {
        navigation.navigate("UploadImage");
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <ScrollView contentContainerStyle={globalStyles.bottom_bar_height}>
                <View style={{
                    padding: 10
                }}>
                    <View style={styles.menu_container}>
                        {menuItems.map((item, index) => (
                            <MenuItem
                                key={item.id}
                                item={item}
                                onPress={handleMenuItemPress}
                                selected={selectedItem && item.id === selectedItem.id}
                                styleType={index % 5 === 4 ? 'full' : 'half'}
                            />
                        ))}
                    </View>
                    <View style={{
                        flex: 1
                    }}>
                        {selectedItem && (
                            <View style={styles.menu_container}>
                                <View style={styles.selected_item_header}>
                                    <FontAwesome6 name="arrow-down" size={24} color="black" />
                                    <Text style={styles.selected_item_title}>{selectedItem.title}</Text>
                                </View>
                                <View style={styles.category_container}>
                                    {selectedItem.categories.map((category) => (
                                        <CategoryItem
                                            key={category.id}
                                            category={category}
                                            onPress={handleCategoryPress}
                                        />
                                    ))}
                                </View>
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
            <BottomBar navigation={navigation} />
        </SafeAreaView>
    );
};

export default MenuScreen;
