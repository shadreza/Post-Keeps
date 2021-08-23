import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';

export default function LoginPage({userSetter , logInAndSignUpToggler}) {

    const logoImageURL = 'https://i.ibb.co/TW97Jry/1055661.png'

    const [inputUserName, setInputUserName] = useState('');
    const [inputPassword, setInputPassword] = useState('');

    const handleLogIn = () => {

        if(inputUserName.trim.length <= 0 || inputUserName === null || inputUserName === undefined) {
            alert('Please enter you username correctly')
        } else if(inputPassword.trim.length <= 0 || inputPassword === null || inputPassword === undefined) {
            alert('Please enter you password correctly')
        }

        // firebase authentication

        // if successful login then go in the main homepage

    }

    return (
        <View style={styles.loginPageContainer}>
            <View style={styles.tagLine}>
                <Image
                    source={{uri: logoImageURL}}
                    style={styles.logoImage}
                />
                <Text style={styles.tagLineText}>Hello Post Keeper</Text>
            </View>
            <View  style={styles.inputView}>
                <SafeAreaView style={styles.inputSection}>
                    <Text style={styles.label}>user name</Text>
                    <TextInput
                        placeholder="enter your username"
                        keyboardType="email-address"
                        style={styles.input}
                        onChangeText={setInputUserName}
                        autoCompleteType={'username'}
                    />
                </SafeAreaView>
                <SafeAreaView style={styles.inputSection}>
                    <Text style={styles.label}>password</Text>
                    <TextInput
                        placeholder="enter you password"
                        keyboardType="email-address"
                        style={styles.input}
                        onChangeText={setInputPassword}
                        autoCompleteType={'password'}
                    />
                </SafeAreaView>
                <TouchableOpacity style={styles.logInBtnView}>
                    <Text style={styles.logInBtn} >Login</Text>
                </TouchableOpacity>
                <View style={styles.signUpView}>
                    <Text>Not a post keeper yet?</Text>
                    <TouchableOpacity style={styles.signUpBtn} onPress={() => logInAndSignUpToggler[1]('signup')}>
                        <Text style={styles.signUpBtnText}>Click to become a post keeper.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
        marginBottom : Sizes.xxxlg,
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
        padding : Sizes.lg,
        outlineStyle : 'none',
    },
    label : {
        fontSize   : Sizes.xlg,
        marginLeft : Sizes.lg,
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
    }
});
