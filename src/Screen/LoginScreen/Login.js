//import liraries
import React, { useState } from 'react';
import { Text, SafeAreaView, ScrollView, View } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import Loginsvg from "../../assets/svg/login.svg"
import Textinput from "../../Component/TextInput"
import Button from "../../Component/Button"
import Toast from 'react-native-root-toast';
import { Login } from '../../Redux/actions/auth';
import string from "../../Lang/LocalizedStrings"
import showToast from '../../utils/Toast';

const MyComponent = (props) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ width: "100%", alignItems: "center", paddingBottom: 30 }} >
                    <Text style={styles.app}>{string.Welcome_Back}</Text>
                    <Loginsvg />
                    <Textinput value={email} placeholder={string.Email} style={{ marginTop: 30, }} onChangeText={(text) => { setEmail(text) }} />
                    <Textinput password={true} value={password} style={{ marginTop: 5, }} placeholder={string.Password} onChangeText={(text) => { setPassword(text) }} />
                    <Button
                        button={{ marginTop: 30, }}
                        loader={props.loader}
                        onPress={() => {
                            if (email == "" || email == null) {
                                showToast(string.Please_enter_email)
                                return
                            }
                            if (password == "" || password == null) {
                                showToast(string.enter_password)
                                return
                            }
                            props.Login({
                                "email": email,
                                "password": password
                            })
                        }}
                        name={string.Login}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const mapState = (state) => {
    return {
        loader: state.user.loader,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        Login: (param) => dispatch(Login(param)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
