import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    Keyboard,
    FlatList,
    CheckBox,
} from 'react-native';

import styles from './styles'

import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont();

// import firebase from '@react-native-firebase/app'
// import auth from '@react-native-firebase/auth'
import logoImg from '../../../images/tasks_25495.png'
import database from '@react-native-firebase/database';
// import firestore from '@react-native-firebase/firestore';

export default function SubList() {
    const navigation = useNavigation();

    const route = useRoute();
    // const userConection = route.params.listId

    var id = '-M4PPSafP64p65Mqdb9U'
    const list = route.params.list

    const [inputRef, setInputRef] = useState('');
    const [visible, setVisible] = useState('none');
    const [dataSubList, setDataSubList] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [descriptionSubList, setDescriptionSubList] = useState('');

    goToRegister = () => {
        navigation.navigate('Register')
    }

    useEffect(() => {
        // keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', keyboardDidShow)
        // keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', keyboardDidHide)
        ler()
    }, [])

    ler = () => {
        database()
            .ref(`/subLists/${list.key}`)
            .on('value', snapshot => {
                setDataSubList([]);
                var dados = []
                snapshot.forEach(element => {
                    key = element.key
                    dados.push({ description: element.val().description, key: key })
                    console.log({ description: element.val().description, key: key })

                });
                setDataSubList(dados);
            });
    }

    remove = async () => {
        await database()
            .ref(`/subLists/${list.key}`)
            .remove();
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
            .ref().child(`subLists/${list.key}`)
            .push({
                description: descriptionSubList,
                situation: true,
            })
            .then();
    }


    return (
        <View style={styles.container}>

            <View style={styles.titleSubList}>
                <Text style={styles.titleSubList}>{list.title}</Text>
            </View>

            <View style={styles.hr}></View>

            <TouchableOpacity onPress={() => { clickCrate() }}>
                <Icon name="plus" size={20} color="#5C5C5C" style={styles.create}>
                    <Text style={styles.createText}> Adicionar</Text>
                </Icon>

                <View style={styles.inputsCreate}>
                    <TextInput
                        style={[styles.inputCreate, { display: visible }]}
                        placeholder='Nome da Lista'
                        ref={inputRef => setInputRef(inputRef)}
                        clearTextOnFocus={true} //IOS
                        onChange={e => setDescriptionSubList(e.nativeEvent.text)}>
                    </TextInput>

                    <TouchableOpacity onPress={() => { criar() }} style={[styles.confirmCreate, { display: visible }]}>
                        <Icon name="check-circle" size={35} style={styles.confirmCreateIcon} color="#0A9A1F"></Icon>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => { cancelCreate() }} style={[styles.cancelCreate, { 'display': visible }]}>
                        <Icon name="times-circle" size={35} style={styles.cancelCreateIcon} color="#F83A30"></Icon>
                    </TouchableOpacity>
                </View>

            </TouchableOpacity>


            <FlatList
                style={styles.incidentList}
                data={dataSubList}
                keyExtractor={subList => String(subList.key)}
                showsVerticalScrollIndicator={false}
                onEndReachedThreshold={0.2}
                renderItem={({ item: subList }) => (
                    <View style={styles.containerList}>
                        <CheckBox
                            style={styles.CheckBox}
                            title='Click Here'
                            value={false}

                        />
                        <TouchableOpacity style={styles.list} onPress={() => { }}>
                            <View style={styles.buttonList}>
                                <Text style={styles.buttonTextList}>{subList.description}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.iconsList}>
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