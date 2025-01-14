import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {useStoreProvider} from '../store/context';
import {launchImageLibrary} from 'react-native-image-picker';
import MapView, {Marker} from 'react-native-maps';

const {width} = Dimensions.get('window');

const AddBeach = ({navigation}) => {
  const {beaches, updateBeaches} = useStoreProvider();
  const [showMap, setShowMap] = useState(false);
  const [beachData, setBeachData] = useState({
    name: '',
    address: '',
    location: {
      lat: 36.5178217173861,
      lng: -4.894346246476643,
    },
    description: '',
    image: '',
    facilities: [{name: '', text: '', id: Date.now().toString()}],
  });

  const handleImagePick = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    });

    if (result.assets && result.assets[0]) {
      setBeachData(prev => ({
        ...prev,
        image: result.assets[0].uri,
      }));
    }
  };

  const handleMapPress = event => {
    const {coordinate} = event.nativeEvent;
    setBeachData(prev => ({
      ...prev,
      location: {
        lat: coordinate.latitude,
        lng: coordinate.longitude,
      },
    }));
  };

  const handleConfirmLocation = () => {
    setShowMap(false);
  };

  const handleAddFacility = () => {
    setBeachData(prev => ({
      ...prev,
      facilities: [...prev.facilities, {name: '', text: ''}],
    }));
  };

  const updateFacility = (index, field, value) => {
    const updatedFacilities = [...beachData.facilities];
    updatedFacilities[index] = {
      ...updatedFacilities[index],
      [field]: value,
    };
    setBeachData(prev => ({...prev, facilities: updatedFacilities}));
  };

  const handleSave = async () => {
    const newBeach = {
      id: Date.now().toString(),
      ...beachData,
      addresss: beachData.address, // Note the three 's' to match your data structure
    };

    await updateBeaches([newBeach, ...beaches]);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <Image
            source={require('../assets/icons/return.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add a beach</Text>
      </View>

      <ScrollView style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Beach name"
          placeholderTextColor="#666"
          value={beachData.name}
          onChangeText={text => setBeachData(prev => ({...prev, name: text}))}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Beach address"
          placeholderTextColor="#666"
          value={beachData.address}
          onChangeText={text =>
            setBeachData(prev => ({...prev, address: text}))
          }
        />

        <Text style={styles.label}>Location</Text>
        <TouchableOpacity
          style={styles.locationPicker}
          onPress={() => setShowMap(true)}>
          <View style={styles.locationContent}>
            {/* <Image 
              source={require('../assets/icons/location.png')} 
              style={styles.locationIcon} 
            /> */}
            <Text>+</Text>
            <Text style={styles.locationText}>
              {beachData.location.lat !== 0
                ? `${beachData.location.lat.toFixed(
                    6,
                  )}, ${beachData.location.lng.toFixed(6)}`
                : 'Select location on map'}
            </Text>
          </View>
          {/* <Image 
            source={require('../assets/icons/arrow.png')} 
            style={styles.arrowIcon} 
          /> */}
        </TouchableOpacity>

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Beach description"
          placeholderTextColor="#666"
          multiline
          numberOfLines={4}
          value={beachData.description}
          onChangeText={text =>
            setBeachData(prev => ({...prev, description: text}))
          }
        />

        <Text style={styles.label}>Cover</Text>
        <TouchableOpacity style={styles.imageUpload} onPress={handleImagePick}>
          {beachData.image ? (
            <Image
              source={{uri: beachData.image}}
              style={styles.selectedImage}
            />
          ) : (
            <Text style={styles.uploadText}>+ Upload Image</Text>
          )}
        </TouchableOpacity>

        {beachData.facilities.map((facility, index) => (
          <View key={index} style={styles.facilityContainer}>
            <Text style={styles.facilityTitle}>Facility №{index + 1}</Text>
            <TextInput
              style={styles.input}
              placeholder="Facility name"
              placeholderTextColor="#666"
              value={facility.name}
              onChangeText={text => updateFacility(index, 'name', text)}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Facility description"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              value={facility.text}
              onChangeText={text => updateFacility(index, 'text', text)}
            />
          </View>
        ))}

        <TouchableOpacity
          onPress={handleAddFacility}
          style={styles.addFacilityButton}>
          <Text style={styles.addFacilityText}>+ Add facility</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
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
            <Text style={styles.modalTitle}>Select Location</Text>
            <TouchableOpacity
              onPress={handleConfirmLocation}
              style={styles.confirmButton}>
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>

          <MapView
            style={styles.modalMap}
            initialRegion={{
              latitude: beachData.location.lat,
              longitude: beachData.location.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={handleMapPress}>
            <Marker
              coordinate={{
                latitude: beachData.location.lat,
                longitude: beachData.location.lng,
              }}
            />
          </MapView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default AddBeach;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  backButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 12,
  },
  backIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  form: {
    padding: 16,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    color: 'white',
    marginBottom: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageUpload: {
    height: 200,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  selectedImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadText: {
    color: '#FFD700',
  },
  facilityContainer: {
    marginTop: 16,
  },
  facilityTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  addFacilityButton: {
    marginVertical: 16,
  },
  addFacilityText: {
    color: '#FFD700',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  saveButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mapContainer: {
    height: 200,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  map: {
    flex: 1,
  },
  mapHelper: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 8,
    borderRadius: 4,
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
  },
  locationPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  locationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
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
  confirmButton: {
    backgroundColor: '#FFD700',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  confirmText: {
    color: 'black',
    fontWeight: 'bold',
  },
  modalMap: {
    flex: 1,
  },
});
