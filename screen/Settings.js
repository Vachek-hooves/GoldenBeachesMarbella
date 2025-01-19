import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Linking,
  Alert,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useStoreProvider} from '../store/context';
import MainLayout from '../components/Layout/MainLayout';
import Main from './Main';
import LightMode from '../components/ui/LightMode';
import DarkMode from '../components/ui/DarkMode';
import ImagedLayout from '../components/Layout/ImagedLayout';

const Settings = () => {
  const {isDarkMode, toggleTheme, theme} = useStoreProvider();
  // const [isDarkMode, setIsDarkMode] = useState(true);
  console.log(theme);

  const handleSupport = async () => {
    const email = 'support@marbellabeaches.com';
    const subject = 'Support Request - Marbella Beaches App';
    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}`;

    try {
      const canOpen = await Linking.canOpenURL(mailtoUrl);
      if (canOpen) {
        await Linking.openURL(mailtoUrl);
      } else {
        // Fallback for when email client is not available
        Alert.alert(
          'Email Not Available',
          'Please contact us at support@marbellabeaches.com',
          [
            {
              text: 'Copy Email',
              onPress: () => Clipboard.setString(email),
            },
            {
              text: 'OK',
              style: 'cancel',
            },
          ],
        );
      }
    } catch (error) {
      console.error('Error opening email client:', error);
      Alert.alert(
        'Error',
        'Unable to open email client. Please try again later.',
      );
    }
  };

  const handleRateUs = () => {
    Linking.openURL('https://apps.apple.com');
  };

  const handlePrivacyPolicy = () => {
    Linking.openURL(
      'https://www.termsfeed.com/live/80422020-6440-4544-a2e0-66fce01a9402',
    );
  };

  return (
    <ImagedLayout>
      {/* <MainLayout> */}
      {/* <SafeAreaView
        style={[styles.container, {backgroundColor: theme.background}]}> */}
      <Text style={[styles.title, {color: theme.text}]}>Settings</Text>

      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingItem} onPress={handleSupport}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingText}>Support</Text>
          </View>
          <View
            style={[styles.iconContainer, {backgroundColor: '#4CAF50' + 90}]}>
            {/* <Text style={styles.icon}>👤</Text>
             */}
            <Image
              source={require('../assets/icons/support.png')}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handleRateUs}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingText}>Rate Us</Text>
          </View>
          <View
            style={[styles.iconContainer, {backgroundColor: '#4CAF50' + 90}]}>
            {/* <Text style={styles.icon}>✨</Text> */}
            <Image
              source={require('../assets/icons/rate.png')}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingItem}
          onPress={handlePrivacyPolicy}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingText}>Privacy Policy</Text>
          </View>
          <View
            style={[styles.iconContainer, {backgroundColor: '#4CAF50' + 90}]}>
            {/* <Text style={styles.icon}>🛡️</Text> */}
            <Image
              source={require('../assets/icons/privacy.png')}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>

        <View style={[styles.settingItem, {backgroundColor: theme.surface}]}>
          <View style={styles.settingLeft}>
            <Text style={[styles.settingText, {color: theme.text}]}>Theme</Text>
          </View>
          <View style={styles.themeContainer}>
            {/* <Text style={styles.icon}>🌙</Text> */}
            {isDarkMode ? <LightMode /> : <DarkMode />}
            {/* <LightMode /> */}
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{false: '#767572', true: theme.accent}}
              thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3a"
              style={styles.switch}
            />
          </View>
        </View>
      </View>
      {/* </SafeAreaView> */}
      {/* </MainLayout> */}
    </ImagedLayout>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
    marginBottom: 32,
    marginHorizontal: 10,
  },
  settingsContainer: {
    gap: 16,
    paddingHorizontal: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
  },
  settingLeft: {
    flex: 1,
  },
  settingText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '500',
    marginHorizontal: 20,
  },
  iconContainer: {
    // width: 32,
    // height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    fontSize: 32,
    width: 60,
    height: 60,
    padding: 10,
    textAlign: 'center',
    // justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
  },
  switch: {
    transform: [{scale: 0.8}],
  },
});
