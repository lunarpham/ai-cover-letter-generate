export function useLocalStorage() {
  function setItem<T>(key: string, value: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error storing item ${key} in localStorage:`, error);
    }
  }

  function getItem<T>(key: string): T | null {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error retrieving item ${key} from localStorage:`, error);
      return null;
    }
  }

  function removeItem(key: string): void {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error);
    }
  }

  return { setItem, getItem, removeItem };
}
