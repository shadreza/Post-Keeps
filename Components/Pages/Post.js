import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';

export default function Post({info, allAndOnePostToggler}) {

    return (
        <View style={{padding:Sizes.lg, backgroundColor: Color.yellowLight, margin:Sizes.md}}>
            {   
                allAndOnePostToggler[0]===false &&
                <TouchableOpacity onPress={() =>allAndOnePostToggler[1](true)}>
                    <Text>Back</Text>
                </TouchableOpacity>
            }
            {
                <View> 
                    <Text>Post by {info.authorName}</Text>
                    <Text></Text>
                    <Text>{info.message}</Text>
                    <Text></Text>
                    <Text>Posted on {info.time}</Text>
                </View>
                
            }
        </View>
    );
}

const styles = StyleSheet.create({
    
});
