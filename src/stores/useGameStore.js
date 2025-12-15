import { create } from "zustand";

export const useGameStore = create((set) => ({
  game: false,
  setGame: (game) => {
    set({ game });
  },
}));