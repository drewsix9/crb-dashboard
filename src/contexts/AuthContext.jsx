import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  onAuthStateChange,
  signIn,
  signOut,
} from "../supabase";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { user: currentUser, error: getUserError } =
          await getCurrentUser();
        if (getUserError) throw getUserError;
        setUser(currentUser);
      } catch (err) {
        console.error("Error initializing auth:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Listen to auth state changes
    const {
      data: { subscription },
    } = onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const { data, error: signInError } = await signIn(email, password);
      if (signInError) throw signInError;
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const logout = async () => {
    try {
      setError(null);
      const { error: signOutError } = await signOut();
      if (signOutError) throw signOutError;
      setUser(null);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
