export const STORAGE_KEYS = {
  CV: 'cv-data',
  THEME: 'cv-theme',
  LANG: 'cv-lang',
} as const;

export const storage = {
  get<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  },

  set(key: string, value: unknown): void {
    localStorage.setItem(key, JSON.stringify(value));
  },

  getRaw(key: string): string | null {
    return localStorage.getItem(key);
  },

  setRaw(key: string, value: string): void {
    localStorage.setItem(key, value);
  },
};
