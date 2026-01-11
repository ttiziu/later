/**
 * Common types for the application
 */

export type Status = "idle" | "loading" | "success" | "error";

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface TaskList {
  id: string;
  name: string;
  createdAt: number;
}

export interface Todo {
  id: string;
  listId: string;
  text: string;
  completed: boolean;
  createdAt: number;
}
