import React, { createContext, useContext, useState, ReactNode } from 'react';
import { authService, userService } from '../../services';

export interface User {
    username?: string;
    name?: string;
    email?: string;
    role?: string;
    tenDonViBaoCao?: string;
    tenDonViChuQuanBaoCao?: string;
    diaDanh?: string;
    chucDanhKy?: string;
    hoTenNguoiKy?: string;
    [key: string]: any;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    login: (username: string, password?: string) => Promise<boolean>;
    logout: () => void;
    setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const login = async (username: string, password?: string): Promise<boolean> => {
        setIsLoading(true);
        try {
            let userData: User | null = null;
            if (password) {
                const res: any = await authService.login(username, password);
                const isSuccess = res?.success ?? res?.Success ?? false;
                if (!isSuccess) {
                    setIsLoading(false);
                    return false;
                }
                const resData = res?.data ?? res?.Data;
                if (resData?.user || resData?.User) {
                    userData = resData.user || resData.User;
                } else if (resData && !resData.token && !resData.Token) {
                    userData = resData;
                }
            }

            setIsAuthenticated(true);

            // Fetch detailed user information if not present
            try {
                const userRes: any = await userService.getUserInfo(username);
                const userResSuccess = userRes?.success ?? userRes?.Success ?? false;
                const userResData = userRes?.data ?? userRes?.Data;
                if (userResSuccess && userResData) {
                    userData = { ...(userData || {}), ...userResData };
                }
            } catch (err) {
                console.log('Error fetching user info:', err);
            }

            if (!userData) {
                userData = { Username: username, Name: username, username, name: username };
            }

            setUser(userData);

            setIsLoading(false);
            return true;
        } catch (error) {
            setIsLoading(false);
            throw error;
        }
    };

    const logout = () => {
        authService.logout();
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
