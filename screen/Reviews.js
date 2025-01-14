import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState } from 'react';

const Reviews = () => {
  const [activeTab, setActiveTab] = useState('Main');

  const renderSegmentControl = () => (
    <View style={styles.segmentContainer}>
      <TouchableOpacity
        style={[
          styles.segmentButton,
          activeTab === 'Main' && styles.segmentButtonActive,
        ]}
        onPress={() => setActiveTab('Main')}
      >
        <Text
          style={[
            styles.segmentText,
            activeTab === 'Main' && styles.segmentTextActive,
          ]}
        >
          Main
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.segmentButton,
          activeTab === 'Deleted' && styles.segmentButtonActive,
        ]}
        onPress={() => setActiveTab('Deleted')}
      >
        <Text
          style={[
            styles.segmentText,
            activeTab === 'Deleted' && styles.segmentTextActive,
          ]}
        >
          Deleted
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Image
        source={require('../assets/icons/bigUmbrells.png')}
        style={styles.emptyStateImage}
      />
      <Text style={styles.emptyStateText}>
        There aren't any reviews you add yet,{'\n'}you can do it now
      </Text>
      <TouchableOpacity style={styles.addReviewButton}>
        <Text style={styles.addReviewText}>Add a review</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Marbella Reviews</Text>
      {renderSegmentControl()}
      {renderEmptyState()}
    </SafeAreaView>
  );
};

export default Reviews;

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
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a',
    borderRadius: 20,
    padding: 4,
    marginBottom: 32,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 16,
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
  addReviewButton: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addReviewText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
  },
});