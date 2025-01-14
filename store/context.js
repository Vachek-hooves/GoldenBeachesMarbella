import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BEACHES } from '../data/beaches';

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
  const [theme, setTheme] = useState(themes.dark);

  // Initialize app data and theme
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
        if (storedTheme) {
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

  // Toggle theme function
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

  const value = {
    beaches,
    favorites,
    theme,
    isDarkMode,
    toggleTheme,
    // ... other existing context values
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStoreProvider = () => {
  return useContext(StoreContext);
};
