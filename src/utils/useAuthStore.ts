import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  avatar: string;
  username: string;
  email: string;
  token: string;
  profileCompleted: boolean;
}

interface Player {
  name: string;
  preview_url: string | undefined;
  artist: string;
  image: string;
  external_url: string;
}

interface AuthStore {
  user: User | null;
  player: Player | null;
  setPlayer: (playerData: Player) => void;
  login: (userData: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      player: null,
      login: (userData : User) => set({ user: userData }),
      setPlayer: (playerData : Player) => set({ player: playerData }),
      logout: () => set({ user: null }),
    }),
    { name: "auth-storage" }
  )
);