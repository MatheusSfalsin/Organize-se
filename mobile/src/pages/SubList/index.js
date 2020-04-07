import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard,
    FlatList,
} from 'react-native';

import styles from './styles'

import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont();

// import firebase from '@react-native-firebase/app'
// import auth from '@react-native-firebase/auth'
import logoImg from '../../../images/tasks_25495.png'
import database from '@react-native-firebase/database';
// import firestore from '@react-native-firebase/firestore';

export default function SubList () {
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

    })

    keyboardDidShow = () => {
        setControlImg(styles.logoImgMod)
        setControlTitle(styles.title)
    }

    keyboardDidHide = () => {
        setControlImg(styles.logoImg)
        setControlTitle(styles.title)
    }

    ler = () => {
        const reference = database().ref('/lists')
        database()
            .ref('/lists')
            .on('value', snapshot => {
                console.log('User data: ', snapshot.val());
            });
        console.log(reference)
    }

    criar = () => {
        database()
            .ref().child(`lists`)
            .push({
                SubList: {
                    description: 'Teste',
                    situation: true,
                }
            })
            .then();
    }

    return (
        <View style={styles.container}>

            <View style={styles.head}>
                <View style={styles.logoImgAndTitle}>
                    <Image style={styles.logoImg} source={logoImg}></Image>
                    <Text style={styles.title}>Organize</Text>
                </View>
                <Icon name="info" size={42} color="#5C5C5C" style={styles.info}></Icon>
            </View>

            <TouchableOpacity onPress={() => {criar() }}>
                <Icon name="plus-circle" size={26} color="#5C5C5C" style={styles.create}>
                    <Text style={styles.createText}> Criar Tarefa</Text>
                </Icon>
            </TouchableOpacity>

            <View style={styles.hr}></View>


            <FlatList
                style={styles.incidentList}
                data={[1, 2, 3]}
                keyExtractor={incident => String(incident)}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.2}
                renderItem={() => (
                    <TouchableOpacity style={styles.list} onPress={() => { ler() }}>
                        <View style={styles.buttonList}>
                            <Text style={styles.buttonTextList}>Tarefas Diárias</Text>
                        </View>

                        <View style={styles.iconsList}>
                            <Icon style={styles.iconList} name="edit" size={20} color="#6E6F70"></Icon>
                            <Icon style={styles.iconList} name="trash-o" size={20} color="#6E6F70"></Icon>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    );


}