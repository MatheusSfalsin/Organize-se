import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
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
import auth from '@react-native-firebase/auth'
import logoImg from '../../../images/tasks_25495.png'
import database from '@react-native-firebase/database';
// import firestore from '@react-native-firebase/firestore';

export default function List() {
    const navigation = useNavigation();
    const route = useRoute();

    const userConectionID = route.params.user.uid

    const [dataList, setDataList] = useState([]);
    const [inputRef, setInputRef] = useState('');
    const [visible, setVisible] = useState('none');
    const [titleList, setTitleList] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    goToSubList = (list) => {
        console.log(list)
        navigation.navigate('SubList',{list})
    }

    useEffect(() => {
        ler()
    }, [])

    keyboardDidShow = () => {
    }

    keyboardDidHide = () => {
    }

    ler = () => {
        database()
            .ref(`/lists/${userConectionID}`)
            .on('value', snapshot => {
                setDataList([]);
                var dados = []
                snapshot.forEach(element => {
                    key = element.key
                    dados.push({ title: element.val().title, key: key })
                    console.log({ title: element.val().title, key: key })

                });
                setDataList(dados);
            });
    }

    logout = () => {
        auth()
            .signOut()
            .then(() => navigation.navigate('Login'));
    }

    clickCrate = () => {
        setVisible('flex')
        inputRef.focus()
    }

    cancelCreate = () => {
        setVisible('none');
        Keyboard.dismiss();
    }

    criar = () => {
        database()
            .ref().child(`lists/${userConectionID}`)
            .push({
                title: titleList,
            })
            .then(
                cancelCreate()
            );
    }

    return (
        <View style={styles.container}>

            <View style={styles.head}>
                <View style={styles.logoImgAndTitle}>
                    <Image style={styles.logoImg} source={logoImg}></Image>
                    <Text style={styles.title}>Organize</Text>
                </View>

                <View>
                    <TouchableOpacity onPress={() => {  }}>
                        <Icon name="info" size={20} color="#5C5C5C" style={styles.info}>
                            <Text>    Info</Text>
                        </Icon>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { }}>
                        <Icon name="sign-out" size={20} color="#5C5C5C" style={styles.closeSession}>
                            <Text> Sair</Text>
                        </Icon>
                    </TouchableOpacity>

                </View>



            </View>

            <TouchableOpacity onPress={() => { clickCrate() }}>
                <Icon name="plus-circle" size={26} color="#5C5C5C" style={styles.create}>
                    <Text style={styles.createText}> Criar Tarefa</Text>
                </Icon>

                <View style={styles.inputsCreate}>
                    <TextInput
                        style={[styles.inputCreate, { display: visible }]}
                        placeholder='Nome da Lista'
                        ref={inputRef => setInputRef(inputRef)}
                        clearTextOnFocus={true} //IOS
                        onChange={e => setTitleList(e.nativeEvent.text)}>
                    </TextInput>

                    <TouchableOpacity onPress={() => { criar() }} style={[styles.confirmCreate, { display: visible }]}>
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
                            <TouchableOpacity onPress={() => { }}>
                                <Icon style={styles.iconList} name="edit" size={20} color="#6E6F70"></Icon>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { }}>
                                <Icon style={styles.iconList} name="trash-o" size={20} color="#6E6F70"></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

        </View>
    );


}