import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { db } from '../../firebase';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';

export default function Post({info, allAndOnePostToggler, author, allPosts}) {

    const updateFireStore = async () => {

        const collection = 'blogs'
        const docs = 'posts'
        const docRef = db.collection(collection).doc(docs);

        try {
            await db.runTransaction(async (t) => {

                const doc = await t.get(docRef)
                const data = doc.data().allPosts
                const newArray = data.filter(post => post.id !== info.id)
                t.update(docRef, {allPosts: newArray})
                allPosts[1](newArray)
            })
            alert('delete success!')
            allAndOnePostToggler[1](true)
          } catch (e) {
            // console.log('Update failure:');
            alert('delete unsuccess!')
          }
    }

    const deleteThePost = () => {
        updateFireStore()
    }

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

                    {
                        author === null ? 
                            <></>
                            :
                            <View>
                                <TouchableOpacity>
                                    <Text>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity >
                                    <Text onPress={deleteThePost} >Delete</Text>
                                </TouchableOpacity>
                            </View>
                    }

                </View>
                
            }
        </View>
    );
}

const styles = StyleSheet.create({
    
});
