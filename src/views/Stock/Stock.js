import React from 'react';
import { Container, Header, Left, Button, Body, Title, Right, Content } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';

import ModalAddProduct from './modal/ModalAddProduct';

export default function Stock({
    navigation
}){
    const [modalVisible, setModalVisible] = React.useState(false);

    return (
        <Container style={{flex: 1}}>
            <Header style={{backgroundColor: "#1a936f"}} androidStatusBarColor="#4a7c59">
                <Left>
                    <Button transparent onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}>
                        <Icon name="bars" size={26} color="white" />
                    </Button>
                </Left>
                <Body>
                    <Title style={{fontWeight: "bold"}}>สต็อกสินค้า</Title>
                </Body>
                <Right>
                    <Button transparent onPress={e => setModalVisible(true)}>
                        <Icon name="plus-square" size={26} color="white" />
                    </Button>
                </Right>
            </Header>
            <Content>
                <ModalAddProduct show={modalVisible} onClose={e => setModalVisible(false)} />
            </Content>
        </Container>
    );
}