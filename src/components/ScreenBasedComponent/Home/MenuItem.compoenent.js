import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../../screens/menu/styles/Menu.styles';

const MenuItem = ({ item, onPress, selected, styleType }) => (
    <TouchableOpacity
        onPress={() => onPress(item)}
        style={[
            styleType === 'full' ? styles.menu_item_full : styles.menu_item_half,
            selected && styles.selected_item
        ]}
    >
        <View>
            {item.icon}
        </View>
        <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
);

export default MenuItem;
