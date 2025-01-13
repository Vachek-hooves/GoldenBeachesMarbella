import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const BeachDetails = ({ route, navigation }) => {
  const { beach } = route.params;
  console.log(beach);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: beach.image }} style={styles.image} />
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Image 
              source={require('../assets/icons/return.png')} 
              style={styles.backIcon} 
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton}>
            <Image 
              source={require('../assets/icons/heart.png')} 
              style={styles.favoriteIcon} 
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{beach.name}</Text>

          <TouchableOpacity style={styles.locationContainer}>
            {/* <Image 
              source={require('../assets/icons/location.png')} 
              style={styles.locationIcon} 
            /> */}
            {/* <Text style={styles.locationText}>{beach.location}</Text> */}
            {/* <Image 
              source={require('../assets/icons/arrow.png')} 
              style={styles.arrowIcon} 
            /> */}
          </TouchableOpacity>

          <View style={styles.temperatureContainer}>
            {/* <Image 
              source={require('../assets/icons/temperature.png')} 
              style={styles.temperatureIcon} 
            /> */}
            <Text style={styles.temperatureText}>24-25 °C</Text>
          </View>

          <Text style={styles.description}>{beach.description}</Text>

          <View style={styles.facilitiesSection}>
            <Text style={styles.facilitiesTitle}>Facilities on site</Text>
            {beach.facilities.map((facility, index) => (
              <View key={index} style={styles.facilityItem}>
                <View>
                  <Text style={styles.facilityName}>{facility.name}</Text>
                  <Text style={styles.facilityDescription}>{facility.text}</Text>
                </View>
                <TouchableOpacity style={styles.signUpButton}>
                  <Text style={styles.signUpText}>Sign up</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BeachDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
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
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  favoriteIcon: {
    width: 24,
    height: 24,
    tintColor: '#FFD700',
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
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
    marginRight: 8,
  },
  locationText: {
    color: 'white',
    flex: 1,
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: 'white',
  },
  temperatureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  temperatureIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
    marginRight: 8,
  },
  temperatureText: {
    color: 'white',
  },
  description: {
    color: 'white',
    lineHeight: 24,
    marginBottom: 24,
  },
  facilitiesSection: {
    marginTop: 16,
  },
  facilitiesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 16,
  },
  facilityItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  facilityName: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  facilityDescription: {
    color: 'gray',
    fontSize: 14,
    maxWidth: '80%',
  },
  signUpButton: {
    backgroundColor: '#333',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  signUpText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
  },
});