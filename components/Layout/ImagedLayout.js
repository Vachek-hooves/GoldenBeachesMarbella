import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {Image} from 'react-native-svg';

const ImagedLayout = ({children}) => {
  return (
    <ImageBackground
      style={styles.image}
      source={require('../../assets/images/bg.png')}>
      <SafeAreaView style={styles.safeArea}>{children}</SafeAreaView>
    </ImageBackground>
  );
};

export default ImagedLayout;

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
});
