//import liraries
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    icon: {
        height: 22,
        width: 22,
        marginLeft: 2,
        tintColor: "rgb(184,184,184)"
    },
    flexrow: {
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 10
    },
    spacebetween: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent:"space-between",
        width:"100%",
    },
    spacearound: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent:"space-around",
        width:"100%",
    },
    up:{
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 5,
    }

});

export default styles;
