'use client'
import { useEffect } from 'react';
import { usePathname, redirect } from 'next/navigation';

const useAuth = () => {
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');

    // Redirect to login if there is no token and the current path is not already '/login'
    if (!token && pathname !== '/login') {
      redirect('/login');
    }

    // Optionally, redirect to a default authenticated page if there is a token
    // and the user is on the login page (to prevent logged-in users from seeing the login page)
    if (token && pathname === '/login') {
      redirect('/dashboard'); // Change '/dashboard' to your default page after login
    }
  }, [pathname]);
};

export default useAuth;