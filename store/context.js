import React, {createContext, useState, useContext, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreContext = createContext({});

export const StoreProvider = ({children}) => {
  const value = {};
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
};

export const useStoreProvider = () => {
  return useContext(StoreContext);
};
