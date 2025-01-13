import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import { useEffect } from 'react'

const IntroScreen = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('TabNavigation')  // Using replace instead of navigate to prevent going back
    }, 1500)

    return () => clearTimeout(timer)  // Cleanup timer on unmount
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marbella Beaches</Text>
      <ActivityIndicator size="large" color="#FFD700" />
    </View>
  );
};

export default IntroScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFD700', // Gold color
  },
})