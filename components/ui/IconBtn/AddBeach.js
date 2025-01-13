import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
const AddBeach = ({}) => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={['#F7C95F', '#F3AC4F']}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('AddBeach')}>
        <Image
          source={require('../../../assets/icons/add.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default AddBeach;

const styles = StyleSheet.create({
  container: {
    width: 56,
    height: 56,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginVertical: 20,
    marginHorizontal: 30,
  },
  icon: {
    width: 24,
    height: 24,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
