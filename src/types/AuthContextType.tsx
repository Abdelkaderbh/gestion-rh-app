

export interface AuthContextType {
  user: User | null;
  isAuth: boolean;
  role: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  authError: string | null;
}


export interface User {
  id?: string; 
  email: string;
  role: string;
  name: string;
  password?: string;
}