import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E5E5E5',
        // justifyContent: 'center',
        padding: 10,
        paddingTop: 10
    },

    head:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        marginBottom: 20,
    },

    logoImg: {
        width: 50,
        height: 60,
        marginBottom: 10,
        marginLeft: 15
        // justifyContent: 'space-between',
        
    },

    logoImgAndTitle:{
        flexDirection: 'row',
        marginTop: 5,
    },

    closeSession:{
        
    },

    title: {
        fontSize: 25,
        color: '#5C5C5C',
        fontWeight: "bold",
        marginTop: 12,
        paddingBottom: 13,
        paddingLeft:  12,
        // justifyContent: 'space-between',
    },

    hr: {
        borderBottomColor: '#ABABAB',
        borderBottomWidth: 1,
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 8,

    }
    ,
    info:{
        marginRight: 15,
        marginBottom: 6,
    },

    create: {
        position: 'relative',
        marginLeft: 30,
        marginBottom: 10
    },
    createText: {
        fontSize: 22
    },

    inputsCreate:{
        position: 'absolute',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        display: 'flex'
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
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#CACACA',
        // padding: 12,
        paddingLeft:12,
        paddingRight: 12,
        borderRadius: 7,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },

    list:{
        width: 220,
        height: 46,
        paddingTop: 12,
        paddingLeft: 8,
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