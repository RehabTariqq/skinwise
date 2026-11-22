import { createContext, useCallback, useContext, type ReactNode } from 'react';
import type { FavType, Favorite, JournalEntry } from '../types';
import { useLocalStorage } from './storage';
type Kind = 'c' | 'i';
interface Store {
  favorites: Favorite[]; isFav: (t: FavType, id: string) => boolean; toggleFav: (t: FavType, id: string) => void;
  recentC: string[]; recentI: string[]; track: (k: Kind, id: string) => void; removeRecent: (k: Kind, id: string) => void; clearHistory: () => void;
  journal: JournalEntry[]; saveEntry: (e: JournalEntry) => void; deleteEntry: (id: string) => void;
}
const Ctx = createContext<Store>(null as unknown as Store);
export const useStore = () => useContext(Ctx);
export function StoreProvider({ children }: { children: ReactNode }) {
  const [favorites, setFav] = useLocalStorage<Favorite[]>('skinwise:favorites', []);
  const [recentC, setRC] = useLocalStorage<string[]>('skinwise:recentConcerns', []);
  const [recentI, setRI] = useLocalStorage<string[]>('skinwise:recentIngredients', []);
  const [journal, setJ] = useLocalStorage<JournalEntry[]>('skinwise:journal', []);
  const isFav = (t: FavType, id: string) => favorites.some(f => f.type === t && f.id === id);
  const toggleFav = (t: FavType, id: string) =>
    setFav(l => (l.some(f => f.type === t && f.id === id) ? l.filter(f => !(f.type === t && f.id === id)) : [...l, { type: t, id }]));
  const track = useCallback((k: Kind, id: string) => (k === 'c' ? setRC : setRI)(l => [id, ...l.filter(x => x !== id)].slice(0, 12)), [setRC, setRI]);
  const removeRecent = (k: Kind, id: string) => (k === 'c' ? setRC : setRI)(l => l.filter(x => x !== id));
  const clearHistory = () => { setRC([]); setRI([]); };
  const saveEntry = (e: JournalEntry) => setJ(l => (l.some(x => x.id === e.id) ? l.map(x => (x.id === e.id ? e : x)) : [e, ...l]));
  const deleteEntry = (id: string) => setJ(l => l.filter(x => x.id !== id));
  return <Ctx.Provider value={{ favorites, isFav, toggleFav, recentC, recentI, track, removeRecent, clearHistory, journal, saveEntry, deleteEntry }}>{children}</Ctx.Provider>;
}
