import { createContext, useContext, useState } from "react";

// 1. Context Create
export const AuthContext = createContext(null);

// 2. Provider Component
export const AuthProvider = ({ children }) => {
  // Page load / refresh hone par token aur user localStorage se read honge
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
      return null;
    }
  });

  // ✅ Token aur user dono exist karte hain tabhi user authenticated mana jayega
  const isAuthenticated = Boolean(token && user);

  // Login Handler
  const login = (userData, authToken) => {
    if (authToken) {
      localStorage.setItem("token", authToken);
      setToken(authToken);
    }

    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    }
  };

  // Logout Handler
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook (Safety check ke sath)
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};