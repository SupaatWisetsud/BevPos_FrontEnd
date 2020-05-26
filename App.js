import React, { useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-community/async-storage'
import { AuthContext } from './src/hook/context';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Login,
  Home
} from './src/views';
import { View } from "react-native";
import { Spinner } from "native-base";
import jwtDecode from 'jwt-decode';
import DrawerContent from './src/layout/DrawerContent';

const Drawer = createDrawerNavigator();

export default function App() {
  
  const initialLoginState = {
    isLoading: true,
    userToken: null,
    userProfile: null
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          userProfile: action.profile,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userToken: action.token,
          userProfile: action.profile,
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
      
      let profile;

      try {
        await AsyncStorage.setItem('token', token);
        profile = jwtDecode(token);
      } catch(e) {
        console.log(e);
      }

      dispatch({ type: 'LOGIN', token: token, profile: profile?._doc || null });
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
      let profile;

      userToken = null;
      profile = null;

      try {
        userToken = await AsyncStorage.getItem('token');
        profile = jwtDecode(userToken);
      } catch(e) {
        console.log(e);
      }
      // console.log('user token: ', userToken);
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken, profile: profile?._doc || null });
    }, 1000);
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Spinner color='red' />
      </View>
    );
  }
  
  return (
    <AuthContext.Provider value={{...authContext, loginState}}>
      <NavigationContainer>
        {loginState.userToken? 
          <Drawer.Navigator initialRouteName="Home" drawerContent={props => <DrawerContent {...props} />}>
            <Drawer.Screen name="Home" component={Home} 
              options={{
                drawerIcon: ({color, size}) => <Icon name="home" color={color} size={size} />,
                drawerLabel: "หน้าหลัก"
              }}    
            />
          </Drawer.Navigator>
        :
          <Login />
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
