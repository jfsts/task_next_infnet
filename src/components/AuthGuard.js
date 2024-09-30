'use client'


import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/contextAuth';
import { useEffect } from 'react';

const AuthGuard = ({ children }) => {
  const router = useRouter();
  const { user } = useAuth();

  const publicRoutes = ['/', '/cadastrar', '/profile']; 
  const currentPath = router.pathname;
  const isPublicRoute = publicRoutes.includes(currentPath);

  useEffect(() => {
    if(user){
      router.push('/home');
      return
      
    }
    if (!user && !isPublicRoute) {
      router.push('/');
    }
  }, [user, currentPath, isPublicRoute, router]);

  
  if (isPublicRoute || user) {
    return <>{children}</>;
  }

  return null;
};

export default AuthGuard;