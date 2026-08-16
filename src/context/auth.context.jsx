import { createContext, useContext, useState } from "react";

// 1. Context Create करें
export const AuthContext = createContext();

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

  const [isAuthenticated, setIsAuthenticated] = useState(() => Boolean(localStorage.getItem("token")));

  // Login Handler
  const login = (userData, authToken) => {
    if (authToken) {
      localStorage.setItem("token", authToken);
      setToken(authToken);
    }

    if (userData) {
      localStorage.setItem("user", JSON.stringify(userData));
      if (userData.role) {
        // localStorage.setItem("role", userData.role);
      }
      setUser(userData);
    }

    setIsAuthenticated(true);
  };

  // Logout Handler
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook
export const useAuth = () => useContext(AuthContext);