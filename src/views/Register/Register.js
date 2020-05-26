import React from 'react';
import { Container, Content, Form, Item, Label, Input, Button, H2 } from 'native-base';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { ReactNativeFile } from 'apollo-upload-client';

const MUTATION = gql`
    mutation createUser(
        $username: String!,
        $password: String!,
        $first_name: String!,
        $last_name: String!,
        $email: String!,
        $number_phone: String!,
        $image: Upload,
    ) {
        createUser(input: {
            username: $username,
            password: $password,
            first_name: $first_name,
            last_name: $last_name,
            email: $email,
            number_phone: $number_phone,
            image: $image,
        })
    }
`;
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_DATA":
            return Object.assign({}, state, action.payload)
        default:
            return state;
    }
}
const initialState = {
    username: null,
    password: null,
    first_name: null,
    last_name: null,
    image: null,
    email:null,
    number_phone:null,
}

export default function Register({
    navigation
}){

    const [state, dispatch] = React.useReducer(reducer, initialState);
    const setData = React.useCallback((obj) => dispatch({type: "SET_DATA", payload: obj}), []);

    const [ todoCreateUser ] = useMutation(MUTATION);

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

    const onSubmit = async () => {
        if(state.username.trim() 
        && state.password.trim()
        && state.first_name.trim()
        && state.last_name.trim()
        && state.email.trim()
        && state.number_phone
        ){
            let variables = {
                username: state.username,
                password: state.password,
                first_name: state.first_name,
                last_name: state.last_name,
                email: state.email,
                number_phone: state.number_phone,
            }
            
            if(state.image){
                const picture = new ReactNativeFile({
                    uri: state.image.uri,
                    name: state.image.name,
                    type: state.image.type
                });
                variables = Object.assign({}, variables, {image: picture});
            }
            
            await todoCreateUser({ variables })
            .then(res => {
                if(res.data.createUser){
                    setData(initialState);
                    navigation.goBack();
                }else{
                    alert("เกิดข้อผิดพลาด!");
                }
            })
            .catch(err => console.log(err))
        }
    }

    return (
        <Container style={{backgroundColor: "#88d498"}}>

            <Content>
                <View style={styles.title}>
                    <Text style={styles.txtTitle}>Bev Pos</Text>
                </View>
                <Form style={styles.form}>
                    <View style={{paddingHorizontal: 10, paddingVertical: 20, flexDirection: "row", alignItems: "center"}}>
                        <Button small danger style={{paddingHorizontal: 10, marginRight: 8}} onPress={e => navigation.goBack()}>
                            <Icon name="arrow-left" color="white" size={18} />
                        </Button>
                        <H2>สมัครสมาชิก BevPos</H2>
                    </View>
                    <Item floatingLabel last style={styles.item}>
                        <Label>Username</Label>
                        <Input 
                            onChangeText={e => setData({username: e})} 
                            value={state?.username || null}
                        />
                    </Item>
                    <Item floatingLabel last style={styles.item}>
                        <Label>Password</Label>
                        <Input 
                            onChangeText={e => setData({password: e})}
                            value={state?.password || null}
                            secureTextEntry 
                        />
                    </Item>
                    <Item floatingLabel last style={styles.item}>
                        <Label>First name</Label>
                        <Input 
                            onChangeText={e => setData({first_name: e})}
                            value={state?.first_name || null }
                        />
                    </Item>
                    <Item floatingLabel last style={styles.item}>
                        <Label>Last name</Label>
                        <Input 
                            onChangeText={e => setData({last_name: e})}
                            value={state?.last_name || null}
                        />
                    </Item>
                    <Item floatingLabel last style={styles.item}>
                        <Label>Email</Label>
                        <Input 
                            onChangeText={e => setData({email: e})}
                            value={state?.email}
                        />
                    </Item>
                    <View style={[styles.item]}>
                        <Text style={{paddingHorizontal: 5, paddingVertical: 10}}>Profile</Text>
                        {
                            state.image ?
                            <Image 
                                style={{width: "50%", height: 150}}
                                source={{uri: state.image.uri}}
                            />:
                            <Button info block onPress={onSelectImage}>
                                <Text style={{color: "white"}}>Upload Image</Text>
                            </Button>
                        }
                    </View>
                    <Item floatingLabel last style={styles.item}>
                        <Label>Number phone</Label>
                        <Input 
                            onChangeText={e => setData({number_phone: e})}
                            value={state?.number_phone}
                            keyboardType="numeric"
                            maxLength={10}
                        />
                    </Item>

                    <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
                        <Button block success onPress={onSubmit}>
                            <Text style={{color: "white", fontSize: 22}}>สมัครสมาชิก</Text>
                        </Button>
                    </View>
                </Form>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        padding: 10,
    },
    form: {
        padding: 15,
        flex: 1,
        backgroundColor: "white",
        marginHorizontal: 10,
        marginTop: -30, 
        marginBottom: 10,
        borderRadius: 5
    },
    title: {
        flex: 1,
        backgroundColor: "#114b5f",
        height: 130,
        borderBottomRightRadius: 85,
        justifyContent: "center",
        alignItems: "center"
    },
    txtTitle: {
        fontSize: 44,
        color: "white",
        fontWeight: "bold"
    }
})