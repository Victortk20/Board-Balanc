import { Text, SafeAreaView, StyleSheet, ViewBase, View,Image,TouchableOpacity } from 'react-native';

import logo from  './../pictures/logo.png';

import { useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NavegacaoPrincipalParams } from '../navigations';

import { Button, PermissionsAndroid } from 'react-native';
import RNBluetoothClassic, {
  BluetoothDevice
} from 'react-native-bluetooth-classic';

import React, { useState, useEffect } from 'react';
import Grafico from '../components/Grafico';


export interface BemvindoScreenProps {
  route: RouteProp<NavegacaoPrincipalParams, "bemvindo">
}


export  function Pagina1 (props: any) {

  const navigation = useNavigation<any>();
  const [ points, setPoints ] = useState<{x:number, y:number}[]>([]);
  const [ x, setX ] = useState<number|null>(null);
  const [ y, setY ] = useState<number|null>(null);
  const [ z, setZ ] = useState<number|null>(null);
  //INICIAL
  // const [ inicial, setInicial ] = useState<{x: number, y: number, z: number}|null>();
  
  const deviceAddress = '00:21:13:03:1B:4A'; // Substitua pelo endereço do dispositivo que você deseja verificar
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const delaySegundos = 5;
  
  const checkDeviceConnection = async () => {
    try {
      console.log('AAAA');
      //Solicita permissão
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: 'Liberar acesso ao bluetooth',
          message:
            'Será usado para buscar os dados do dispositivo',
          buttonNeutral: 'Perguntar depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        },
      );
      //Permissão liberada
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {


        let device = await RNBluetoothClassic.connectToDevice(deviceAddress);  // Returns BlutoothDevice
        let calibrou = false;
        let inicial = {}
        if (await device.isConnected()) {
          setInterval(async () => {
            let dados:any = await device.read();
            //recuperando X
            dados = dados.substring(1);
            dados = dados.split('Y');
            const x = dados[0];
            
            //recuperando Y
            dados = dados[1].split('Z');
            const y = dados[0];

            //Recuperando Y
            const z = dados[1];
            
            if (!calibrou) {
              console.log('Calibar')
              calibrou = true;
              console.log(x, y, z);
              inicial = {x, y, z}
            } else {
  
              console.log('Dados');
              console.log('- X', inicial['x'] - x);
              console.log('- Y', inicial['y'] - y);
              console.log('- Z', inicial['z'] - z);

              setX(inicial['x'] - x);
              setY(inicial['y'] - y);
              setZ(inicial['z'] - z);
            }

           
          }, delaySegundos * 1000);

        }
        
        
      }
    } catch (error) {
      console.error('Erro ao verificar a conexão Bluetooth:', error);
    }
  };

  useEffect(() => {
    if (y != null) {
      const newPoints = [...points];
      newPoints.push({x, y});
      console.log(newPoints);
      setPoints(newPoints);
    }
  }, [y])

  useEffect(() => {
    // Chama a função de verificação ao montar o componente
    checkDeviceConnection();
  }, [deviceAddress]);

  
  return (
    <>
      <View style={styles.container}>
          <Text style={styles.titulo}>Posição 1</Text>
          <View style={styles.container2}>
          <Text>Grafico 1</Text>
          <Grafico points={points}/>
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
    backgroundColor:'#b1e3a3',
    borderRadius: 15,
    width: 300, 
    height: 450,
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
