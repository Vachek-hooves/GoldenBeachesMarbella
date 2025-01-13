import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useStoreProvider} from '../store/context';
import AddBeach from '../components/ui/IconBtn/AddBeach';
// import { Ionicons } from '@expo/vector-icons'

const Main = () => {
  const {beaches} = useStoreProvider();
  const [activeTab, setActiveTab] = useState('General');

  const BeachCard = ({beach}) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{uri: beach.image}} style={styles.beachImage} />
      <TouchableOpacity style={styles.favoriteButton}>
        <Image
          source={require('../assets/icons/heart.png')}
          style={styles.favoriteButton}
        />
      </TouchableOpacity>
      <View style={styles.cardContent}>
        <Text style={styles.beachName}>{beach.name}</Text>
        <Text style={styles.beachDescription} numberOfLines={1}>
          {beach.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Marbella Beaches</Text>
        <TouchableOpacity>
          {/* <Ionicons name="heart-outline" size={24} color="#FFD700" /> */}
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'General' && styles.activeTab]}
          onPress={() => setActiveTab('General')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'General' && styles.activeTabText,
            ]}>
            General
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Added' && styles.activeTab]}
          onPress={() => setActiveTab('Added')}>
          <Text
            style={[
              styles.tabText,
              activeTab === 'Added' && styles.activeTabText,
            ]}>
            Added
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.beachList}>
        <View style={styles.beachGrid}>
          {beaches.map((beach, index) => (
            <BeachCard key={index} beach={beach} />
          ))}
        </View>
      </ScrollView>
      <AddBeach />
    </SafeAreaView>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },
  activeTab: {
    backgroundColor: 'white',
  },
  tabText: {
    color: 'white',
  },
  activeTabText: {
    color: 'black',
  },
  beachList: {
    flex: 1,
  },
  beachGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  card: {
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1a1a1a',
  },
  beachImage: {
    width: '100%',
    height: 150,
  },
  favoriteButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 28,
    height: 24,
  },
  cardContent: {
    padding: 8,
  },
  beachName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  beachDescription: {
    color: 'gray',
    fontSize: 12,
    marginTop: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    color: 'white',
    fontSize: 12,
    marginTop: 4,
  },
});
