import React from 'react';
import { Modal, View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Button, Input, Content, H2, Item, Label, Picker } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { ReactNativeFile } from 'apollo-upload-client';

import ScanBarcode from '../../../dialog/ScanBarcode';
import { AuthContext } from '../../../hook/context';

const MUTATION = gql`
    mutation createProduct(
        $userID: ID!,
        $name: String!,
        $cost: Int,
        $price: Int,
        $count: Int,
        $count_alert: Int,
        $barcode: String,
        $image: Upload
    ){
        createProduct(input: {
            userID: $userID,
            name: $name,
            cost: $cost,
            price: $price,
            count: $count,
            count_alert: $count_alert,
            barcode: $barcode,
            image: $image,
        })
    }
`

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_DATA":
            return Object.assign({}, state, action.payload)
        default:
            return state;
    }
}
const initialState = {
    name: null,
    cost: null,
    price: null,
    count: null,
    count_alert: 5,
    image: null,
    barcode:null,
}

export default function ModalAddProduct({
    show = false,
    onClose,
}){

    const { loginState: {userProfile} } = React.useContext(AuthContext);
    
    const [dialogScan, setDialogScan] = React.useState(false);

    const [state, dispatch] = React.useReducer(reducer, initialState);
    const setData = React.useCallback((obj) => dispatch({type: "SET_DATA", payload: obj}), []);

    const [ todoCreateProduct ] = useMutation(MUTATION);

    const onSubmit = async () => {

        if(state.name.trim()){

            let variables = {
                userID: userProfile._id,
                name: state.name,
                cost: state.cost && parseInt(state.cost),
                price: state.price && parseInt(state.price),
                count: state.count && parseInt(state.count),
                count_alert: state.count_alert && parseInt(state.count_alert),
                barcode: state.barcode && state.barcode.toString(),
            }
            
            if(state.image){
                const picture = new ReactNativeFile({
                    uri: state.image.uri,
                    name: state.image.name,
                    type: state.image.type
                });
                variables = Object.assign({}, variables, {image: picture});
            }
            
            
            await todoCreateProduct({ variables, refetchQueries: ["product"] })
            .then(res => {
                if(res.data.createProduct){
                    setData(initialState);
                    onClose();
                }else{
                    alert("เกิดข้อผิดพลาด!");
                }
            })
            .catch(err => console.log(err))

        }
    }

    const onSelectImage = async () => {
        ImagePicker.showImagePicker({onData: true, title: 'Select Photo', mediaType: 'photo'}, (response) => {
            // console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
                
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                setData({image: {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName
                }})
            
            }
        });
    }

    if(dialogScan) return (
        <ScanBarcode 
            show={dialogScan} 
            onClose={e => setDialogScan(false)}
            onChangeBarCode={e => {
                setData({barcode: e});
                setDialogScan(false);
            }}
        />
    )

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={show}
            onRequestClose={() => {
                setData(initialState)
                onClose();
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={{position: "absolute", zIndex: 2, right: 0}}>
                        <Button small danger block style={{paddingHorizontal: 10}} onPress={() => {
                            setData(initialState);
                            onClose();
                        }}>
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
                                <Input placeholder="ชื่อสินค้า" 
                                    onChangeText={e => setData({name: e})}
                                    value={state?.name || null}
                                />
                            </Item>
                            <Item style={{marginTop: 20}}>
                                <Icon name="tags" size={28} />
                                <Input keyboardType="numeric" placeholder="ราคาต้นทุน" 
                                    onChangeText={e => setData({cost: e})}
                                    value={state?.cost || null}
                                />
                            </Item>
                            <Item style={{marginTop: 20}}>
                                <Icon name="money-bill-alt" size={28} />
                                <Input keyboardType="numeric" placeholder="ราคาขาย" 
                                    onChangeText={e => setData({price: e})}
                                    value={state?.price || null}
                                />
                            </Item>
                            <Item style={{marginTop: 20}}>
                                <Icon name="cubes" size={28} />
                                <Input keyboardType="numeric" placeholder="จำนวนสินค้า" 
                                    onChangeText={e => setData({count: e})}
                                    value={state?.count || null}
                                />
                            </Item>
                            <Item style={{marginTop: 20}}>
                                <Label>แจ้งเตือนเมื่อสินค้าน้อยกว่า: </Label>
                                <Picker
                                    note
                                    mode="dropdown"
                                    selectedValue={state?.count_alert || null}
                                    onValueChange={e => setData({count_alert: e})}
                                >
                                    <Picker.Item label="5" value={5} />
                                    <Picker.Item label="10" value={10} />
                                    <Picker.Item label="15" value={15} />
                                    <Picker.Item label="20" value={20} />
                                </Picker>
                            </Item>
                            <View style={{marginTop: 20}}>
                                <Text style={{marginBottom: 5}}>รูปสินค้า</Text>
                                {
                                    state.image?
                                    <View>
                                        <Button small danger block style={{position: "absolute", right: 0, paddingHorizontal: 10}} onPress={e => setData({image: null})}>
                                            <Icon name="times" color="white" />
                                        </Button>
                                        <Image 
                                            style={{width: "50%", height: 150}}
                                            source={{uri: state.image.uri}}
                                        />
                                    </View>
                                    :
                                    <Button info block onPress={onSelectImage}>
                                        <Text style={{fontSize: 18, color: "white"}}>Upload image</Text>
                                    </Button>
                                }
                            </View>
                            <Item style={{marginTop: 20}}>
                                <Icon name="barcode" size={28} />
                                <Input 
                                    placeholder="barcode" 
                                    onChangeText={e => setData({barcode: e})}
                                    value={state?.barcode || null}
                                    keyboardType="numeric"
                                />
                                <Button warning block style={{paddingHorizontal: 5}} onPress={e => setDialogScan(true)}>
                                    <Icon name="camera" size={28} />
                                </Button>
                            </Item>
                            <View style={{marginTop: 20, flexDirection: "row", justifyContent: "center"}}>
                                <Button success block style={{paddingHorizontal: 10, marginRight: 10}} onPress={onSubmit}> 
                                    <Text style={{fontSize: 18, color: "white"}}>บันทึก</Text>
                                </Button>
                                <Button danger block style={{paddingHorizontal: 10}} onPress={() => {
                                    setData(initialState);
                                    onClose();
                                }}>
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

