import { View } from "react-native";
import { Text } from "react-native-paper";
import { styles } from "../../../screens/consumerSchedule/styles/consumerSchedule.styles";

const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);
export default InfoRow