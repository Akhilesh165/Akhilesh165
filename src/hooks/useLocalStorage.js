import { useState } from "react";

export function useLocalStorage(key, init) {
  const [val, setVal] = useState(() => {
    try { 
      const s = localStorage.getItem(key); 
      return s ? JSON.parse(s) : init; 
    } catch { 
      return init; 
    }
  });

  const set = (v) => { 
    const next = typeof v === "function" ? v(val) : v; 
    setVal(next); 
    try { 
      localStorage.setItem(key, JSON.stringify(next)); 
    } catch {} 
  };

  return [val, set];
}
