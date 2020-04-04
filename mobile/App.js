/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity
} from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// import firebase from '@react-native-firebase/app'
import auth from '@react-native-firebase/auth'


const App = () => {

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  logon = async () => {
    try {
      console.log(email)
      console.log(pass)
      const user = await auth().signInWithEmailAndPassword(email, pass)
      setIsAuthenticated(true)
      console.log(user)

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder='Digite seu Email' onChange={e => setEmail(e.nativeEvent.text)}>
        </TextInput>

        <TextInput style={styles.input} placeholder='Digite sua Senha' onChange={e => setPass(e.nativeEvent.text)}>
        </TextInput>

        <TouchableOpacity style={styles.button} onPress={logon}>
          <Text style={styles.buttonText}>Logar</Text>
        </TouchableOpacity>

        {isAuthenticated ? <Text>Usuario logado</Text>: null}

      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  input: {
    height: 45,
    backgroundColor: '#FFF',
    alignSelf: 'stretch',
    borderColor: '#EEE',
    borderWidth: 1,
    paddingHorizontal: 20,
    marginBottom: 10,
  }
  ,
  button: {
    height: 45,
    backgroundColor: '#069',
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  }
});

export default App;
