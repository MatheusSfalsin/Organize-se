import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigation, useRoute, StackActions,NavigationAction} from '@react-navigation/native'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard,
    FlatList,
    BackHandler
} from 'react-native';

import styles from './styles'

import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont();

// import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'
import logoImg from '../../../images/tasks_25495.png'
import database from '@react-native-firebase/database';
// import firestore from '@react-native-firebase/firestore';

export default function List() {
    const navigation = useNavigation();
    const route = useRoute();

    const userConectionID = auth().currentUser.uid;

    const [dataList, setDataList] = useState([]);
    const [inputRef, setInputRef] = useState('');
    const [keyUpdate, setKeyUpdate] = useState('');
    const [visible, setVisible] = useState('none');
    const [titleList, setTitleList] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(true);


    goToSubList = (list) => {
        navigation.navigate('SubList', { list })
    }

    // function componentDidMount() {
    //     BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    // }

    // function  componentWillUnmount(){
    //     BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    // }

    // function handleBackButton() {
    //     console.log('asd: ' + isAuthenticated)
    //     return true;
    // }
    useEffect(() => {
        read()
        setVisible('none');
    }, [])

    keyboardDidShow = () => {
    }

    keyboardDidHide = () => {
    }

    read = () => {
        database()
            .ref(`/lists/${userConectionID}`)
            .on('value', snapshot => {
                setDataList([]);
                var dados = []
                snapshot.forEach(element => {
                    key = element.key
                    dados.push({ title: element.val().title, key: key })
                });
                setDataList(dados);
            });
    }

    logout = () => {
        auth()
            .signOut()
            .then(() => navigation.navigate('Login'));
    }

    function clickCreate() {
        setVisible('flex')
        inputRef.focus()
    }

    cancelCreate = () => {
        setVisible('none');
        Keyboard.dismiss();
        setTitleList('')
        setKeyUpdate('')
    }

    prepareUpdate = (keyList, titleList) => {
        setKeyUpdate(keyList)
        clickCreate()
        setTitleList(titleList)
    }

    create = () => {
        if (keyUpdate) {
            update(keyUpdate, titleList)
        } else {
            database()
                .ref().child(`lists/${userConectionID}`)
                .push({
                    title: titleList,
                })
                .then(
                    cancelCreate()
                )
        }

    }

    update = (keyList, titleList) => {
        cancelCreate()
        database()
            .ref(`lists/${userConectionID}/${keyList}`)
            .update({
                title: titleList,
            })
    }


    remove = async (keyList) => {
        await database()
            .ref(`lists/${userConectionID}/${keyList}`)
            .remove();
    }

    return (
        <View style={styles.container}>

            <View style={styles.head}>
                <View style={styles.logoImgAndTitle}>
                    <Image style={styles.logoImg} source={logoImg}></Image>
                    <Text style={styles.title}>Organize</Text>
                </View>

                <View>
                    <TouchableOpacity onPress={() => { }}>
                        <Icon name="info" size={20} color="#5C5C5C" style={styles.info}>
                            <Text>    Info</Text>
                        </Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { logout() }}>
                        <Icon name="sign-out" size={20} color="#5C5C5C" style={styles.closeSession}>
                            <Text> Sair</Text>
                        </Icon>
                    </TouchableOpacity>
                </View>



            </View>

            <TouchableOpacity onPress={() => { clickCreate() }}>
                <Icon name="plus-circle" size={26} color="#5C5C5C" style={styles.create}>
                    <Text style={styles.createText}> Criar Tarefa</Text>
                </Icon>

                <View style={styles.inputsCreate}>
                    <TextInput
                        style={[styles.inputCreate, { display: visible }]}
                        placeholder='Nome da Lista'
                        ref={inputRef => setInputRef(inputRef)}
                        value={titleList}
                        onChange={e => setTitleList(e.nativeEvent.text)}>
                    </TextInput>

                    <TouchableOpacity onPress={() => { create() }} style={[styles.confirmCreate, { display: visible }]}>
                        <Icon name="check-circle" size={35} style={styles.confirmCreateIcon} color="#0A9A1F"></Icon>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { cancelCreate() }} style={[styles.cancelCreate, { 'display': visible }]}>
                        <Icon name="times-circle" size={35} style={styles.cancelCreateIcon} color="#F83A30"></Icon>
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>

            <View style={styles.hr}></View>


            <FlatList
                style={styles.incidentList}
                data={dataList}
                keyExtractor={list => String(list.key)}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.2}
                renderItem={({ item: list }) => (
                    <View style={styles.containerList}>
                        <TouchableOpacity style={styles.list} onPress={() => { goToSubList(list) }}>
                            <View style={styles.buttonList}>
                                <Text style={styles.buttonTextList}>{list.title}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.iconsList}>
                            <TouchableOpacity onPress={() => { prepareUpdate(list.key, list.title) }}>
                                <Icon style={styles.iconList} name="edit" size={20} color="#6E6F70"></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { remove(list.key) }}>
                                <Icon style={styles.iconList} name="trash-o" size={20} color="#6E6F70"></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

        </View>
    );


}