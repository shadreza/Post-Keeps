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

    const updateFireStore = async () => {
        try {
            await db.runTransaction(async (t) => {

              const doc = await t.get(docRef)
              const data = doc.data().allPosts
              const newData = {
                id          : generateUniqueKey(),
                authorName  : user[0].displayName,
                authorEmail : user[0].email,
                message     : message,
                time        : getTime(),
            }
              const newArray = [...data, newData]
              t.update(docRef, {allPosts: newArray})

            });
            setMessage('')
            alert('Update success!');
          } catch (e) {
            console.log('Update failure:');
          }
    }

    return (
        <View>
            <TouchableOpacity onPress={()=>toggler[1]('home')}>
                <Text>Back</Text>
            </TouchableOpacity>
            <Text></Text>
            <Text>This message is gonna be from {user.displayName}</Text>
            <SafeAreaView>
                <TextInput multiline={true} onChangeText={setMessage}/>
            </SafeAreaView>
            <TouchableOpacity onPress={updateFireStore}>
                <Text>Post</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    
});
