// localStorage shim that mimics the Claude artifact host's window.storage API.
// Used by the dashboard so the same source code works in both runtimes.

export type StorageResult = { value: string | null };

class LocalStorageShim {
  async get(key: string): Promise<StorageResult> {
    if (typeof window === 'undefined') return { value: null };
    try {
      return { value: window.localStorage.getItem(key) };
    } catch {
      return { value: null };
    }
  }

  async set(key: string, value: string): Promise<void> {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(key, value);
    } catch {
      /* quota exceeded — silent for now */
    }
  }
}

export const storage = new LocalStorageShim();
