import firebase from 'firebase';
import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { auth } from '../../firebase';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';

export default function LoginPage({userSetter , logInAndSignUpToggler}) {

    const logoImageURL = 'https://i.ibb.co/TW97Jry/1055661.png'
    // const googleImageURL = 'https://i.ibb.co/3WnH6M8/281764.png'

    const [inputUserEmail, setInputUserEmail] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    // const googleProvider = new firebase.auth.GoogleAuthProvider();

    const handleLogIn = () => {

        if(inputUserEmail.length <= 0) {
            alert('Please enter you username correctly')
            return
        } else if(inputPassword.length <= 0) {
            alert('Please enter you password correctly')
            return
        }

        auth.signInWithEmailAndPassword(inputUserEmail, inputPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                userSetter[1](user)
                // console.log(user.providerData)
                alert("Welcome PostKeeper")
                
            })
            .catch((error) => {
                // var errorMessage = error.message;
                // console.log(errorMessage);
                alert("Wrong Credentials")
            });

    }

    // const logInUsingGoogle = () => {
    //     auth.signInWithRedirect(googleProvider);
    //     auth
    //         .getRedirectResult()
    //         .then((result) => {
    //             if (result.credential) {
    //             /** @type {firebase.auth.OAuthCredential} */
    //             var credential = result.credential;

    //             // This gives you a Google Access Token. You can use it to access the Google API.
    //             var token = credential.accessToken;
    //             // ...
    //             }
    //             // The signed-in user info.
    //             var user = result.user;
    //         }).catch((error) => {
    //             // Handle Errors here.
    //             var errorCode = error.code;
    //             var errorMessage = error.message;
    //             // The email of the user's account used.
    //             var email = error.email;
    //             // The firebase.auth.AuthCredential type that was used.
    //             var credential = error.credential;
    //             // ...
    //         });
    // }

    return (
        <SafeAreaView style={styles.loginPageContainer}>
            <View style={styles.tagLine}>
                <Image
                    source={{uri: logoImageURL}}
                    style={styles.logoImage}
                />
                <Text style={styles.tagLineText}>Hello Post Keeper</Text>
                <Text style={styles.instruction}>Continue your mission by logging in</Text>
            </View>
            <SafeAreaView  style={styles.inputView}>
                <ScrollView>
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>email</Text>
                        <TextInput
                            placeholder="enter your email"
                            keyboardType="email-address"
                            style={styles.input}
                            onChangeText={setInputUserEmail}
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
                </ScrollView>
                <TouchableOpacity style={styles.logInBtnView} onPress={() => handleLogIn()}>
                    <Text style={styles.logInBtn} >Login</Text>
                </TouchableOpacity>
                <View style={styles.signUpView}>
                    <Text>Not a post keeper yet?</Text>
                    <TouchableOpacity style={styles.signUpBtn} onPress={() => logInAndSignUpToggler[1]('signup')}>
                        <Text style={styles.signUpBtnText}>Click to become a post keeper.</Text>
                    </TouchableOpacity>
                </View>
                {/* <View style={styles.otherLogin}>
                    <Text>Or Login using</Text>
                    <TouchableOpacity style={styles.signUpBtn} onPress={() => logInUsingGoogle()}>
                        <Image
                            source={{uri: googleImageURL}}
                            style={styles.googleImage}
                        />
                    </TouchableOpacity>
                </View> */}
            </SafeAreaView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loginPageContainer : {

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
        fontSize : Sizes.xxlg,
        marginBottom : Sizes.xlg,
    },
    inputView : {
        margin          : Sizes.lg,
    },
    inputSection : {
        backgroundColor : Color.yellowLight,
        borderRadius    : Sizes.md,
        margin          : Sizes.lg,
        padding         : Sizes.lg,
    },
    input: {
        fontSize     : Sizes.lg,
    },
    label : {
        fontSize   : Sizes.xlg,
    },
    logInBtnView : {
        backgroundColor : Color.lavender,
        width           : Sizes.XLG,
        justifyContent  : 'center',
        alignItems      : 'center',
        borderRadius    : Sizes.md,
        marginLeft      : 'auto',
        marginRight     : 'auto',
        marginTop       : Sizes.xlg,
    },
    logInBtn : {
        color      : Color.white,
        padding    : Sizes.md,
        fontSize   : Sizes.lg,
        fontWeight : 'bold',
    },
    signUpView : {
        flexDirection   : 'row',
        alignItems      : 'center',
        justifyContent  : 'center',
        marginTop       : Sizes.xlg,
    },
    signUpBtn : {
        marginLeft : Sizes.md,
    },
    signUpBtnText : {
        fontWeight : 'bold',
        color      : Color.orange,
    },
    otherLogin : {
        justifyContent : 'center',
        alignItems : 'center',
        marginTop : Sizes.lg,
        padding : Sizes.md,
    },
    googleImage : {
        width     : Sizes.xxlg,
        height    : Sizes.xxlg,
        marginTop : Sizes.md,
    },
    instruction : {
        fontWeight   : 'bold', 
        color        : Color.lavender, 
        fontSize     :Sizes.lg, 
        marginBottom : Sizes.lg
    },
});
