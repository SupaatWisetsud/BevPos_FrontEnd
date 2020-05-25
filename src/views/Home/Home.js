import React, { useContext } from 'react';
import { Container, Text, Button } from 'native-base';
import { View } from 'react-native';
import { AuthContext } from '../../hook/context';

const Home = () => {

    const { signOut } = useContext(AuthContext);

    return (
        <Container style={{flex: 1}}>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Button onPress={signOut}>
                    <Text>Log Out</Text>
                </Button>
            </View>
        </Container>
    )
}

export default Home;