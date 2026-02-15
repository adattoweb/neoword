import { create } from "zustand";

export const useGameStore = create((set) => ({
  game: {game: false, mode: false},
  setGame: (game) => {
    set({ game });
  },
}));