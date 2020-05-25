import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const MutationSignIn = gql`
    mutation signIn($username: String!, $password: String!){
        signIn(username: $username, password: $password) {
            type
            data {
                _id
                username
                password
                first_name
                last_name
                email
                number_phone
            }
        }
    }
`;
const Login = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [ todoSignIn ] = useMutation(MutationSignIn);

    const onSignIn = async () => {
        
        if( username.trim() !== "" 
            && password.trim() !== ""
            && username !== undefined
            && password !== undefined
        ){
            await todoSignIn({
                variables: {
                    username,
                    password
                }
            })
            .then(async ({data: {signIn: { data }}}) => {
                if(data){
                    alert("Login success");
                    await AsyncStorage.setItem('token', "value")
                }else{
                    alert("Username หรือ Password ของท่านไม่ถูกต้อง!");
                    setPassword("");
                }
            })
            .catch( error => alert("ไม่สามารถทำรายการได้..!!") );

            // setUsername("");
        }
    }

    return (
        <Container style={{backgroundColor: "#88d498"}}>

            <Content>
                <View style={styles.title}>
                    <Text style={styles.txtTitle}>Bev Pos</Text>
                </View>
                <Form style={styles.form}>
                    <Item floatingLabel last style={styles.item}>
                        <Label>Username</Label>
                        <Input 
                            onChangeText={e => setUsername(e)} 
                            value={username}
                        />
                    </Item>
                    <Item floatingLabel last style={styles.item}>
                        <Label>Password</Label>
                        <Input 
                            onChangeText={e => setPassword(e)}
                            value={password}
                            secureTextEntry 
                        />
                    </Item>
                    <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
                        <Button block danger onPress={onSignIn}>
                            <Text>Sign in</Text>
                        </Button>
                    </View>
                </Form>
            </Content>
        </Container>
    )
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    item: {
        padding: 10
    },
    form: {
        padding: 10,
        flex: 1,
    },
    title: {
        flex: 1,
        backgroundColor: "#114b5f",
        height: 190,
        borderBottomRightRadius: 45,
        borderBottomLeftRadius: 45,
        justifyContent: "center",
        alignItems: "center"
    },
    txtTitle: {
        fontSize: 44,
        color: "white",
        fontWeight: "bold"
    }
})