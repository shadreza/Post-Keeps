// @refresh
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LandingPage from './Components/Pages/LandingPage';
import LoginPage from './Components/Pages/LoginPage';
import SignupPage from './Components/Pages/SignupPage';
import {Color} from './Utilities/Colors/Color';
import {Sizes} from './Utilities/Sizes/Sizes';

// import * as firebase from 'firebase'
// import 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: "AIzaSyC035-l-qMqkFD60_QRYqS3fADgJV8gbKA",
//   authDomain: "post-keeper.firebaseapp.com",
//   projectId: "post-keeper",
//   storageBucket: "post-keeper.appspot.com",
//   messagingSenderId: "550139856924",
//   appId: "1:550139856924:web:d6c95e7a5879ff3b8a77d9"
// };

// if (firebase.apps.length === 0) {
//   firebase.initializeApp(firebaseConfig)
// }


export default function App() {

  const [onLandingPageOrNot, setOnLandingPageOrNot] = useState(true)
  const [logInOrSignUp, setLogInOrSignUp] = useState('login')

  const [user, setUser] = useState({
    userName          : 'Post Keeper',
    userEmail         : 'PostKeeps@example.com',
    userPic           : '',
    userLoggedInOrNot : false,
  })

  return (
    <View style={styles.container}>
      {
        onLandingPageOrNot === true ?
          <LandingPage toggler={[onLandingPageOrNot, setOnLandingPageOrNot]}/>
          :
          user.userLoggedInOrNot === false ?
            logInOrSignUp === 'login' ?
              <LoginPage userSetter={[user, setUser]} logInAndSignUpToggler={[logInOrSignUp, setLogInOrSignUp]} />
              :
              <SignupPage logInAndSignUpToggler={[logInOrSignUp, setLogInOrSignUp]}/>
            :
            <Text>HomePage</Text>
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
