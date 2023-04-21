import { StyleSheet } from "react-native";
import color from "../../utils/Color"
import font from "../../utils/CustomFont";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundcolor,
        paddingHorizontal: 35
    },
    app: {
        fontSize: 24,
        color: color.textcolor,
        fontWeight: "400",
        fontStyle: font.OpenSansI,
        marginTop: 56,
        marginBottom: 30
    }
});

export default styles;
