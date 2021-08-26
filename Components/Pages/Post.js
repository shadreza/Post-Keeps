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
            alert('edit unsuccessful!')
          }
    }

    return (
        <View style={{margin:Sizes.md}}>
            {   
                allAndOnePostToggler[0]===false &&
                <TouchableOpacity onPress={() => allAndOnePostToggler[1](true)}>
                    {
                        author === null ?
                            <Text style={styles.backBtn}>Back</Text>
                            :
                            <Text style={styles.backBtn}>Discard Edit</Text>
                    }
                </TouchableOpacity>
            }
            {
                <View style={styles.postView}> 
                    <Text style={{textAlign: 'center'}}>Post by {info.authorName}</Text>
                    <Text></Text>
                    <Text style={{textAlign: 'center'}}>{info.message}</Text>
                    <Text></Text>
                    <Text style={{textAlign: 'center'}}>Posted on {info.time}</Text>

                    {
                        author === null ? 
                            <></>
                            :
                            <View>
                                <Text></Text>
                                <TouchableOpacity onPress={() => setEditOption(!editOption)}>
                                    {
                                        editOption === true ?
                                            <Text style={styles.blueBtn}>Edit</Text>
                                            :
                                            <Text>Cancel Edit</Text>
                                    }
                                </TouchableOpacity>
                                <Text></Text>
                                {
                                    editOption === true &&
                                        <TouchableOpacity onPress={deleteThePost} >
                                            <Text style={styles.redBtn}>Delete</Text>
                                        </TouchableOpacity>
                                }
                                
                                {
                                    editOption === false &&
                                        <View>
                                            <Text>Change your message bellow...</Text>
                                            <View>
                                                <TextInput style={styles.textInput} multiline={true} defaultValue={info.message} onChangeText={setEditedMessage} /> 
                                            </View>
                                            <View>
                                                <TouchableOpacity onPress={()=> updateEdit()}>
                                                    <Text style={styles.greenBtn}>Save Change</Text>
                                                </TouchableOpacity>
                                                <Text></Text>
                                                <TouchableOpacity onPress={()=> allAndOnePostToggler[1](true)}>
                                                    <Text style={styles.lavenderBtn}>Discard Change</Text>
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
    backBtn : {
        padding         : Sizes.md,
        backgroundColor : Color.black,
        color           : Color.white,
        textAlign       : 'center',
        fontSize        : Sizes.lg,
        borderRadius    : Sizes.lg,
        marginLeft : 'auto',
        marginRight : 'auto',
    },
    redBtn : {
        padding         : Sizes.md,
        backgroundColor : Color.redDeep,
        color           : Color.white,
        textAlign       : 'center',
        fontSize        : Sizes.lg,
        borderRadius    : Sizes.lg,
        marginLeft : 'auto',
        marginRight : 'auto',
    },
    blueBtn : {
        padding         : Sizes.md,
        backgroundColor : 'blue',
        color           : Color.white,
        textAlign       : 'center',
        fontSize        : Sizes.lg,
        borderRadius    : Sizes.lg,
        marginLeft : 'auto',
        marginRight : 'auto',
    },
    greenBtn : {
        padding         : Sizes.md,
        backgroundColor : Color.green,
        color           : Color.white,
        textAlign       : 'center',
        fontSize        : Sizes.lg,
        borderRadius    : Sizes.lg,
        marginLeft : 'auto',
        marginRight : 'auto',
    },
    lavenderBtn : {
        padding         : Sizes.md,
        backgroundColor : Color.lavender,
        color           : Color.black,
        textAlign       : 'center',
        fontSize        : Sizes.lg,
        borderRadius    : Sizes.lg,
        marginLeft : 'auto',
        marginRight : 'auto',
    },
    postView : {
        backgroundColor : Color.yellowLight, 
        borderRadius    : Sizes.md, 
        padding         : Sizes.lg, 
        marginTop       : Sizes.lg,
        minWidth        : 300,
    },
    textInput : {
        backgroundColor : Color.white, 
        fontSize        : Sizes.lg,
        padding         : Sizes.sm, 
        borderRadius    : Sizes.md,
        marginTop       : Sizes.lg,
        marginBottom    : Sizes.lg,
    }
});
