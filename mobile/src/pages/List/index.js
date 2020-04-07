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
// import prompt from 'react-native-prompt-android';

export default function List() {
    const navigation = useNavigation();

    const [dataList, setDataList] = useState([]);
    const [n, setN] = useState(0);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    goToRegister = () => {
        navigation.navigate('Register')
    }

    useEffect(() => {
        keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)
        ler()
    }, [])

    keyboardDidShow = () => {
    }

    keyboardDidHide = () => {
    }

    function teste(){
        prompt(
            'Enter password',
            'Enter your password to claim your $1.5B in lottery winnings')
    }

    ler = async () => {
        console.log(dataList)
        await database()
            .ref('/lists')
            .on('value', snapshot => {
                // console.log(snapshot.val())
                setDataList([]);
                console.log(dataList)
                var dados = []

                snapshot.forEach(element => {
                    key = element.key
                    dado = element.val().SubList
                    dado.key = key 
                    dados.push({title: element.val().title,key: key})
                    console.log({title: element.val().title,key: key})

                });

                console.log(dados)
                setDataList(dados);
            });

        console.log(dataList)




    }

    criar = () => {
        database()
            .ref().child(`lists`)
            .push({
                title: 'Ola Mundo',
                SubList: {
                    description: '',
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

            <TouchableOpacity onPress={() => { teste() }}>
                <Icon name="plus-circle" size={26} color="#5C5C5C" style={styles.create}>
                    <Text style={styles.createText}> Criar Tarefa</Text>
                </Icon>
            </TouchableOpacity>

            <View style={styles.hr}></View>


            <FlatList
                style={styles.incidentList}
                data={dataList}
                keyExtractor={list => String(list.key)}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.2}
                renderItem={({ item : list }) => (
                    <TouchableOpacity style={styles.list} onPress={() => { ler() }}>
                        <View style={styles.buttonList}>
                            <Text style={styles.buttonTextList}>{list.title}</Text>
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