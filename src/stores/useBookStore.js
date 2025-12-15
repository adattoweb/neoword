import { create } from "zustand";

export const useBookStore = create((set) => ({
  bookID: false,
  setBookID: (bookID) => {
    set({ bookID });
  },
}));