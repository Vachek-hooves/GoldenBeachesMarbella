import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';

const ReviewCard = ({beach, review, onPress}) => {
  // Truncate description if too long
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{uri: beach.image}} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>
          {review ? review.heading : beach.name}
        </Text>
        <Text style={styles.description}>
          {review 
            ? truncateText(review.comment, 100)
            : truncateText(beach.description, 100)
          }
        </Text>
      </View>
      <View style={styles.ratingContainer}>
        {[...Array(5)].map((_, index) => (
          <Text
            key={index}
            style={[
              styles.star,
              {color: review && index < review.rating ? '#FFD700' : '#666666'},
            ]}>
            ★
          </Text>
        ))}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    marginBottom: 16,
    width: '100%',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 16,
  },
  heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    color: '#666666',
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    padding: 16,
    paddingTop: 0,
    justifyContent: 'flex-end',
  },
  star: {
    fontSize: 20,
    marginLeft: 2,
  },
});

export default ReviewCard;
