import { useEffect } from 'react';
import { useLocalStorage } from './storage';
export function useTheme() {
  const [saved, setSaved] = useLocalStorage<'light' | 'dark' | null>('skinwise:theme', null);
  const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
  useEffect(() => { document.documentElement.classList.toggle('dark', dark); }, [dark]);
  return { dark, toggle: () => setSaved(dark ? 'light' : 'dark') };
}
