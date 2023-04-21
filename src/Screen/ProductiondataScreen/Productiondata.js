//import liraries
import React, { } from 'react';
import { Text, SafeAreaView, ScrollView, View, Image } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native"
import styles from './styles';
import Header from "../../Component/Header"
import string from "../../Lang/LocalizedStrings"
import moment from 'moment';

const MyComponent = (props) => {
    const navigation = useNavigation();
    const { data } = props.route.params;
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header name={string.Production_details} onPress={() => { navigation.goBack() }} />
                <View style={{ width: "100%", paddingHorizontal: 25, paddingBottom: 30 }}>
                    <Image source={{ uri: data?.data?.production?.productionImage }} resizeMode="stretch" style={{ height: 200, borderRadius: 20 }} />

                    <Text style={[styles.status, { marginTop: 20 }]}>{string.Production_Date} : {moment(data?.data?.production?.productionDate).format("DD-MM-YYYY")}</Text>
                    <Text style={styles.status}>{string.Production} : {data?.data?.production?.production}</Text>
                    <Text style={styles.status}>{string.Design_No} : {data?.data?.production?.designNo}</Text>
                    <Text style={styles.status}>{string.Machine_No} : {data?.data?.production?.machineNo}</Text>
                    <Text style={styles.status}>{string.RPM} : {data?.data?.production?.rpm}</Text>
                    <Text style={styles.status}>{string.Shift} : {data?.data?.production?.shift}</Text>
                    <Text style={styles.status}>{string.Efficiency} : {data?.data?.production?.efficency}%</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};


const mapState = (state) => {
    return {
    };
}
const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
