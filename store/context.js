import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BEACHES } from '../data/beaches';

export const StoreContext = createContext({});

export const StoreProvider = ({children}) => {
  const [beaches, setBeaches] = useState([]);

  // Initialize beaches data
  useEffect(() => {
    const initializeBeaches = async () => {
      try {
        // Check if beaches exist in AsyncStorage
        const storedBeaches = await AsyncStorage.getItem('beaches');
        
        if (!storedBeaches) {
          // If no beaches in storage, store the default BEACHES data
          await AsyncStorage.setItem('beaches', JSON.stringify(BEACHES));
          setBeaches(BEACHES);
        } else {
          // If beaches exist in storage, load them
          setBeaches(JSON.parse(storedBeaches));
        }
      } catch (error) {
        console.error('Error initializing beaches:', error);
        // Fallback to default beaches if there's an error
        setBeaches(BEACHES);
      }
    };

    initializeBeaches();
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

  const value = {
    beaches,
    updateBeaches,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStoreProvider = () => {
  return useContext(StoreContext);
};
