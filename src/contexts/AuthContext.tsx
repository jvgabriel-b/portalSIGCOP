import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase, User } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

type AuthContextType = {
  user: User | null;
  supabaseUser: SupabaseUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName: string, organization: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('AuthContext: Initializing auth...');
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.warn('AuthContext: Session error:', sessionError);
          setLoading(false);
          return;
        }

        setSupabaseUser(session?.user ?? null);
        if (session?.user) {
          await loadUserProfile(session.user.id);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('AuthContext: Init error:', error);
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      (async () => {
        try {
          setSupabaseUser(session?.user ?? null);
          if (session?.user) {
            await loadUserProfile(session.user.id);
          } else {
            setUser(null);
            setLoading(false);
          }
        } catch (error) {
          console.error('AuthContext: Auth state change error:', error);
          setLoading(false);
        }
      })();
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (userId: string) => {
    try {
      console.log('AuthContext: Loading user profile...');
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (!error && data) {
        console.log('AuthContext: User profile loaded');
        setUser(data);
      } else if (error) {
        console.warn('AuthContext: Profile load error:', error);
      }
      setLoading(false);
    } catch (error) {
      console.error('AuthContext: Profile load exception:', error);
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('AuthContext: Signing in...');
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return { error: null };
    } catch (error) {
      console.error('AuthContext: Sign in error:', error);
      return { error: error as Error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string, organization: string) => {
    try {
      console.log('AuthContext: Signing up...');
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;

      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email,
            full_name: fullName,
            organization,
            role: 'analyst'
          });

        if (profileError) throw profileError;
      }

      return { error: null };
    } catch (error) {
      console.error('AuthContext: Sign up error:', error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      console.log('AuthContext: Signing out...');
      await supabase.auth.signOut();
      setUser(null);
      setSupabaseUser(null);
    } catch (error) {
      console.error('AuthContext: Sign out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, supabaseUser, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
