import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import ItemProduct from './ItemProduct';
import { Toast, Root } from 'native-base';
import { BusketContext } from '../../hook/busketContext';

const TabHome = ({
    navigation,
    data,
    refetch = () => null,
    loading
}) => {

    const { dispatch } = React.useContext(BusketContext);

    return (
        <Root style={{flex: 1}}>

            <View style={{flex: 1}}>
                <FlatGrid
                    itemDimension={130}
                    items={data}
                    style={styles.gridView}
                    // staticDimension={300}
                    // fixed
                    onRefresh={() => {refetch()}}
                    refreshing={loading}
                    spacing={15}
                    renderItem={({ item, index }) => (
                        <ItemProduct 
                            item={item} 
                            onPickUp={e => {
                                dispatch({type: "ADD", payload: e});
                                Toast.show({
                                    text: "เพิ่มสินค้าลงในตระกร้าเสร็จสิ้น",
                                })
                            }}
                        />
                    )}
                />
            </View>
        </Root>
    )
}

const styles = StyleSheet.create({
    gridView: {
      flex: 1,
    },
});

export default TabHome;