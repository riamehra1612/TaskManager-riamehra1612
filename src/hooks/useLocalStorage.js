/**
 * useLocalStorage Hook
 * 
 * Custom React hook for managing state that persists to browser localStorage.
 * Automatically syncs state updates to localStorage and loads persisted data on mount.
 * 
 */
import { useState, useEffect } from "react";

export function useLocalStorage(key, initialValue) {
  // Initialize state with data from localStorage on first render
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Sync value changes to localStorage whenever value updates
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      console.error("Failed to save to localStorage");
    }
  }, [key, value]);

  return [value, setValue];
}
