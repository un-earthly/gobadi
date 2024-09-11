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
            subCategories: [
                { id: "101", title: t("local cattle") },
                { id: "102", title: t("crossbred cattle") },
                { id: "103", title: t("buffalo") },
                { id: "104", title: t("ox") }
            ]
        },
        {
            id: 2,
            icon: <MaterialIcons name="goat" size={24} color="black" />,
            title: t("goat"),
            subCategories: [
                { id: "201", title: t("black bengal goat") },
                { id: "202", title: t("jamunapari goat") },
                { id: "203", title: t("crossbred goat") },
                { id: "204", title: t("saanen goat") }
            ]
        },
        {
            id: 3,
            icon: <MaterialCommunityIcons name="duck" size={24} color="black" />,
            title: t("duck"),
            subCategories: [
                { id: "301", title: t("khaki campbell") },
                { id: "302", title: t("pekin") },
                { id: "303", title: t("muscovy duck") },
                { id: "304", title: t("desi duck") }
            ]
        },
        {
            id: 4,
            icon: <FontAwesome6 name="the-red-yeti" size={24} color="black" />,
            title: t("hen"),
            subCategories: [
                { id: "401", title: t("desi chicken") },
                { id: "402", title: t("broiler chicken") },
                { id: "403", title: t("layer chicken") },
                { id: "404", title: t("sonali chicken") }
            ]
        },
        {
            id: 5,
            icon: <FontAwesome6 name="fish" size={24} color="black" />,
            title: t("fish"),
            subCategories: [
                { id: "501", title: t("rohu") },
                { id: "502", title: t("catla") },
                { id: "503", title: t("tilapia") },
                { id: "504", title: t("pangasius") },
                { id: "505", title: t("silver carp") },
                { id: "506", title: t("grass carp") },
                { id: "507", title: t("mrigal") },
                { id: "508", title: t("kalbaush") },
                { id: "509", title: t("gourami") },
                { id: "510", title: t("magur") },
                { id: "511", title: t("shing") },
                { id: "512", title: t("koi") },
                { id: "513", title: t("bata") },
                { id: "514", title: t("boal") },
                { id: "515", title: t("puti") }
            ]
        }
    ];

    const handleMenuItemPress = (item) => {
        setSelectedItem(item);
    };

    const handleCategoryPress = (cat) => {
        navigation.navigate("UploadImage", { 
            category: selectedItem.title,
            subCategory: cat.title
         });
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
                                    {selectedItem.subCategories.map((category) => (
                                        <CategoryItem
                                            key={category.id}
                                            category={category}
                                            onPress={()=>handleCategoryPress(category)}
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
