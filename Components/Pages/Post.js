import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';

export default function Post({info}) {

    return (
        <View>
            {
                <Text>{info.message}</Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    
});
