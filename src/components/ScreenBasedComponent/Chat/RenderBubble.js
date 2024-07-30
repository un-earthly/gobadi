import { Bubble } from "react-native-gifted-chat";

const renderBubble = (props) => (
    <Bubble
        {...props}
        wrapperStyle={{
            right: {
                backgroundColor: '#9C27B0',
            },
            left: {
                backgroundColor: '#E0E0E0',
            },
        }}
        textStyle={{
            right: {
                color: '#fff',
            },
            left: {
                color: '#000',
            },
        }}
    />
);

export default renderBubble;