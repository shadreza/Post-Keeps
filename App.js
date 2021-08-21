import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Color} from './Utilities/Colors/Color';

export default function App() {
  return (
    <View style={styles.container}>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.teal,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});
