import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BemvindoScreen } from './../bem-vindo';
import { LoginScreen } from '../login';
import { Telaprincipal } from './../tela_principal';
import { Pagina1 } from './../Posição_1';
import { Pagina2 } from './../Posição_2';
import { Pagina3 } from './../Posição_3';
import { Pagina4 } from './../Posição_4';
import { Cadastro } from '../cadastro';
import { Listar } from '../Listar';
import { Telaprincipal2 } from '../telaprincipal2';

export type NavegacaoPrincipalParams = {
    bemvindo: undefined,
    login:undefined,
    Telaprincipal:undefined,
    Telaprincipal2:undefined,
    Pagina1:undefined,
    Pagina2: undefined,
    Pagina3: undefined,
    Pagina4: undefined,
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
            <Stack.Screen name="Pagina1" component={Pagina1} />
            <Stack.Screen name="Pagina2" component={Pagina2} />
            <Stack.Screen name="Pagina3" component={Pagina3} />
            <Stack.Screen name="Pagina4" component={Pagina4} />
            
            
        </Stack.Navigator>
    </NavigationContainer>
)