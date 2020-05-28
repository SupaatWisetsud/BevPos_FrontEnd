import React from 'react';
import { View } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { Container, Header, Left, Button, Body, Title, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Alert({
    navigation
}){

    return (
        <Container>
            <Header style={{backgroundColor: "#1a936f"}} androidStatusBarColor="#4a7c59">
                <Left>
                    <Button transparent onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}>
                        <Icon name="bars" size={26} color="white" />
                    </Button>
                </Left>
                <Body>
                    <Title style={{fontWeight: "bold"}}>แจ้งเตือน</Title>
                </Body>
                <Right>
                    
                </Right>
            </Header>
            

        </Container>
    )
}