import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import { Button, Input, Content, H2, Item, Label, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ScrollView } from 'react-native-gesture-handler';

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
                    <View style={{position: "absolute", zIndex: 10, right: 0}}>
                        <Button small danger block style={{paddingHorizontal: 10}} onPress={onClose}>
                            <Icon color="white" name="times" />
                        </Button>
                    </View>
                    <ScrollView>
                        <View style={{padding: 35}}>
                            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                                <H2>เพิ่มสินค้า</H2>
                            </View>
                            <Item last style={{marginTop: 30}}>
                                <Icon name="file-signature" size={28} />
                                <Input placeholder="ชื่อสินค้า" />
                            </Item>
                            <Item style={{marginTop: 20}}>
                                <Icon name="tags" size={28} />
                                <Input keyboardType="numeric" placeholder="ราคาต้นทุน" />
                            </Item>
                            <Item style={{marginTop: 20}}>
                                <Icon name="money-bill-alt" size={28} />
                                <Input keyboardType="numeric" placeholder="ราคาขาย" />
                            </Item>
                            <Item style={{marginTop: 20}}>
                                <Icon name="cubes" size={28} />
                                <Input keyboardType="numeric" placeholder="จำนวนสินค้า" />
                            </Item>
                            <Item style={{marginTop: 20}}>
                                <Label>แจ้งเตือนเมื่อสินค้าน้อยกว่า: </Label>
                                <Picker
                                    note
                                    mode="dropdown"
                                    // style={{ width: 120 }}
                                    // selectedValue={this.state.selected}
                                    // onValueChange={this.onValueChange.bind(this)}
                                >
                                    <Picker.Item label="5" value={5} />
                                    <Picker.Item label="10" value={10} />
                                    <Picker.Item label="15" value={15} />
                                    <Picker.Item label="20" value={20} />
                                </Picker>
                            </Item>
                            <View style={{marginTop: 20}}>
                                <Text style={{marginBottom: 5}}>รูปสินค้า</Text>
                                <Button info block>
                                    <Text style={{fontSize: 18, color: "white"}}>Upload image</Text>
                                </Button>
                            </View>
                            <Item style={{marginTop: 20}}>
                                <Icon name="barcode" size={28} />
                                <Input placeholder="barcode" />
                                <Button warning block style={{paddingHorizontal: 5}}>
                                    <Icon name="camera" size={28} />
                                </Button>
                            </Item>
                            <View style={{marginTop: 20, flexDirection: "row", justifyContent: "center"}}>
                                <Button success block style={{paddingHorizontal: 10, marginRight: 10}}> 
                                    <Text style={{fontSize: 18, color: "white"}}>บันทึก</Text>
                                </Button>
                                <Button danger block style={{paddingHorizontal: 10}} onPress={onClose}>
                                    <Text style={{fontSize: 18, color: "white"}}>ยกเลิก</Text>
                                </Button>
                            </View>
                        </View>
                    </ScrollView>
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

