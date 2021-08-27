import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { auth } from '../../firebase';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';

export default function SignupPage({logInAndSignUpToggler}) {

    const logoImageURL = 'https://i.ibb.co/TW97Jry/1055661.png'

    const [inputName, setInputName] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputEmail, setInputEmail] = useState('');

    const handleSignUp = () => {

        auth.createUserWithEmailAndPassword(inputEmail, inputPassword)
            .then((userCredential) => {
            // Signed in 
                const user = userCredential.user
                user.updateProfile({
                    displayName: inputName,
                    photoURL: "https://i.ibb.co/KjtmZdH/shad-pic-removebg-preview.png"
                }).then(() => {
                    alert('Successfully signed up. Please log in now!')
                    logInAndSignUpToggler[1]('login')
                }).catch((error) => {
                    const  errorMessage = error.message;
                });  
            })
            .catch((error) => {
                const  errorMessage = error.message;
                alert('Something went wrong in creating the account. Try later!')
                logInAndSignUpToggler[1]('login')
            });

    }

    return (
        <SafeAreaView style={styles.signUpPageContainer}>
            <View style={styles.tagLine}>
                <Image
                    source={{uri: logoImageURL}}
                    style={styles.logoImage}
                />
                <Text style={styles.tagLineText}>Wanna Become A Post Keeper?</Text>
                <Text style={styles.instruction}>Just fill these stuff and then you are ready to go!</Text>
            </View>
            <SafeAreaView>
                <ScrollView style={styles.scrollViews}>
                    <View style={styles.inputSection}>  
                        <Text style={styles.label}>first name</Text>
                        <TextInput
                            placeholder="enter your first name"
                            keyboardType="default"
                            style={styles.input}
                            onChangeText={setInputName}
                            autoCompleteType={'name'}
                        />
                    </View>
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>email</Text>
                        <TextInput
                            placeholder="enter your email"
                            keyboardType="email-address"
                            style={styles.input}
                            onChangeText={setInputEmail}
                            autoCompleteType={'email'}
                        />
                    </View>
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>password</Text>
                        <TextInput
                            placeholder="enter you password"
                            keyboardType="email-address"
                            style={styles.input}
                            onChangeText={setInputPassword}
                            autoCompleteType={'password'}
                        />
                    </View>
                    {/* <View style={styles.inputSection}>
                        <Text style={styles.label}>re-enter password</Text>
                        <TextInput
                            placeholder="enter you password once more"
                            keyboardType="email-address"
                            style={styles.input}
                            onChangeText={setInputRePassword}
                            autoCompleteType={'password'}
                        />
                    </View> */}
                </ScrollView>
                <TouchableOpacity style={styles.signUpBtnView} onPress={()=>handleSignUp()}>
                    <Text style={styles.signUpBtn}>Signup</Text>
                </TouchableOpacity>

                <View style={styles.signUpView}>
                    <Text>Already a post keeper?</Text>
                    <TouchableOpacity style={styles.logInBtn} onPress={() => logInAndSignUpToggler[1]('login')}>
                        <Text style={styles.signUpBtnText}>Click to login as post keeper.</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    scrollViews : {
        height  : 260,
        padding : Sizes.lg
    },
    signUpPageContainer : {
        marginBottom : Sizes.XLG,
    },
    logoImage : {
        width  : Sizes.XLG,
        height : Sizes.XLG,
        marginTop : Sizes.XLG,
        marginBottom : Sizes.xxxlg,
    },
    tagLine : {
        justifyContent : 'center',
        alignItems     : 'center',
    }, 
    tagLineText : {
        fontSize     : Sizes.xxlg,
        marginBottom : Sizes.xxxlg,
        textAlign    : 'center',
    },
    inputSection : {
        backgroundColor : Color.yellowLight,
        borderRadius    : Sizes.md,
        margin          : Sizes.smd,
        padding         : Sizes.smd,
    },
    input: {
        fontSize     : Sizes.lg,
    },
    label : {
        fontSize   : Sizes.xlg,
    },
    signUpBtnView : {
        backgroundColor : Color.green,
        width           : Sizes.XXLG,
        justifyContent  : 'center',
        alignItems      : 'center',
        borderRadius    : Sizes.md,
        marginLeft      : 'auto',
        marginRight     : 'auto',
        marginTop       : Sizes.XLG,
    },
    signUpBtn : {
        color      : Color.white,
        padding    : Sizes.smd,
        fontSize   : Sizes.lg,
        fontWeight : 'bold',
    },
    signUpView : {
        flexDirection   : 'row',
        alignItems      : 'center',
        justifyContent  : 'center',
        marginTop       : Sizes.xlg,
    },
    logInBtn : {
        marginLeft : Sizes.md,
    },
    signUpBtnText : {
        fontWeight : 'bold',
        color      : Color.lavender,
    }, 
    instruction : {
        fontWeight   : 'bold', 
        color        : Color.orange, 
        fontSize     :Sizes.lg, 
        marginBottom : Sizes.lg
    },
});
