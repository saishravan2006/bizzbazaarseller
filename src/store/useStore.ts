import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

export type Lang = "en" | "ta" | "hi";

type AppState = {
  storeId: string;
  lang: Lang;
  storeName: string;
  selected: {
    codes: string[];
    labels: string[];
  };
  setLang: (l: Lang) => void;
  setStoreName: (n: string) => void;
  toggleType: (code: string, label: string) => void;
  resetToSingle: (code: string, label: string) => void;
  addCustomType: (label: string) => void;
  removeType: (code: string) => void;
  removeMultiple: (codes: string[]) => void;
};

// Generate unique store ID at boot
const generateStoreId = () => uuidv4();

// Load persisted language from localStorage
const getInitialLang = (): Lang => {
  if (typeof window === 'undefined') return 'en';
  const saved = localStorage.getItem('bizz-lang');
  if (saved === 'ta' || saved === 'hi' || saved === 'en') {
    return saved;
  }
  return 'en';
};

export const useStore = create<AppState>((set, get) => ({
  storeId: generateStoreId(),
  lang: getInitialLang(),
  storeName: '',
  selected: {
    codes: [],
    labels: []
  },

  setLang: (lang: Lang) => {
    localStorage.setItem('bizz-lang', lang);
    set({ lang });
  },

  setStoreName: (storeName: string) => {
    set({ storeName });
  },

  toggleType: (code: string, label: string) => {
    const state = get();
    const currentIndex = state.selected.codes.indexOf(code);

    if (currentIndex === -1) {
      // Add new selection
      set({
        selected: {
          codes: [...state.selected.codes, code],
          labels: [...state.selected.labels, label]
        }
      });
    } else {
      // Remove selection
      const newCodes = state.selected.codes.filter((_, i) => i !== currentIndex);
      const newLabels = state.selected.labels.filter((_, i) => i !== currentIndex);
      set({
        selected: {
          codes: newCodes,
          labels: newLabels
        }
      });
    }
  },

  resetToSingle: (code: string, label: string) => {
    set({
      selected: {
        codes: [code],
        labels: [label]
      }
    });
  },

  addCustomType: (label: string) => {
    // Create slug from label
    const slug = label
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .trim()
      .replace(/\s+/g, '_');

    const customCode = `CUSTOM_${slug.toUpperCase()}`;

    const state = get();
    set({
      selected: {
        codes: [...state.selected.codes, customCode],
        labels: [...state.selected.labels, label]
      }
    });
  },

  removeType: (code: string) => {
    const state = get();
    const index = state.selected.codes.indexOf(code);

    if (index !== -1) {
      const newCodes = [...state.selected.codes];
      const newLabels = [...state.selected.labels];

      newCodes.splice(index, 1);
      newLabels.splice(index, 1);

      set({
        selected: {
          codes: newCodes,
          labels: newLabels
        }
      });
    }
  },

  removeMultiple: (codes: string[]) => {
    const state = get();
    const codesToRemove = new Set(codes);

    const newCodes: string[] = [];
    const newLabels: string[] = [];

    state.selected.codes.forEach((code, index) => {
      if (!codesToRemove.has(code)) {
        newCodes.push(code);
        newLabels.push(state.selected.labels[index]);
      }
    });

    set({
      selected: {
        codes: newCodes,
        labels: newLabels
      }
    });
  }
}));