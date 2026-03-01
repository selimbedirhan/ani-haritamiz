import { useState, useCallback, useEffect } from 'react';
import type { AuthState } from '../types';

const AUTH_STORAGE_KEY = 'memory_map_auth';

export function useAuth(): AuthState {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        // Check sessionStorage on initial load
        return sessionStorage.getItem(AUTH_STORAGE_KEY) === 'true';
    });

    const login = useCallback((password: string): boolean => {
        // Compare against environment variable
        const correctPassword = import.meta.env.VITE_APP_PASSWORD;

        if (password === correctPassword) {
            sessionStorage.setItem(AUTH_STORAGE_KEY, 'true');
            setIsAuthenticated(true);
            return true;
        }

        return false;
    }, []);

    const logout = useCallback(() => {
        sessionStorage.removeItem(AUTH_STORAGE_KEY);
        setIsAuthenticated(false);
    }, []);

    // Sync across tabs/windows in the same session
    useEffect(() => {
        const handleStorageChange = () => {
            const authValue = sessionStorage.getItem(AUTH_STORAGE_KEY);
            setIsAuthenticated(authValue === 'true');
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return { isAuthenticated, login, logout };
}
