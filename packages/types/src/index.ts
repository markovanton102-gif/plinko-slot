export type Nullable<T> = T | null;

export interface ApiErrorResponse {
  statusCode: number;
  code: string;
  message: string;
  errors?: unknown[];
}
