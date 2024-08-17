import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../AuthProvider/AuthProvider";

export const ProtectedRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
  
    if (!isAuthenticated) {
      return <Navigate to="/signin" state={{ from: location }} replace />;
    }
  
    return <>{children}</>;

  };