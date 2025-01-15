import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useStoreProvider} from '../../store/context';

const BeachCard = ({beach, width}) => {
  const navigation = useNavigation();
  const {favorites, toggleFavorite} = useStoreProvider();

  const isFavorite = favorites.includes(beach.id);

  const handleFavoritePress = e => {
    e.stopPropagation(); // Prevent triggering the card's onPress
    toggleFavorite(beach.id);
  };

  return (
    <TouchableOpacity
      style={[styles.card, {width: width ? `$ {width}%` : '48%'}]}
      onPress={() => navigation.navigate('BeachDetails', {beach})}>
      <Image source={{uri: beach.image}} style={styles.beachImage} />
      <TouchableOpacity
        style={styles.favoriteButton}
        onPress={handleFavoritePress}>
        <Image
          source={require('../../assets/icons/heart.png')}
          style={[styles.favoriteIcon, isFavorite && styles.favoriteIconActive]}
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
};

export default BeachCard;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginHorizontal: '1%',
    marginBottom: 26,
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
  favoriteIcon: {
    width: 28,
    height: 24,
    tintColor: 'white',
  },
  favoriteIconActive: {
    tintColor: '#FFD700', // or any color you want for active state
  },
});
