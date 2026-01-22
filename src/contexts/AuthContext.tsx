import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { supabase } from "../services/supabaseClient";

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextData {
  user: UserProps | null;
  signed: boolean;
  loadingAuth: boolean;
  signOut: () => Promise<void>;
  handleInfoUser: ({ name, email, uid }: UserProps) => void;
}

interface UserProps {
  uid: string;
  name: string | null;
  email: string | null;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    //pega usuário ao iniciar a app
    supabase.auth.getUser().then(({ data }) => {
      setUser(
        data.user
          ? {
              uid: data.user.id,
              name: data.user.user_metadata?.name ?? null,
              email: data.user.email ?? null,
            }
          : null,
      );
      setLoadingAuth(false);
    });

    //escuta login / logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(
        session?.user
          ? {
              uid: session.user.id,
              name: session.user.user_metadata?.name ?? null,
              email: session.user.email ?? null,
            }
          : null,
      );
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
  }

  function handleInfoUser({ name, email, uid }: UserProps) {
    setUser({
      name,
      email,
      uid,
    });
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signed: !!user,
        loadingAuth,
        signOut,
        handleInfoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// hook de consumo
export function useAuth() {
  return useContext(AuthContext);
}
