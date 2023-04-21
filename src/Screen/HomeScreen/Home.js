//import liraries
import React, { useEffect, useState, useCallback } from 'react';
import { Text, SafeAreaView, ScrollView, View, TouchableOpacity, Dimensions, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import styles from './styles';
import Header from "../../Component/Header"
import Styles from '../../utils/Styles';
import moment from 'moment';
import color from '../../utils/Color';
import Out from "../../assets/svg/out.svg"
import In from "../../assets/svg/in.svg"
import Cin from "../../assets/svg/cin.svg"
import Cout from "../../assets/svg/cout.svg"
import Whours from "../../assets/svg/whours.svg"
import Loader from '../../Component/Loader';
import { CheckInOut, GetEmployeeDetail, GetmachineList, GetTodayAttendance, ProductionList, shiftList } from '../../Redux/actions/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import string from "../../Lang/LocalizedStrings"

const width = Dimensions.get("window").width
const data = [{ reason: "Forgot" }, { reason: "Internet Issue" }, { reason: "Others" },]
const MyComponent = (props) => {
    const today = moment().format("dddd, MMM DD")
    const [time, settime] = useState(moment().format("hh:mm A"))
    setInterval(() => { settime(moment().format("hh:mm A")) }, 1000);
    const [inout, setinout] = useState(false)
    const Production = async () => {
        const id = await AsyncStorage.getItem('id')
        props.ProductionList({ "userId": id, "datetime": moment().format("YYYY-MM-DD") })
    }
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    const wait = () => {
        return new Promise(resolve => setTimeout(resolve, 2000));
    }
    useEffect(() => {
        if (refreshing == true) {
            props.GetEmployeeDetail()
            props.GetmachineList()
            props.GetTodayAttendance()
            props.shiftList()
            Production()
        }
    }, [refreshing])
    useEffect(() => {
        props.GetEmployeeDetail()
        props.GetTodayAttendance()
        props.shiftList()
        props.GetmachineList()
        Production()
    }, [])
    const setdisable = async () => {
        const disable = await AsyncStorage.getItem('Checkinoutstatus')
        if (disable == "true") {
            setinout(true)
        } else {
            setinout(false)
        }
    }
    useEffect(() => {
        setdisable()
    }, [props?.checkInOut])
    return (
        <SafeAreaView style={styles.container}>
            <Loader loading={props?.loader} />
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                showsVerticalScrollIndicator={false}>
                <Header name={string.Home} tab={true} onPress={() => { }} />
                <View style={{ width: "100%", paddingHorizontal: 25, paddingBottom: 100 }}>
                    <Text style={styles.hi}>Hi {props?.employee?.name}!</Text>
                    <Text style={styles.time}>{time}</Text>
                    <Text style={styles.month}>{today}</Text>

                    {/* <View style={Styles.spacebetween}>
                        <TouchableOpacity
                            disabled={inout ? true : false}
                            onPress={() => {
                                props.CheckInOut({
                                    data: {
                                        "datetime": moment(),
                                        "latitude": "21.22342768",
                                        "longitude": "72.828823569",
                                        "reason": "late",
                                        "userId": global.id
                                    },
                                    status: true
                                })
                            }} style={styles.in}>
                            <In width={width / 5.2} />
                            <Text style={styles.intext}>{string.In}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={inout == false ? true : false}
                            onPress={() => {
                                props.CheckInOut({
                                    data: {
                                        "datetime": moment(),
                                        "latitude": "21.22342768",
                                        "longitude": "72.828823569",
                                        "reason": "late",
                                        "userId": global.id
                                    },
                                    status: false
                                })
                            }}
                            style={[styles.in, { backgroundColor: color.commongrey }]}>
                            <Out width={width / 5.2} />
                            <Text style={styles.intext}>{string.Out}</Text>
                        </TouchableOpacity>
                    </View> */}

                    <View style={[Styles.spacearound, { marginTop: 50 }]}>
                        <View style={styles.timecount}>
                            <Cin height={width / 8} width={width / 8} />
                            <Text style={styles.ctime}>{props?.getTodayAttendance?.checkin == "-" || props?.getTodayAttendance?.checkin == "" ? "--:--" : moment(props?.getTodayAttendance?.checkin).format("hh:mm A")}</Text>
                            <Text style={styles.ctext}>{string.Checkin}</Text>
                        </View>
                        <View style={styles.timecount}>
                            <Cout height={width / 8} width={width / 8} />
                            <Text style={styles.ctime}>{props?.getTodayAttendance?.checkout == "-" || props?.getTodayAttendance?.checkout == "" ? "--:--" : moment(props?.getTodayAttendance?.checkout).format("hh:mm A")}</Text>
                            <Text style={styles.ctext}>{string.CheckOut}</Text>
                        </View>
                        <View style={styles.timecount}>
                            <Whours height={width / 8} width={width / 8} />
                            <Text style={styles.ctime}>{props?.getTodayAttendance?.timeDiffrence != "-" ? props?.getTodayAttendance?.timeDiffrence : "--:--"}</Text>
                            <Text style={styles.ctext}>{string.Workinghr}</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView >
    );
};


const mapState = (state) => {
    return {
        employee: state.user.employee,
        loader: state.user.loader,
        checkInOut: state.user.checkInOut,
        getTodayAttendance: state.user.getTodayAttendance,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetEmployeeDetail: (param) => dispatch(GetEmployeeDetail(param)),
        CheckInOut: (param) => dispatch(CheckInOut(param)),
        ProductionList: (param) => dispatch(ProductionList(param)),
        GetTodayAttendance: (param) => dispatch(GetTodayAttendance(param)),
        GetmachineList: (param) => dispatch(GetmachineList(param)),
        shiftList: (param) => dispatch(shiftList(param)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
