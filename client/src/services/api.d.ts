declare module './api' {
  interface ApiResponse<T> {
    data: T;
    status: number;
    statusText: string;
  }

  interface ApiConfig {
    params?: Record<string, any>;
  }

  interface MockApi {
    get<T = any>(url: string, config?: ApiConfig): Promise<ApiResponse<T>>;
    post<T = any>(url: string, data?: any, config?: ApiConfig): Promise<ApiResponse<T>>;
    put<T = any>(url: string, data?: any, config?: ApiConfig): Promise<ApiResponse<T>>;
    delete<T = any>(url: string, config?: ApiConfig): Promise<ApiResponse<T>>;
    patch<T = any>(url: string, data?: any, config?: ApiConfig): Promise<ApiResponse<T>>;
    interceptors: {
      request: {
        use: (fn: any) => void;
        eject: (fn: any) => void;
      };
      response: {
        use: (fn: any) => void;
        eject: (fn: any) => void;
      };
    };
  }

  const mockApi: MockApi;
  export default mockApi;
}
