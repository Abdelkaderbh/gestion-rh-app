import useAxios from "../hooks/useAxios";
import React, {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useMemo,
} from "react";

export interface User {
  _id?: string;
  email: string;
  role: string;
  name: string;
  password: string;
}

interface SignupResponse {
  user: User;
}

export interface UserContextType {
  user: User | null;
  signup: (user: User) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const { sendRequest } = useAxios<SignupResponse>();

  const signup = useCallback(
    async (newUser: User) => {
      try {
        const response = await sendRequest({
          url: "/api/auth/signup",
          method: "POST",
          data: newUser,
        });

        if (response) {
          setUser(response.user);
        }
      } catch (err) {
        console.error("Signup error:", err);
      }
    },
    [sendRequest]
  );

  const value = useMemo(
    () => ({
      user,
      signup,
    }),
    [user, signup]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
