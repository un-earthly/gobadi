import { View } from "react-native";
import { commonStyles } from "../../../screens/auth/styles/Common.styles";
import { Text, TextInput } from "react-native-paper";

export default function Input({ placeholder, label, id }) {
    return <View style={commonStyles.input_container}>
        <Text style={commonStyles.label}>{label}</Text>
        <TextInput
            id={id}
            placeholder={placeholder}
        />
    </View>
}