import { useState, useEffect } from 'react';

/**
 * Custom hook to delay updating a value until a specified timeout has elapsed
 * @param {any} value - Input value to debounce (e.g., search term string)
 * @param {number} delay - Delay in milliseconds (default: 500ms)
 * @returns {any} Debounced value
 */
export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cancel the timer if value or delay changes before timeout completes
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}