import React, { useState } from 'react';
import { Dialog } from 'react-native-simple-dialogs';
import { View, Platform } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
 
const DESIRED_RATIO = "4:3";

export default function ScanBarcode({
    show = false,
    onClose = () => null,
    onChangeBarCode
}){
    const refCamera = React.useRef();
    const [ratio, setRtio] = useState("4:3");

    const prepareRatio = async () => {
        if (Platform.OS === 'android' && refCamera) {
            const ratios = await refCamera.current.getSupportedRatiosAsync();
            
            const ratio = ratios.find((ratio) => ratio === DESIRED_RATIO) || ratios[ratios.length - 1];

            setRtio(ratio);
        }
    }

    const onBarCodeRead = ({data, type}) => {
        if(type === "EAN_13"){
            onChangeBarCode(data)
        }
    }
    return (
        <Dialog
            visible={show}
            title="Scan Barcode"
            onTouchOutside={onClose}
            contentStyle={{height: 470,  justifyContent: "center", alignItems: "center"}}
        >
            <RNCamera
                ref={ refCamera }
                style={{position: "absolute", width: "100%", height: 100}}
                type="back"
                autoFocus="on"
                flashMode="off"
                ratio={ratio}
                onCameraReady={prepareRatio}
                onBarCodeRead={onBarCodeRead}
            >
                <BarcodeMask 
                    width={250} 
                    height={100} 
                    showAnimatedLine={false} 
                    backgroundColor="rbga(0,0,0,0)"
                />
            </RNCamera>
        </Dialog>
    )
}