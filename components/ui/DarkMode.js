import {StyleSheet, Text, View,Image} from 'react-native';
import React from 'react';

const DarkMode = () => {
  return (
    <Image
      source={require('../../assets/icons/dark.png')}
      style={{height: 40, width: 40, tintColor: '#f5dd4b'}}
    />
  );
};

export default DarkMode;

const styles = StyleSheet.create({});
