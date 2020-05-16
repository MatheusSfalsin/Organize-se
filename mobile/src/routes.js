import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import { View } from 'react-native';

const appStack = createStackNavigator();

import Login from './pages/Login/index';
import Register from './pages/Register/index';
import List from './pages/List/index';
import SubList from './pages/SubList/index';
import auth from '@react-native-firebase/auth';

export default function Routes() {
  return (
    // tem que vir por volta das rotas
    <NavigationContainer>
      <appStack.Navigator screenOptions={{headerShown: false}}>
        {auth().currentUser ? (
          <>
            <appStack.Screen name="List" component={List} />
            <appStack.Screen name="SubList" component={SubList} />
            <appStack.Screen name="Login" component={Login} />
            <appStack.Screen name="Register" component={Register} />
          </>
        ) : (
          <>
            <appStack.Screen name="Login" component={Login} />
            <appStack.Screen name="Register" component={Register} />
            <appStack.Screen name="List" component={List} />
            <appStack.Screen name="SubList" component={SubList} />
          </>
        )}
      </appStack.Navigator>
    </NavigationContainer>
  );
}
