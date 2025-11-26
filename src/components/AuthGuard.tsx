import { ReactNode } from 'react';

interface AuthGuardProps {
  children: ReactNode;
  isAuthenticated: boolean;
  onLoginRequired: () => void;
}

export function AuthGuard({ children, isAuthenticated, onLoginRequired }: AuthGuardProps) {
  if (!isAuthenticated) {
    onLoginRequired();
    return null;
  }
  
  return <>{children}</>;
}
