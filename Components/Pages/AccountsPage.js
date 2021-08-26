import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';
import Post from './Post';

export default function AccountsPage({user, data, toggler}) {

    const userName = user[0].displayName
    const userMail = user[0].email
    const userId   = user[0].uid

    const [showAllPostsOrNot, setShowAllPostsOrNot] = useState(true)
    const [focusedPost, setFocusedPost] = useState(null)

    const focusOnAPost = (post) => {
        setFocusedPost(post)
        setShowAllPostsOrNot(false)
    }

    return (
        <View>
            <TouchableOpacity onPress={() =>toggler[1]('home')}>
                <Text>Back</Text>
            </TouchableOpacity>
            <View>
                <Text>Name : {user[0].displayName}</Text>
                <Text>Email : {user[0].email}</Text>
                <Text></Text>
                {
                    showAllPostsOrNot === true ?
                       
                        <View>
                            <Text>All Your Posts</Text>
                            <View>
                                <ScrollView style={{height:550}}>
                                    {
                                        data.map(post => (
                                            post.authorEmail === userMail &&
                                            post.authorId === userId &&
                                            post.authorName === userName &&
                                            <TouchableOpacity onPress={()=>focusOnAPost(post)}>
                                                <Post info={post} allAndOnePostToggler={[showAllPostsOrNot,setShowAllPostsOrNot]}/>
                                            </TouchableOpacity>
                                        ))    
                                    }
                                </ScrollView>
                            </View>
                        </View>
                        :
                        <View>
                            <Post info={focusedPost} allAndOnePostToggler={[showAllPostsOrNot,setShowAllPostsOrNot]}/>
                        </View>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    
});
