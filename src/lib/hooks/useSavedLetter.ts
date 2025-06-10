import { useState, useEffect } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { HistoryItem } from "../types/historyTypes";

export function useSavedLetters() {
  const [savedLetters, setSavedLetters] = useState<HistoryItem[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false); // Add isLoaded state
  const { getItem, setItem } = useLocalStorage();
  const STORAGE_KEY = "savedLetters";

  useEffect(() => {
    const letters = getItem<HistoryItem[]>(STORAGE_KEY) || [];
    setSavedLetters(letters);
    setIsLoaded(true);
  }, []);

  const saveLetter = (
    letter: Omit<HistoryItem, "id" | "createdAt" | "updatedAt">
  ) => {
    const newLetter: HistoryItem = {
      ...letter,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setSavedLetters((prevLetters) => {
      const updatedLetters = [newLetter, ...prevLetters];
      setItem(STORAGE_KEY, updatedLetters);
      return updatedLetters;
    });

    return newLetter;
  };

  // Get a letter by ID
  const getLetterById = (id: string) => {
    return savedLetters.find((letter) => letter.id === id) || null;
  };

  // Update an existing letter
  const updateLetter = (
    id: string,
    updatedContent: string,
    updatedTitle?: string
  ) => {
    setSavedLetters((prevLetters) => {
      const updatedLetters = prevLetters.map((letter) =>
        letter.id === id
          ? {
              ...letter,
              contents: updatedContent,
              title: updatedTitle !== undefined ? updatedTitle : letter.title,
              updatedAt: new Date(),
            }
          : letter
      );
      setItem(STORAGE_KEY, updatedLetters);
      return updatedLetters;
    });
  };

  // Delete a letter
  const deleteLetter = (id: string) => {
    setSavedLetters((prevLetters) => {
      const filteredLetters = prevLetters.filter((letter) => letter.id !== id);
      setItem(STORAGE_KEY, filteredLetters);
      return filteredLetters;
    });
  };

  return {
    savedLetters,
    isLoaded,
    saveLetter,
    getLetterById,
    updateLetter,
    deleteLetter,
  };
}
