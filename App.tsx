import { Text, SafeAreaView, StyleSheet, ViewBase, View,Image,TouchableOpacity } from 'react-native';

import logo from './../Balance_Board/pictures/logo.png';

import { BemvindoScreen } from './bem-vindo';
import { Telaprincipal } from './tela_principal';
import { Telaprincipal2 } from './telaprincipal2';
import { Pagina1 } from './Posição_1';
import { Pagina2 } from './Posição_2';
import { Pagina3 } from './Posição_3';
import { Pagina4 } from './Posição_4';
import { initializeApp } from '@firebase/app';

import { NavegacaoPrincipal } from './navigations';
import { firebaseConfig } from './config/firebase';
import * as firebaseAuth from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import {  initializeAuth, getReactNativePersistence } from '@firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App() {

  const app = initializeApp(firebaseConfig);
  const reactNativePersistence = (firebaseAuth as any).getReactNativePersistence;

  initializeAuth(app, { persistence:  getReactNativePersistence(AsyncStorage)})

  // const auth = firebaseAuth.initializeAuth(app, {
  // persistence: reactNativePersistence(ReactNativeAsyncStorage)
  //  });

  return (
    <>
    <NavegacaoPrincipal/>
    </>
    
  );
}


