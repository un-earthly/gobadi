import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../../../screens/menu/styles/Menu.styles';

const CategoryItem = ({ category, onPress }) => (
    <TouchableOpacity
        style={styles.category_item}
        onPress={onPress}
    >
        <Text style={styles.text}>{category.title}</Text>
    </TouchableOpacity>
);

export default CategoryItem;
