import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
import TabHome from './TabHome';
import TabBusket from './TabBusket';
import { Container, Header, Left, Button, Body, Title, Right, Tabs, Tab, TabHeading, Text } from 'native-base';
import ScanBarcode from '../../dialog/ScanBarcode';
import { SearchComponent } from '../../components';

const Home = ({
    navigation
}) => {

    const [toggleSearch, setToggleSearch] = React.useState(false);
    const [dialogScan, setDialogScan] = React.useState(false);

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
                    <Button transparent onPress={() => setToggleSearch(!toggleSearch)}>
                        <Icon name="search" size={18} color="white" />
                    </Button>
                </Right>
            </Header>
            
            <ScanBarcode
                show={dialogScan}
                onClose={e => setDialogScan(false)}
            />
            
            <SearchComponent 
                show={toggleSearch}
            />

            <Tabs 
                tabBarPosition="bottom"
            >
                <Tab 
                    heading={ 
                        <TabHeading style={{backgroundColor: "#566573"}} >
                            <Icon name="cubes" size={24} color="white" />
                            <Text style={{color: "white"}}>สินค้า</Text>
                        </TabHeading>}
                >
                    <TabHome />
                </Tab>
                <Tab 
                    heading={ 
                        <TabHeading style={{backgroundColor: "#566573"}}>
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