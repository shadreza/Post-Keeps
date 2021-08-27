import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';
import Post from './Post';

export default function AllPosts({data, toggler}) {

    const [showAllPostsOrNot, setShowAllPostsOrNot] = useState(true)
    const [focusedPost, setFocusedPost] = useState(null)

    // console.log(data[0])

    const focusOnAPost = (post) => {
        setFocusedPost(post)
        setShowAllPostsOrNot(false)
    }

    return (
        <View style={styles.allPostContainer}>
            {

                data === undefined ? 
                    <View>
                        <Text>No Posts</Text>
                    </View> 
                    :
                    showAllPostsOrNot === true ? 
                        <View style={{ flex: 1}}>
                            <View style={{width: 'auto', alignItems: 'center', justifyContent: 'center'}}>
                                <TouchableOpacity onPress={() =>toggler[1]('home')}>
                                    <Text style={styles.backBtn}>Back</Text>
                                </TouchableOpacity>
                                <Text></Text>
                            </View>
                            <SafeAreaView style={{flex: 0.8, marginBottom:0,}}>
                                <ScrollView>
                                    <View style={{borderRadius:10,}}>
                                    {
                                        data.map(post => (
                                            <TouchableOpacity onPress={()=>focusOnAPost(post)}>
                                                <Post info={post} allAndOnePostToggler={[showAllPostsOrNot,setShowAllPostsOrNot]} author={null} allPosts={null}/>
                                            </TouchableOpacity>
                                        ))    
                                    }
                                    </View>
                                </ScrollView>
                            </SafeAreaView>
                        </View>
                        :
                        <View>
                            <Text></Text>
                            {
                                data[0] !== undefined && <Post info={focusedPost} allAndOnePostToggler={[showAllPostsOrNot,setShowAllPostsOrNot]} author={null} allPosts={null}/>
                            }
                        </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    allPostContainer : {
        justifyContent : 'center',
        alignItems : 'center',
    },
    backBtn : {
        padding         : Sizes.md,
        backgroundColor : Color.black,
        color           : Color.white,
        textAlign       : 'center',
        fontSize        : Sizes.lg,
        borderRadius    : Sizes.lg,
        marginLeft : 'auto',
        marginRight : 'auto',
    }
});
