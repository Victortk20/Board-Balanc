import { Text, SafeAreaView, StyleSheet, ViewBase, View,Image,TouchableOpacity } from 'react-native';

import logo from  './../pictures/logo.png';

import { useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NavegacaoPrincipalParams } from '../navigations';
import { TextInput } from 'react-native-gesture-handler';

export interface BemvindoScreenProps {
  route: RouteProp<NavegacaoPrincipalParams, "listar">
}


export function listar (props: any) {

 const navigation = useNavigation<any>();

 return (
    <>
    <View style={styles.container}>
        <View style={styles.container2}>
        <Text style={styles.titulo}>Listar Paciente Cadastrados</Text>
        <Image source={logo} style={styles.logo}/> 
        <Text style={styles.descricao}>Lista de Pacientes:</Text>
        <Text>1- João Roberto</Text>
        <Text>1- Josefa de Melo</Text>
        <Text>1- Chico Buarque</Text>
        <Text>1- João Roberto</Text>
        <Text>1- João Roberto</Text>

        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Telaprincipal')}>
        <Text style={styles.textobotao}>Voltar</Text>
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
      fontSize: 30,
      textAlign: 'center',
      padding: 5,
},

  subtitulo:{
    color: '#000000',
    fontSize: 20,
    textAlign: 'center',
    padding: 5,
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
    marginTop: 10,
  },
  input: {
    backgroundColor:'rgba(255, 255, 255, 0.3)',
    margin: 5,
    padding: 10,
    borderRadius: 100
  },
  descricao:{
    fontSize: 20,
    padding: 10,
    color: '#000000',
    },
});
