import { create } from "zustand";

export const useLangStore = create((set) => ({
  isEn: localStorage.getItem("neoword-lang") === "en",
  setIsEn: (isEn) => {
    localStorage.setItem("neoword-lang", isEn ? "en" : "ua")
    set({ isEn })
  },
}));