import {
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { getCurrentUser } from "../services/userService";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const data = await getCurrentUser();

      setUser(data);
    } catch (error) {
      localStorage.removeItem("access_token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (token) => {
    localStorage.setItem("access_token", token);

    setLoading(true);

    await loadUser();
  };

  const logout = () => {
    localStorage.removeItem("access_token");

    setUser(null);

    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}