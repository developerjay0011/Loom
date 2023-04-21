import { StyleSheet } from "react-native";
import color from "../../utils/Color"
import font from "../../utils/CustomFont";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.backgroundcolor,
    },
    app: {
        fontSize: 24,
        color: color.black,
        fontWeight: "900",
        fontStyle: font.OpenSansI,
        marginTop: 19
    }
});

export default styles;
