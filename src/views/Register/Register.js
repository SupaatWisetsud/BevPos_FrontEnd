import React from 'react';
import { Container, Content, Form, Item, Label, Input, Button, H2 } from 'native-base';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Register({
    navigation
}){

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
                            // onChangeText={e => setUsername(e)} 
                            // value={username}
                        />
                    </Item>
                    <Item floatingLabel last style={styles.item}>
                        <Label>Password</Label>
                        <Input 
                            // onChangeText={e => setPassword(e)}
                            // value={password}
                            secureTextEntry 
                        />
                    </Item>
                    <Item floatingLabel last style={styles.item}>
                        <Label>First name</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel last style={styles.item}>
                        <Label>Last name</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel last style={styles.item}>
                        <Label>Email</Label>
                        <Input />
                    </Item>
                    <Item floatingLabel last style={styles.item}>
                        <Label>Number phone</Label>
                        <Input />
                    </Item>
                    <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
                        <Button block success >
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
        padding: 10
    },
    form: {
        padding: 15,
        flex: 1,
        backgroundColor: "white",
        marginHorizontal: 10,
        marginTop: -30, 
        borderRadius: 5
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