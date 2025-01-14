import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';


const LightMode = () => {
  return (
    <Image
      source={require('../../assets/icons/light.png')}
      style={{height: 40, width: 40, tintColor: '#f5dd4b'}}
    />
  );
};

export default LightMode;

const styles = StyleSheet.create({});
