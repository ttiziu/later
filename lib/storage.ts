/**
 * Local storage management for Later app
 * Simple, type-safe, and extensible
 */

// ============================================================================
// Types
// ============================================================================

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

// ============================================================================
// Constants
// ============================================================================

const STORAGE_KEY = "later-todos";

// ============================================================================
// Helpers
// ============================================================================

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function isClient(): boolean {
  return typeof window !== "undefined";
}

// ============================================================================
// Storage Operations
// ============================================================================

/**
 * Get all todos from localStorage
 */
export function getTodos(): Todo[] {
  if (!isClient()) return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Save todos to localStorage
 */
function saveTodos(todos: Todo[]): void {
  if (!isClient()) return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch {
    console.error("Failed to save todos to localStorage");
  }
}

/**
 * Add a new todo
 */
export function addTodo(text: string): Todo {
  const todo: Todo = {
    id: generateId(),
    text: text.trim(),
    completed: false,
    createdAt: Date.now(),
  };

  const todos = getTodos();
  saveTodos([todo, ...todos]);

  return todo;
}

/**
 * Toggle todo completion status
 */
export function toggleTodo(id: string): Todo | null {
  const todos = getTodos();
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) return null;

  todos[index] = {
    ...todos[index],
    completed: !todos[index].completed,
  };

  saveTodos(todos);
  return todos[index];
}

/**
 * Delete a todo by id
 */
export function deleteTodo(id: string): boolean {
  const todos = getTodos();
  const filtered = todos.filter((t) => t.id !== id);

  if (filtered.length === todos.length) return false;

  saveTodos(filtered);
  return true;
}

/**
 * Update todo text
 */
export function updateTodo(id: string, text: string): Todo | null {
  const todos = getTodos();
  const index = todos.findIndex((t) => t.id === id);

  if (index === -1) return null;

  todos[index] = {
    ...todos[index],
    text: text.trim(),
  };

  saveTodos(todos);
  return todos[index];
}

/**
 * Clear all completed todos
 */
export function clearCompleted(): number {
  const todos = getTodos();
  const active = todos.filter((t) => !t.completed);
  const cleared = todos.length - active.length;

  saveTodos(active);
  return cleared;
}
