import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { Button, Input, Content, H2, Item, Label } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ModalAddProduct({
    show = false,
    onClose
}){

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                alert("Modal has been closed.");
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Button 
                        danger 
                        small 
                        style={{position: "absolute", right: 0, paddingHorizontal: 10}}
                        onPress={onClose}
                    >
                        <Icon name="times" color="white" size={18} />
                    </Button>
                    <H2>เพิ่มสินค้า</H2>
                    <Item last style={{marginTop: 30}}>
                        <Icon name="home" size={28} />
                        <Input placeholder="ชื่อสินค้า" />
                    </Item>
                    <Item style={{marginTop: 20}}>
                        <Icon name="home" size={28} />
                        <Input keyboardType="numeric" placeholder="ราคา" />
                    </Item>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.3)"
    },
    modalView: {
        position: "relative",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 35,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

