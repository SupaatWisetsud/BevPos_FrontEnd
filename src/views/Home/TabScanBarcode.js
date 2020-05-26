import React from 'react';
import { Container, Button, Header, Left, Body, Title, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

const TabScanBarcode = ({
    navigation
}) => {

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
            <RNCamera
                style={{flex: 1}}
                type="back"
                flashMode="on"
            >
                <BarcodeMask width={300} height={100} showAnimatedLine={false} />
            </RNCamera>
        </Container>
    )
}

export default TabScanBarcode;