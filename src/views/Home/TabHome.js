import React from 'react';
import { View, StyleSheet, Text, ToastAndroid } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import ItemProduct from './ItemProduct';
import { BusketContext } from '../../hook/busketContext';
import Icon from 'react-native-vector-icons/FontAwesome';

const TabHome = ({
    navigation,
    data = [],
    refetch = () => null,
    loading
}) => {

    const { dispatch } = React.useContext(BusketContext);
      
    return (
        <View style={{flex: 1}}>

            <View style={{flex: 1}}>
                <FlatGrid
                    itemDimension={130}
                    items={data}
                    style={styles.gridView}
                    // staticDimension={300}
                    // fixed
                    ListEmptyComponent={() => (
                        <View style={styles.emptyList}>
                            <Icon name="archive" size={24} style={{fontWeight: "bold", marginRight: 5}} />
                            <Text style={{fontSize: 18, fontWeight: "bold"}}>ไม่มีสินค้า</Text>
                        </View>
                    )}
                    onRefresh={() => {refetch()}}
                    refreshing={loading}
                    spacing={15}
                    renderItem={({ item, index }) => {
                        if(item.count === null || item.count === 0) return null
                        return (
                            <ItemProduct 
                                item={item} 
                                onPickUp={e => {
                                    dispatch({type: "ADD", payload: e});
                                    ToastAndroid.show("เพิ่มสินค้าลงในตระกร้า", ToastAndroid.SHORT);
                                }}
                            />
                        )
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    gridView: {
      flex: 1,
    },
    emptyList: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center", 
        flexDirection: "row", 
        marginTop: "65%"
    }
});

export default TabHome;