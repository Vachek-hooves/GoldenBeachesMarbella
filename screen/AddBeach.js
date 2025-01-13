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
import React, {useState} from 'react';
import {useStoreProvider} from '../store/context';

const AddBeach = ({navigation}) => {
  const {beaches, updateBeaches} = useStoreProvider();
  const [beachData, setBeachData] = useState({
    heading: '',
    description: '',
    location: '',
    waterTemp: '',
    image: '',
    facilities: [{heading: '', description: ''}],
  });

  const handleAddFacility = () => {
    setBeachData(prev => ({
      ...prev,
      facilities: [...prev.facilities, {heading: '', description: ''}],
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
      name: beachData.heading,
      description: beachData.description,
      location: beachData.location,
      waterTemperature: beachData.waterTemp,
      image: beachData.image || 'default_image_url',
      facilities: beachData.facilities,
    };

    await updateBeaches([...beaches, newBeach]);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)', //gray rgba
            padding: 8,
            borderRadius: 12,
          }}>
          <Image
            source={require('../assets/icons/return.png')}
            // style={styles.backIcon}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add a beach</Text>
      </View>

      <ScrollView style={styles.form}>
        <Text style={styles.label}>Heading</Text>
        <TextInput
          style={styles.input}
          placeholder="Beach name"
          placeholderTextColor="#666"
          value={beachData.heading}
          onChangeText={text =>
            setBeachData(prev => ({...prev, heading: text}))
          }
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={styles.input}
          placeholder="Beach description"
          placeholderTextColor="#666"
          value={beachData.description}
          onChangeText={text =>
            setBeachData(prev => ({...prev, description: text}))
          }
        />

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          placeholder="Beach location"
          placeholderTextColor="#666"
          value={beachData.location}
          onChangeText={text =>
            setBeachData(prev => ({...prev, location: text}))
          }
        />

        <Text style={styles.label}>Average water temperature °C</Text>
        <TextInput
          style={styles.input}
          placeholder="Water temperature"
          placeholderTextColor="#666"
          keyboardType="numeric"
          value={beachData.waterTemp}
          onChangeText={text =>
            setBeachData(prev => ({...prev, waterTemp: text}))
          }
        />

        <Text style={styles.label}>Cover</Text>
        <View style={styles.imageUpload}>
          <TouchableOpacity style={styles.uploadButton}>
            <Text style={styles.uploadText}>+ Upload Image</Text>
          </TouchableOpacity>
        </View>

        {beachData.facilities.map((facility, index) => (
          <View key={index} style={styles.facilityContainer}>
            <Text style={styles.facilityTitle}>Facility №{index + 1}</Text>
            <TextInput
              style={styles.input}
              placeholder="Facility name"
              placeholderTextColor="#666"
              value={facility.heading}
              onChangeText={text => updateFacility(index, 'heading', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Facility description"
              placeholderTextColor="#666"
              value={facility.description}
              onChangeText={text => updateFacility(index, 'description', text)}
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
  backIcon: {
    width: 12,
    height: 12,
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
  imageUpload: {
    height: 200,
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  uploadButton: {
    padding: 12,
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
  backIcon: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
