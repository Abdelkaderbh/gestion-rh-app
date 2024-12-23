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
import { AuthContextType, User } from "@/types/AuthContextType";






const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuth, setIsAuth] = useState<boolean>(
    () => !!localStorage.getItem("token")
  );
  const [role, setRole] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
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
      if(error){
        setAuthError("Login failed. Please check your credentials.");
      }
      
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

      const decoded: any = jwtDecode(response.token);
      setRole(decoded.role);
      setUser({ ...response.user, id: decoded.id }); 

      setIsAuth(true);

      if (decoded.role === "HR") {
        navigate("/app/dashboard");
      } else {
        navigate("/app/dashboard");
      }
    } else if (error) {
      const errorMessage =
        error.message ?? "An error occurred during authentication.";
      setAuthError(errorMessage);
      console.error("Authentication error:", error);
    }
  }, [response, error, navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setRole(decoded.role);
        setUser({ id: decoded.id, email: decoded.email, name: decoded.name, role: decoded.role });
        setIsAuth(true);
      } catch (error) {
        console.error("Failed to decode token:", error);
        logout();
      }
    }
  }, [logout]);

  const value = useMemo(() => ({
    isAuth,
    role,
    user,
    login,
    logout,
    authError,
  }), [isAuth, role, user, login, logout, authError]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
