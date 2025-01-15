import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {useStoreProvider} from '../store/context';
import MainLayout from '../components/Layout/MainLayout';
import BeachCard from '../components/actions/BeachCard';

const Reviews = () => {
  const {theme, favorites, beaches} = useStoreProvider();
  const [activeTab, setActiveTab] = useState('Main');

  // Get favorite beaches by filtering all beaches
  const favoriteBeaches = beaches.filter(beach => favorites.includes(beach.id));

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Image
        source={require('../assets/icons/bigUmbrella.png')}
        style={styles.emptyStateImage}
      />
      <Text style={styles.emptyStateText}>
        There aren't any favorite beaches yet,{'\n'}you can add them now
      </Text>
    </View>
  );

  const renderFavoriteBeaches = () => (
    <ScrollView 
      style={styles.beachesContainer}
      showsVerticalScrollIndicator={false}
    >
      {favoriteBeaches.map(beach => (
        <BeachCard key={beach.id} beach={beach} width={'100%'} />
      ))}
    </ScrollView>
  );

  return (
    <MainLayout>
      <Text style={styles.title}>Marbella Reviews</Text>
      
      <View style={styles.segmentContainer}>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            activeTab === 'Main' && styles.segmentButtonActive,
          ]}
          onPress={() => setActiveTab('Main')}>
          <Text
            style={[
              styles.segmentText,
              activeTab === 'Main' && styles.segmentTextActive,
            ]}>
            Main
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.segmentButton,
            activeTab === 'Deleted' && styles.segmentButtonActive,
          ]}
          onPress={() => setActiveTab('Deleted')}>
          <Text
            style={[
              styles.segmentText,
              activeTab === 'Deleted' && styles.segmentTextActive,
            ]}>
            Deleted
          </Text>
        </TouchableOpacity>
      </View>

      {favoriteBeaches.length === 0 
        ? renderEmptyState() 
        : renderFavoriteBeaches()
      }
    </MainLayout>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 16,
    marginBottom: 32,
    marginHorizontal: 16,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 4,
    marginHorizontal: 16,
    marginBottom: 32,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 12,
  },
  segmentButtonActive: {
    backgroundColor: 'white',
  },
  segmentText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  segmentTextActive: {
    color: 'black',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  },
  emptyStateImage: {
    width: 80,
    height: 80,
    tintColor: '#FFD700',
    marginBottom: 16,
  },
  emptyStateText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  beachesContainer: {
    flex: 1,
    paddingHorizontal: 16,
    width: '100%',
  },
});
