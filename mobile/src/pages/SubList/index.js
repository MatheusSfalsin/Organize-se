import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Keyboard,
    FlatList,
    CheckBox,
} from 'react-native';

import styles from './styles'

import Icon from 'react-native-vector-icons/FontAwesome'
Icon.loadFont();

import database from '@react-native-firebase/database';
import dataEHora from '../../utils/DataEHora'

export default function SubList() {
    const navigation = useNavigation();

    const route = useRoute();
    const list = route.params.list
    const userConectionID = route.params.userConectionID

    const [inputRef, setInputRef] = useState('');
    const [visible, setVisible] = useState('none');
    const [dataSubList, setDataSubList] = useState([]);
    const [descriptionSubList, setDescriptionSubList] = useState('');

    goToRegister = () => {
        navigation.navigate('Register')
    }

    useEffect(() => {
        ler()
    }, [])

    ler = () => {
        database()
            .ref(`/subLists/${userConectionID}/${list.key}`)
            .on('value', snapshot => {
                setDataSubList([]);
                var dados = []
                snapshot.forEach(element => {
                    key = element.key
                    dados.push({ description: element.val().description, key: key, situation: element.val().situation })

                });
                setDataSubList(dados);
            });
    }

    removeSubList = async (keySubList) => {
        await database()
            .ref(`/subLists/${userConectionID}/${list.key}/${keySubList}`)
            .remove();
        altDataEHora()
    }

    clickCrate = () => {
        setVisible('flex')
        inputRef.focus()
    }

    cancelCreate = () => {
        setDescriptionSubList('')
        setVisible('none');
        Keyboard.dismiss();
    }

    criar = () => {
        setDescriptionSubList('')
        database()
            .ref().child(`subLists/${userConectionID}/${list.key}`)
            .push({
                description: descriptionSubList,
                situation: true,
            })
            .then();

        altDataEHora()
    }


    modSituation = (keyList, situation) => {
        cancelCreate()
        database()
            .ref(`/subLists/${userConectionID}/${list.key}/${keyList}`)
            .update({
                situation: !situation,
            })

        altDataEHora()
    }

    altDataEHora = () => {
        database()
            .ref(`lists/${userConectionID}/${list.key}`)
            .update({
                dataEHora: dataEHora.formattedDate(new Date())
            })
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
                        value={descriptionSubList}
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
                            value={!subList.situation}
                            onChange={e => (console.log(e.nativeEvent.value))}
                            onTouchEnd={e => (modSituation(subList.key, subList.situation))}

                        />
                        <TouchableOpacity style={styles.list} onPress={() => { modSituation(subList.key, subList.situation) }}>
                            <View style={styles.buttonList}>
                                <Text style={[styles.buttonTextList,
                                {
                                    textDecorationLine: !subList.situation ? 'line-through' : 'none',
                                    color: !subList.situation ? '#959697' : '#5C5C5C',
                                    fontWeight: !subList.situation ? 'normal' : 'bold'
                                }]}>{subList.description}</Text>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.iconsList}>
                            <TouchableOpacity onPress={() => { removeSubList(subList.key) }}>
                                <Icon style={styles.iconList} name="trash-o" size={20} color="#6E6F70"></Icon>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

        </View>
    );


}