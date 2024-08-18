import React, { useEffect } from "react";
import { AuthContextType } from "./AuthProvider.type";
import { getCookie, removeCookie, setCookie } from "../../../utils/cookieUtils";
import { useNavigate } from "react-router-dom";

const AuthContext = React.createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean>(false);
  const navigate = useNavigate();

  const signIn = (token: string) => {
    setCookie("token", token);
    setIsAuthenticated(true);
  };
  const signOut = () => {
    removeCookie("token");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const token = getCookie("token");
     setIsAuthenticated(!!token);
    if(Boolean(token))
    {
      navigate('/app')
    }
  }, []);
 
  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
