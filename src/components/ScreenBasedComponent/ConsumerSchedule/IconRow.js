
const IconRow = ({ icon: IconComponent, label, name }) => (
    <View style={styles.iconRow}>
        <IconComponent size={24} color="black" name={name} />
        <Text style={styles.iconLabel}>{label}</Text>
    </View>
);

export default IconRow