import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import Product from './Product';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { AuthContext } from '../../hook/context';
import { Spinner } from 'native-base';

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

const TabHome = ({
    navigation
}) => {

    const { loginState: { userProfile: { _id } } } = React.useContext(AuthContext);

    const { data, loading, refetch } = useQuery(QUERY, {
        variables: {id: _id}
    });
    
    const [ productData, setProductData ] = React.useState([]);

    React.useEffect(() => {
        refetch();
        if(data) setProductData(data.products.data);
    }, [data])

    if(loading){
        return (
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
                <Spinner />
            </View>
        )
    }

    return (
        <View style={{flex: 1}}>

            <View style={{flex: 1}}>
                <FlatGrid
                    itemDimension={130}
                    items={productData}
                    style={styles.gridView}
                    // staticDimension={300}
                    // fixed
                    spacing={15}
                    renderItem={({ item, index }) => <Product item={item} />}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    gridView: {
      flex: 1,
    },
});

export default TabHome;