//import liraries
import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, ScrollView, View, TouchableOpacity, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native"
import styles from './styles';
import Header from "../../Component/Header"
import Styles from '../../utils/Styles';
import moment from 'moment';
import color from '../../utils/Color';
import Error from "../../assets/svg/error.svg"
import Location from "../../assets/svg/location.svg"
import { responsiveFontSize } from 'react-native-responsive-dimensions';
const width = Dimensions.get("window").width

const MyComponent = (props) => {
    const navigation = useNavigation();
    const today = moment().format("dddd, MMM DD")
    const [time, settime] = useState(moment().format("hh:mm A"))
    setInterval(() => {
        settime(moment().format("hh:mm A"))
    }, 1000);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header name="" onPress={() => { navigation.goBack() }} />
                <View style={{ width: "100%", paddingHorizontal: 25, paddingBottom: 30 }}>
                    <Text style={styles.time}>{time}</Text>
                    <Text style={styles.month}>{today}</Text>
                    <View style={Styles.flexrow}>
                        <Error />
                        <Text style={styles.status}>Status : <Text style={{ fontSize: responsiveFontSize(2), color: color.alertcolor, fontWeight: '400', }}>You are not in office range</Text></Text>
                    </View>

                    <Image source={require("../../assets/image/map.png")} resizeMode="stretch" style={{ marginTop: 30, width: "95%", alignSelf: "center", height: 190, }} />

                    <View style={[Styles.flexrow, { marginTop: 20, alignItems: null }]}>
                        <Location />
                        <Text style={[styles.status, { width: "78%" }]}>Your Location : <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '400', }}>Block C, 24/A Tajmahal Road (Ring Road, Near Shia Mosque, Dhaka 1207)</Text></Text>
                    </View>

                    <Text style={[styles.status, { width: "78%", marginTop: 50, fontWeight: "400", alignSelf: "center" }]}>Note: Please go inside Office range then <Text style={{ fontSize: responsiveFontSize(2), fontWeight: '400', color: color.alertcolor, textDecorationLine: "underline" }}> try again!</Text></Text>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const mapState = (state) => {
    return {

    };
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
