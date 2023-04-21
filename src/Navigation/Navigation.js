import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Screen/SplashScreen/Splash';
import Login from '../Screen/LoginScreen/Login';
import { navigationRef } from './RootNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../Screen/HomeScreen/Home"
import Profile from "../Screen/ProfileScreen/Profile"
import EditProfile from "../Screen/EditProfileScreen/EditProfile"
import Production from "../Screen/ProductionScreen/Production"
import Range from "../Screen/RangScreen/Rang"
import Productiondata from "../Screen/ProductiondataScreen/Productiondata"
import Addproduction from "../Screen/AddproductionScreen/Addproduction"
import color from '../utils/Color';
import { Image, StyleSheet } from 'react-native';
import { getLng } from '../helper/changeLng';
import strings from '../Lang/LocalizedStrings';

function MyTabs() {
    const Tab = createBottomTabNavigator();
    useEffect(() => {
        selectedLng()
    }, [])
    const selectedLng = async () => {
        const lngData = await getLng()
        if (lngData) {
            strings.setLanguage(lngData)
        }
        global.lng = lngData == null || lngData == "en" ? "en" : "ind"
        console.log('Selected Langauge data ==>', global.lng)
    }
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: [
                    {
                        backgroundColor: color.tabcolor,
                        height: Platform.OS == "ios" ? 95 : 70,
                        shadowColor: color.tabcolor,
                        position: "absolute",
                        borderTopLeftRadius: 25,
                        borderTopRightRadius: 25,
                        shadowOffset: {
                            width: 0,
                            height: 1,
                        },
                        shadowOpacity: 0.8,
                        shadowRadius: 1,
                        elevation: 12
                    },
                    null
                ],
            }}
        >
            <Tab.Screen name="home"
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => {
                        return focused ?
                            <Image source={require("../assets/image/home.png")} style={styles.active} />
                            :
                            <Image source={require("../assets/image/home.png")} style={[styles.inactive]} />
                    },
                }} component={Home} />
            <Tab.Screen name="Production"
                options={{
                    headerShown: false,
                    title: "Production",
                    tabBarIcon: ({ color, focused }) => {
                        return focused ?
                            <Image source={require("../assets/image/production.png")} style={styles.active} />
                            :
                            <Image source={require("../assets/image/production.png")} style={[styles.inactive]} />
                    },
                }} component={Production} />
            <Tab.Screen name="Profile"
                options={{
                    headerShown: false,
                    title: "Profile",
                    tabBarIcon: ({ color, focused }) => {
                        return focused ?
                            <Image source={require("../assets/image/profile.png")} style={styles.active} />
                            :
                            <Image source={require("../assets/image/profile.png")} style={[styles.inactive]} />
                    },
                }} component={Profile} />

        </Tab.Navigator>
    );
}

function App() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer ref={navigationRef} >
            <Stack.Navigator screenOptions={{ headerShown: false, animation: "none" }} initialRouteName="Splash"  >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home" component={MyTabs} />
                <Stack.Screen name="Range" component={Range} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="Productiondata" component={Productiondata} />
                <Stack.Screen name="Addproduction" component={Addproduction} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    active: {
        height: 42,
        width: 42,
        tintColor: color.backgroundcolor,
    },
    inactive: {
        height: 42,
        width: 42,
        tintColor: color.commongrey,
    }

});

export default App;