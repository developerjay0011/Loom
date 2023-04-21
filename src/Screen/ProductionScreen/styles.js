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
    name: {
        fontSize: responsiveFontSize(2),
        color: color.black,
        fontWeight: "400",
        fontStyle: font.OpenSansI,
        alignSelf: "center",
        marginTop: 20,
    },
    Calendar: {
        calendarBackground: color.backgroundcolor,
        textSectionTitleColor: color.black,
        todayTextColor: color.black,
        dayTextColor: color.black,
        selectedDayTextColor: 'white',
        selectedDayBackgroundColor: color.commongreen,
        selectedDotColor: '#ffffff',
        disabledArrowColor: color.backgroundcolor,
        monthTextColor: color.black,
        indicatorColor: null,
        textSectionTitleDisabledColor: color.black,
        textDayFontFamily: font.OpenSansI,
        textMonthFontFamily: font.OpenSansI,
        textDayHeaderFontFamily: font.OpenSansI,
        textMonthFontWeight: 'bold',
        textDayHeaderFontWeight: '700',
        textDayFontWeight: '600',
        textMonthFontSize: responsiveFontSize(2.2),
        textDayHeaderFontSize: responsiveFontSize(1.8),
        textDayFontSize: responsiveFontSize(1.6),
    }
});

export default styles;
