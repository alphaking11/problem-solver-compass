
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChange, getCurrentUser } from '@/services/authService';

interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthProvider: Setting up auth state listener");
    
    // Check if there's already a user
    const user = getCurrentUser();
    if (user) {
      console.log("AuthProvider: Found existing user", user);
      setCurrentUser(user);
    }
    
    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChange((user) => {
      console.log("AuthProvider: Auth state changed", user);
      setCurrentUser(user);
      setLoading(false);
    });

    // After initial setup, set loading to false
    setLoading(false);

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading
  };

  console.log("AuthProvider: Current auth state", { currentUser, loading });

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
