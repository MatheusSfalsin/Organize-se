import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
// import { YellowBox } from 'react-native'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    Alert,
    BackHandler,
} from 'react-native';

import styles from './styles'

import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont();

// import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import logoImg from '../../../images/tasks_25495.png'

import { GoogleSignin } from '@react-native-community/google-signin';

GoogleSignin.configure({
    webClientId: '67845405351-aoehjfangl504m8unn7uhjujmhhkhtks.apps.googleusercontent.com', // From Firebase Console Settings
});


export default function Login() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [controlImg, setControlImg] = useState(styles.logoImg);
    const [controlTitle, setControlTitle] = useState(styles.title);

    goToRegister = () => {
        navigation.navigate('Register')
    }

    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)
        verificationUser()
    }, [])

    verificationUser = () => {
        auth().onAuthStateChanged((user) => {
            if (user) {
                navigation.navigate('List', { user })
            }
        });
    }

    keyboardDidShow = () => {
        setControlImg(styles.logoImgMod)
        setControlTitle(styles.title)
    }

    keyboardDidHide = () => {
        setControlImg(styles.logoImg)
        setControlTitle(styles.title)
    }

    logon = async (email, pass) => {
        try {
            const user = await auth().signInWithEmailAndPassword(email, pass)
            setIsAuthenticated(true)
            // user2 = auth().currentUser;
            navigation.navigate('List', { user })

        } catch (error) {
            if (('' + error) == 'Error: [auth/wrong-password] The password is invalid or the user does not have a password.') {
                Alert.alert('Ops...', 'Email ou senha incorreto.')

            } else if (('' + error) == 'Error: [auth/invalid-email] The email address is badly formatted.') {
                Alert.alert('Ops...', 'Email no formato incorreto.')

            } else if (('' + error) == 'Error: [auth/unknown] We have blocked all requests from this device due to unusual activity. Try again later. [ Too many unsuccessful login attempts. Please try again later. ]') {
                Alert.alert('Ops...', 'Muitas tentativas de Login, tente novamente mais tarde.')
            }
        }
    }

    async function GoogleSignIn() {
        try {
            const user = await onGoogleButtonPress()
            setIsAuthenticated(true)
            console.log(user)

        } catch (error) {
            console.log('erro: ' + typeof (error))
        }
    }

    async function onGoogleButtonPress() {

        try {
            // Get the users ID token

            console.log(GoogleSignin)
            await GoogleSignin.hasPlayServices();
            // const userInfo = await GoogleSignin.signIn();
            const userInfo = await GoogleSignin.signIn();
            // Create a Google credential with the token
            // const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            // return auth().signInWithCredential(googleCredential);
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="">
            <View style={styles.head}>
                <Text style={controlTitle}>Organize</Text>
                <Image style={controlImg} source={logoImg}></Image>
            </View>


            <TextInput elevation={4} style={styles.input} placeholder='Digite seu Email' onChange={e => setEmail(e.nativeEvent.text)}>
            </TextInput>

            <TextInput secureTextEntry={true} elevation={4} style={styles.input} placeholder='Digite sua Senha' onChange={e => setPass(e.nativeEvent.text)}>
            </TextInput>

            <TouchableOpacity style={styles.buttonEnter} onPress={() => { logon(email, pass) }}>
                <Icon name="sign-in" size={16} color="#FFF">
                    <Text style={styles.buttonText}> Logar</Text>
                </Icon>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.buttonEnterGmail} onPress={GoogleSignIn}>
              <Icon name="google" size={16} color="#FFF">
                <Text style={styles.buttonTextGmail}> Entra com Google</Text>
              </Icon>
            </TouchableOpacity> */}

            <TouchableOpacity style={styles.buttonCad} onPress={goToRegister}>
                <Text style={styles.buttonTextCad}>Cadastra-se</Text>
            </TouchableOpacity>

        </KeyboardAvoidingView>
    );


}