//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import color from '../utils/Color';
import font from '../utils/CustomFont';
import Styles from '../utils/Styles';
import Add from "../assets/svg/add.svg"
import { useNavigation } from '@react-navigation/native';
// create a component
const MyComponent = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={()=>{ navigation.navigate("Addproduction")}} style={styles.container}>
            <Add />
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 48,
        width: 48,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: color.commongreen,
        ...Styles.up,
        position: "absolute",
        bottom: 100,
        right: 11
    },
});

//make this component available to the app
export default MyComponent;
