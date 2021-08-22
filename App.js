import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import LandingPage from './Components/Pages/LandingPage';
import {Color} from './Utilities/Colors/Color';
import {Sizes} from './Utilities/Sizes/Sizes';

export default function App() {

  const [onLandingPageOrNot, setOnLandingPageOrNot] = useState(true)

  return (
    <View style={styles.container}>
      {
        onLandingPageOrNot === true ?
          <LandingPage toggler={[onLandingPageOrNot, setOnLandingPageOrNot]}/>
          :
          <Text>Here there is gonna be a homepage</Text>
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
