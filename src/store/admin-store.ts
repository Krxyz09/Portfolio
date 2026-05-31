import { create } from "zustand";
import { ADMIN_SESSION_KEY } from "@/lib/admin-credentials";

type AdminState = {
  isAuthenticated: boolean;
  hydrate: () => void;
  login: () => void;
  logout: () => void;
};

export const useAdminStore = create<AdminState>((set) => ({
  isAuthenticated: false,
  hydrate: () => {
    if (typeof window === "undefined") return;
    set({ isAuthenticated: window.localStorage.getItem(ADMIN_SESSION_KEY) === "1" });
  },
  login: () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(ADMIN_SESSION_KEY, "1");
    }
    set({ isAuthenticated: true });
  },
  logout: () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(ADMIN_SESSION_KEY);
    }
    set({ isAuthenticated: false });
  },
}));
