"use client";

import { create } from "zustand";

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),
}));

export default useUserStore;
