import React from 'react';
import { Container, Header, Left, Button, Body, Title, Right, Content } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';

import ModalAddProduct from './modal/ModalAddProduct';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { View } from 'react-native';
import { AuthContext } from '../../hook/context';
import ListStock from '../../components/ListStock/ListStock';

const QUERY = gql`
    query product($id: ID!){
        products(id: $id){
            type
            data {
                _id
                name
                cost
                price
                count
                count_alert
                barcode
                image
            }
        }
    }
`;
export default function Stock({
    navigation
}){
    
    const { loginState: { userProfile: { _id } } } = React.useContext(AuthContext);

    const {data, loading} = useQuery(QUERY, {
        variables: {id: _id}
    });

    const [modalVisible, setModalVisible] = React.useState(false);
    const [productsData, setProductsData] = React.useState([]);

    React.useEffect(() => {
        if(data){
            setProductsData(data.products.data);
            // console.log(data.products.data);
            
        }
    }, [data]);

    return (
        <Container style={{flex: 1}}>
            <Header style={{backgroundColor: "#1a936f"}} androidStatusBarColor="#4a7c59">
                <Left>
                    <Button transparent onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}>
                        <Icon name="bars" size={26} color="white" />
                    </Button>
                </Left>
                <Body>
                    <Title style={{fontWeight: "bold"}}>สต็อกสินค้า</Title>
                </Body>
                <Right>
                    <Button transparent onPress={e => setModalVisible(true)}>
                        <Icon name="plus-square" size={26} color="white" />
                    </Button>
                </Right>
            </Header>

            <ModalAddProduct show={modalVisible} onClose={e => setModalVisible(false)} />

            <View style={{flex: 1}}>
                <ListStock data={productsData} />
            </View>

        </Container>
    );
}