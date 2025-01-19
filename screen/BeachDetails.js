import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  Linking,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {useStoreProvider} from '../store/context';
import ImagedLayout from '../components/Layout/ImagedLayout';

const {width} = Dimensions.get('window');

const BeachDetails = ({route, navigation}) => {
  const {beach} = route.params;
  const [showMap, setShowMap] = useState(false);
  const {favorites, toggleFavorite, deleteBeach} = useStoreProvider();
  console.log(beach.facilities);

  const isFavorite = favorites.includes(beach.id);

  const handleFavoritePress = e => {
    e.stopPropagation(); // Prevent triggering the card's onPress
    toggleFavorite(beach.id);
  };

  const handleOpenMaps = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${beach.location.lat},${beach.location.lng}`;
    Linking.openURL(url);
  };

  const handleSignUp = facilityLink => {
    if (facilityLink) {
      Linking.openURL(facilityLink);
    }
  };

  // const truncateText = (text, maxLength) => {
  //   if (text.length <= maxLength) return text;
  //   return text.substring(0, maxLength) + '...';
  // };

  const handleFacilityPress = facility => {
    navigation.navigate('FacilitiesDetails', {facility});
  };

  const handleDeleteBeach = () => {
    Alert.alert(
      'Delete Beach',
      'Are you sure you want to delete this beach? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteBeach(beach.id);
            if (success) {
              navigation.goBack();
            } else {
              Alert.alert('Error', 'Failed to delete beach. Please try again.');
            }
          },
        },
      ],
    );
  };

  // console.log(beach.facilities);

  return (
    <ImagedLayout>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.imageContainer}>
            <Image source={{uri: beach.image}} style={styles.image} />
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/icons/return.png')}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.favoriteButton}
              onPress={handleFavoritePress}>
              <Image
                source={require('../assets/icons/heart.png')}
                style={[
                  styles.favoriteIcon,
                  isFavorite && styles.favoriteIconActive,
                ]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={handleDeleteBeach}>
              <Image
                source={require('../assets/icons/trash.png')}
                style={styles.deleteIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{beach.name}</Text>

            <TouchableOpacity
              style={styles.locationContainer}
              onPress={handleOpenMaps}>
              <Image
                source={require('../assets/icons/location.png')}
                style={styles.locationIcon}
              />
              <Text style={styles.locationText}>{beach.addresss}</Text>
              {/* <Image 
              source={require('../assets/icons/arrow.png')} 
              style={styles.arrowIcon} 
            /> */}
            </TouchableOpacity>

            <View style={styles.mapPreviewContainer}>
              <MapView
                style={styles.mapPreview}
                initialRegion={{
                  latitude: beach.location.lat,
                  longitude: beach.location.lng,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }}
                scrollEnabled={false}
                zoomEnabled={false}>
                <Marker
                  coordinate={{
                    latitude: beach.location.lat,
                    longitude: beach.location.lng,
                  }}
                />
              </MapView>
              <TouchableOpacity
                style={styles.expandMapButton}
                onPress={() => setShowMap(true)}>
                <Text style={styles.expandMapText}>View Full Map</Text>
              </TouchableOpacity>
            </View>

            {/* <View style={styles.temperatureContainer}>
            <Image 
              source={require('../assets/icons/temperature.png')} 
              style={styles.temperatureIcon} 
            />
            <Text style={styles.temperatureText}>24-25 °C</Text>
          </View> */}

            <Text style={styles.description}>{beach.description}</Text>

            <View style={styles.facilitiesSection}>
              <Text style={styles.facilitiesTitle}>Facilities on site</Text>
              {beach.facilities.map(facility => (
                <TouchableOpacity
                  key={facility.id}
                  style={styles.facilityItem}
                  onPress={() => handleFacilityPress(facility)}>
                  <View style={styles.facilityContent}>
                    <Text style={styles.facilityName}>{facility.name}</Text>
                    {/* <Text style={styles.facilityDescription}>
                    {truncateText(facility.description, 20)}
                  </Text> */}
                  </View>
                  <View style={styles.arrowContainer}>
                    {/* <Image
                    source={require('../assets/icons/arrow.png')}
                    style={styles.arrowIcon}
                  /> */}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <Modal visible={showMap} animationType="slide" statusBarTranslucent>
          <SafeAreaView style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity
                onPress={() => setShowMap(false)}
                style={styles.modalBackButton}>
                <Image
                  source={require('../assets/icons/return.png')}
                  style={styles.backIcon}
                />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>{beach.name}</Text>
              <TouchableOpacity
                onPress={handleOpenMaps}
                style={styles.openMapsButton}>
                <Text style={styles.openMapsText}>Open in Maps</Text>
              </TouchableOpacity>
            </View>

            <MapView
              style={styles.modalMap}
              initialRegion={{
                latitude: beach.location.lat,
                longitude: beach.location.lng,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              }}>
              <Marker
                coordinate={{
                  latitude: beach.location.lat,
                  longitude: beach.location.lng,
                }}
                title={beach.name}
                description={beach.addresss}
              />
            </MapView>
          </SafeAreaView>
        </Modal>
      </SafeAreaView>
    </ImagedLayout>
  );
};

export default BeachDetails;

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
  favoriteButton: {
    position: 'absolute',
    top: 50,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  favoriteIcon: {
    width: 32,
    height: 28,
    // tintColor: '#FFD700',
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
  facilityContent: {
    flex: 1,
    marginRight: 16,
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
    paddingVertical: 6,
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
  mapPreviewContainer: {
    height: 200,
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  mapPreview: {
    flex: 1,
  },
  expandMapButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  expandMapText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'black',
  },
  modalBackButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 12,
  },
  modalTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalMap: {
    flex: 1,
  },
  openMapsButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  openMapsText: {
    color: 'black',
    fontWeight: 'bold',
  },
  arrowContainer: {
    padding: 8,
  },
  arrowIcon: {
    width: 20,
    height: 20,
    tintColor: 'white',
  },
  favoriteIcon: {
    width: 28,
    height: 24,
    tintColor: 'white',
  },
  favoriteIconActive: {
    tintColor: '#FFD700', // or any color you want for active state
  },
  deleteButton: {
    position: 'absolute',
    top: '60%',
    right: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 20,
  },
  deleteIcon: {
    width: 28,
    height: 34,
    tintColor: '#FF4444',
  },
});
