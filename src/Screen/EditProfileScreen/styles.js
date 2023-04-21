import { Dimensions, StyleSheet } from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import color from "../../utils/Color"
import font from "../../utils/CustomFont";
import Styles from "../../utils/Styles";
const width = Dimensions.get("window").width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.backgroundcolor,
    },
    Icon: {
        height: width / 15,
        width: width / 15,
        marginLeft: 20,
        marginBottom: 20,
        marginTop: 20
    },
    closei:{
        height: width / 30,
        width: width / 30,
        marginTop: 15
    },
    ModalItem: {
        backgroundColor: color.backgroundcolor,
        overflow:"hidden",
        width: width / 3,
        borderRadius: 20,
        marginTop: 160,
        marginLeft: width / 1.8
    },
    button2: {
        flexDirection: "row",
        alignItems: "center",
    },
    close: {
        right: 10,
        alignSelf: "flex-end",
        top: -6,
        position: "absolute"
    },
    Modalview: {
        backgroundColor: "rgba(0,0,0,0.4)",
        flex: 1
    },
    edit: {
        height: 42,
        width: 42,
        backgroundColor: "white",
        position: "absolute",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        right: -5,
        bottom: 0
    },
    editsvg: {
        ...Styles.up,
        height: 32,
        width: 32,
        backgroundColor: "rgb(242,242,242)",
        shadowColor: "black",
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    profile: {
        height: 120,
        width: 120,
        borderRadius: 100,
        alignSelf: "center",
        resizeMode: "stretch"
    },
});

export default styles;
