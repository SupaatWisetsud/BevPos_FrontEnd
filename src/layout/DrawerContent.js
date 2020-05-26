import React, { useContext } from 'react';
import { View, Image } from 'react-native';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import { DrawerActions } from '@react-navigation/native';
import { AuthContext } from '../hook/context';
import Icon from "react-native-vector-icons/FontAwesome";
import { Text } from 'native-base';

const DrawerContent = (props) => {
    const { navigation } = props;
    const { signOut, loginState: { userProfile, host } } = useContext(AuthContext);
    
    return (
        <View style={{flex: 1}}>
            <View style={{backgroundColor: "#4a7c59", height: 140, alignItems: "center", padding: 10, flexDirection: "row"}}>
                <Image 
                    style={{width: 80, height: 80, borderRadius: 50}}
                    source={{uri: host + "/picture/user/" + userProfile.image}}
                />
                <View style={{padding: 10}}>
                    <Text style={{color: "white"}}>{userProfile?.first_name + " " + userProfile?.last_name}</Text>
                    <Text style={{color: "white"}}>status: online</Text>
                </View>
            </View>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem 
                    icon={({color, size}) => <Icon name="sign-out" color={color} size={size} />}
                    label="ออกจากระบบ"
                    onPress={() => {
                        navigation.dispatch(DrawerActions.closeDrawer());
                        signOut();
                    }}
                />
            </DrawerContentScrollView>
        </View>
    );
}

export default DrawerContent;