import { Dimensions, StyleSheet } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import color from "../../utils/Color"
import font from "../../utils/CustomFont";
const width = Dimensions.get("window").width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundcolor,
    },
    time: {
        fontSize: 40,
        color: color.textcolor,
        fontWeight: "700",
        alignSelf: "center",
        fontStyle: font.OpenSansI,
    },
    status: {
        fontSize: responsiveFontSize(2.2),
        color: color.textcolor,
        fontWeight: "600",
        alignSelf: "center",
        marginLeft: 6,
        fontStyle: font.OpenSansI,
    },
    month: {
        fontSize: 20,
        color: color.textcolor,
        fontWeight: "400",
        alignSelf: "center",
        marginBottom: 50,
        fontStyle: font.OpenSansI,
    },
});

export default styles;
