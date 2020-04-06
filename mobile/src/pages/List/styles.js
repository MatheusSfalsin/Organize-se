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
        width: 100,
        height: 110,
        marginBottom: 10,
        // justifyContent: 'space-between',
        
    },

    logoImgAndTitle:{
        flexDirection: 'row',
        marginTop: 5,
    },

    title: {
        fontSize: 26,
        color: '#9F9F9F',
        fontWeight: "bold",
        marginTop: 40,
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
    },

    create: {
        marginLeft: 30,
        marginBottom: 10
    },
    createText: {
        fontSize: 22
    },

    list:{
        marginTop: 5,
        borderWidth: 1,
        borderColor: '#CACACA',
        padding: 12,
        borderRadius: 7,
        justifyContent: 'space-between',
        flexDirection: 'row',
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
    },

    iconList:{
        marginRight: 10,
    }


});