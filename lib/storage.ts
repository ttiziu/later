/**
 * Local storage management for Later app
 * Simple, type-safe, and extensible
 */

import type { Todo, TaskList } from "@/types";

// Re-export types for convenience
export type { Todo, TaskList };

// ============================================================================
// Constants
// ============================================================================

const LISTS_STORAGE_KEY = "later-lists";
const TODOS_STORAGE_KEY = "later-todos";

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
// Lists Storage Operations
// ============================================================================

/**
 * Get all task lists
 */
export function getLists(): TaskList[] {
  if (!isClient()) return [];

  try {
    const stored = localStorage.getItem(LISTS_STORAGE_KEY);
    const lists = stored ? JSON.parse(stored) : [];
    
    // If no lists exist, create a default "Inbox" list
    if (lists.length === 0) {
      const defaultList: TaskList = {
        id: generateId(),
        name: "Inbox",
        createdAt: Date.now(),
      };
      saveLists([defaultList]);
      return [defaultList];
    }
    
    return lists;
  } catch {
    return [];
  }
}

/**
 * Save lists to localStorage
 */
function saveLists(lists: TaskList[]): void {
  if (!isClient()) return;

  try {
    localStorage.setItem(LISTS_STORAGE_KEY, JSON.stringify(lists));
  } catch {
    console.error("Failed to save lists to localStorage");
  }
}

/**
 * Create a new task list
 */
export function createList(name: string): TaskList {
  const list: TaskList = {
    id: generateId(),
    name: name.trim() || "New List",
    createdAt: Date.now(),
  };

  const lists = getLists();
  saveLists([...lists, list]);

  return list;
}

/**
 * Update list name
 */
export function updateList(id: string, name: string): TaskList | null {
  const lists = getLists();
  const index = lists.findIndex((l) => l.id === id);

  if (index === -1) return null;

  lists[index] = {
    ...lists[index],
    name: name.trim() || lists[index].name,
  };

  saveLists(lists);
  return lists[index];
}

/**
 * Delete a list and all its todos
 */
export function deleteList(id: string): boolean {
  const lists = getLists();
  const filtered = lists.filter((l) => l.id !== id);

  if (filtered.length === lists.length) return false;

  saveLists(filtered);
  
  // Delete all todos from this list
  const todos = getTodos();
  const remainingTodos = todos.filter((t) => t.listId !== id);
  saveTodos(remainingTodos);

  return true;
}

/**
 * Delete all lists and todos, then create a fresh Inbox list
 */
export function deleteAllLists(): void {
  // Clear all lists
  saveLists([]);
  
  // Clear all todos
  saveTodos([]);
  
  // Create a fresh default "Inbox" list
  const defaultList: TaskList = {
    id: generateId(),
    name: "Inbox",
    createdAt: Date.now(),
  };
  saveLists([defaultList]);
}

// ============================================================================
// Todos Storage Operations
// ============================================================================

/**
 * Get all todos from localStorage
 */
export function getTodos(): Todo[] {
  if (!isClient()) return [];

  try {
    const stored = localStorage.getItem(TODOS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Get todos for a specific list
 */
export function getTodosByListId(listId: string): Todo[] {
  return getTodos().filter((t) => t.listId === listId);
}

/**
 * Save todos to localStorage
 */
function saveTodos(todos: Todo[]): void {
  if (!isClient()) return;

  try {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  } catch {
    console.error("Failed to save todos to localStorage");
  }
}

/**
 * Add a new todo to a list
 */
export function addTodo(listId: string, text: string): Todo {
  const todo: Todo = {
    id: generateId(),
    listId,
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
 * Clear all completed todos from a list
 */
export function clearCompleted(listId: string): number {
  const todos = getTodos();
  const listTodos = todos.filter((t) => t.listId === listId);
  const active = listTodos.filter((t) => !t.completed);
  const cleared = listTodos.length - active.length;

  const remaining = todos.filter((t) => t.listId !== listId || !t.completed);
  saveTodos(remaining);

  return cleared;
}
