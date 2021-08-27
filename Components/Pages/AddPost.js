import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { db } from '../../firebase';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';

export default function AddPost({user, toggler}) {

    const [message, setMessage] = useState('')

    const collection = 'blogs'
    const docs = 'posts'
    const docRef = db.collection(collection).doc(docs);

    const generateUniqueKey = () => {
        const d = new Date
        return d.getMilliseconds()
    }

    const getTime = () => {
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date+' '+time;
        return dateTime
    }

    const initializeFireStore = async () => {
        const data = [
            {
                id          : generateUniqueKey(),
                authorName  : user[0].displayName,
                authorId    : user[0].uid,
                authorEmail : user[0].email,
                message     : message,
                time        : getTime(),
            }
        ]
        const res = await db.collection(collection).doc(docs).set(data);
    }

    const updateFireStore = async () => {
        try {
            await db.runTransaction(async (t) => {

              const doc = await t.get(docRef)
              if (!doc.exists) {
                initializeFireStore()
                return 
              }
              const data = doc.data().allPosts
              const newData = {
                id          : generateUniqueKey(),
                authorName  : user[0].displayName,
                authorId    : user[0].uid,
                authorEmail : user[0].email,
                message     : message,
                time        : getTime(),
            }
              const newArray = [newData , ...data]
              t.update(docRef, {allPosts: newArray})
              toggler[1]('home')
            });
            setMessage('')
            alert('Posted Successful!');``
          } catch (e) {
                // console.log('Update failure:')
                // console.log(e)
                alert('Something went wrong while posting please try again.');
          }
    }

    return (
        <SafeAreaView>
            <TouchableOpacity onPress={()=>toggler[1]('home')}>
                {
                    message.length > 0 ? 
                        <Text style={styles.backBtn}>Cancel</Text>
                        :
                        <Text style={styles.backBtn}>Back</Text>
                }
                
            </TouchableOpacity>
            <SafeAreaView style={styles.addPostView}>
                <Text style={{fontSize : Sizes.lg, color : Color.white, textAlign : 'center', fontWeight:'bold'}}>{user[0].displayName}'s Message</Text>
                <View>
                    <TextInput style={styles.textInput} multiline={true} onChangeText={setMessage}/>
                </View>
                <TouchableOpacity onPress={updateFireStore}>
                    <Text style={styles.postBtn}>Post</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </SafeAreaView>
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
        marginLeft      : 'auto',
        marginRight     : 'auto',
    },
    postBtn : {
        padding         : Sizes.md,
        backgroundColor : Color.green,
        color           : Color.black,
        textAlign       : 'center',
        fontSize        : Sizes.lg,
        borderRadius    : Sizes.lg,
        marginLeft      : 'auto',
        marginRight     : 'auto',
    },
    addPostView : {
        marginTop       : Sizes.lg,
        padding         : Sizes.lg,
        backgroundColor : Color.lavender,
        borderRadius    : Sizes.lg,
        minWidth        : 300
    },
    textInput : {
        backgroundColor : Color.yellowLight, 
        fontSize        : Sizes.lg,
        padding         : Sizes.sm, 
        borderRadius    : Sizes.md,
        marginTop       : Sizes.lg,
        marginBottom    : Sizes.lg,
    }
});
