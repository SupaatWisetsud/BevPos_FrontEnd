import React from 'react';
import { ConfirmDialog } from 'react-native-simple-dialogs';
import { Item, Label, Input } from 'native-base';

export default function ChangeNumber({
    show = false,
    onClose = () => null,
    onConfrim = () => null,
}){
    
    const [number, setNumber] = React.useState();

    return (
        <ConfirmDialog
            visible={show}
            title="Enter Number"
            onTouchOutside={onClose}
            positiveButton={{
                title: "YES",
                onPress: () => {
                    onConfrim(number);
                    onClose();
                }
            }}
            negativeButton={{
                title: "NO",
                onPress: () => {onClose()}
            }}
        >
            <Item 
                floatingLabel 
                style={{paddingVertical: 5}}
            >
                    <Label>Number</Label>
                    <Input 
                        autoFocus={true}
                        keyboardType="numeric"
                        onChangeText={text => setNumber(text)}
                    />
            </Item>
        </ConfirmDialog>
    )
}