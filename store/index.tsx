import React, { ReactNode } from 'react';
import { AuthProvider, useAuth, User } from './AuthContext';
import { ThemeProvider, useTheme, ThemeMode } from './ThemeContext';

export const AppStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </ThemeProvider>
    );
};

export {
    AuthProvider,
    useAuth,
    ThemeProvider,
    useTheme,
};

export type { User, ThemeMode };
