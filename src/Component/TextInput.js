import React, { useState } from 'react';
import { StyleSheet, TextInput, } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import color from '../utils/Color';
import font from '../utils/CustomFont';

const MyComponent = (props) => {
    return (
        <TextInput
            maxLength={props.maxLength}
            style={[styles.textinput, props.style,]}
            onChangeText={(text) => { props.onChangeText(text) }}
            value={props.value}
            placeholder={props.placeholder}
            placeholderTextColor={color.textinputcolor}
            secureTextEntry={props.password}
            multiline={props?.multiline}
            editable={props?.editable == false ? props?.editable : true}
            numberOfLines={props?.numberOfLines}
            keyboardType={props.keyboardType}
        />
    );
};

const styles = StyleSheet.create({
    textinput: {
        fontSize: responsiveFontSize(2),
        fontStyle: font.OpenSansI,
        fontWeight: '400',
        letterSpacing: 0.8,
        color: color.black,
        margin: 2,
        paddingVertical: 12,
        paddingHorizontal: 13,
        borderRadius: 5,
        borderColor: color.borderColor,
        borderWidth: 1,
        alignSelf: "center",
        width: "100%",
    }

})

export default MyComponent;
