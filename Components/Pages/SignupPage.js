import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, SafeAreaView, TouchableOpacity } from 'react-native';
import {Color} from '../../Utilities/Colors/Color';
import { Sizes } from '../../Utilities/Sizes/Sizes';

export default function SignupPage({logInAndSignUpToggler}) {

    const logoImageURL = 'https://i.ibb.co/TW97Jry/1055661.png'

    const [inputFirstName, setInputFirstName] = useState('');
    const [inputLastName, setInputLastName] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [inputRePassword, setInputRePassword] = useState('');
    const [inputEmail, setInputEmail] = useState('');

    const handleSignUp = () => {

        // firebase user insertion

        // if successful login then go in the login page

    }

    return (
        <View style={styles.signUpPageContainer}>
            <View style={styles.tagLine}>
                <Image
                    source={{uri: logoImageURL}}
                    style={styles.logoImage}
                />
                <Text style={styles.tagLineText}>Wanna Become A Post Keeper?</Text>
            </View>
            <View  style={styles.inputView}>
                <SafeAreaView style={styles.inputSection}>
                    <Text style={styles.label}>first name</Text>
                    <TextInput
                        placeholder="enter your first name"
                        keyboardType="default"
                        style={styles.input}
                        onChangeText={setInputFirstName}
                        autoCompleteType={'name'}
                    />
                </SafeAreaView>
                <SafeAreaView style={styles.inputSection}>
                    <Text style={styles.label}>last name</Text>
                    <TextInput
                        placeholder="enter your last name"
                        keyboardType="default"
                        style={styles.input}
                        onChangeText={setInputLastName}
                        autoCompleteType={'name'}
                    />
                </SafeAreaView>
                <SafeAreaView style={styles.inputSection}>
                    <Text style={styles.label}>email</Text>
                    <TextInput
                        placeholder="enter your email"
                        keyboardType="email-address"
                        style={styles.input}
                        onChangeText={setInputEmail}
                        autoCompleteType={'email'}
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
                <SafeAreaView style={styles.inputSection}>
                    <Text style={styles.label}>re-enter password</Text>
                    <TextInput
                        placeholder="enter you password once more"
                        keyboardType="email-address"
                        style={styles.input}
                        onChangeText={setInputRePassword}
                        autoCompleteType={'password'}
                    />
                </SafeAreaView>
                <TouchableOpacity style={styles.signUpBtnView}>
                    <Text style={styles.signUpBtn}>Signup</Text>
                </TouchableOpacity>

                <View style={styles.signUpView}>
                    <Text>Already a post keeper?</Text>
                    <TouchableOpacity style={styles.logInBtn} onPress={() => logInAndSignUpToggler[1]('login')}>
                        <Text style={styles.signUpBtnText}>Click to login as post keeper.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
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
        marginLeft : Sizes.md,
    },
    signUpBtnView : {
        backgroundColor : Color.green,
        width           : Sizes.XLG,
        justifyContent  : 'center',
        alignItems      : 'center',
        borderRadius    : Sizes.md,
        marginLeft      : 'auto',
        marginRight     : 'auto',
        marginTop       : Sizes.xlg,
    },
    signUpBtn : {
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
    logInBtn : {
        marginLeft : Sizes.md,
    },
    signUpBtnText : {
        fontWeight : 'bold',
        color      : Color.lavender,
    }
});
