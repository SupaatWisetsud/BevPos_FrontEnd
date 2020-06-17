import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
import TabHome from './TabHome';
import TabBusket from './TabBusket';
import { Container, Header, Left, Button, Body, Title, Right, Tabs, Tab, TabHeading, Text } from 'native-base';
import ScanBarcode from '../../dialog/ScanBarcode';
import { SearchComponent } from '../../components';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { AuthContext } from '../../hook/context';
import { BusketContext } from '../../hook/busketContext';

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

const Home = ({
    navigation
}) => {

    const { loginState: { userProfile: { _id } } } = React.useContext(AuthContext);
    const { dispatch } = React.useContext(BusketContext);

    const [toggleSearch, setToggleSearch] = React.useState(false);
    const [dialogScan, setDialogScan] = React.useState(false);
    const [tabIndex, setTabIndex] = React.useState(0);

    const { data, loading, refetch } = useQuery(QUERY, {
        variables: {id: _id}
    });

    const [ productData, setProductData ] = React.useState([]);
    
    let unmout = false;
    React.useEffect(() => {
        
        if(data && !unmout) setProductData(data.products.data);
        
        return () => {
            unmout = true
        }

    }, [data])

    const onSearch = (txt) => {
        
        if(data){
            const deposit = data.products.data.filter(n => {
                const regex = new RegExp(`${txt}`);
                return regex.test(n.name);
            });

            setProductData(deposit);
        }        
        
    }

    return (
        <Container>
            <Header style={{backgroundColor: "#1a936f"}} androidStatusBarColor="#4a7c59">
                <Left>
                    <Button transparent onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}>
                        <Icon name="bars" size={26} color="white" />
                    </Button>
                </Left>
                <Body>
                    <Title style={{fontWeight: "bold"}}>หน้าหลัก</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => setDialogScan(true)}>
                        <Icon name="barcode" size={18} color="white" />
                    </Button>
                    {tabIndex === 0 && 
                        <Button transparent onPress={() => setToggleSearch(!toggleSearch)}>
                            <Icon name="search" size={18} color="white" />
                        </Button>
                    }
                </Right>
            </Header>
            
            <ScanBarcode
                show={dialogScan}
                onClose={e => setDialogScan(false)}
                onChangeBarCode={data => {
                    let dataScan = productData.find(n => n.barcode === data);
                    if(dataScan) {
                        dispatch({type: "ADD", payload: dataScan})
                        ToastAndroid.show("เพิ่มสินค้าลงในตระกร้า", ToastAndroid.SHORT);
                    }
                    else  ToastAndroid.show("หา Barcode สินค้านี้ไม่เจอ!", ToastAndroid.SHORT);
                    setDialogScan(false);
                }}
            />
            
            <SearchComponent 
                show={toggleSearch && tabIndex === 0}
                onChangeText={txt => onSearch(txt)}
            />

            <Tabs 
                tabBarPosition="bottom"
                onChangeTab={ ({i}) => setTabIndex(i)}
            >
                <Tab 
                    heading={ 
                        <TabHeading style={{backgroundColor: "#566573"}} >
                            <Icon name="cubes" size={24} color="white" />
                            <Text style={{color: "white"}}>สินค้า</Text>
                        </TabHeading>}
                >
                    <TabHome 
                        data={productData}
                        refetch={refetch}
                        loading={loading}
                    />
                </Tab>
                <Tab 
                    heading={ 
                        <TabHeading style={{backgroundColor: "#566573"}} >
                            <Icon name="shopping-basket" size={24} color="white" />
                            <Text style={{color: "white"}}>ตระกร้า</Text>
                        </TabHeading>
                    }
                >
                    <TabBusket />
                </Tab>
            </Tabs>
            

        </Container>
    )
}

export default Home;