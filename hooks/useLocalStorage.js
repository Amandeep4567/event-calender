//useLocalStorage.js
import { useState, useEffect } from 'react';
import { LOCAL_STORAGE_KEY } from '../utils/constants';

export const useLocalStorage = (initialValue = []) => {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        setData(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveData = (newData) => {
    try {
      setData(newData);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newData));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const clearData = () => {
    try {
      setData([]);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  return {
    data,
    saveData,
    clearData,
    isLoading
  };
};
