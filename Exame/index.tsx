import { Text, SafeAreaView, StyleSheet, ViewBase, View,Image,TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';

import logo from  './../pictures/logo.png';

import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NavegacaoPrincipalParams } from '../navigations';

import { Button, PermissionsAndroid } from 'react-native';
import RNBluetoothClassic, {
  BluetoothDevice
} from 'react-native-bluetooth-classic';

import React, { useState, useEffect } from 'react';
import Grafico from '../components/Grafico';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { usePacienteContext } from '../provider/paciente-context';
import { TipoExame } from '../helpers/exame';


export interface BemvindoScreenProps {
  route: RouteProp<NavegacaoPrincipalParams, "Exame">
}

export  function Exame (props: BemvindoScreenProps) {

  const navigation = useNavigation<any>();
  const [ points, setPoints ] = useState<{x:number, y:number}[]>([]);
  const [ x, setX ] = useState<number|null>(null);
  const [ y, setY ] = useState<number|null>(null);
  const [ z, setZ ] = useState<number|null>(null);
  const [ geradorGrafico, setGeradorGrafico ] = useState<any>(null);
  const [ executando, setExecutando ] = useState(false);
  const [ status, setStatus ] = useState<'Parado'|'Calibrando'|'Executando'|'Finalizado'>('Parado');
  const [ tempoExame, setTempoExame ] = useState(0);
  const db = getFirestore();
  const { paciente } = usePacienteContext();
  const  [ salvandoExame, setSalvandoExame ] = useState(false);
  
  const deviceAddress = '00:21:13:03:1B:4A'; // Substitua pelo endereço do dispositivo que você deseja verificar
  const delaySegundos = 5;
  // ======================================================================
  const checkDeviceConnection = async () => {
    try {
      setExecutando(true);
      setTempoExame(0);
      setPoints([]); //Reseta
      setStatus('Calibrando')
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
        let tempo = 0;
        if (await device.isConnected()) {
          const interval = setInterval(async () => {
            let dados:any = await device.read();
            //recuperando X
            dados = dados.substring(1);
            dados = dados.split('Y');
            let x = dados[0];
            
            //recuperando Y
            dados = dados[1].split('Z');
            let y = dados[0];

            //Recuperando Y
            let z = dados[1];
            
            if (!calibrou) {
              console.log('Calibar')
              calibrou = true;
              console.log(x, y, z);
              inicial = {x, y, z}
            } else {
              setStatus('Executando')
              //ajuste de sensibilidade
              const sensibilidade = 3;
              console.log('Dados');
              x = (inicial['x'] - x)/sensibilidade;
              y = (inicial['y'] - y)/sensibilidade;
              z = (inicial['z'] - y)/sensibilidade;

              //limites
              x = Math.min(10, Math.max(-10, x));
              y = Math.min(10, Math.max(-10, y));
              z = Math.min(10, Math.max(-10, z));
             
              console.log('- X', x);
              console.log('- Y', y);
              console.log('- Z', z);

              setX(x);
              setY(y);
              setZ(z);
              tempo += delaySegundos;
              setTempoExame(tempo);
            }

           
          }, delaySegundos * 1000);
          setGeradorGrafico(interval);
        }
        
        
      }
    } catch (error) {
      console.error('Erro ao verificar a conexão Bluetooth:', error);
    }
  };
  // =========
  const salvarExame = async () => {
    setSalvandoExame(true);
    //Informações salvas no exame
    await addDoc(collection(db, 'exames'), {
      paciente,
      cpf: paciente.cpf,
      tipo: props.route.params?.tipo,
      posicoes: points,
      tempoExame
    })
    setSalvandoExame(false);
    navigation.goBack();
  }
  // =========
  useEffect(() => {
    if (y != null && executando) {
      const newPoints = [...points];
      newPoints.push({x, y});
      console.log(newPoints);
      setPoints(newPoints);
    }
  }, [y])
  // =======================================================
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#87ab7d'}}>

    <View style={styles.container}>
          {/* GRAFICO */}
          <Text style={styles.titulo}>{TipoExame(props.route.params?.tipo)}</Text>
          <View style={styles.container2}>
             <Text>Grafico 1</Text>
             <Grafico points={points}/>
          </View >
      
          {/* OPÇÕES */}
          {!salvandoExame && 
          <>
            <Text style={styles.subtitulo}>Tempo do Teste: {"\n"} {tempoExame} segundos</Text>
            <Text style={styles.subtitulo}>Status: {status}</Text>
            <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
                <Text style={styles.textobotao}>Voltar</Text>
            </TouchableOpacity>

            {!executando && <TouchableOpacity style={styles.botao} onPress={checkDeviceConnection}>
            <Text style={styles.textobotao}>{status == 'Parado' ? 'INICIAR' : 'REINICIAR'}</Text>
            </TouchableOpacity>}

            {status == 'Finalizado' && <TouchableOpacity style={styles.botao} onPress={salvarExame}>
                <Text style={styles.textobotao}>Salvar Exame</Text>
            </TouchableOpacity>}

            {executando &&<TouchableOpacity style={styles.botao} onPress={() => {
              if (geradorGrafico) {
                clearInterval(geradorGrafico)
                setExecutando(false);
                setStatus('Finalizado');
              }
            }}> 
            <Text style={styles.textobotao}>PARAR</Text>
            </TouchableOpacity>}
          </>}
          {salvandoExame && <ActivityIndicator size={50} style={{marginTop: 20}}/>}
      </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#87ab7d',
    paddingHorizontal: 100,
    paddingVertical: 30
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
      fontSize: 20,
      marginBottom: 5,
      textAlign: 'center',
  },

  subtitulo:{
    color: '#000000',
    fontSize: 14,
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
