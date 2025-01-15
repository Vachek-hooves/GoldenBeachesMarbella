import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Platform,
} from 'react-native';
import {useStoreProvider} from '../store/context';
import MainLayout from '../components/Layout/MainLayout';
import * as ImagePicker from 'react-native-image-picker';

const CreateReview = ({route, navigation}) => {
  const {beach} = route.params;
  const {reviews, saveReview, deleteReview, theme} = useStoreProvider();

  const [reviewData, setReviewData] = useState({
    heading: '',
    comment: '',
    rating: 0,
    photo: null,
    createdAt: new Date().toISOString(),
  });

  useEffect(() => {
    // Load existing review if it exists
    if (reviews[beach.id]) {
      setReviewData(reviews[beach.id]);
    }
  }, [beach.id, reviews]);

  const handleImagePick = () => {
    ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      quality: 0.8,
    }, (response) => {
      if (response.assets?.[0]?.uri) {
        setReviewData(prev => ({
          ...prev,
          photo: response.assets[0].uri
        }));
      }
    });
  };

  const handleSave = async () => {
    if (!reviewData.heading.trim() || !reviewData.comment.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const success = await saveReview(beach.id, {
      ...reviewData,
      updatedAt: new Date().toISOString(),
    });

    if (success) {
      navigation.goBack();
    } else {
      Alert.alert('Error', 'Failed to save review');
    }
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete Review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteReview(beach.id);
            if (success) {
              navigation.goBack();
            } else {
              Alert.alert('Error', 'Failed to delete review');
            }
          },
        },
      ],
    );
  };

  return (
    <MainLayout>
      <ScrollView style={styles.container}>
        <View style={styles.beachCard}>
          <Image source={{uri: beach.image}} style={styles.beachImage} />
          <Text style={styles.beachName}>{beach.name}</Text>
        </View>

        <View style={styles.reviewForm}>
          <TextInput
            style={styles.input}
            placeholder="Review Heading"
            placeholderTextColor="#666"
            value={reviewData.heading}
            onChangeText={(text) => setReviewData(prev => ({...prev, heading: text}))}
          />

          <TextInput
            style={[styles.input, styles.commentInput]}
            placeholder="Write your review..."
            placeholderTextColor="#666"
            multiline
            value={reviewData.comment}
            onChangeText={(text) => setReviewData(prev => ({...prev, comment: text}))}
          />

          <View style={styles.ratingContainer}>
            <Text style={styles.ratingLabel}>Rating:</Text>
            <View style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setReviewData(prev => ({...prev, rating: star}))}>
                  <Text style={[
                    styles.star,
                    {color: star <= reviewData.rating ? '#FFD700' : '#666'}
                  ]}>★</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.photoButton}
            onPress={handleImagePick}>
            {reviewData.photo ? (
              <Image
                source={{uri: reviewData.photo}}
                style={styles.selectedPhoto}
              />
            ) : (
              <Text style={styles.photoButtonText}>Add Photo</Text>
            )}
          </TouchableOpacity>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}>
              <Text style={styles.buttonText}>
                {reviews[beach.id] ? 'Update Review' : 'Save Review'}
              </Text>
            </TouchableOpacity>

            {reviews[beach.id] && (
              <TouchableOpacity
                style={[styles.button, styles.deleteButton]}
                onPress={handleDelete}>
                <Text style={[styles.buttonText, styles.deleteButtonText]}>
                  Delete Review
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  beachCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
  },
  beachImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  beachName: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
  },
  reviewForm: {
    gap: 16,
  },
  input: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 16,
    color: 'white',
    fontSize: 16,
  },
  commentInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 8,
  },
  ratingLabel: {
    color: 'white',
    fontSize: 16,
    marginRight: 16,
  },
  stars: {
    flexDirection: 'row',
    gap: 8,
  },
  star: {
    fontSize: 24,
  },
  photoButton: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedPhoto: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  photoButtonText: {
    color: '#666',
    fontSize: 16,
  },
  actionButtons: {
    gap: 16,
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#FFD700',
  },
  deleteButton: {
    backgroundColor: '#FF4444',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  deleteButtonText: {
    color: 'white',
  },
});

export default CreateReview;