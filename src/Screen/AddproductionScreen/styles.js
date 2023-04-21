import { StyleSheet, Dimensions } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import color from "../../utils/Color"
import font from "../../utils/CustomFont";
const width = Dimensions.get("window").width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundcolor,
    },
    button2: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 20,
        width: width / 6,
        marginTop: 10
    },
    uploade: {
        fontSize: responsiveFontSize(1.8),
        fontStyle: font.OpenSansI,
        fontWeight: '400',
        marginBottom:10,
        color: color.black,
    },
    Icon: {
        height: width / 15,
        width: width / 15,
    },
    images: {
        height: 120,
        width: 120,
        borderRadius: 10,marginLeft:5
    },
    image: {
        height: 130,
        width: "100%",
        borderColor: color.borderColor,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10,
        overflow: "hidden",
        borderWidth: 1,
        marginBottom: 10
    },
    app: {
        fontSize: 24,
        color: color.textcolor,
        fontWeight: "400",
        fontStyle: font.OpenSansI,
        marginTop: 56,
        marginBottom: 10
    },
    reason2:{
        fontSize: 15,
        color: color.textcolor,
        fontWeight: "400",
        fontStyle: font.OpenSansI,
    },
    date: {
        margin: 2,
        paddingVertical: 12,
        paddingHorizontal: 13,
        borderRadius: 5,
        borderColor: color.borderColor,
        borderWidth: 1,
        alignSelf: "center",
        width: "100%",
    },
    datetext: {
        fontSize: responsiveFontSize(2),
        fontStyle: font.OpenSansI,
        fontWeight: '400',
        letterSpacing: 0.8,
        marginLeft: 10,
        color: color.textinputcolor,
    }
});

export default styles;
