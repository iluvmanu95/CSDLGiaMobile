import apiClient from '../apiClient';

export interface UserResponse {
    success: boolean;
    data?: any;
    message?: string;
}

export const userService = {
    async getUserInfo(username: string): Promise<UserResponse> {
        return apiClient.get<UserResponse>('/getUsers', { username });
    }
};

export default userService;
