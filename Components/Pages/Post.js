import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { db } from '../../firebase';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';

export default function Post({info, allAndOnePostToggler, author, allPosts}) {

    const collection = 'blogs'
    const docs = 'posts'
    const docRef = db.collection(collection).doc(docs);

    const updateFireStore = async () => {

        try {
            await db.runTransaction(async (t) => {

                const doc = await t.get(docRef)
                const data = doc.data().allPosts
                const newArray = data.filter(post => post.id !== info.id)
                t.update(docRef, {allPosts: newArray})
                allPosts[1](newArray)
            })
            alert('delete successful!')
            allAndOnePostToggler[1](true)
          } catch (e) {
            // console.log('Update failure:');
            alert('delete unsuccessful!')
          }
    }

    const deleteThePost = () => {
        updateFireStore()
    }

    const [editOption, setEditOption] = useState(true)
    const [editedMessage, setEditedMessage] = useState('')

    const updateEdit = async () => {
        try {
            await db.runTransaction(async (t) => {
                const doc = await t.get(docRef)
                const data = doc.data().allPosts
                let newArr = data;
                newArr.forEach(post =>{
                    if (post.id === info.id && post.authorId === author.id && post.authorEmail === author.mail && post.authorName === author.name) {
                        post.message = editedMessage
                    }
                })
                t.update(docRef, {allPosts: newArr})
                allPosts[1](newArr)
            })
            alert('edit successful!')
            allAndOnePostToggler[1](true)
          } catch (e) {
            // console.log('Update failure:');
            alert('edit unsuccessful!')
          }
    }

    return (
        <View style={{padding:Sizes.lg, backgroundColor: Color.yellowLight, margin:Sizes.md}}>
            {   
                allAndOnePostToggler[0]===false &&
                <TouchableOpacity onPress={() => allAndOnePostToggler[1](true)}>
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
                                <TouchableOpacity onPress={() => setEditOption(!editOption)}>
                                    {
                                        editOption === true ?
                                            <Text>Edit</Text>
                                            :
                                            <Text>Cancel Edit</Text>
                                    }
                                </TouchableOpacity>
                                {
                                    editOption === true &&
                                        <TouchableOpacity onPress={deleteThePost} >
                                            <Text>Delete</Text>
                                        </TouchableOpacity>
                                }
                                
                                {
                                    editOption === false &&
                                        <View>
                                            <Text>Change your message bellow...</Text>
                                            <View>
                                                <TextInput multiline={true} defaultValue={info.message} onChangeText={setEditedMessage} /> 
                                            </View>
                                            <View>
                                                <TouchableOpacity onPress={()=> updateEdit()}>
                                                    <Text>Save Change</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={()=> allAndOnePostToggler[1](true)}>
                                                    <Text>Discard Change</Text>
                                                </TouchableOpacity>
                                            </View>
                                            
                                        </View>
                                }
                            </View>
                    }

                </View>
                
            }
        </View>
    );
}

const styles = StyleSheet.create({
    
});
