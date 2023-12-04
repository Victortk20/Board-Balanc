import { Text, SafeAreaView, StyleSheet, ViewBase, View,Image,TouchableOpacity } from 'react-native';

import logo from  './../pictures/logo.png';

import { useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NavegacaoPrincipalParams } from '../navigations';
import { usePacienteContext } from '../provider/paciente-context';
import { StackNavigationProp } from '@react-navigation/stack';

export interface BemvindoScreenProps {
  route: RouteProp<NavegacaoPrincipalParams, "bemvindo">
}

export function Telaprincipal2 (props: any) {



  const navigation = useNavigation<StackNavigationProp<NavegacaoPrincipalParams, 'Exame'>>();
  const { paciente }  = usePacienteContext();
  // =====================================================
  return (
    <>
    
    <View style={styles.container}>
    <View style={styles.container2}>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
        <Text style={styles.textobotao}>Voltar a seleção de pacientes</Text>
      </TouchableOpacity>
      <Image source={logo} style={styles.logo}/> 
      <>
      <Text style={{textAlign:'center'}}>Paciente: {paciente.nome} ({paciente.cpf})</Text>

      <Text style={styles.titulo}> Escolha Qual Teste sera feito ?</Text>
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Exame', {tipo: 'aberto'})}>
        <Text style={styles.textobotao}>Olhos Abertos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Exame', {tipo: 'fechado'})}>
        <Text style={styles.textobotao}>Olhos Fechados</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Exame', {tipo: 'aberto_superficie'})}>
        <Text style={styles.textobotao}>Olhos Abertos sobre superfície instável</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Exame', {tipo: 'fechado_superficie'})}>
        <Text style={styles.textobotao}>olhos fechados sobre superfície instável</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.botao, {backgroundColor: '#ebed17'}]} onPress={() => navigation.navigate('listarExames')}>
        <Text style={[styles.textobotao, {color:'#696d4a'}]}>Consultar exames exames</Text>
      </TouchableOpacity>

      </>
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
    marginTop: 10,
  },
});
