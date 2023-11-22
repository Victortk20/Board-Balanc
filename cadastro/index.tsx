import { Text, SafeAreaView, StyleSheet, ViewBase, View,Image,TouchableOpacity, Alert } from 'react-native';

import logo from  './../pictures/logo.png';

import { useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NavegacaoPrincipalParams } from '../navigations';
import { TextInput } from 'react-native-gesture-handler';

import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { getFirestore, addDoc, doc, collection } from '@firebase/firestore';
import { Formik } from 'formik';

export interface BemvindoScreenProps {
  route: RouteProp<NavegacaoPrincipalParams, "cadastro">
}


export function Cadastro (props: any) {

  const auth = getAuth();
  const db = getFirestore();
  const navigation = useNavigation<any>();
  // ==================================================
  const handleCadastro = async({nome, cpf}:any) => {

          addDoc(collection(db, 'usuarios'), {
              nome, cpf
          }).then(() => navigation.goBack())
          .catch(erro => Alert.alert('Erro', 'Não foi possivel criar o usuário, tente novamente'))
  }

  // ==================================================
  return (
    <>
    <View style={styles.container}>


    <Formik
            initialValues={{nome:'', cpf:''}}
            onSubmit={handleCadastro}
        >
            {({handleChange, errors, touched, handleBlur, isSubmitting, handleSubmit}) => (
                <>
                    <Text  style={styles.titulo}>Cadastro Paciente</Text>
                    <Image source={logo} style={styles.logo}/> 

                    <Text style={styles.descricao}>Nome</Text>
                    <TextInput onChangeText={handleChange('nome')} onBlur={handleBlur('nome')}style={styles.input}  placeholder="Digite seu Nome" />

                    <Text  style={styles.descricao}>CPF</Text>
                    <TextInput onChangeText={handleChange('cpf')} onBlur={handleBlur('cpf')} style={styles.input}  placeholder="Digite sea CPF" />

                    <TouchableOpacity style={styles.botao} onPress={() => handleSubmit()} disabled={isSubmitting}>
                    <Text style={styles.textobotao}>Cadastrar</Text>
                    </TouchableOpacity>
                </>
            )}

        </Formik>

    
                        


      {/* 
        <View style={styles.container2}>
        <Text style={styles.titulo}>Cadastro Paciente</Text>
        <Image source={logo} style={styles.logo}/> 

        <Text style={styles.descricao}>Nome</Text>
        <TextInput style={styles.input}  placeholder="Digite seu Nome" />

        <Text style={styles.descricao}>CPF</Text>
        <TextInput style={styles.input}  placeholder="Digite sua CPF" />

        <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Telaprincipal')}>
        <Text style={styles.textobotao}>Cadastrar</Text>
        </TouchableOpacity> 

        </View>*/}

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
    fontSize: 15,
    padding: 10,
    color: '#000000',
    },
});
