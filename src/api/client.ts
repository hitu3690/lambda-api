import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

/** API通信の共通処理をクラス定義 */
export default class ApiClient {
  private readonly axiosInstance: AxiosInstance;
  private readonly axiosConfig: AxiosRequestConfig = {
    baseURL: "https://example.com/api/v1",
    timeout: 3000,
    headers: {
      "Content-Type": "application/json",
    },
  };

  constructor() {
    // axiosインスタンスの作成
    this.axiosInstance = axios.create(this.axiosConfig);

    // リクエスト時のインターセプター
    this.axiosInstance.interceptors.request.use(
      this.handleSuccessRequest,
      this.handleErrorRequest
    );

    // レスポンス時のインターセプター
    this.axiosInstance.interceptors.response.use(
      this.handleSuccessResponse,
      this.handleErrorResponse
    );
  }

  // # region インターセプターのコールバック関数
  private handleSuccessRequest = (config: InternalAxiosRequestConfig) => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  };

  private handleErrorRequest = (error: AxiosError) => {
    return Promise.reject(error);
  };

  private handleSuccessResponse = (
    response: AxiosResponse<AxiosResponse<unknown>>
  ): AxiosResponse<unknown> => {
    return response.data;
  };

  private handleErrorResponse = (error: any): Promise<never> => {
    if (error.response) {
      const status = error.response.status;
      const message: string =
        error.response.data?.message ?? "エラーが発生しました";

      switch (status) {
        case 401:
          // 認証エラーの処理
          break;
        case 404:
          // Not Foundエラーの処理
          break;
        default:
          // その他のエラーの処理
          break;
      }

      return Promise.reject(new Error(message));
    }

    return Promise.reject(error);
  };
  // # region end

  // # region リクエスト種別
  public async get<T>(url: string, params?: any): Promise<AxiosResponse> {
    const response = await this.axiosInstance.get<T>(url, { params });
    return response;
  }

  public async post<T>(url: string, body: any): Promise<AxiosResponse> {
    const response = await this.axiosInstance.post<T>(url, body);
    return response;
  }

  public async put<T>(url: string, body: any): Promise<AxiosResponse> {
    const response = await this.axiosInstance.put<T>(url, body);
    return response;
  }

  public async delete<T>(url: string): Promise<AxiosResponse> {
    const response = await this.axiosInstance.delete<T>(url);
    return response;
  }
  // # region end
}
