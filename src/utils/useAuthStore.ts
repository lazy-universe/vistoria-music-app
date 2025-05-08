import { create } from "zustand";
import { persist } from "zustand/middleware";

// Define your user type
interface User {
  avatar: string;
  username: string;
  email: string;
  token: string;
}

interface Player {
  name: string;
  preview_url: string;
  artist: string;
  image: string;
  external_url: string;
}

// Define the store shape
interface AuthStore {
  isAuthenticated: boolean;
  user: User | null;
  player: Player | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Create the store
export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      player: null,
      login: (userData) => set({ isAuthenticated: true, user: userData }),
      logout: () => set({ isAuthenticated: false, user: null }),
    }),
    {
      name: "auth-storage", // Key in localStorage
    }
  )
);
