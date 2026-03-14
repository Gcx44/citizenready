import type { StorageAdapter } from "@leafready/core";

/** Wraps localStorage to satisfy the StorageAdapter interface. */
export const localStorageAdapter: StorageAdapter = {
  getItem(key: string): string | null {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem(key: string, value: string): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(key, value);
    } catch {
      // ignore
    }
  },
  removeItem(key: string): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
  },
};
