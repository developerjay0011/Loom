export const LOGIN = "LOGIN"
export const LOADER_DATA = "LOADER_DATA"
export const Employee = "Employee"
export const Check_InOut = "Check_InOut"
export const production_List = "production_List"
export const GetToday_Attendance = "GetToday_Attendance"
export const Get_machineList = "Get_machineList"
export const shift_List = "shift_List"
export const shift_List2 = "shift_List2"

import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../utils/Url";
import Toast from "../../utils/Toast"
import axios from "axios";
import * as RootNavigation from '../../Navigation/RootNavigation';
import { Platform } from "react-native";
import moment from "moment"

export const Loader = (data) => {
    return async dispatch => {
        dispatch({
            type: LOADER_DATA,
            data: data
        });
    };
}


export const Login = (param) => {
    return async dispatch => {
        dispatch(Loader(true))
        await axios(Api.baseUrl + 'login', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            data: param
        }).then(async (response) => {
            console.log(response.data)
            dispatch(Loader(false))
            Toast(response.data.message ? response.data.message : response.data.error)
            if (response.data.data) {
                GetEmployeeDetail(response.data.data._id)
                global.id = response.data.data._id
                global.token = response.data.token
                await AsyncStorage.setItem('id', response.data.data._id)
                await AsyncStorage.setItem('token', response.data.token)
                dispatch({
                    type: LOGIN,
                    data: response.data.data
                });
                RootNavigation.replace("Home")
            }
        }).catch(error => {
            dispatch(Loader(false))
            console.log(error);
        });
    };
}


export const GetEmployeeDetail = () => {
    return async dispatch => {
        try {
            dispatch(Loader(false))
            const token = await AsyncStorage.getItem('token')
            const id = await AsyncStorage.getItem('id')
            await axios(Api.baseUrl + `getEmployeeDetail/${id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
            })
                .then(async (response) => {
                    dispatch(Loader(false))
                    console.log("GetEmployeeDetail", response.data);
                    if (response?.data?.data) {
                        dispatch({
                            type: Employee,
                            data: response?.data?.data
                        });
                    }
                })
        } catch (error) {
            dispatch(Loader(false))
            console.log("GetEmployeeDetail", error);
        }
    };
}


export const GetTodayAttendance = () => {
    return async dispatch => {
        try {
            dispatch(Loader(false))
            const token = await AsyncStorage.getItem('token')
            const id = await AsyncStorage.getItem('id')
            await axios(Api.baseUrl + `getTodayAttendance/${id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
            })
                .then(async (response) => {
                    dispatch(Loader(false))
                    console.log("GetTodayAttendance", response.data);
                    if (response?.data) {
                        dispatch({
                            type: GetToday_Attendance,
                            data: response?.data
                        });
                        if (response?.data?.checkin != "-" && response?.data?.checkin != "") {
                            if (response?.data?.checkout != "-" && response?.data?.checkout != "") {
                                await AsyncStorage.setItem('Checkinoutstatus', "false")
                                return
                            }
                            else {
                                await AsyncStorage.setItem('Checkinoutstatus', "true")
                                return
                            }
                        }
                        else {
                            await AsyncStorage.setItem('Checkinoutstatus', "false")
                            return
                        }
                    }
                })
        } catch (error) {
            dispatch(Loader(false))
            console.log("GetTodayAttendance", error);
        }
    };
}


export const CheckInOut = (data) => {
    return async dispatch => {
        try {
            dispatch(Loader(true))
            const token = await AsyncStorage.getItem('token')
            await axios(Api.baseUrl + `checkInOut`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
                data: data.data
            })
                .then(async (response) => {
                    dispatch(Loader(false))
                    console.log("CheckInOut", response.data);
                    if (response?.data?.data) {
                        dispatch(GetTodayAttendance())
                        await AsyncStorage.setItem('Checkinoutstatus', data.status.toString())
                        dispatch({
                            type: Check_InOut,
                            data: data.status
                        });
                    }
                })
        } catch (error) {
            dispatch(Loader(false))
            console.log("CheckInOut", error);
        }
    };
}


export const ProductionList = (data) => {
    return async dispatch => {
        try {
            dispatch(Loader(true))
            const token = await AsyncStorage.getItem('token')
            await axios(Api.baseUrl + `productionList`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
                data: data
            })
                .then(async (response) => {
                    dispatch(Loader(false))
                    console.log("productionList", response.data);
                    if (response?.data) {
                        dispatch({
                            type: production_List,
                            data: response?.data
                        });
                    }
                })
        } catch (error) {
            dispatch(Loader(false))
            console.log("ProductionList", error);
        }
    };
}


export const Edit = (data) => {
    return async dispatch => {
        dispatch(Loader(true))
        try {
            setTimeout(async () => {
                const token = await AsyncStorage.getItem('token')
                const id = await AsyncStorage.getItem('id')
                const formData = new FormData();
                formData.append('_id', id)
                formData.append('teamName', data.teamName)
                formData.append('designation', data.designation)
                formData.append('supervisedBy', data.supervisedBy)
                formData.append('mobile', data.mobile)
                formData.append('department', data.department)
                formData.append('image', {
                    name: 'test',
                    type: 'image/png',
                    uri: Platform.OS == "ios" ? data.image.replace("file://", "") : data.image
                })
                await fetch(Api.baseUrl + 'addEmployee', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": 'Bearer ' + token,
                    },
                    body: formData
                })
                    .then(response =>
                        response.json(),
                        dispatch(Loader(false))
                    )
                    .then((json) => {
                        console.log('Uploadqid:', json);
                        dispatch(Loader(false))
                        Toast(json.message ? json.message : json.error)
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        dispatch(Loader(false))
                    });
            }, 2000);
        } catch (error) {
            console.log("Uploadqid", error);
            dispatch(Loader(false))
        }
    };
}


export const EditProfilepic = (data) => {
    return async dispatch => {
        dispatch(Loader(true))
        try {
            setTimeout(async () => {
                const token = await AsyncStorage.getItem('token')
                const id = await AsyncStorage.getItem('id')
                const formData = new FormData();
                formData.append('_id', id)
                formData.append('image', {
                    name: data.name,
                    type: data.type,
                    uri: Platform.OS == "ios" ? data.image.replace("file://", "") : data.image
                })
                console.log(formData._parts)
                await fetch(Api.baseUrl + 'addEmployee', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": 'Bearer ' + token,
                    },
                    body: formData
                })
                    .then(response =>
                        response.json(),
                        dispatch(Loader(false))
                    )
                    .then((json) => {
                        console.log('Uploadqid:', json);
                        dispatch(GetEmployeeDetail())
                        dispatch(Loader(false))
                        Toast(json.message ? json.message : json.error)
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        dispatch(Loader(false))
                    });
            }, 2000);

        } catch (error) {
            console.log("Uploadqid", error);
            dispatch(Loader(false))
        }
    };
}


export const AddProduction = (data) => {
    return async dispatch => {
        try {
            dispatch(Loader(true))
            setTimeout(async () => {
                const token = await AsyncStorage.getItem('token')
                const id = await AsyncStorage.getItem('id')
                const formData = new FormData();
                formData.append('userId', id)
                formData.append('productionDate', data.productionDate)
                formData.append('shift', data.shift)
                formData.append('machineNo', data.machineNo)
                formData.append('designNo', data.designNo)
                formData.append('rpm', data.rpm)
                formData.append('production', data.production)
                formData.append('efficency', data.efficency)
                formData.append('productionImage', {
                    name: data.iname,
                    type: data.type,
                    uri: Platform.OS == "ios" ? data.image.replace("file://", "") : data.image
                })
                console.log(formData._parts)
                await fetch(Api.baseUrl + 'addProduction', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Authorization": 'Bearer ' + token,
                    },
                    body: formData
                })
                    .then(response =>
                        response.json(),
                    )
                    .then((json) => {
                        console.log('AddProduction:', json);
                        if (json.message == "Production added successfully") {
                            dispatch(Loader(false))
                            RootNavigation.navigate("Production", { getdate: moment(data.productionDate).format("YYYY-MM-DD") })
                        }
                        dispatch(ProductionList({
                            "userId": global.id,
                            "datetime": moment(data.productionDate).format("YYYY-MM-DD")
                        }))
                        dispatch(Loader(false))
                        Toast(json.message ? json.message : json.error)
                    })
                    .catch(error => {
                        console.error('AddProduction:', error);
                        dispatch(Loader(false))
                    });
            }, 2000);
        } catch (error) {
            dispatch(Loader(false))
            console.log("addProduction", error);
        }
    };
}


export const Getproduction = (data) => {
    return async dispatch => {
        try {
            dispatch(Loader(true))
            const token = await AsyncStorage.getItem('token')
            await axios(Api.baseUrl + `getSingleProductionDetail/${data.id}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
            })
                .then(async (response) => {
                    dispatch(Loader(false))
                    console.log("production", response.data);
                    if (response?.data) {
                        if (response?.data?.data?.production) {
                            RootNavigation.navigate("Productiondata", { data: response?.data })
                        }
                    }
                })
        } catch (error) {
            dispatch(Loader(false))
            console.log("production", error);
        }
    };
}


export const Logout = () => {
    return async dispatch => {
        try {
            dispatch(Loader(true))
            const token = await AsyncStorage.getItem('token')
            await axios(Api.baseUrl + `Logout`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
            })
                .then(async (response) => {
                    dispatch(Loader(false))
                    console.log("Logout", response.data);
                    await AsyncStorage.removeItem('token')
                    RootNavigation.replace("Login")
                    dispatch({
                        type: User,
                        data: null
                    });
                })
        } catch (error) {
            await AsyncStorage.removeItem('token')
            RootNavigation.replace("Login")
            dispatch({
                type: User,
                data: null
            });
            dispatch(Loader(false))
            console.log("Logout", error);
        }
    };
}


export const GetmachineList = () => {
    return async dispatch => {
        try {
            const token = await AsyncStorage.getItem('token')
            await axios(Api.baseUrl + `machineList`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
            })
                .then(async (response) => {
                    dispatch(Loader(false))
                    console.log("GetmachineList", response.data);
                    if (response?.data) {
                        var data = []
                        for (let i = 0; i < response?.data.length; i++) {
                            const _id = response?.data[i].machineNo
                            const element = response?.data[i].machineNo
                            data.push({ label: element, value: _id })
                        }
                        dispatch({
                            type: Get_machineList,
                            data: data
                        });
                    }
                })
        } catch (error) {
            dispatch(Loader(false))
            console.log("Get_machineList", error);
        }
    };
}


export const shiftList = () => {
    return async dispatch => {
        try {
            const token = await AsyncStorage.getItem('token')
            await axios(Api.baseUrl + `shiftList`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer ' + token,
                },
            }).then(async (response) => {
                dispatch(Loader(false))
                console.log("shiftList", response.data);
                if (response?.data) {
                    dispatch({
                        type: shift_List,
                        data: response.data
                    });
                }
            })
        } catch (error) {
            dispatch(Loader(false))
            console.log("Get_machineList", error);
        }
    };
}