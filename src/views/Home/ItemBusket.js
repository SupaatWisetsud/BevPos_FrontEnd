import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { Button, Card } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../../hook/context';
export default ItemBusket = ({
    item,
    onUp = () => null,
    onDown = () => null,
    onRemove = () => null
}) => {

    const { loginState: { host } } = React.useContext(AuthContext);
    return (
        <Card style={styles.items}>
            <Button block danger small style={styles.remove} onPress={e => onRemove(item)}>
                <Icon name="times" color="white" />
            </Button>
            <Image 
                source={item.image? {uri: host + "/picture/product/" + item.image}:  require('../../assets/box.jpg')}
                style={{width: 120, height: 120, borderRadius: 5}}
            />
            <View style={{paddingHorizontal: 10}}>
                <Text style={{fontSize: 20, flex: 1}}>{item.name}</Text>
                <Text style={{fontSize: 18, flex: 1}}>ราคา: {item.price} ฿</Text>
                <View style={styles.descr}>
                    <Button small danger block style={styles.button} onPress={e => onDown(item)}>
                        <Text style={styles.txtBtn}> - </Text>
                    </Button>
                    <Text style={styles.count}>{item.busket_count}</Text>
                    <Button small success block style={styles.button} onPress={e => onUp(item)}>
                        <Text style={styles.txtBtn}> + </Text>
                    </Button>
                </View>
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    items: {
        backgroundColor: "white", 
        marginVertical: 3, 
        padding: 5, 
        flexDirection: "row",
    },
    remove: {
        paddingHorizontal: 10, 
        position: "absolute", 
        right: 0
    },
    descr: { 
        flexDirection: "row", 
        alignItems: "center", 
        paddingVertical: 5
    },
    button: {
        paddingHorizontal: 5
    },
    txtBtn: {color: "white"},
    count: {
        fontSize: 20, 
        marginHorizontal: 10
    }
})