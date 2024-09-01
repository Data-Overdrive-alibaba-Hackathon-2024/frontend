// utils/auth.ts
import { redirect } from 'next/navigation';

export const logout = (): void => {
    localStorage.removeItem('token');  // Remove the token from localStorage
    redirect('/');  // Redirect to login page
};