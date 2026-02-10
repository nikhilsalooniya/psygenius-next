"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getAccessToken, clearTokens } from "@/lib/auth";

interface AuthContextValue {
  adminEmail: string | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  adminEmail: null,
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [adminEmail, setAdminEmail] = useState<string | null>(null);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setAdminEmail(payload.fullName || payload.id || "Admin");
      } catch {
        setAdminEmail("Admin");
      }
    }
  }, []);

  function logout() {
    clearTokens();
    window.location.href = "/admin/login";
  }

  return (
    <AuthContext.Provider value={{ adminEmail, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
