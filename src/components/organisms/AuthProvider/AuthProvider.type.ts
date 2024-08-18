export interface AuthContextType {
    isAuthenticated: boolean;
    signIn: (token :string ) => void;
    signOut: () => void;
  }
  
  
  