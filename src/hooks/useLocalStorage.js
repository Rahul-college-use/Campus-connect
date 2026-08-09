import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to synchronize React state with window.localStorage
 * @param {string} key - LocalStorage key string
 * @param {any} initialValue - Fallback value if key does not exist
 */
export default function useLocalStorage(key, initialValue) {
  // Reads value from localStorage safely (handles SSR & parse errors)
  const readValue = useCallback(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(readValue);

  // Return a wrapped setter function that updates state and localStorage
  const setValue = useCallback(
    (value) => {
      if (typeof window === 'undefined') {
        console.warn(`Tried setting localStorage key "${key}" in SSR environment.`);
        return;
      }

      try {
        // Support functional state updates: setValue((prev) => prev + 1)
        const newValue = value instanceof Function ? value(storedValue) : value;

        // Persist to localStorage
        window.localStorage.setItem(key, JSON.stringify(newValue));

        // Update local React state
        setStoredValue(newValue);

        // Dispatch custom event to sync other instances in the same browser tab
        window.dispatchEvent(new Event('local-storage-update'));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Sync state if localStorage changes in another tab or window instance
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event?.key && event.key !== key) return;
      setStoredValue(readValue());
    };

    // Cross-tab synchronization
    window.addEventListener('storage', handleStorageChange);
    // Same-tab instance synchronization
    window.addEventListener('local-storage-update', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('local-storage-update', handleStorageChange);
    };
  }, [key, readValue]);

  return [storedValue, setValue];
}