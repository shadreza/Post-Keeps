import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';
import Post from './Post';

export default function AllPosts({data}) {

    const [showAllPostsOrNot, setShowAllPostsOrNot] = useState(true)
    const [focusedPost, setFocusedPost] = useState(null)

    const focusOnAPost = (post) => {
        setFocusedPost(post)
        setShowAllPostsOrNot(false)
    }

    return (
        <View>
            {

                showAllPostsOrNot === true ? 
                    <View>
                        {data.map(post => (
                            <TouchableOpacity onPress={()=>focusOnAPost(post)}>
                                <Post info={post} allAndOnePostToggler={[showAllPostsOrNot,setShowAllPostsOrNot]}/>
                            </TouchableOpacity>
                        ))    }
                    </View>
                    :
                    <View>
                        <Post info={focusedPost} allAndOnePostToggler={[showAllPostsOrNot,setShowAllPostsOrNot]}/>
                    </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    
});
