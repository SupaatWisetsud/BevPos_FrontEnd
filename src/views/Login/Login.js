import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Form, Item, Input, Label, Button, Text, Spinner } from 'native-base';
import { useMutation } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { AuthContext } from '../../hook/context';

const MutationSignIn = gql`
    mutation signIn($username: String!, $password: String!){
        signIn(username: $username, password: $password) {
            type
            token
        }
    }
`;
const Login = ({
    navigation
}) => {
    
    const { signIn } = useContext(AuthContext);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [ todoSignIn, {loading, data} ] = useMutation(MutationSignIn);

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
            .then(async ({data: {signIn: { token }}}) => {
                if(token){
                    
                    signIn(token)
                }else{
                    alert("Username หรือ Password ของท่านไม่ถูกต้อง!");
                    setPassword("");
                }
            })
            .catch( error => alert("ไม่สามารถทำรายการได้..!!") );

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
                            {loading? 
                                <React.Fragment>
                                    <Spinner color="white" size={18} /> 
                                    <Text style={{fontSize: 16}}>loading..</Text>
                                </React.Fragment>
                                :
                                <Text>Sign in</Text>
                            }
                        </Button>
                    </View>
                    <View style={{paddingHorizontal: 10, alignItems: 'center'}}>
                        <Text onPress={e => navigation.navigate("Register")} style={{color: "#5DADE2", textDecorationLine: "underline"}}>สมัครสมาชิก</Text>
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
        padding: 18,
        flex: 1,
        backgroundColor: "white",
        marginHorizontal: 10,
        marginTop: -30, 
        borderRadius: 30
    },
    title: {
        flex: 1,
        backgroundColor: "#114b5f",
        height: 190,
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