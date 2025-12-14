export class ApiError extends Error {
  public readonly status: number;
  public readonly isApiError: boolean;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.isApiError = true;
  }
}

const create = (status: number, message: string): ApiError => {
  return new ApiError(status, message);
};

export const badRequest = (msg = 'Bad Request'): ApiError => create(400, msg);
export const notFound = (msg = 'Not Found'): ApiError => create(404, msg);
export const unauthorized = (msg = 'Unauthorized'): ApiError => create(401, msg);
export const serverError = (msg = 'Internal Server Error'): ApiError => create(500, msg);
