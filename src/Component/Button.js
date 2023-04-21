//import liraries
import React from 'react';
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import color from '../utils/Color';
import font from '../utils/CustomFont';

const Button = (props) => {
    return (
        <TouchableOpacity style={[styles.container, props.button]} onPress={() => props.onPress()}>
            {
                props.loader ? <ActivityIndicator color={"white"}></ActivityIndicator> : <Text style={[styles.name, props.text]}>{props.name}</Text>
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: color.buttoncolor,
        width: "100%",
        borderRadius: 5,
        alignSelf: "center",
        margin:2,
        marginTop: 37,
        height: 50,
        shadowColor: color.buttoncolor,
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 12,
    },
    name: {
        fontFamily: font.OpenSansI,
        fontSize: 19,
        fontWeight: '700',
        letterSpacing: .8,
        color: color.btext,
        alignSelf: "center",
        textAlign: "center",
    }
});

export default Button;
