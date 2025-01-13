import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { useStoreProvider } from '../store/context';
import { launchImageLibrary } from 'react-native-image-picker';

const AddBeach = ({ navigation }) => {
  const { beaches, updateBeaches } = useStoreProvider();
  const [beachData, setBeachData] = useState({
    name: '',
    address: '',
    location: '',
    description: '',
    image: '',
    facilities: [{ name: '', text: '' }],
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

  const handleAddFacility = () => {
    setBeachData(prev => ({
      ...prev,
      facilities: [...prev.facilities, { name: '', text: '' }],
    }));
  };

  const updateFacility = (index, field, value) => {
    const updatedFacilities = [...beachData.facilities];
    updatedFacilities[index] = {
      ...updatedFacilities[index],
      [field]: value,
    };
    setBeachData(prev => ({ ...prev, facilities: updatedFacilities }));
  };

  const handleSave = async () => {
    const newBeach = {
      id: Date.now().toString(),
      ...beachData,
    };

    await updateBeaches([...beaches, newBeach]);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
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
          onChangeText={(text) => setBeachData(prev => ({ ...prev, name: text }))}
        />

        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          placeholder="Beach address"
          placeholderTextColor="#666"
          value={beachData.address}
          onChangeText={(text) => setBeachData(prev => ({ ...prev, address: text }))}
        />

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Beach location"
          placeholderTextColor="#666"
          value={beachData.location}
          onChangeText={(text) => setBeachData(prev => ({ ...prev, location: text }))}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Beach description"
          placeholderTextColor="#666"
          multiline
          numberOfLines={4}
          value={beachData.description}
          onChangeText={(text) => setBeachData(prev => ({ ...prev, description: text }))}
        />

        <Text style={styles.label}>Cover</Text>
        <TouchableOpacity 
          style={styles.imageUpload} 
          onPress={handleImagePick}
        >
          {beachData.image ? (
            <Image 
              source={{ uri: beachData.image }} 
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
              onChangeText={(text) => updateFacility(index, 'name', text)}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Facility description"
              placeholderTextColor="#666"
              multiline
              numberOfLines={4}
              value={facility.text}
              onChangeText={(text) => updateFacility(index, 'text', text)}
            />
          </View>
        ))}

        <TouchableOpacity onPress={handleAddFacility} style={styles.addFacilityButton}>
          <Text style={styles.addFacilityText}>+ Add facility</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
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
});
