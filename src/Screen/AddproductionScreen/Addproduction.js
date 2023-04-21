//import liraries
import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, ScrollView, View, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native"
import styles from './styles';
import Textinput from "../../Component/TextInput"
import Button from "../../Component/Button"
import Header from "../../Component/Header"
import Styles from '../../utils/Styles';
import Calendar from "../../assets/svg/calendar.svg"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment, { } from 'moment';
import { AddProduction } from '../../Redux/actions/auth';
import string from "../../Lang/LocalizedStrings"
import Imagepicker from "../../Component/Imagepicker"
import DropDownPicker from 'react-native-dropdown-picker';
import showToast from "../../utils/Toast"
import color from '../../utils/Color';
const MyComponent = (props) => {
    const navigation = useNavigation();
    const [shift, setShift] = useState(null)
    const [machine, setMachine] = useState(null)
    const [design, setDesign] = useState(null)
    const [rpm, setRPM] = useState(null)
    const [production, setProduction] = useState(null)
    const [efficency, setEfficency] = useState(null)
    const [date, setDate] = useState(moment())
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [url, seturl] = useState(null)
    const [iname, setname] = useState(null)
    const [type, settype] = useState(null)
    const [open, setopen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState(props?.machineList);
    const [open3, setOpen3] = useState(false);
    const [items3, setItems3] = useState(props?.shiftlist?.filter(item => item?.department == props?.employee?.department).map(item => ({ label: item.shiftName, value: item?._id })));
    useEffect(() => {
        setItems(props?.machineList)
    }, [])
    useEffect(() => {
        console.log(props?.shiftlist)
        setItems3(props?.shiftlist?.filter(item => item?.department == props?.employee?.department).map(item => ({ label: item.shiftName, value: item?._id })))
    }, [props?.shiftlist])
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        console.log(date)
        setDate(date)
        hideDatePicker();
    };

    const call = () => {
        if (shift != null && rpm != null && production != null && shift != '' && rpm != '' && production != '') {
            var data = props?.shiftlist?.filter((item) => shift == item?._id)
            var startTime = moment(data[0]?.startTime, 'HH:mm:ss a');
            var endTime = moment(data[0]?.endTime, 'HH:mm:ss a');
            var duration = moment.duration(endTime.diff(startTime));
            var hours = parseInt(duration.asHours());
            var minutes = parseInt(duration.asMinutes()) % 60;
            const total = (hours + minutes) * 60 * rpm
            const e = ((production * 100) / total).toFixed(2)
            setEfficency(`${e.toString()}`)
        } else {
            setEfficency(null)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Imagepicker
                open={false}
                opencamera={open}
                setopencamera={() => { setopen(!open) }}
                upload={(item) => {
                    seturl(item.image)
                    setname(item.name)
                    settype(item.type)
                }}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header name={string.Add_Production} onPress={() => { navigation.goBack() }} />
                <View style={{ width: "100%", alignItems: "center", paddingBottom: 30, paddingHorizontal: 25 }} >
                    <View style={styles.image}>
                        {url ?
                            <View style={{ alignItems: "center", justifyContent: "space-between", flexDirection: "row", width: "100%", }}>
                                <Image source={{ uri: url }} style={styles.images} />
                                <Button
                                    button={{ width: 70, borderRadius: 10, height: 30, marginTop: 0, marginRight: 20, }}
                                    name={string.Edit}
                                    text={{ fontSize: 16, }}
                                    onPress={() => { seturl(null) }}
                                />
                            </View>
                            :
                            <View style={{ alignItems: "center" }}>
                                <Text style={styles.uploade}>{string.Upload_Image}</Text>
                                <TouchableOpacity onPress={() => { setopen(!open) }}>
                                    <Image
                                        imageStyle={{ resizeMode: "stretch" }}
                                        style={styles.Icon}
                                        source={require('../../assets/image/camera.png')} />
                                </TouchableOpacity>
                            </View>
                        }
                    </View>

                    <View onPress={() => showDatePicker()} style={[styles.date, Styles.spacebetween]}>
                        <View style={[Styles.flexrow, { marginBottom: 0, paddingRight: 50 }]}>
                            <Calendar />
                            <Text style={styles.datetext}>{date ? moment().format("DD/MM/YYYY") : moment().format("DD/MM/YYYY")}</Text>
                        </View>
                    </View>

                    <DropDownPicker
                        open={open3}
                        value={shift}
                        items={[...items3]}
                        placeholder={string.Shift}
                        searchable={true}
                        listMode="MODAL"
                        placeholderStyle={{ color: color.borderColor }}
                        textStyle={styles.reason2}
                        setOpen={setOpen3}
                        onChangeValue={(item) => call()}
                        setValue={setShift}
                        setItems={setItems3}
                        style={{ borderColor: color.borderColor, marginTop: 5 }}
                    />
                    <DropDownPicker
                        open={open2}
                        value={value}
                        items={items}
                        placeholder={string.Machine_No}
                        searchable={true}
                        listMode="MODAL"
                        placeholderStyle={{ color: color.borderColor }}
                        onChangeValue={() => call()}
                        textStyle={styles.reason2}
                        setOpen={setOpen2}
                        setValue={setValue}
                        setItems={setItems}
                        style={{ borderColor: color.borderColor, marginTop: 5 }}
                    />
                    <Textinput value={design} placeholder={string.Design_No} style={{ marginTop: 5, }} onChangeText={(text) => { setDesign(text) }} />
                    <Textinput value={rpm} keyboardType="numeric" style={{ marginTop: 5, }} placeholder={string.RPM} onChangeText={(text) => { setRPM(text), call() }} />
                    <Textinput value={production} keyboardType="numeric" placeholder={string.Production} style={{ marginTop: 5, }} onChangeText={(text) => { setProduction(text), call() }} />
                    <Textinput value={efficency ? efficency + "%" : null} editable={false} style={{ marginTop: 5, }} placeholder={string.Efficiency} onChangeText={(text) => { setEfficency(text) }} />
                    <Button
                        button={{ marginTop: 30, }}
                        onPress={() => {
                            if (shift == "" || shift == null) {
                                showToast(string.Please_enter_shift)
                                return
                            }
                            if (value == "" || value == null) {
                                showToast(string.Please_enter_machineno)
                                return
                            }
                            if (design == "" || design == null) {
                                showToast(string.Please_enter_designno)
                                return
                            }
                            if (rpm == "" || rpm == null) {
                                showToast(string.Please_enter_rpm)
                                return
                            }
                            if (production == "" || production == null) {
                                showToast(string.Please_enter_production)
                                return
                            }
                            if (efficency == "" || efficency == null) {
                                showToast(string.Please_enter_efficency)
                                return
                            }
                            if (url == "" || url == null) {
                                showToast(string.Please_upload_production_image)
                                return
                            }
                            props.AddProduction({
                                "productionDate": String(date),
                                "shift": props?.shiftlist?.filter((item) => shift == item?._id)[0]?.shiftName,
                                "machineNo": value,
                                "designNo": design,
                                "rpm": rpm,
                                "production": production,
                                "efficency": efficency,
                                "image": url,
                                "type": type,
                                'iname': iname
                            })
                        }}
                        name={string.Add}
                    />
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </ScrollView>
        </SafeAreaView>
    );
};


const mapState = (state) => {
    return {
        machineList: state.user.machineList,
        shiftlist: state.user.shiftlist,
        employee: state.user.employee,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        AddProduction: (data) => dispatch(AddProduction(data))
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
