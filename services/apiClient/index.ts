import { API_BASE_URL } from '../../config';

interface RequestOptions extends RequestInit {
    params?: Record<string, string | number>;
}

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    private buildUrl(endpoint: string, params?: Record<string, string | number>): string {
        let url = `${this.baseUrl}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
        if (params) {
            const queryParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    queryParams.append(key, String(value));
                }
            });
            const queryString = queryParams.toString();
            if (queryString) {
                url += (url.includes('?') ? '&' : '?') + queryString;
            }
        }
        return url;
    }

    async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
        const { params, headers, ...restOptions } = options;
        const url = this.buildUrl(endpoint, params);

        const defaultHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        };

        const config: RequestInit = {
            headers: {
                ...defaultHeaders,
                ...headers,
            },
            ...restOptions,
        };

        try {
            const response = await fetch(url, config);
            const rawData = await response.json();
            
            // Helper to recursively normalize PascalCase keys to camelCase
            const normalizeKeys = (obj: any): any => {
                if (Array.isArray(obj)) {
                    return obj.map(normalizeKeys);
                } else if (obj !== null && typeof obj === 'object') {
                    const normalized: any = {};
                    Object.keys(obj).forEach((key) => {
                        const camelKey = key.charAt(0).toLowerCase() + key.slice(1);
                        normalized[camelKey] = normalizeKeys(obj[key]);
                        // also retain original key for flexibility
                        if (camelKey !== key) {
                            normalized[key] = normalized[camelKey];
                        }
                    });
                    return normalized;
                }
                return obj;
            };

            const data = normalizeKeys(rawData);
            return data as T;
        } catch (error) {
            console.error(`[API Error] ${options.method || 'GET'} ${url}:`, error);
            throw error;
        }
    }

    get<T>(endpoint: string, params?: Record<string, string | number>, options?: RequestOptions): Promise<T> {
        return this.request<T>(endpoint, { ...options, method: 'GET', params });
    }

    post<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T> {
        return this.request<T>(endpoint, {
            ...options,
            method: 'POST',
            body: body ? JSON.stringify(body) : undefined,
        });
    }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
