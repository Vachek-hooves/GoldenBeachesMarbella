import {StyleSheet, Text, View, SafeAreaView} from 'react-native';
import React from 'react';
import {useStoreProvider} from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';

const MainLayout = ({children}) => {
  const {theme, isDarkMode} = useStoreProvider();
  return (
    <LinearGradient
      colors={theme.background.colors}
      locations={theme.background.locations}
      start={theme.background.start}
      end={theme.background.end}
      style={styles.gradient}>
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </LinearGradient>
  );
};

export default MainLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    // paddingTop: 16, // Add some padding for content
  },
});
