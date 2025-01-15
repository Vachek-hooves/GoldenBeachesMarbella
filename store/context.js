import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BEACHES} from '../data/beaches';
import {themes} from '../data/themes';

export const StoreContext = createContext({});

// Define theme objects
// export const themes = {
//   light: {
//     background: '#FFFFFF',
//     surface: '#F5F5F5',
//     text: '#000000',
//     textSecondary: '#666666',
//     accent: '#FFD700',
//   },
//   dark: {
//     background: '#000000',
//     surface: '#1a1a1a',
//     text: '#FFFFFF',
//     textSecondary: '#666666',
//     accent: '#FFD700',
//   },
// };

export const StoreProvider = ({children}) => {
  const [beaches, setBeaches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  // Initialize theme with dark theme by default
  const [theme, setTheme] = useState(themes.dark);
  const [reviews, setReviews] = useState({});  // Object with beach.id as key

  useEffect(() => {
    const initializeData = async () => {
      try {
        const [storedBeaches, storedFavorites, storedTheme] = await Promise.all([
          AsyncStorage.getItem('beaches'),
          AsyncStorage.getItem('favorites'),
          AsyncStorage.getItem('theme'),
        ]);

        // Initialize beaches
        if (!storedBeaches) {
          await AsyncStorage.setItem('beaches', JSON.stringify(BEACHES));
          setBeaches(BEACHES);
        } else {
          setBeaches(JSON.parse(storedBeaches));
        }

        // Initialize favorites
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }

        // Initialize theme
        if (storedTheme !== null) {
          const isStoredDarkMode = JSON.parse(storedTheme);
          setIsDarkMode(isStoredDarkMode);
          setTheme(isStoredDarkMode ? themes.dark : themes.light);
        }

        const storedReviews = await AsyncStorage.getItem('reviews');
        if (storedReviews) {
          setReviews(JSON.parse(storedReviews));
        }
      } catch (error) {
        console.error('Error initializing data:', error);
        setBeaches(BEACHES);
      }
    };

    initializeData();
  }, []);

  const toggleTheme = async () => {
    try {
      const newIsDarkMode = !isDarkMode;
      await AsyncStorage.setItem('theme', JSON.stringify(newIsDarkMode));
      setIsDarkMode(newIsDarkMode);
      setTheme(newIsDarkMode ? themes.dark : themes.light);
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  // Function to update beaches data
  const updateBeaches = async newBeaches => {
    try {
      await AsyncStorage.setItem('beaches', JSON.stringify(newBeaches));
      setBeaches(newBeaches);
    } catch (error) {
      console.error('Error updating beaches:', error);
    }
  };

  // Function to toggle favorite status
  const toggleFavorite = async beachId => {
    try {
      const newFavorites = favorites.includes(beachId)
        ? favorites.filter(id => id !== beachId)
        : [...favorites, beachId];

      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
  };

  const deleteBeach = async (beachId) => {
    try {
      // Remove beach from beaches array
      const updatedBeaches = beaches.filter(beach => beach.id !== beachId);
      await AsyncStorage.setItem('beaches', JSON.stringify(updatedBeaches));
      setBeaches(updatedBeaches);

      // Remove from favorites if it exists there
      if (favorites.includes(beachId)) {
        const updatedFavorites = favorites.filter(id => id !== beachId);
        await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
      }

      return true; // Return success
    } catch (error) {
      console.error('Error deleting beach:', error);
      return false; // Return failure
    }
  };

  const saveReview = async (beachId, reviewData) => {
    try {
      const updatedReviews = {
        ...reviews,
        [beachId]: reviewData
      };
      await AsyncStorage.setItem('reviews', JSON.stringify(updatedReviews));
      setReviews(updatedReviews);
      return true;
    } catch (error) {
      console.error('Error saving review:', error);
      return false;
    }
  };

  const deleteReview = async (beachId) => {
    try {
      const updatedReviews = {...reviews};
      delete updatedReviews[beachId];
      await AsyncStorage.setItem('reviews', JSON.stringify(updatedReviews));
      setReviews(updatedReviews);
      return true;
    } catch (error) {
      console.error('Error deleting review:', error);
      return false;
    }
  };

  const value = {
    beaches,
    updateBeaches,
    favorites,
    toggleFavorite,
    theme,
    isDarkMode,
    toggleTheme,
    deleteBeach,
    reviews,
    saveReview,
    deleteReview,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStoreProvider = () => {
  return useContext(StoreContext);
};
