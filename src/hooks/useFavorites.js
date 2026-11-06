import { useSyncExternalStore } from 'react';

// Favoritos compartidos entre todos los componentes (localStorage).
const KEY = 'isidoro_favs';
let ids = [];
try { ids = JSON.parse(localStorage.getItem(KEY) || '[]'); } catch { ids = []; }
const listeners = new Set();
const emit = () => { try { localStorage.setItem(KEY, JSON.stringify(ids)); } catch { /* sin almacenamiento */ } listeners.forEach((l) => l()); };

export function toggleFavorite(id) {
  ids = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
  emit();
}
export function useFavorites() {
  const list = useSyncExternalStore((cb) => { listeners.add(cb); return () => listeners.delete(cb); }, () => ids);
  return { favorites: list, isFav: (id) => list.includes(id), toggle: toggleFavorite };
}
