import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  Linking,
  Image,
} from 'react-native';
import React, {useState} from 'react';

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleSupport = () => {
    Linking.openURL('mailto:sticklandcoscarelli29472@gmail.com'); // this not opened!
    console.log('Support button pressed');
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
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingItem} onPress={handleSupport}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingText}>Support</Text>
          </View>
          <View style={[styles.iconContainer, {backgroundColor: '#151515'}]}>
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
          <View style={[styles.iconContainer]}>
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
          <View style={[styles.iconContainer, {backgroundColor: '#4CAF50'}]}>
            {/* <Text style={styles.icon}>🛡️</Text> */}
            <Image
              source={require('../assets/icons/privacy.png')}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Text style={styles.settingText}>Theme</Text>
          </View>
          <View style={styles.themeContainer}>
            <Text style={styles.icon}>🌙</Text>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{false: '#767577', true: '#FFD700'}}
              thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              style={styles.switch}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
    marginBottom: 32,
  },
  settingsContainer: {
    gap: 16,
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
    fontSize: 16,
    fontWeight: '500',
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
    // fontSize: 16,
    width: 60,
    height: 60,
    padding: 10,
  },
  switch: {
    transform: [{scale: 0.8}],
  },
});
