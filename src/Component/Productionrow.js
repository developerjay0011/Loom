//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import color from '../utils/Color';
import font from '../utils/CustomFont';
import Styles from '../utils/Styles';
import ErrowR from "../assets/svg/errowR.svg"
import moment from 'moment';
import string from "../Lang/LocalizedStrings"
const MyComponent = (props) => {
    return (
        <TouchableOpacity onPress={()=>props.onPress()} style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.text}>{string.Machine_No} : {props?.item?.machineNo}</Text>
                <Text style={styles.text}>{string.Design_No} : {props?.item?.designNo}</Text>
                <Text style={styles.text}>{string.Production} : {props?.item?.production}</Text>
            </View>
            <View style={styles.view}>
                <Text style={styles.text}>{string.Date} : {moment(props?.item?.productionDate).format("YYYY-MM-DD")}</Text>
                <Text style={styles.text}>{string.Shift} : {props?.item?.shift}</Text>
                <Text style={styles.text}>{string.RPM} : {props?.item?.rpm}</Text>
            </View>
            <ErrowR style={styles.errow} />
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingVertical: 9,
        width: "99%",
        alignSelf: "center",
        borderRadius: 14,
        ...Styles.up,
        backgroundColor: color.backgroundcolor,
        margin: 2, marginBottom: 16,
        paddingLeft: 11, paddingRight: 11,
        ...Styles.flexrow
    },
    text: {
        fontStyle: font.OpenSansI,
        fontSize: responsiveFontSize(1.5),
        color: color.black,
        fontWeight: '400',
        marginBottom: 8
    },
    view: {
        width: "43%",
        paddingHorizontal: 3,
        marginRight: 2,
    },
    errow: {
        position: "absolute",
        right: 16
    }
});

//make this component available to the app
export default MyComponent;
