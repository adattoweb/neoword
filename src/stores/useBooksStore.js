import { create } from "zustand";
import { readLocal } from "@/helpers/readLocal";

export const useBooksStore = create((set) => ({
  books: readLocal("neoword-books"),
  setBooks: (books) => {
    set({ books });
  },
}));