"use client";

import * as React from "react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import { Label } from "@/components/ui/label";
import {
  Checkbox,
  CheckboxIndicator,
} from "@/components/animate-ui/primitives/radix/checkbox";
import {
  Menu,
  MenuTrigger,
  MenuPanel,
  MenuItem,
  MenuSeparator,
  MenuSubmenu,
  MenuSubmenuTrigger,
  MenuSubmenuPanel,
} from "@/components/animate-ui/components/base/menu";
import { type Todo, type TaskList } from "@/types";
import { X, ArrowUp, ArrowDown, Move } from "lucide-react";

interface TaskListProps {
  todos: Todo[];
  lists: TaskList[];
  currentListId: string;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onMoveToList: (todoId: string, newListId: string) => void;
  onReorder: (todoId: string, direction: "up" | "down") => void;
}

const getPathTransition = (isChecked: boolean): Transition => ({
  pathLength: { duration: 1, ease: "easeInOut" },
  opacity: {
    duration: 0.01,
    delay: isChecked ? 0 : 1,
  },
});

export function TaskList({
  todos,
  lists,
  currentListId,
  onToggle,
  onDelete,
  onMoveToList,
  onReorder,
}: TaskListProps) {
  const [openMenuId, setOpenMenuId] = React.useState<string | null>(null);
  const [contextMenuOpen, setContextMenuOpen] = React.useState<string | null>(null);

  // Sort todos by creation time (newest first)
  const sortedTodos = [...todos].sort((a, b) => b.createdAt - a.createdAt);
  
  // Filter out current list from move options
  const availableLists = lists.filter((list) => list.id !== currentListId);

  return (
    <div className="space-y-6">
      {todos.length === 0 ? (
        <div className="text-center text-muted-foreground py-8 h-full flex items-center justify-center">
          No pending tasks yet!
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {sortedTodos.map((item, idx) => {
            const canMoveUp = idx > 0;
            const canMoveDown = idx < sortedTodos.length - 1;

            return (
              <div key={item.id} className="space-y-6">
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="group relative flex items-center"
                >
                  <div className="flex items-center space-x-2 flex-1 min-w-0 pr-20">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => onToggle(item.id)}
                      id={`checkbox-${item.id}`}
                      className="flex size-5 min-w-5 items-center justify-center rounded border border-neutral-300 bg-white data-[state=checked]:border-neutral-900 data-[state=checked]:bg-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:data-[state=checked]:border-neutral-100 dark:data-[state=checked]:bg-neutral-100 shrink-0"
                    >
                      <CheckboxIndicator className="text-neutral-100 dark:text-neutral-900">
                        <motion.svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="size-3.5"
                          initial={{ scale: 0 }}
                          animate={{ scale: item.completed ? 1 : 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                          }}
                        >
                          <path
                            d="M20 6L9 17L4 12"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </motion.svg>
                      </CheckboxIndicator>
                    </Checkbox>
                    <div className="relative inline-block">
                      <Label
                        htmlFor={`checkbox-${item.id}`}
                        className={`cursor-pointer text-lg font-medium transition-colors duration-200 inline-block ${
                          item.completed
                            ? "text-muted-foreground"
                            : "text-foreground"
                        }`}
                      >
                        {item.text}
                      </Label>
                      {item.completed && (
                        <motion.svg
                          className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none z-10 h-8"
                          style={{ width: "100%" }}
                          viewBox="0 0 340 32"
                          preserveAspectRatio="none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <motion.path
                            d="M 5 16.91 s 79.8 -11.36 98.1 -11.34 c 22.2 0.02 -47.82 14.25 -33.39 22.02 c 12.61 6.77 124.18 -27.98 133.31 -17.28 c 7.52 8.38 -26.8 20.02 4.61 22.05 c 24.55 1.93 113.37 -20.36 113.37 -20.36 L 335 16.91"
                            vectorEffect="non-scaling-stroke"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeMiterlimit={10}
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={getPathTransition(true)}
                            className="stroke-neutral-900 dark:stroke-neutral-100"
                          />
                        </motion.svg>
                      )}
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-0.5">
                    {/* Reorder buttons */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (canMoveUp) onReorder(item.id, "up");
                      }}
                      disabled={!canMoveUp}
                      className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move up"
                    >
                      <ArrowUp className="size-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (canMoveDown) onReorder(item.id, "down");
                      }}
                      disabled={!canMoveDown}
                      className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Move down"
                    >
                      <ArrowDown className="size-3.5" />
                    </button>

                    {/* Context menu */}
                    <Menu
                      open={contextMenuOpen === item.id}
                      onOpenChange={(open) =>
                        setContextMenuOpen(open ? item.id : null)
                      }
                    >
                      <MenuTrigger
                        render={
                          <button
                            onContextMenu={(e) => {
                              e.preventDefault();
                              setContextMenuOpen(item.id);
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              setContextMenuOpen(item.id);
                            }}
                            className="p-1.5 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md"
                            title="More options (right-click or click)"
                          >
                            <Move className="size-4" />
                          </button>
                        }
                      />
                      <MenuPanel className="w-48 overflow-visible" side="right" align="start" sideOffset={8}>
                        <MenuItem
                          disabled={!canMoveUp}
                          onClick={() => {
                            if (canMoveUp) {
                              onReorder(item.id, "up");
                              setContextMenuOpen(null);
                            }
                          }}
                        >
                          <ArrowUp className="size-4" />
                          Move up
                        </MenuItem>
                        <MenuItem
                          disabled={!canMoveDown}
                          onClick={() => {
                            if (canMoveDown) {
                              onReorder(item.id, "down");
                              setContextMenuOpen(null);
                            }
                          }}
                        >
                          <ArrowDown className="size-4" />
                          Move down
                        </MenuItem>
                        {availableLists.length > 0 && (
                          <>
                            <MenuSeparator />
                            <MenuSubmenu>
                              <MenuSubmenuTrigger>
                                <Move className="size-4" />
                                Move to...
                              </MenuSubmenuTrigger>
                              <MenuSubmenuPanel 
                                side="right" 
                                align="start" 
                                sideOffset={8}
                                className="!overflow-hidden max-h-none"
                              >
                                {availableLists.map((list) => (
                                  <MenuItem
                                    key={list.id}
                                    onClick={() => {
                                      onMoveToList(item.id, list.id);
                                      setContextMenuOpen(null);
                                    }}
                                  >
                                    {list.name}
                                  </MenuItem>
                                ))}
                              </MenuSubmenuPanel>
                            </MenuSubmenu>
                          </>
                        )}
                        <MenuSeparator />
                        <MenuItem
                          variant="destructive"
                          onClick={() => {
                            onDelete(item.id);
                            setContextMenuOpen(null);
                          }}
                        >
                          <X className="size-4" />
                          Delete
                        </MenuItem>
                      </MenuPanel>
                    </Menu>

                    {/* Delete button */}
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1.5 text-destructive hover:bg-destructive/10 rounded-md flex items-center justify-center"
                      title="Delete"
                    >
                      <X className="size-4" />
                    </button>
                  </div>
                </motion.div>
                {idx !== sortedTodos.length - 1 && (
                  <div className="border-t border-neutral-300 dark:border-neutral-700" />
                )}
              </div>
            );
          })}
        </AnimatePresence>
      )}
    </div>
  );
}
