import React from 'react';
import { Container, Header, Left, Button, Body, Title, Right, Content, Card, CardItem } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/native';
import { View, Text, Dimensions } from 'react-native';

import { LineChart } from "react-native-chart-kit";

export default function Report({
    navigation
}){
    
    const screenWidth = Dimensions.get("window").width;

    return (
        <Container style={{flex: 1}}>
            <Header style={{backgroundColor: "#1a936f"}} androidStatusBarColor="#4a7c59">
                <Left>
                    <Button transparent onPress={() => {navigation.dispatch(DrawerActions.openDrawer())}}>
                        <Icon name="bars" size={26} color="white" />
                    </Button>
                </Left>
                <Body>
                    <Title style={{fontWeight: "bold"}}>รายงาน</Title>
                </Body>
                <Right></Right>
            </Header>

            <Content style={{flex: 1}}>
                <View style={{padding: 10}}>
                    
                    <Card>
                        <CardItem header style={{backgroundColor: "#3498DB"}}>
                            <Text style={{fontSize: 18, fontWeight: "bold", color: "white"}}>กำไรสุทธิ</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor: "#5DADE2"}}>
                            <Body style={{alignItems: "flex-end"}}>
                                <Text style={{fontSize: 18, fontWeight: "bold"}}> ฿ 100</Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header style={{backgroundColor: "#2ECC71"}}>
                            <Text style={{fontSize: 18, fontWeight: "bold", color: "white"}}>ยอดขาย</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor: "#58D68D"}}>
                            <Body style={{alignItems: "flex-end"}}>
                                <Text style={{fontSize: 18, fontWeight: "bold"}}> ฿ 100</Text>
                            </Body>
                        </CardItem>
                    </Card>

                    <Card>
                        <CardItem header style={{backgroundColor: "#A569BD"}}>
                            <Text style={{fontSize: 18, fontWeight: "bold", color: "white"}}>ต้นทุน</Text>
                        </CardItem>
                        <CardItem style={{backgroundColor: "#BB8FCE"}}>
                            <Body style={{alignItems: "flex-end"}}>
                                <Text style={{fontSize: 18, fontWeight: "bold"}}> ฿ 100</Text>
                            </Body>
                        </CardItem>
                    </Card>


                    <View style={{marginTop: 10}}>
                        <Text>Chart</Text>
                        <LineChart
                            data={{
                                labels: ["January", "February", "March", "April", "May", "June"],
                                datasets: [
                                    {
                                    data: [
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100,
                                        Math.random() * 100
                                    ]
                                    }
                                ]
                            }}
                            width={screenWidth - 20} // from react-native
                            height={220}
                            yAxisLabel="$"
                            yAxisSuffix="k"
                            yAxisInterval={1} // optional, defaults to 1
                            chartConfig={{
                                backgroundColor: "#566573", //transparent
                                backgroundGradientFrom: "#566573",
                                backgroundGradientTo: "#566573",
                                decimalPlaces: 2, // optional, defaults to 2dp
                                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                style: {
                                    borderRadius: 16,
                                },
                                propsForDots: {
                                    r: "6",
                                    strokeWidth: "3",
                                    stroke: "#52BE80"
                                }
                            }}
                            bezier
                            style={{
                                marginVertical: 8,
                                borderRadius: 5
                            }}
                        />
                    </View>
                </View>
            </Content>
        </Container>
    )
}