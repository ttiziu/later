"use client";

import * as React from "react";
import { AnimatePresence, motion, type Transition } from "motion/react";
import { Label } from "@/components/ui/label";
import {
  Checkbox,
  CheckboxIndicator,
} from "@/components/animate-ui/primitives/radix/checkbox";
import { type Todo } from "@/types";
import { X } from "lucide-react";

interface TaskListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const getPathAnimate = (isChecked: boolean) => ({
  pathLength: isChecked ? 1 : 0,
  opacity: isChecked ? 1 : 0,
});

const getPathTransition = (isChecked: boolean): Transition => ({
  pathLength: { duration: 1, ease: "easeInOut" },
  opacity: {
    duration: 0.01,
    delay: isChecked ? 0 : 1,
  },
});

export function TaskList({ todos, onToggle, onDelete }: TaskListProps) {
  return (
    <div className="space-y-6">
      {todos.length === 0 ? (
        <div className="text-center text-muted-foreground py-8 h-full flex items-center justify-center">
          No pending tasks yet!
        </div>
      ) : (
        <AnimatePresence mode="popLayout">
          {todos.map((item, idx) => (
            <div key={item.id} className="space-y-6">
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                className="group relative flex items-center"
              >
                <div className="flex items-center space-x-2 flex-1 min-w-0 pr-10">
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
                        style={{ width: '100%' }}
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
                <button
                  onClick={() => onDelete(item.id)}
                  className="absolute right-0 opacity-0 group-hover:opacity-100 transition-opacity p-2 text-destructive hover:bg-destructive/10 rounded-md flex items-center justify-center"
                >
                  <X className="size-4" />
                </button>
              </motion.div>
              {idx !== todos.length - 1 && (
                <div className="border-t border-neutral-300 dark:border-neutral-700" />
              )}
            </div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
}
