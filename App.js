// @refresh
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import HomePage from './Components/Pages/HomePage';
import LandingPage from './Components/Pages/LandingPage';
import LoginPage from './Components/Pages/LoginPage';
import SignupPage from './Components/Pages/SignupPage';
import { db } from './firebase';
import {Color} from './Utilities/Colors/Color';
import {Sizes} from './Utilities/Sizes/Sizes';

export default function App() {

  const [onLandingPageOrNot, setOnLandingPageOrNot] = useState(true)
  const [logInOrSignUp, setLogInOrSignUp] = useState('login')

  const [user, setUser] = useState(null)
  const [toggleBetweenHomeAndOther, setToggleBetweenHomeAndOther] = useState('home')

  return (
    <View style={styles.container}>
      {
        onLandingPageOrNot === true ?
          <LandingPage toggler={[onLandingPageOrNot, setOnLandingPageOrNot]}/>
          :
          user === null ?
            logInOrSignUp === 'login' ?
              <LoginPage userSetter={[user, setUser]} logInAndSignUpToggler={[logInOrSignUp, setLogInOrSignUp]} />
              :
              <SignupPage logInAndSignUpToggler={[logInOrSignUp, setLogInOrSignUp]}/>
            :
            <HomePage user={[user, setUser]}/>
             
                      
      }
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.teal,
    paddingTop: Sizes.xxxlg,
    paddingBottom: Sizes.sm,
    paddingLeft: Sizes.sm,
    paddingRight: Sizes.sm,
  },
});
