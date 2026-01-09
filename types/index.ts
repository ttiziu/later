/**
 * Common types for the application
 */

export type Status = "idle" | "loading" | "success" | "error";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
