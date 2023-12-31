import { Text, SafeAreaView, StyleSheet, ViewBase, View,Image,TouchableOpacity } from 'react-native';

import logo from './../pictures/logo.png';

import { useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NavegacaoPrincipalParams } from '../navigations';

export interface BemvindoScreenProps {
  route: RouteProp<NavegacaoPrincipalParams, "bemvindo">
}

export function BemvindoScreen (props: BemvindoScreenProps) {

  const navigation = useNavigation<any>();

  return (
    <>
    <View style={styles.container}>
      
      <View style={styles.container2}>
      <Image source={logo} style={styles.logo}/> 
      <Text style={styles.titulo}>Seja Bem Vindo ao Balance Board</Text>
      
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('login')}>
        <Text style={styles.textobotao}>Entrar</Text>
      </TouchableOpacity>
      </View>
    </View>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 8,
    backgroundColor:'#87ab7d',
    
  },
  container2: {
    
    justifyContent: 'center',
    padding: 8,
    backgroundColor:'#b1e3a3',
    borderRadius: 30,
    
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo:{
    padding: 10,
    width: 180, 
    height: 100,
    marginLeft: 90,
    margin:10,
    borderRadius: 30,
  },
  titulo:{
      color: '#000000',
      fontSize: 20,
      textAlign: 'center',
      padding: 25,
  },
  textobotao:{
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
  },
  botao:{
    backgroundColor: '#242b22',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 40,
  },
});
