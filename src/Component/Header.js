import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Sidebars from "../assets/svg/sidebar.svg"
import Back from "../assets/svg/back.svg"
import color from '../utils/Color';
import font from '../utils/CustomFont';
import Styles from '../utils/Styles';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
// import Sidebar from "../Component/drawer"

const MyComponent = (props) => {
    return (
        <View style={[Styles.flexrow, styles.container]}>
            <TouchableOpacity onPress={() => props.onPress()} style={[styles.side, { left: props.tab ? 8 : 11 }]}>
                {props.tab ?
                    null
                    :
                    <Back />
                }
            </TouchableOpacity>
            <Text style={styles.name}>{props.name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.topbar,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 15
    },
    name: {
        fontSize: responsiveFontSize(2.5),
        marginHorizontal: 50,
        color: color.textwhite,
        fontWeight: "700",
        fontStyle: font.OpenSansI,
        alignSelf: "center"
    },
    side: {
        position: "absolute",
        left: 8,
    }
});

export default MyComponent;
