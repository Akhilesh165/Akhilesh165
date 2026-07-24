import { useState } from "react";

export function useLocalStorage(key, init) {
  const [val, setVal] = useState(() => {
    try { 
      const s = localStorage.getItem(key); 
      return s ? JSON.parse(s) : init; 
    } catch (error) { 
      console.warn(`useLocalStorage read failed for ${key}:`, error);
      return init; 
    }
  });

  const set = (v) => { 
    const next = typeof v === "function" ? v(val) : v; 
    setVal(next); 
    try { 
      localStorage.setItem(key, JSON.stringify(next)); 
    } catch (error) { 
      console.warn(`useLocalStorage write failed for ${key}:`, error);
    } 
  };

  return [val, set];
}
