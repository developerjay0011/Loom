//import liraries
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native"
import styles from './styles';
import Header from "../../Component/Header"
import Editsvg from '../../assets/svg/edit.svg';
import Textinput from "../../Component/TextInput"
import Button from "../../Component/Button"
import { Edit } from '../../Redux/actions/auth';
import string from "../../Lang/LocalizedStrings"
import Imagepicker from "../../Component/Imagepicker"
import showToast from '../../utils/Toast';
const MyComponent = (props) => {
    const navigation = useNavigation();
    const [designation, setDesignation] = useState(null)
    const [department, setDepartment] = useState(null)
    const [tname, setTName] = useState(null)
    const [supervised, setSupervised] = useState(null)
    const [number, setNumber] = useState(null)
    const [url, seturl] = useState(null)
    const [iname, setname] = useState(null)
    const [type, settype] = useState(null)
    const [open, setopen] = useState(false);
    useEffect(() => {
        setDesignation(props?.employee?.designation)
        setDepartment(props?.employee?.department)
        setTName(props?.employee?.teamName)
        setSupervised(props?.employee?.supervisedBy)
        setNumber(props?.employee?.mobile)
    }, [])
    useEffect(() => {
        if (props?.employee) {
            seturl(props?.employee?.image ?
                { uri: props?.employee?.image }
                :
                require("../../assets/image/pimage.png"))
        }
    }, [props?.employee?.image])
    const uri = (text) => {
        seturl(require("../../assets/image/pimage.png"))
    }

    return (
        <SafeAreaView style={styles.container}>
            <Imagepicker
                open={open}
                setopen={() => { setopen(!open) }}
                upload={(item) => {
                    seturl(item.image)
                    setname(item.name)
                    settype(item.type)
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header name={string.Edit_Profile} onPress={() => { navigation.goBack() }} />
                <View style={{ width: "100%", paddingHorizontal: 25, paddingBottom: 30 }}>

                    <View style={{ marginBottom: 6, height: 131, width: 124, alignItems: "center", justifyContent: "center", alignSelf: "center" }}>
                        <Image
                            onError={(e) => { uri(e?.nativeEvent?.error) }}
                            source={url} style={styles.profile} />
                        <TouchableOpacity onPress={() => { setopen(true) }} style={styles.edit}>
                            <View style={styles.editsvg} >
                                <Editsvg />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Textinput value={designation} placeholder={string.Designation} style={{ marginTop: 37, }} onChangeText={(text) => { setDesignation(text) }} />
                    <Textinput value={department} style={{ marginTop: 5, }} placeholder={string.Department} onChangeText={(text) => { setDepartment(text) }} />
                    <Textinput value={tname} style={{ marginTop: 5, }} placeholder={string.Team_Name} onChangeText={(text) => { setTName(text) }} />
                    <Textinput value={supervised} style={{ marginTop: 5, }} placeholder={string.Supervised_By} onChangeText={(text) => { setSupervised(text) }} />
                    <Textinput value={number} style={{ marginTop: 5, }} placeholder={string.Phone_Number} onChangeText={(text) => { setNumber(text) }} />


                    <Button
                        button={{ marginTop: 30, }}
                        onPress={() => {
                            if (tname == "" || tname == null) {
                                showToast(string.Please_enter_shift)
                                return
                            }
                            if (designation == "" || designation == null) {
                                showToast(string.Please_enter_designation)
                                return
                            }
                            if (supervised == "" || supervised == null) {
                                showToast(string.Please_enter_Supervised_By)
                                return
                            }
                            if (number == "" || number == null) {
                                showToast(string.Please_enter_number)
                                return
                            }
                            if (department == "" || department == null) {
                                showToast(string.Please_enter_department)
                                return
                            }
                            if (url == "" || url == null) {
                                showToast(string.Please_upload_image)
                                return
                            }
                            props.Edit({
                                "teamName": tname,
                                "designation": designation,
                                "supervisedBy": supervised,
                                "mobile": number,
                                "department": department,
                                "image": url ? url : props?.employee?.url,
                                "type": type ? type : "image/jpg",
                                "iname": iname ? iname : "test.jpg"
                            })
                        }}
                        name={string.Update}
                    />
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
        Edit: (data) => dispatch(Edit(data))
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
