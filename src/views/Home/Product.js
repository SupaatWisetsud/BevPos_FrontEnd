import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Card, CardItem, Body, Button } from 'native-base';

export default function Product({item}){

    return (
        <Card>
            <CardItem>
                <Body>
                    <Image 
                        style={{width: "100%", height: 140}}
                        source={require('../../assets/box.jpg')}
                    />
                </Body>
            </CardItem>
            <View style={{flex: 1, padding: 10}}>
                <Text numberOfLines={1}>GeekyAnts</Text>
                <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: "center", paddingTop: 5}}>
                    <Text>฿ 1,000</Text>
                    <Text style={{color: "#5DADE2", fontWeight:"400"}} >หยิบใส่ตระกร้า</Text>
                </View>
            </View>
        </Card>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
      justifyContent: 'flex-end',
      borderRadius: 5,
      padding: 10,
      height: 150,
    },
    itemName: {
      fontSize: 16,
      color: '#fff',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
});