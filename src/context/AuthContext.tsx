import React, {
  createContext,
  ReactNode,
  useState,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { jwtDecode } from "jwt-decode";

interface User {
  id?: string;
  email: string;
  role: string;
  name: string;
  password: string;
}

interface AuthContextType {
  isAuth: boolean;
  role: string | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<boolean>(() => {
    return !!localStorage.getItem("token");
  });

  const getRole = (): string | null => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        return decoded.role;
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
    return null;
  };

  const [role, setRole] = useState<string | null>(getRole);
  const [user, setUser] = useState<User | null>(() => {
    const token = localStorage.getItem("token");
    return token ? jwtDecode<User>(token) : null;
  });
  const [authError, setAuthError] = useState<string | null>(null);

  const { sendRequest, response, error } = useAxios<{
    token: string;
    user: User;
  }>();

  const navigate = useNavigate();

  const login = useCallback(
    async (email: string, password: string) => {
      setAuthError(null);
      await sendRequest({
        method: "POST",
        url: "/api/auth/signin",
        data: { email, password },
      });
    },
    [sendRequest]
  );

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setUser(null);
    setRole(null);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    if (response?.token) {
      localStorage.setItem("token", response.token);
      setIsAuth(true);
      setUser(response.user);
      if (user) {
        localStorage.setItem("role", user.role ?? "");
      }
      navigate("/dashboard");
    } else if (error) {
      const errorMessage =
        error.message ?? "An error occurred during authentication.";
      setAuthError(errorMessage);
      console.error("Authentication error:", error);
    }
  }, [response, error, navigate, user]);

  const value = useMemo(
    () => ({
      isAuth,
      user,
      login,
      logout,
      authError,
      role,
    }),
    [isAuth, user, login, logout, authError, role]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
