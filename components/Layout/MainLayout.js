import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {useStoreProvider} from '../../store/context';

const MainLayout = ({children}) => {
  const {theme, isDarkMode} = useStoreProvider();
  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.background}]}>
      {children}
    </SafeAreaView>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
