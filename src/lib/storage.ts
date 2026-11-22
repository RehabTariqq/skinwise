import { useEffect, useState } from 'react';
export function useLocalStorage<T>(key: string, init: T) {
  const [v, setV] = useState<T>(() => {
    try { const r = localStorage.getItem(key); return r ? (JSON.parse(r) as T) : init; } catch { return init; }
  });
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)); } catch { /* storage unavailable */ } }, [key, v]);
  return [v, setV] as const;
}
