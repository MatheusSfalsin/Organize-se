import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    head: {
        flex: 1
    },

    container: {
        flex: 1,
        backgroundColor: '#f0f0f5',
        // justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        paddingTop: 50
    },

    title: {
        fontSize: 48,
        color: '#525252',
        paddingBottom: 13
    },
    titleMode: {
        display: 'none'
    }
    ,
    logoImg: {
        width: 180,
        height: 150,
        marginBottom: 43,
    },

    logoImgMod: {
        display: 'none'
    },


    input: {
        height: 45,
        backgroundColor: '#FFF',
        alignSelf: 'stretch',
        borderColor: '#CACACA',
        borderWidth: 1,

        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowRadius: 2,
        shadowOffset: {
            height: 2,
            width: 2
        },

        paddingHorizontal: 20,
        marginBottom: 10,
        borderRadius: 7,
    }
    ,
    buttonCad: {
        height: 48,
        backgroundColor: '#3b5998',
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
        borderRadius: 5,
    },

    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 14
    },

    buttonTextCad: {
        color: '#767272',
        fontSize: 16
    },

    buttonBack: {
        backgroundColor: '#7B7B7B',
        height: 48,
        alignSelf: 'stretch',
        paddingHorizontal: 20,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        borderRadius: 5,
    },

    buttonTextGmail: {
        fontSize: 14,
        color: '#FFF'
    }


});