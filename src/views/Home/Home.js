import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import TabHome from './TabHome';
import TabBusket from './TabBusket';
import TabScanBarcode from './TabScanBarcode';

const Tab = createBottomTabNavigator();

const Home = () => {

    return (
        <Tab.Navigator tabBarOptions={{
            inactiveBackgroundColor: "#114b5f",
            activeBackgroundColor: "#114b5f",
            inactiveTintColor: "white",
            activeTintColor: "#7DCEA0"
        }}>
            <Tab.Screen name="Home" component={TabHome} 
                options={{tabBarIcon: ({color, size}) => <Icon name="home" color={color} size={size} /> }} 
            />
            <Tab.Screen name="Busket" component={TabBusket} 
                options={{tabBarIcon: ({color, size}) => <Icon name="shopping-basket" color={color} size={size} /> }} 
            />
            <Tab.Screen name="Scan" component={TabScanBarcode} 
                options={{tabBarIcon: ({color, size}) => <Icon name="camera-retro" color={color} size={size} /> }} 
            />
        </Tab.Navigator>
    )
}

export default Home;