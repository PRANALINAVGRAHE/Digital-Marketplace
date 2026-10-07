import {
  createContext,
  useContext,
  useState,
} from "react";

import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("username")
  );

  const login = async (username, password) => {
    const response = await api.post(
      "auth/login/",
      {
        username,
        password,
      }
    );

    localStorage.setItem(
      "access_token",
      response.data.access
    );

    localStorage.setItem(
      "refresh_token",
      response.data.refresh
    );

    localStorage.setItem(
      "username",
      username
    );

    setUser(username);

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}