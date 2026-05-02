// AsyncStorage wrapper that mirrors web's storage shim API
// Same key prefix (pks3-*) as web so JSON exports remain compatible.

import AsyncStorage from '@react-native-async-storage/async-storage';

export type StorageResult = { value: string | null };

class AsyncStorageShim {
  async get(key: string): Promise<StorageResult> {
    try {
      const value = await AsyncStorage.getItem(key);
      return { value };
    } catch {
      return { value: null };
    }
  }

  async set(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch {
      /* silent — quota or platform error */
    }
  }

  async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch {}
  }
}

export const storage = new AsyncStorageShim();

// Helper: persist JSON-serializable value
export async function persist<T>(key: string, value: T): Promise<void> {
  await storage.set(`pks3-${key}`, JSON.stringify(value));
}

// Helper: load JSON-serializable value
export async function load<T>(key: string, fallback: T): Promise<T> {
  const r = await storage.get(`pks3-${key}`);
  if (!r.value) return fallback;
  try {
    return JSON.parse(r.value) as T;
  } catch {
    return fallback;
  }
}
