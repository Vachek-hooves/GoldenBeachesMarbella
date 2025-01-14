import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BEACHES} from '../data/beaches';

export const StoreContext = createContext({});

// Define theme objects
export const themes = {
  light: {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    text: '#000000',
    textSecondary: '#666666',
    accent: '#FFD700',
  },
  dark: {
    background: '#000000',
    surface: '#1a1a1a',
    text: '#FFFFFF',
    textSecondary: '#666666',
    accent: '#FFD700',
  },
};

export const StoreProvider = ({children}) => {
  const [beaches, setBeaches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);
  // Initialize theme with dark theme by default
  const [theme, setTheme] = useState(themes.dark);

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

  const value = {
    beaches,
    updateBeaches,
    favorites,
    toggleFavorite,
    theme,
    isDarkMode,
    toggleTheme,
    deleteBeach,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStoreProvider = () => {
  return useContext(StoreContext);
};
