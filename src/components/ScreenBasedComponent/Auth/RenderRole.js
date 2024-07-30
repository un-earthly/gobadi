import { TouchableOpacity } from "react-native";
import { RadioButton, Text } from "react-native-paper";
import { styles } from "../../../screens/auth/styles/Registration.styles";
import { useTranslation } from "react-i18next";

const RenderRoleItem = ({ role, checked, setChecked }) => {
    const { t } = useTranslation();
    return <TouchableOpacity
        key={role.value}
        style={styles.role_item}
        onPress={() => setChecked(role.value)}
    >
        <RadioButton
            value={role.value}
            status={checked === role.value ? 'checked' : 'unchecked'}
            onPress={() => setChecked(role.value)}
        />
        <Text>{t(role.label)}</Text>
    </TouchableOpacity>
};

export default RenderRoleItem;