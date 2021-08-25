import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { db } from '../../firebase';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';
import AllPosts from './AllPosts';

export default function HomePage({user}) {

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
                authorName  : 'Shad Reza',
                authorEmail : 'shadreza@gmail.com',
                message     : 'This is the first default message being sent',
                time        : getTime(),
            }
        ]
        const res = await db.collection(collection).doc(docs).set(data);
    }

    const readFromFireStore = async () => {
        const doc = await docRef.get();
        if (!doc.exists) {
            alert('No  blogs set yet')
            initializeFireStore()
            return allPosts
        } else {
            setAllPosts(doc.data().allPosts)
            console.log(allPosts);
            return allPosts
        }
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
                message     : 'This is the second default message being sent',
                time        : getTime(),
            }
              const newArray = [...data, newData]
              t.update(docRef, {allPosts: newArray})

            });
          
            alert('Update success!');
          } catch (e) {
            console.log('Update failure:');
          }
    }

    const [onWhichPage, setOnWhichPage] = useState('home')
    const [allPosts, setAllPosts] = useState([])

    const loadDataAndToggleToAllPosts = () => {
        readFromFireStore()
        setOnWhichPage('allPosts')
    }

    return (
        <View>

            <Text style={{fontWeight:'bold'}}>{user[0].displayName}</Text>

            {

                onWhichPage === 'home' ? 
                    <View>
                        <TouchableOpacity onPress={loadDataAndToggleToAllPosts}>
                            <Text>View All Posts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={updateFireStore}>
                            <Text>Add A New Posts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>Update Your Posts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text>Account</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    onWhichPage === 'allPosts' ? 
                        <View>
                            <AllPosts data={allPosts} />
                        </View>
                        :
                        onWhichPage === 'addPost' ?
                            <View>
                                <Text>addPost</Text>
                            </View>
                            : 
                            onWhichPage === 'updatePost' ?
                                <View>
                                    <Text>update</Text>
                                </View>
                                : 
                                <View>
                                    <Text>Acc</Text>
                                </View>

            }


        </View>
        
    );
}

const styles = StyleSheet.create({
    
});
