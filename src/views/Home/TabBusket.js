import React from 'react';
import { View, Text } from 'react-native';
import { Container, Button, Header, Left, Body, Title, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';

const TabBusket = () => {

    return (
        <Container style={{flex: 1}}>
            <Header style={{backgroundColor: "#1a936f"}} androidStatusBarColor="#4a7c59">
                <Left>
                    <Button transparent onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}>
                        <Icon name="bars" size={26} color="white" />
                    </Button>
                </Left>
                <Body>
                    <Title>หน้าหลัก</Title>
                </Body>
                <Right></Right>
            </Header>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Text>Busket</Text>
            </View>
        </Container>
    )
}

export default TabBusket;