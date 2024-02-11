/* eslint-disable @typescript-eslint/no-explicit-any */
import { http } from "@/lib/api";
import { ReactNode, createContext, useContext, useState } from "react";
import { useToastStore } from "@/app/stores/toast";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  signed: boolean;
  onLogin(email: string, password: string): Promise<void>;
  onLogout(): Promise<void>;
}

export const BEARER = "bearer";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type AuthProviderProps = {
  children?: ReactNode | undefined;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const { openToast } = useToastStore();
  
  const token = localStorage.getItem(BEARER);
  const [signed, setSigned] = useState<boolean>(token !== null);

  const handleLogin = async (email: string, password: string) => {
    try {
      const { data } = await http.post("users/auth", { email, password });

      localStorage.setItem(BEARER, data.token);

      setSigned(true);

      navigate("/dashboard");
    } catch (error: any) {
      const { data } = error.response;

      openToast('Login Failed', data.message);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem(BEARER);
    setSigned(false);
  };

  return (
    <AuthContext.Provider
      value={{
        signed,
        onLogin: handleLogin,
        onLogout: handleLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
