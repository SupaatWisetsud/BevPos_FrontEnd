import React, { useEffect } from "react";
import { View } from "react-native";
import { Spinner } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage'
import { AuthContext } from './src/hook/context';
import Icon from 'react-native-vector-icons/FontAwesome';
import jwtDecode from 'jwt-decode';
import DrawerContent from './src/layout/DrawerContent';

import {
  Login,
  Register,
  Home,
  Stock,
  Report,
  About
} from './src/views';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

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

      try {
        userToken = await AsyncStorage.getItem('token');
        if(userToken) profile = jwtDecode(userToken);
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
            <Drawer.Screen name="Stock" component={Stock} 
              options={{
                drawerIcon: ({color, size}) => <Icon name="archive" color={color} size={size} />,
                drawerLabel: "สต๊อกสินค้า"
              }}    
            />
            <Drawer.Screen name="Report" component={Report} 
              options={{
                drawerIcon: ({color, size}) => <Icon name="flag" color={color} size={size} />,
                drawerLabel: "รายงาน"
              }}    
            />
            <Drawer.Screen name="About" component={About} 
              options={{
                drawerIcon: ({color, size}) => <Icon name="exclamation-circle" color={color} size={size} />,
                drawerLabel: "เกี่ยวกับ"
              }}    
            />
          </Drawer.Navigator>
        :
          <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
