import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TextInput, SafeAreaView, TouchableOpacity, ScrollView, FlatList } from 'react-native';
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
                            onChangeText={setInputFirstName}
                            autoCompleteType={'name'}
                        />
                    </View>
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>last name</Text>
                        <TextInput
                            placeholder="enter your last name"
                            keyboardType="default"
                            style={styles.input}
                            onChangeText={setInputLastName}
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
                    <View style={styles.inputSection}>
                        <Text style={styles.label}>re-enter password</Text>
                        <TextInput
                            placeholder="enter you password once more"
                            keyboardType="email-address"
                            style={styles.input}
                            onChangeText={setInputRePassword}
                            autoCompleteType={'password'}
                        />
                    </View>
                </ScrollView>
                <TouchableOpacity style={styles.signUpBtnView}>
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
        height  : 400,
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
        fontSize : Sizes.xxlg,
        marginBottom : Sizes.xxxlg,
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
