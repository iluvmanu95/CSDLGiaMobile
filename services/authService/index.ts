import apiClient from '../apiClient';

export interface LoginResponse {
    success: boolean;
    message?: string;
    data?: any;
    token?: string;
}

export const authService = {
    async login(username: string, password: string): Promise<LoginResponse> {
        return apiClient.post<LoginResponse>('/login', {
            username,
            password
        });
    },

    async logout(): Promise<void> {
        // Handle token removal / server logout if needed
        return Promise.resolve();
    }
};

export default authService;
