"use client";

import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/animate-ui/components/radix/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { GitHubStarsButton } from "@/components/animate-ui/components/buttons/github-stars";
import { ThemeTogglerButton } from "@/components/animate-ui/components/buttons/theme-toggler";
import { TaskList } from "@/components/task-list";
import { TaskInput } from "@/components/task-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  addTodo,
  deleteTodo,
  getTodosByListId,
  getLists,
  toggleTodo,
  moveTodoToList,
  reorderTodo,
  type Todo,
  type TaskList as TaskListType,
} from "@/lib/storage";
import { useMounted } from "@/hooks/use-mounted";
import * as React from "react";

export default function Home() {
  const mounted = useMounted();
  const [lists, setLists] = React.useState<TaskListType[]>([]);
  const [selectedListId, setSelectedListId] = React.useState<string | null>(null);
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const [listName, setListName] = React.useState("");
  const [currentDate, setCurrentDate] = React.useState("");

  React.useEffect(() => {
    if (mounted) {
      const formatDate = (date: Date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      };
      setCurrentDate(formatDate(new Date()));
    }
  }, [mounted]);

  React.useEffect(() => {
    if (mounted) {
      const allLists = getLists();
      setLists(allLists);
      
      if (allLists.length > 0 && !selectedListId) {
        setSelectedListId(allLists[0].id);
      }
    }
  }, [mounted, selectedListId]);

  React.useEffect(() => {
    if (mounted && selectedListId) {
      const listTodos = getTodosByListId(selectedListId);
      setTodos(listTodos);
      
      const currentList = lists.find((l) => l.id === selectedListId);
      setListName(currentList?.name || "");
    }
  }, [mounted, selectedListId, lists]);

  const handleSelectList = (listId: string) => {
    setSelectedListId(listId);
  };

  const handleListsChange = () => {
    const updated = getLists();
    setLists(updated);
    
    if (!updated.find((l) => l.id === selectedListId) && updated.length > 0) {
      setSelectedListId(updated[0].id);
    }
  };

  const handleAdd = (text: string) => {
    if (!selectedListId) return;
    
    const newTodo = addTodo(selectedListId, text);
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggle = (id: string) => {
    toggleTodo(id);
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleDelete = (id: string) => {
    deleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const handleMoveToList = (todoId: string, newListId: string) => {
    const moved = moveTodoToList(todoId, newListId);
    if (moved) {
      // If moved to a different list, remove from current todos
      if (newListId !== selectedListId) {
        setTodos((prev) => prev.filter((t) => t.id !== todoId));
      }
      // Refresh todos to reflect any changes
      if (selectedListId) {
        const listTodos = getTodosByListId(selectedListId);
        setTodos(listTodos);
      }
    }
  };

  const handleReorder = (todoId: string, direction: "up" | "down") => {
    if (!selectedListId) return;
    const success = reorderTodo(todoId, selectedListId, direction);
    if (success) {
      // Refresh todos to reflect new order
      const listTodos = getTodosByListId(selectedListId);
      setTodos(listTodos);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar
        selectedListId={selectedListId}
        onSelectList={handleSelectList}
        onListsChange={handleListsChange}
      />
      <SidebarInset className="flex flex-col h-screen">
        <header className="flex h-14 items-center justify-between border-b border-border px-6 shrink-0">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-sm font-medium">{listName || "Inbox"}</h1>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2">
            {currentDate && (
              <span className="text-sm font-mono text-muted-foreground">
                {currentDate}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <GitHubStarsButton
              variant="outline"
              size="sm"
              username="ttiziu"
              repo="later"
            />
            <ThemeTogglerButton
              variant="ghost"
              size="sm"
              modes={["light", "dark", "system"]}
            />
          </div>
        </header>
        <div className="flex-1 min-h-0 relative">
          {mounted && selectedListId ? (
            <>
              <ScrollArea className="h-full">
                <div className="p-6 pb-32">
                  <div className="mx-auto max-w-2xl">
                    <TaskList
                      todos={todos}
                      lists={lists}
                      currentListId={selectedListId || ""}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                      onMoveToList={handleMoveToList}
                      onReorder={handleReorder}
                    />
                  </div>
                </div>
              </ScrollArea>
              <TaskInput onAdd={handleAdd} />
            </>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <p className="text-sm">Loading...</p>
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
