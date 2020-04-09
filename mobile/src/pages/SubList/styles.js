import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        // justifyContent: 'center',
        padding: 10,
        paddingTop: 10
    },


    hr: {
        borderBottomColor: '#ABABAB',
        borderBottomWidth: 1,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 8,
    }
    ,

    titleSubList: {
        fontSize: 20,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 15,
        marginBottom: 7,
        color: '#5C5C5C',
        fontWeight: 'bold',
    },

    create: {
        position: 'relative',
        marginTop: 15,
        marginLeft: 20,
        marginBottom: 10
    },

    createText: {
        fontSize: 17,
    },


    inputsCreate:{
        position: 'absolute',
        paddingTop: 20,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingLeft: 9,

    },

    inputCreate:{
        backgroundColor: '#DBDBDB',
        borderRadius: 7,
        height: 45,
        alignContent: 'center',
        alignItems: 'center',
        width: '75%',
        marginTop: -20,
    },


    confirmCreate:{
        width: '15%',
        backgroundColor: '#E5E5E5',
        height: 45,
        marginTop: -20,
        borderRadius: 7,
        
        
        // borderColor: '#1FF63F',
        // borderWidth: 1

    },

    confirmCreateIcon:{
        marginTop: 6,
        paddingLeft: 11,
    },

    cancelCreateIcon: {
        marginTop: 6
    }
    ,

    cancelCreate:{
        width: '15%',
        backgroundColor: '#E5E5E5',
        height: 45,
        marginTop: -20,
        borderRadius: 7,
    },


    containerList:{
        marginTop: 0,
        // padding: 12,
        paddingLeft:12,
        paddingRight: 12,
        borderRadius: 7,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    CheckBox:{
        marginTop: 8,
        // marginLeft: 10,
    },

    list:{
        width: 220,
        height: 46,
        marginRight: 20,
        paddingTop: 12,
        paddingLeft: 0,
    },

    buttonList:{

    },
    buttonTextList:{
        color: '#5C5C5C',
        fontWeight: 'bold',
        fontSize: 16,

    },

    iconsList:{
        flexDirection: 'row',
        marginRight: 10,
        paddingTop: 15,
    },

    iconList:{
        marginRight: 10,
    }


});