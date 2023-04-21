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
    range: {
        fontSize: 22,
        color: color.textcolor,
        fontWeight: "400",
        alignSelf: "center",
        marginBottom: 26,
        marginTop: 20,
        fontStyle: font.OpenSansI,
    },
    reason: {
        fontSize: 22,
        color: color.textcolor,
        fontWeight: "400",
        marginBottom: 15,
        marginTop: 37,
        fontStyle: font.OpenSansI,
    },
    hi: {
        fontSize: 22,
        color: color.textcolor,
        fontWeight: "400",
        alignSelf: "center",
        marginBottom: 30,
        fontStyle: font.OpenSansI,
    },
    Modalview: {
        backgroundColor: "rgba(0,0,0,0.4)",
        flex: 1,
        justifyContent: "center"
    },
    intext: {
        fontSize: 24,
        color: color.textwhite,
        fontWeight: "700",
        alignSelf: "center",
        fontStyle: font.OpenSansI,
    },
    ctext: {
        fontSize: responsiveFontSize(2.1),
        color: color.textcolor,
        fontWeight: "500",
        alignSelf: "center",
        fontStyle: font.OpenSansI,
    },
    ModalItem: {
        backgroundColor: color.backgroundcolor,
        overflow: "hidden",
        width: "90%",
        borderRadius: 10,
        alignSelf: "center",
        paddingHorizontal: 20
    },
    ctime: {
        fontSize: responsiveFontSize(2.2),
        marginTop: 10,
        color: color.textcolor,
        fontWeight: "700",
        alignSelf: "center",
        fontStyle: font.OpenSansI,
    },
    time: {
        fontSize: 40,
        color: color.textcolor,
        fontWeight: "700",
        alignSelf: "center",
        fontStyle: font.OpenSansI,
    },
    month: {
        fontSize: 20,
        color: color.textcolor,
        fontWeight: "400",
        alignSelf: "center",
        marginBottom: 20,
        fontStyle: font.OpenSansI,
    },
    in: {
        height: width / 2.5,
        width: width / 2.5,
        backgroundColor: color.commongreen,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    timecount: {
        alignItems: "center",
        width: width / 3.5,
    }
});

export default styles;
