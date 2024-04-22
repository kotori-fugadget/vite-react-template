import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { auth } from '../firebase';
// import { useAppDispatch } from '../hooks';
import { User } from 'firebase/auth';

const AuthContext = createContext<User | null>(null);

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // const dispatch = useAppDispatch();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}