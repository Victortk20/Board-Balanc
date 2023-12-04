import { Text, SafeAreaView, StyleSheet, ViewBase, View,Image,TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native';

import logo from  './../pictures/logo.png';

import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NavegacaoPrincipalParams } from '../navigations';

import React, { useState, useEffect } from 'react';
import Grafico from '../components/Grafico';
import { usePacienteContext } from '../provider/paciente-context';
import { TipoExame } from '../helpers/exame';

export interface BemvindoScreenProps {
  route: RouteProp<NavegacaoPrincipalParams, "exibirExame">
}

export function ExibirExames (props: BemvindoScreenProps) {

    const navigation = useNavigation<any>();
    const { exame } = props.route.params;
    const { paciente } = usePacienteContext();
    // =======================================================
    return (
        <ScrollView>

        <View style={styles.container}>

            {/* GRAFICO */}
            <Text style={styles.titulo}>{TipoExame(exame.tipo)}</Text>
            <Text style={styles.subtitulo}>Paciente: {paciente.nome}</Text>
            <Text style={styles.subtitulo}>CPF: {paciente.cpf}</Text>
            <Text style={styles.subtitulo}>Tempo de duração: {exame.tempoExame} segundos</Text>
            <View style={styles.container2}>
                <Grafico points={exame.posicoes}/>
            </View>
        
            {/* OPÇÕES */}
            <TouchableOpacity style={styles.botao} onPress={() => navigation.goBack()}>
                <Text style={styles.textobotao}>Voltar</Text>
            </TouchableOpacity>
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
    marginTop: 20,
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
