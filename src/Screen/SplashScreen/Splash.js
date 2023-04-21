//import liraries
import React, { useEffect } from 'react';
import { Text, SafeAreaView, Image, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import Logo from "../../assets/svg/logo.svg"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Loader } from "../../Redux/actions/auth"
const width = Dimensions.get("window").width
const MyComponent = (props) => {
    const getData = async () => {
        try {
            props.Loader(false)
            const token = await AsyncStorage.getItem('token')
            const id = await AsyncStorage.getItem('id')
            global.token = token
            global.id = id
            console.log("global.token:", global.token)
            if (global?.token) {
                setTimeout(() => {
                    props.navigation.replace("Home")
                }, 3000);
            } else {
                setTimeout(() => {
                    props.navigation.replace("Login")
                }, 2000);
            }
        } catch (e) {
            setTimeout(() => {
                props.navigation.replace("Login")
            }, 2000);
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Image source={require("../../assets/image/logo.jpeg")} resizeMode="contain" style={{ width: width / 2, height: width / 2, }} />
            <Text style={styles.app}>SHREE</Text>
        </SafeAreaView>
    );
};


const mapState = (state) => {
    return {

    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        Loader: (data) => dispatch(Loader(data))
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
