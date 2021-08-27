import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';
import Post from './Post';

export default function AccountsPage({user, data, toggler}) {

    const userName = user[0].displayName
    const userMail = user[0].email
    const userId   = user[0].uid

    const author = {
        name : userName,
        mail : userMail,
        id   : userId,
    }

    const [showAllPostsOrNot, setShowAllPostsOrNot] = useState(true)
    const [focusedPost, setFocusedPost] = useState(null)
    const [showBackBtn, setShowBackBtn] = useState(true)

    const focusOnAPost = (post) => {
        setFocusedPost(post)
        setShowBackBtn(false)
        setShowAllPostsOrNot(false)
    }

    return (
        <View style={styles.allPostContainer}>
            {
                // showBackBtn === true &&
                <TouchableOpacity onPress={() =>toggler[1]('home')}>
                    <Text style={styles.backBtn}>Back</Text>
                </TouchableOpacity>
            }
            <View style={{ flex: 1}}>
                <Text style={{fontSize:Sizes.lg, textAlign:'center', fontWeight:'bold', color:Color.orange}}>{user[0].email}</Text>
                {
                    showAllPostsOrNot === true ?
                       
                        <View style={{ flex: 1}}>
                            <Text style={{fontSize:Sizes.lg, textAlign:'center', fontWeight:'bold'}}>All Your Posts</Text>
                            <SafeAreaView style={{flex: 0.78, marginTop:Sizes.md, padding:Sizes.lg}}>
                                <ScrollView >
                                    { 
                                        data[0].map(post => (
                                            post.authorEmail === userMail &&
                                            post.authorId === userId &&
                                            post.authorName === userName &&
                                            <View style={styles.posts}>
                                                <TouchableOpacity onPress={()=>focusOnAPost(post)} key={post.id}>
                                                    <View>
                                                        <Post info={post} allAndOnePostToggler={[showAllPostsOrNot,setShowAllPostsOrNot]} author={null} allPosts={null} />
                                                        <Text onPress={()=>focusOnAPost(post)} style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>Edit</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        ))    
                                    }
                                </ScrollView>
                            </SafeAreaView>
                        </View>
                        :
                        <View>
                            <Post info={focusedPost} allAndOnePostToggler={[showAllPostsOrNot,setShowAllPostsOrNot]} author={author} allPosts={data}/>
                        </View>
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    allPostContainer : {
        justifyContent : 'center',
        alignItems : 'center',
    },
    backBtn : {
        padding          : Sizes.md,
        backgroundColor  : Color.black,
        color            : Color.white,   
        fontSize         : Sizes.lg,
        borderRadius     : Sizes.lg, 
        margin           : Sizes.smd,
        textAlign        : 'center'
     },
     posts : {
        backgroundColor:Color.lavender,
        borderRadius : Sizes.lg,
        padding : Sizes.smd,
        margin : Sizes.smd,
    },
});
