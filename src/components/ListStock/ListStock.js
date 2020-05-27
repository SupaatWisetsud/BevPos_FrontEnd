import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button } from 'native-base';
import { AuthContext } from '../../hook/context';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const MUTATION = gql`
    mutation removeProduct($id: ID!) {
        removeProduct(id: $id)
    }
`;

export default function ListStock({
    data = []
}){
    
    const [ todoRemoveProduct ] = useMutation(MUTATION);

    const { loginState: {host} } = React.useContext(AuthContext);
    let dataMapKey = data.map((n, index) => ({...n, key: index.toString()}));
    
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const onDelete = async (id, rowMap, key) => {
        
        closeRow(rowMap, key);

        await todoRemoveProduct({
            variables: {id},
            refetchQueries: ["product"]
        })
        .catch(err => console.log(err));
    }

    if(data[0] === undefined){
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center", flexDirection: 'row'}}>
                <Icon name="sticky-note" size={18} style={{fontWeight: "bold", marginRight: 5}} />
                <Text style={{fontSize: 18, fontWeight: "bold"}}>ไม่มีข้อมูล</Text>
            </View>
        )
    }
    
    return (
        <View style={{flex: 1}}>
            <SwipeListView
                data={dataMapKey}
                renderItem={ ({item}, rowMap) => (
                    <View style={styles.rowItem}>
                        {(item.count < item.count_alert && item.count !== null) &&  <Text style={styles.alert}>สินค้าใกล้หมดแล้ว</Text>}
                        {(item.count === null) &&  <Text style={styles.alert}>สินค้าหมดแล้ว</Text>}
                        <Image 
                            source={item.image? {uri: host + "/picture/product/" + item.image}: require('../../assets/box.jpg')}
                            style={styles.imageItem}
                        />
                        <View style={{paddingHorizontal: 10, flex: 1}}>
                            <Text numberOfLines={1} style={styles.text}>
                                <Text style={styles.b}>ชื่อสินค้า:</Text> {item.name}
                            </Text>
                            <Text numberOfLines={1} style={styles.text}>
                                <Text style={styles.b}>ราคาต้นทุน:</Text> {item.cost || "ไม่ระบุ"}
                            </Text>
                            <Text numberOfLines={1} style={styles.text}>
                                <Text style={styles.b}>ราคาขาย:</Text> {item.price || "ไม่ระบุ"}
                            </Text>
                            <Text numberOfLines={1} style={styles.text}>
                                <Text style={styles.b}>จำนวน:</Text> {item.count || 0}
                            </Text>
                            <Text numberOfLines={1} style={styles.text}>
                                <Text style={styles.b}>แจ้งเตือนเมื่อน้อยกว่า:</Text> {item.count_alert || 0}
                            </Text>
                        </View>
                    </View>
                )}
                renderHiddenItem={ ({item}, rowMap) => (
                    <View style={styles.rowBack}>
                        <Button info style={[styles.button]}>
                            <Icon name="edit" color="white" size={24} />
                        </Button>
                        <Button danger style={[styles.button]} onPress={e => onDelete(item._id, rowMap, item.key)}>
                            <Icon name="trash" color="white" size={24} />
                        </Button>
                    </View>
                )}
                leftOpenValue={60}
                rightOpenValue={-60}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    rowBack: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
        height: 116.9
    },
    rowItem: {
        flex: 1,
        backgroundColor: "#566573",
        padding: 10,
        margin: 10,
        flexDirection: "row",
        borderRadius: 0
    },
    text: {
        fontSize: 14,
        marginVertical: 2,
        color: "#F2F4F4"
    },
    b: {
        fontWeight: "bold"
    },
    alert: {
        backgroundColor: "#CD6155", 
        position: "absolute", 
        zIndex: 5, 
        left: -34, 
        top: 28, 
        paddingVertical: 5,
        paddingHorizontal: 32, 
        color: "white",
        borderBottomColor: "#C0392B",
        borderBottomWidth: 2,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        transform: [{rotate:"-40deg"}]
    },
    button: {
        padding: 20, 
        height: "120%"
    },
    imageItem: {width: 120, height: 120, borderRadius: 5}
})