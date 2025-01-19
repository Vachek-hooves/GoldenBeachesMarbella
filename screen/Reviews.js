import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useStoreProvider} from '../store/context';
import MainLayout from '../components/Layout/MainLayout';
import ReviewCard from '../components/actions/ReviewCard';
import ImagedLayout from '../components/Layout/ImagedLayout';

const Reviews = ({navigation}) => {
  const {theme, favorites, beaches, reviews} = useStoreProvider();
  const [activeTab, setActiveTab] = useState('Main');

  // Get favorite beaches
  const favoriteBeaches = beaches.filter(beach => favorites.includes(beach.id));

  const handleReviewPress = beach => {
    navigation.navigate('CreateReview', {beach});
  };

  const renderEmptyState = () => (
    <TouchableOpacity
      style={styles.emptyStateContainer}
      onPress={() => navigation.navigate('Beaches')}>
      <Image
        source={require('../assets/icons/bigUmbrella.png')}
        style={styles.emptyStateImage}
      />
      <Text style={styles.emptyStateText}>
        To review a beach, you need to add it to your favorites first on the
        Beaches tab
      </Text>
      <View style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ImagedLayout>
      {/* <MainLayout> */}
        <Text style={styles.title}>Marbella Reviews</Text>

        {/* <View style={styles.segmentContainer}>
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
      </View> */}

        <ScrollView
          style={styles.reviewsContainer}
          showsVerticalScrollIndicator={false}>
          {favoriteBeaches.length === 0
            ? renderEmptyState()
            : favoriteBeaches.map(beach => (
                <ReviewCard
                  key={beach.id}
                  beach={beach}
                  review={reviews[beach.id]}
                  onPress={() => handleReviewPress(beach)}
                />
              ))}
        </ScrollView>
      {/* </MainLayout> */}
    </ImagedLayout>
  );
};

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
    padding: 20,
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
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFD700',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    fontSize: 32,
    color: '#000000',
    fontWeight: 'bold',
  },
  reviewsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default Reviews;
