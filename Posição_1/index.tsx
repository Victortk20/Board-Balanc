import { Text, SafeAreaView, StyleSheet, ViewBase, View,Image,TouchableOpacity } from 'react-native';

import logo from  './../pictures/logo.png';

import { useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NavegacaoPrincipalParams } from '../navigations';

import { Button } from 'react-native';
import BluetoothSerial from 'react-native-bluetooth-serial';
import React, { useState, useEffect } from 'react';


export interface BemvindoScreenProps {
  route: RouteProp<NavegacaoPrincipalParams, "bemvindo">
}


export  function Pagina1 (props: any) {

  const navigation = useNavigation<any>();

  {/*
  const [deviceAddress, setDeviceAddress] = useState<string>('00:21:13:03:1B:4A'); // Substitua pelo endereço do dispositivo que você deseja verificar
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const checkDeviceConnection = async () => {
    try {
      const connected: boolean = await BluetoothSerial.isConnected(deviceAddress);
      setIsConnected(connected);
    } catch (error) {
      console.error('Erro ao verificar a conexão Bluetooth:', error);
    }
  };

  useEffect(() => {
    // Chama a função de verificação ao montar o componente
    checkDeviceConnection();
  }, [deviceAddress]);
*/}
  
  return (
    <>
    <View style={styles.container}>
    <Text style={styles.titulo}>Posição 1</Text>
    <View style={styles.container2}>
    <Text>Grafico 1</Text>
    </View >
    
    <Text style={styles.subtitulo}>Resultado:</Text>
    <Text style={styles.subtitulo}>Média:</Text>
    <Text style={styles.subtitulo}>Tempo do Teste:</Text>
    <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
        <Text style={styles.textobotao}>Voltar</Text>
    </TouchableOpacity>
    </View>

    {/*
    <View>
      <Text>Estado da conexão Bluetooth: {isConnected ? 'Conectado' : 'Desconectado'}</Text>
      <Button
        title="Verificar Conexão Bluetooth"
        onPress={() => {
          checkDeviceConnection();
        }}
      />
    </View>
*/}

    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#87ab7d',
    padding: 100,
    
},
  container2: {

    justifyContent: 'center',
    padding:40,
    backgroundColor:'#b1e3a3',
    borderRadius: 5,
    width: 150, 
    height: 200,
    marginLeft: 10,
    alignItems: 'center',
    
    
    
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
});
