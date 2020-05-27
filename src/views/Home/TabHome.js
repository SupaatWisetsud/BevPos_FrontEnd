import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Product from './Product';

const TabHome = ({
    navigation
}) => {

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
        <View style={{flex: 1}}>

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
        </View>
    )
}

const styles = StyleSheet.create({
    gridView: {
      flex: 1,
    },
});

export default TabHome;