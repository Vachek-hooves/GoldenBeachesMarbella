import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BEACHES } from '../data/beaches';

export const StoreContext = createContext({});

export const StoreProvider = ({children}) => {
  const [beaches, setBeaches] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // Initialize beaches and favorites data
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Check if beaches exist in AsyncStorage
        const storedBeaches = await AsyncStorage.getItem('beaches');
        const storedFavorites = await AsyncStorage.getItem('favorites');
        
        if (!storedBeaches) {
          // If no beaches in storage, store the default BEACHES data
          await AsyncStorage.setItem('beaches', JSON.stringify(BEACHES));
          setBeaches(BEACHES);
        } else {
          // If beaches exist in storage, load them
          setBeaches(JSON.parse(storedBeaches));
        }

        // Load favorites if they exist
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error initializing data:', error);
        setBeaches(BEACHES);
      }
    };

    initializeData();
  }, []);

  // Function to update beaches data
  const updateBeaches = async (newBeaches) => {
    try {
      await AsyncStorage.setItem('beaches', JSON.stringify(newBeaches));
      setBeaches(newBeaches);
    } catch (error) {
      console.error('Error updating beaches:', error);
    }
  };

  // Function to toggle favorite status
  const toggleFavorite = async (beachId) => {
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

  const value = {
    beaches,
    updateBeaches,
    favorites,
    toggleFavorite,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStoreProvider = () => {
  return useContext(StoreContext);
};
