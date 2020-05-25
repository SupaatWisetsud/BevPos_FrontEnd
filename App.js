import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage'
import { AuthContext } from './src/hook/context';


import {
  Login,
  Home
} from './src/views';
import { View, Text } from "react-native";

const Stack = createStackNavigator();

export default function App() {
  
  const initialLoginState = {
    isLoading: true,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userToken: null,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(token) => {
      try {
        await AsyncStorage.setItem('token', token);
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGIN', token: token });
    },
    signOut: async() => {
      try {
        await AsyncStorage.removeItem('token');
      } catch(e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    }
  }), []);

  useEffect(() => {
    setTimeout(async() => {
      
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('token');
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>Loading...</Text>
      </View>
    );
  }
  
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }} >
          {
            loginState.userToken?
              <Stack.Screen name="Home" component={Home} />
              :
              <Stack.Screen name="Login" component={Login} />
          }
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
