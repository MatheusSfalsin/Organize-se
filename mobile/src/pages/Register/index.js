import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import {
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    Alert,
} from 'react-native';

import styles from './styles'

import Icon from 'react-native-vector-icons/FontAwesome'

Icon.loadFont();

import auth from '@react-native-firebase/auth'

export default function Register() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [passRepet, setPassRepet] = useState('');
    const [controlImg, setControlImg] = useState(styles.logoImg);
    const [controlTitle, setControlTitle] = useState(styles.title);

    backToLogon = () => {
        navigation.goBack()
    }

    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)
    }, [])

    keyboardDidShow = () => {
        setControlImg(styles.logoImgMod)
        setControlTitle(styles.title)
    }

    keyboardDidHide = () => {
        setControlImg(styles.logoImg)
        setControlTitle(styles.title)
    }

    createUser = async (email, pass, passRepet) => {
        try {
            if(pass === passRepet){
                await auth()
                .createUserWithEmailAndPassword(email, pass)
                .then(async () => {
                    Alert.alert('Sucesso!', 'Usuario Criado com Sucesso. Acesse!')
                    navigation.goBack()

                })
                .catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        Alert.alert('Ops...', 'O endereço de email ja usado!')
                        // console.log('That email address is already in use!');
                    }

                    if (error.code === 'auth/invalid-email') {
                        // console.log('That email address is invalid!');
                        Alert.alert('Ops...', 'Endereço de email inválido!')
                    }
                });
            }else{
                Alert.alert('Senhas incorreta!', 'Repita a senha Corretamente.')
            }
            
        } catch (error) {

        }
    }



    return (
        <KeyboardAvoidingView style={styles.container} behavior="">
            <Text style={controlTitle}>Organize</Text>


            <TextInput elevation={4} style={styles.input} placeholder='Digite seu Nome' onChange={e => setEmail(e.nativeEvent.text)}>
            </TextInput>

            <TextInput elevation={4} style={styles.input} placeholder='Digite seu Email' onChange={e => setEmail(e.nativeEvent.text)}>
            </TextInput>
            <TextInput elevation={4} secureTextEntry={true} style={styles.input} placeholder='Digite sua Senha' onChange={e => setPass(e.nativeEvent.text)}>
            </TextInput>
            <TextInput elevation={4} secureTextEntry={true} style={styles.input} placeholder='Confirme a Senha' onChange={e => setPassRepet(e.nativeEvent.text)}>
            </TextInput>

            <TouchableOpacity style={styles.buttonCad} onPress={() => { createUser(email, pass, passRepet) }}>
                <Icon name="sign-in" size={16} color="#FFF">
                    <Text style={styles.buttonText}> Registra-se</Text>
                </Icon>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonBack} onPress={backToLogon}>
                <Icon name="long-arrow-left" size={16} color="#FFF">
                    <Text style={styles.buttonText}> Voltar</Text>
                </Icon>
            </TouchableOpacity>

            {/* <TouchableOpacity style={styles.buttonEnterGmail} onPress={GoogleSignIn}>
              <Icon name="google" size={16} color="#FFF">
                <Text style={styles.buttonTextGmail}> Entra com Google</Text>
              </Icon>
            </TouchableOpacity> */}

        </KeyboardAvoidingView>
    );


}