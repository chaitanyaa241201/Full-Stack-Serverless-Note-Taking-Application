import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = async (email: string, _password: string) => {
    setLoading(true);
    // Simulate Cognito auth — replace with real SDK
    await new Promise((r) => setTimeout(r, 1000));
    setUser({ id: crypto.randomUUID(), email, name: email.split("@")[0] });
    setLoading(false);
  };

  const signup = async (email: string, _password: string, name: string) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setUser({ id: crypto.randomUUID(), email, name });
    setLoading(false);
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
