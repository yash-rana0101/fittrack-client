// client/lib/api-client.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

interface RequestOptions extends RequestInit {
  data?: unknown;
}

class ApiClient {
  private getToken(): string | null {
    if (typeof window !== "undefined") {
      return localStorage.getItem("fittrack_token");
    }
    return null;
  }

  public setToken(token: string) {
    if (typeof window !== "undefined") {
      localStorage.setItem("fittrack_token", token);
    }
  }

  public clearToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("fittrack_token");
    }
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { data, headers: customHeaders, ...customConfig } = options;

    const token = this.getToken();

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...customHeaders,
    };

    const config: RequestInit = {
      method: customConfig.method || "GET",
      headers,
      ...customConfig,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "An unexpected error occurred");
      }

      return json as T;
    } catch (error: any) {
      console.error(`API Error on ${endpoint}:`, error);
      throw error;
    }
  }

  public get<T>(endpoint: string, options?: Omit<RequestOptions, "body" | "data">) {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  public post<T>(endpoint: string, data?: unknown, options?: Omit<RequestOptions, "body" | "data">) {
    return this.request<T>(endpoint, { ...options, method: "POST", data });
  }

  public patch<T>(endpoint: string, data?: unknown, options?: Omit<RequestOptions, "body" | "data">) {
    return this.request<T>(endpoint, { ...options, method: "PATCH", data });
  }

  public put<T>(endpoint: string, data?: unknown, options?: Omit<RequestOptions, "body" | "data">) {
    return this.request<T>(endpoint, { ...options, method: "PUT", data });
  }

  public delete<T>(endpoint: string, options?: Omit<RequestOptions, "body" | "data">) {
    return this.request<T>(endpoint, { ...options, method: "DELETE" });
  }
}

export const apiClient = new ApiClient();
