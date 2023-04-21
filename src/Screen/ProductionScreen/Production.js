//import liraries
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, FlatList, View, Text } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native"
import styles from './styles';
import Header from "../../Component/Header"
import moment from 'moment';
import color from '../../utils/Color';
import Productionrow from "../../Component/Productionrow"
import Add from "../../Component/Add"
import { Calendar } from 'react-native-calendars';
import Loader from '../../Component/Loader';
import string from "../../Lang/LocalizedStrings"
import { Getproduction, ProductionList } from '../../Redux/actions/auth';
const MyComponent = (props) => {
    const getdate = props.route.params
    const navigation = useNavigation();
    const [date, SetDate] = useState(getdate?.getdate ? getdate?.getdate : moment().format("YYYY-MM-DD"))

    const renderItem = ({ item, index }) => {
        return (
            <Productionrow
                index={index}
                onPress={() => { props.Getproduction({ id: item._id }) }}
                item={item}
            />
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Loader loading={props?.loader} />
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header name={string.Production} tab={true} onPress={() => { navigation.goBack() }} />
                <View style={{ width: "100%", paddingHorizontal: 25, paddingBottom: 80 }}>
                    <Calendar
                        initialDate={moment().format("YYYY-MM-DD")}
                        markingType={'custom'}
                        onDayPress={day => {
                            props.ProductionList({
                                "userId": global.id,
                                "datetime": day.dateString
                            })
                            SetDate(day.dateString)
                            console.log('selected day', day);
                        }}
                        hideArrows={true}
                        monthFormat={'MMMM yyyy'}

                        hideExtraDays={true}
                        disableMonthChange={true}
                        firstDay={0}
                        onPressArrowLeft={subtractMonth => subtractMonth()}
                        onPressArrowRight={addMonth => addMonth()}
                        disableArrowLeft={true}
                        disableArrowRight={true}
                        disableAllTouchEventsForDisabledDays={true}
                        enableSwipeMonths={true}
                        theme={styles.Calendar}
                        markedDates={{
                            [date]: {
                                selected: true,
                                customStyles: {
                                    container: {
                                        elevation: 1,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    },
                                    text: {
                                        color: color.white,
                                        fontWeight: 'bold',
                                    }
                                }

                            }
                        }}
                    />
                    <View style={{ borderTopWidth: 2, marginTop: 20, paddingTop: 18, borderColor: color.borderColor }}>

                        {props?.productionList?.length == 0 ?
                            <Text style={styles.name}>{string.No_Production_found_in} {moment(date).format("MMM ,DD")}.</Text>
                            :
                            <FlatList
                                data={props?.productionList}
                                renderItem={renderItem}
                            />
                        }
                    </View>
                </View>
            </ScrollView>
            <Add />
        </SafeAreaView>
    );
};


const mapState = (state) => {
    return {
        loader: state.user.loader,
        productionList: state.user.productionList
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        ProductionList: (param) => dispatch(ProductionList(param)),
        Getproduction: (param) => dispatch(Getproduction(param)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
