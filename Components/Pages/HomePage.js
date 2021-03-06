import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { db } from '../../firebase';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';
import AccountsPage from './AccountsPage';
import AddPost from './AddPost';
import AllPosts from './AllPosts';

export default function HomePage({user}) {

    const collection = 'blogs'
    const docs = 'posts'
    const docRef = db.collection(collection).doc(docs);

    const signOut = () => {
        user[1](null)
        alert('Signing Out')
    }

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
                message     : 'This is a first default message being sent',
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
            // console.log(allPosts);
            return allPosts
        }
    }

    const [onWhichPage, setOnWhichPage] = useState('home')
    const [allPosts, setAllPosts] = useState([])

    const loadDataAndGoToAnotherPage = (page) => {
        readFromFireStore()
        setOnWhichPage(page)
    }

    return (
        <View style={styles.homePageContainer}>

            <View>
                <Text style={styles.userName}>{user[0].displayName}</Text>
                <TouchableOpacity onPress={signOut}>
                    <Text style={styles.signBtn}>Sign out</Text>
                </TouchableOpacity>
            </View>

            {

                onWhichPage === 'home' ? 
                    <View>
                        <TouchableOpacity onPress={()=>{loadDataAndGoToAnotherPage('allPosts')}}>
                            <Text style={styles.btn}>View All Posts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{loadDataAndGoToAnotherPage('addPost')}}>
                            <Text style={styles.btn}>Add A New Posts</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{loadDataAndGoToAnotherPage('accountSettings')}}>
                            <Text style={styles.btn}>Account</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    onWhichPage === 'allPosts' ? 
                        <View>
                            <AllPosts data={allPosts} toggler={[onWhichPage, setOnWhichPage]}/>
                        </View>
                        :
                        onWhichPage === 'addPost' ?
                            <View>
                                <AddPost user={user} toggler={[onWhichPage, setOnWhichPage]}/>
                            </View>
                            : 
                            onWhichPage === 'accountSettings' ?
                                <View>
                                    <AccountsPage  user={user} toggler={[onWhichPage, setOnWhichPage]} data={[allPosts, setAllPosts]}/>
                                </View>
                                :
                                <View>
                                    <Text>We are in post keeps...</Text>
                                    <TouchableOpacity onPress={()=>setOnWhichPage('home')}>
                                        <Text>Go to home</Text>
                                    </TouchableOpacity>
                                </View>

            }


        </View>
        
    );
}

const styles = StyleSheet.create({
    homePageContainer : {
        justifyContent : 'center',
        alignItems     : 'center',
        paddingTop     : 100
    },
    userName : {
        fontWeight    :'bold',
        padding       : Sizes.md,
        fontSize      : Sizes.xxxlg,
        color         : Color.orange,
        marginLeft    : 'auto',    
        marginRight   : 'auto',    
    },
    btn : {
       padding          : Sizes.lg,
       backgroundColor  : Color.green,
       fontSize         : Sizes.lg,
       borderRadius     : Sizes.lg, 
       margin           : Sizes.lg,
       textAlign        : 'center'
    },
    signBtn : {
       padding          : Sizes.lg,
       backgroundColor  : Color.redDeep,
       fontSize         : Sizes.lg,
       borderRadius     : Sizes.lg, 
       margin           : Sizes.lg,
       textAlign        : 'center',
       color            : Color.white,
       fontWeight       : 'bold',
    },
});
