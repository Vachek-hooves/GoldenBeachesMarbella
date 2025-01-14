import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import React from 'react';
import { BEACHES } from '../data/beaches';

const { width } = Dimensions.get('window');

const Activities = ({ navigation }) => {
  // Get unique facilities from all beaches
  const uniqueFacilities = Array.from(
    new Set(
      BEACHES.flatMap(beach => 
        beach.facilities.map(facility => JSON.stringify(facility))
      )
    )
  ).map(str => JSON.parse(str));

  const handleSignUp = (link) => {
    if (link) {
      Linking.openURL(link);
    }
  };

  const handleFacilityPress = (facility) => {
    navigation.navigate('FacilitiesDetails', { facility });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Marbella Activities</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {uniqueFacilities.map((facility) => (
          <TouchableOpacity key={facility.id} style={styles.activityCard} onPress={() => handleFacilityPress(facility)}>
            <Image
              source={{ uri: facility.image }}
              style={styles.activityImage}
            />
            <View style={styles.activityContent}>
              <View style={styles.textContainer}>
                <Text style={styles.activityName}>{facility.name}</Text>
                <Text style={styles.activityDescription} numberOfLines={1}>
                  {facility.description.split('.')[0]}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.signUpButton}
                onPress={() => handleSignUp(facility.link)}
              >
                <Text style={styles.signUpText}>Sign up</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Activities;

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
    marginBottom: 24,
  },
  activityCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  activityImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  activityContent: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  activityName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  activityDescription: {
    fontSize: 14,
    color: '#666',
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