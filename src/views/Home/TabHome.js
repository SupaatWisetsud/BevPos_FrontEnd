import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Container, Button, Header, Left, Body, Title, Right } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
import { FlatGrid } from 'react-native-super-grid';
import { SearchComponent } from '../../components';
import Product from './Product';

const TabHome = ({
    navigation
}) => {

    const [toggleSearch, setToggleSearch] = useState(false);

    const items = [
        { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
        { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
        { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
        { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
        { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
        { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
        { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
        { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
        { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
        { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
    ];

    return (
        <Container style={{flex: 1}}>
            <Header style={{backgroundColor: "#1a936f"}} androidStatusBarColor="#4a7c59">
                <Left>
                    <Button transparent onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}>
                        <Icon name="bars" size={26} color="white" />
                    </Button>
                </Left>
                <Body>
                    <Title style={{fontWeight: "bold"}}>หน้าหลัก</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => setToggleSearch(!toggleSearch)}>
                        <Icon name="search" size={18} color="white" />
                    </Button>
                </Right>
            </Header>
            
            <SearchComponent 
                show={toggleSearch}
            />

            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <FlatGrid
                    itemDimension={130}
                    items={items}
                    style={styles.gridView}
                    // staticDimension={300}
                    // fixed
                    spacing={15}
                    renderItem={({ item, index }) => <Product item={item} />}
                />
            </View>
        </Container>
    )
}

const styles = StyleSheet.create({
    gridView: {
      flex: 1,
    },
});

export default TabHome;