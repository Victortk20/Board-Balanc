import { Text, SafeAreaView, StyleSheet, ViewBase, View,Image,TouchableOpacity, Alert } from 'react-native';

import logo from  './../pictures/logo.png';

import { useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { NavegacaoPrincipalParams } from '../navigations';
import { TextInput } from 'react-native-gesture-handler';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Formik } from 'formik';

export interface BemvindoScreenProps {
  route: RouteProp<NavegacaoPrincipalParams, "login">
}

export function LoginScreen (props: any) {

  const navigation = useNavigation<any>();

  const auth = getAuth();

  const handleLogin = async ({email, senha}:any) => {
      
      await signInWithEmailAndPassword(auth, email, senha)
          .then(usuario => navigation.reset({index: 0, routes: [{name: 'Telaprincipal'}]}))
          .catch(erro => Alert.alert('Erro', 'Login ou senha incorreta!')); 
  }


  return (
    <>
      <View style={styles.container}>

      <Formik
            initialValues={{email:'', senha:''}}
            onSubmit={handleLogin}
        >
            {({handleChange, handleSubmit, isSubmitting}) => (
                <>
                    <Text style={styles.titulo}>Login</Text>
                    <Image source={logo} style={styles.logo}/> 
        
                    <Text style={styles.descricao}>Email</Text>
                    <TextInput  onChangeText={handleChange('email')} style={styles.input}  placeholder="Digite seu email" />

                    <Text style={styles.descricao}>Senha</Text>
                    <TextInput  onChangeText={handleChange('senha')} style={styles.input}  placeholder="Digite sua senha" />

                    <TouchableOpacity style={styles.botao} onPress={() => handleSubmit()}>
                    <Text style={styles.textobotao}>Entrar</Text>
                    </TouchableOpacity>
                </>
            )}

        </Formik>
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
