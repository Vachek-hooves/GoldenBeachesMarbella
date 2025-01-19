import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React from 'react';
import QrCode from '../components/ui/QRcode/QrCode';
import ImagedLayout from '../components/Layout/ImagedLayout';

const FacilitiesDetails = ({route, navigation}) => {
  const {facility} = route.params;

  const handleSignUp = () => {
    if (facility.link) {
      Linking.openURL(facility.link);
    }
  };

  return (
    <ImagedLayout>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image source={{uri: facility.image}} style={styles.image} />
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/icons/return.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{facility.name}</Text>
            <Text style={styles.description}>{facility.description}</Text>

            <QrCode value={facility.link} />

            <TouchableOpacity
              style={styles.signUpButton}
              onPress={handleSignUp}>
              <Text style={styles.signUpText}>Visit</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 50}} />
        </ScrollView>
      </SafeAreaView>
    </ImagedLayout>
  );
};

export default FacilitiesDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'black',
  },
  imageContainer: {
    position: 'relative',
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  description: {
    color: 'white',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  signUpButton: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  signUpText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
