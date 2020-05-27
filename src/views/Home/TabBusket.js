import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { BusketContext } from '../../hook/busketContext';
import { Button } from 'native-base';
import ItemBusket from './ItemBusket';

const TabBusket = ({
    navigation
}) => {
    
    const { state, dispatch } = React.useContext(BusketContext);

    return (
        <View style={{flex: 1}}>
            <View style={styles.total}>
                <Text style={styles.txtTotal}>ยอดรวม ฿: 1080 </Text>
                <View style={{flexDirection: "row"}}>
                    <Button block success style={{paddingHorizontal: 10, marginRight: 10}}>
                        <Text style={{fontWeight: "bold", color: "#fff"}}>ชำระ</Text>
                    </Button>
                    <Button block danger style={{paddingHorizontal: 10}} onPress={e => dispatch({type: "REMOVE_ALL"})} >
                        <Text style={{fontWeight: "bold", color: "#fff"}}>ยกเลิก</Text>
                    </Button>
                </View>
            </View>
            <ScrollView>
                <View style={{paddingHorizontal: 10}}>
                    {state && state.map((item, index) => (
                        <ItemBusket 
                            key={index}
                            item={item}
                            onUp={e => dispatch({type: "ADD", payload: e})}
                            onDown={e => dispatch({type: "DOWN", payload: e})}
                            onRemove={e => dispatch({type: "REMOVE", payload: e})}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    )
}

export default TabBusket;

const styles = StyleSheet.create({
    total: {
        backgroundColor: "#34495E", 
        margin: 10, 
        padding: 10, 
        justifyContent: "space-between", 
        flexDirection: "row", 
        alignItems: "center"
    },
    txtTotal: {
        color: "white", 
        fontSize: 18, 
        fontWeight: "bold"
    }
})