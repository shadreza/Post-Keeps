import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';
import Post from './Post';

export default function AllPosts({data}) {

    return (
        <View>
            {
                data.map(post => (<Post info={post}/>))
            }
        </View>
    );
}

const styles = StyleSheet.create({
    
});
