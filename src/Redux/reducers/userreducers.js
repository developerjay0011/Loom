
import { LOGIN, LOADER_DATA, Get_machineList, shift_List, Employee, production_List, Check_InOut, GetToday_Attendance, } from "../actions/auth";

const initialState = {
    loader: false,
    login: {},
    employee: {},
    productionList: [],
    checkInOut: false,
    getTodayAttendance: {},
    machineList: [],
    shiftlist: [],
}


export default function (state = initialState, action) {
    switch (action.type) {
        case LOADER_DATA:
            return {
                ...state,
                loader: action.data
            }
        case shift_List:
            return {
                ...state,
                shiftlist: action.data
            }
        case GetToday_Attendance:
            return {
                ...state,
                getTodayAttendance: action.data
            }
        case LOGIN:
            return {
                ...state,
                login: action.data
            }
        case Check_InOut:
            return {
                ...state,
                checkInOut: action.data
            }
        case Employee:
            return {
                ...state,
                employee: action.data
            }
        case production_List:
            return {
                ...state,
                productionList: action.data
            }
        case Get_machineList:
            return {
                ...state,
                machineList: action.data
            }
        default:
            return state
    }


}