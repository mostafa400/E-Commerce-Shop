import { useState, useEffect } from "react";

const getStoredValue = (key, initialValue) => {
  const saved = localStorage.getItem(key);
  const initial = JSON.parse(saved);
  return initial || initialValue;
};

export const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => getStoredValue(key, initialValue));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
