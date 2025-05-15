interface ApiError {
  message: string;
  status: number;
}

export const createApiError = (message: string, status: number): ApiError => ({
  message,
  status,
});