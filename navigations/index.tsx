import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BemvindoScreen } from './../bem-vindo';
import { LoginScreen } from '../login';
import { Telaprincipal } from './../tela_principal';
import { Exame } from '../Posicao';
import { Cadastro } from '../cadastro';
import { Listar } from '../Listar';
import { Telaprincipal2 } from '../telaprincipal2';

export type NavegacaoPrincipalParams = {
    bemvindo: undefined,
    login:undefined,
    Telaprincipal:undefined,
    Telaprincipal2:undefined,
    Exame:{tipo: 'aberto'|'fechado'|'aberto_superficie'|'fechado_superficie'},
    cadastro: undefined,
    listar: undefined,
  
    
}

const Stack = createNativeStackNavigator<NavegacaoPrincipalParams>();

export const NavegacaoPrincipal = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="bemvindo" component={BemvindoScreen} />
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="cadastro" component={Cadastro} />
            <Stack.Screen name="listar" component={Listar} />
            <Stack.Screen name="Telaprincipal" component={Telaprincipal} />
            <Stack.Screen name="Telaprincipal2" component={Telaprincipal2} />
            <Stack.Screen name="Exame" component={Exame} />
        </Stack.Navigator>
    </NavigationContainer>
)