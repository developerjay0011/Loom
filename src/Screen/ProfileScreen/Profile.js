//import liraries
import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, ScrollView, FlatList, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native"
import styles from './styles';
import Header from "../../Component/Header"
import Styles from '../../utils/Styles';
import Edit from '../../assets/svg/edit.svg';
import Lang from '../../assets/svg/lang.svg';
import Us from '../../assets/svg/us.svg';
import Privacy from '../../assets/svg/privacy.svg';
import Eprofile from '../../assets/svg/eprofile.svg';
import Help from '../../assets/svg/help.svg';
import Noti from '../../assets/svg/noti.svg';
import Button from "../../Component/Button"
import { EditProfilepic, Logout } from '../../Redux/actions/auth';
import RNRestart from 'react-native-restart'
import string from "../../Lang/LocalizedStrings"
import { setLng, getLng } from '../../helper/changeLng';
import Imagepicker from "../../Component/Imagepicker"
const data =
    [{
        data: [
            {
                name: "Edit Profile",
                nav: "EditProfile",
                name2: "प्रोफ़ाइल संपादित करें"
            },
            {
                name: "Language",
                nav: "Language",
                name2: "भाषा"
            }]
    },
    {
        data: [
            {
                name: "Help & Support",
                nav: "Help",
                name2: "मदद समर्थन"
            },
            {
                name: "Contact us",
                nav: "Contact",
                name2: "संपर्क करें"
            },
            {
                name: "Privacy policy",
                nav: "Privacy",
                name2: "गोपनीयता नीति"
            }]
    }]
const MyComponent = (props) => {
    const navigation = useNavigation();
    const [notis, setnoti] = useState(true)
    const [open, setopen] = useState(false);
    const [url, seturl] = useState(null)
    const [selected, setselected] = useState('1')
    const Getlang = async () => {
        const lngData = await getLng()
        if (lngData == "ind") {
            setselected("2")
        } else {
            setselected("1")
        }
    }
    useEffect(() => {
        Getlang()
    }, [])
    useEffect(() => {
        if (props?.employee) {
            seturl(props?.employee?.image ?
                { uri: props?.employee?.image }
                :
                require("../../assets/image/pimage.png"))
        }
    }, [props?.employee?.image])
    const uri = () => {
        seturl(require("../../assets/image/pimage.png"))
    }


    const renderItem = ({ item, index }) => {
        return (
            <View key={index} style={styles.flatList}>
                {item?.data?.map((item2, index2) =>
                    <TouchableOpacity
                        onPress={() => {
                            if (index == 0 && index2 == 0) {
                                navigation.navigate("EditProfile")
                            }
                        }}
                        key={index2} style={[Styles.flexrow, { marginBottom: index2 == index == 1 ? 2 : 1 ? null : 15 }]}>
                        {item2.nav == "EditProfile" ? <Eprofile /> : item2.nav == "Notifications" ? <Noti /> : item2.nav == "Language" ? <Lang />
                            : item2.nav == "Help" ? <Help /> : item2.nav == "Contact" ? <Us /> : item2.nav == "Privacy" ? <Privacy /> : null}
                        <Text style={styles.name}>{global.lng == "en" ? item2.name : item2.name2}</Text>
                        {item2.nav == "Notifications" ?
                            <Text onPress={() => { setnoti(!notis) }} style={styles.name2}>{notis ? "On" : "Off"}</Text>
                            : item2.nav == "Language" ?
                                <Text onPress={async () => {
                                    if (selected == "1") {
                                        setselected("2")
                                        setLng('ind')
                                        RNRestart.Restart()
                                    } else {
                                        setselected("1")
                                        setLng('en')
                                        RNRestart.Restart()
                                    }
                                }} style={styles.name2}>{selected == 1 ? "English" : "हिंदी"}</Text>
                                :
                                null}
                    </TouchableOpacity>
                )}
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Imagepicker
                open={open}
                setopen={() => { setopen(!open) }}
                upload={(item) => { props.EditProfilepic(item) }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header name={string.Profile} tab={true} onPress={() => { navigation.toggleDrawer() }} />
                <View style={{ width: "100%", paddingHorizontal: 25, paddingBottom: 100 }}>
                    <View style={{ marginBottom: 6, height: 131, width: 124, alignItems: "center", justifyContent: "center", alignSelf: "center" }}>
                        <Image
                            onError={(e) => { uri(e?.nativeEvent?.error) }}
                            source={url} style={styles.profile} />
                        <TouchableOpacity onPress={() => { setopen(true) }} style={styles.edit}>
                            <View style={styles.editsvg} >
                                <Edit />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.time}>{props?.employee?.name}</Text>
                    <Text style={styles.month}>{props?.employee?.email} | {props?.employee?.mobile}</Text>

                    <View>
                        <FlatList
                            data={data}
                            renderItem={renderItem}
                        />
                    </View>

                    <Button name={string.Logout} onPress={() => props.Logout()} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const mapState = (state) => {
    return {
        employee: state.user.employee,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        EditProfilepic: (data) => dispatch(EditProfilepic(data)),
        Logout: () => dispatch(Logout()),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
