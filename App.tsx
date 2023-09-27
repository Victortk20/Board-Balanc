import { Text, SafeAreaView, StyleSheet, ViewBase, View,Image,TouchableOpacity } from 'react-native';

import logo from './../Balance_Board/pictures/logo.png';

import { BemvindoScreen } from './bem-vindo';
import { Telaprincipal } from './tela_principal';
import { Pagina1 } from './Posição_1';
import { Pagina2 } from './Posição_2';
import { Pagina3 } from './Posição_3';
import { Pagina4 } from './Posição_4';


import { NavegacaoPrincipal } from './navigations';

export default function App() {


  return (
    <>
    <NavegacaoPrincipal/>
    </>
    
  );
}


