import { User } from "@/context/UserContext";

export interface AuthContextType {
  user: User | null;
  isAuth: boolean;
  role: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  authError: string | null;
}
