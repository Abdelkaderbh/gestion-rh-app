export interface AuthContextType {
  isAuth: boolean;
  role: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  authError: string | null;
}
