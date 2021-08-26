import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';
import Post from './Post';

export default function AllPosts({data, toggler}) {

    const [showAllPostsOrNot, setShowAllPostsOrNot] = useState(true)
    const [focusedPost, setFocusedPost] = useState(null)

    console.log(data[0])

    const focusOnAPost = (post) => {
        setFocusedPost(post)
        setShowAllPostsOrNot(false)
    }

    return (
        <View>
            {

                data === undefined ? 
                    <View>
                        <Text>No Posts</Text>
                    </View> 
                    :
                    showAllPostsOrNot === true ? 
                        <View>
                            <View>
                                <TouchableOpacity onPress={() =>toggler[1]('home')}>
                                    <Text>Back</Text>
                                </TouchableOpacity>
                                <Text></Text>
                            </View>
                            <ScrollView style={{height:650}}>
                                {
                                    data.map(post => (
                                        <TouchableOpacity onPress={()=>focusOnAPost(post)}>
                                            <Post info={post} allAndOnePostToggler={[showAllPostsOrNot,setShowAllPostsOrNot]}/>
                                        </TouchableOpacity>
                                    ))    
                                }
                            </ScrollView>
                        </View>
                        :
                        <View>
                            <Text></Text>
                            {
                                data[0] !== undefined && <Post info={focusedPost} allAndOnePostToggler={[showAllPostsOrNot,setShowAllPostsOrNot]}/>
                            }
                        </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    
});
