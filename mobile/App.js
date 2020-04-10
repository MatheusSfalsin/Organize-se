import React from 'react';
import Routes from './src/routes.js'
import database from '@react-native-firebase/database';
import { YellowBox } from 'react-native'

const App = () => {

  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
  ]);

  console.disableYellowBox = true;

 
  persisteData = () => {
    database()
      .setPersistenceEnabled(true)
  }

  persisteData();

  return (
    <Routes></Routes>
  )

};



export default App;
