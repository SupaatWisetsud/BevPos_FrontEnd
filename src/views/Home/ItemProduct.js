import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import { AuthContext } from '../../hook/context';

export default function ItemProduct({
    item,
    onPickUp
}){

    const {loginState: {host}} = React.useContext(AuthContext);

    return (
        <Card>
            <CardItem>
                <Body>
                    <Image 
                        style={{width: "100%", height: 140}}
                        source={item.image? {uri: host + "/picture/product/" + item.image} : require('../../assets/box.jpg')}
                    />
                </Body>
            </CardItem>
            <View style={styles.footer}>
                <Text numberOfLines={1}>{item.name}</Text>
                <View style={styles.descr}>
                    <Text>฿ {item.price || "ไม่ระบุ"}</Text>
                    <Text style={styles.bustket} onPress={e => onPickUp(item)} >หยิบใส่ตระกร้า</Text>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    bustket: {
        color: "#5DADE2", 
        fontWeight:"400"
    },
    descr: {
        flexDirection: 'row', 
        justifyContent: "space-between", 
        alignItems: "center", 
        paddingTop: 5
    },
    footer: {
        flex: 1, 
        padding: 10
    }
});