import React from 'react';
import { View } from 'react-native';
import { Item, Input } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';

const SearchComponent = ({
    show = false,
    onChangeText = () => null
}) => {

    if(!show) return null;

    return (
        <View 
        style={{
            marginHorizontal: 10, 
            padding: 10, 
            flexDirection: "row", 
            justifyContent: "center", 
            alignItems: "center",
        }}>
            <Item regular style={{paddingHorizontal: 10}}>
                <Icon name="search" size={18} />
                <Input 
                    placeholder="Search"  
                    onChangeText={txt => onChangeText(txt)}
                />
            </Item>
        </View>
    );
}

export default SearchComponent