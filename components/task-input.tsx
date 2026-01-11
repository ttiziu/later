"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TaskInputProps {
  onAdd: (text: string) => void;
}

export function TaskInput({ onAdd }: TaskInputProps) {
  const [inputValue, setInputValue] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAdd(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="absolute bottom-0 left-0 right-0 z-20 bg-background border-t border-border">
      <form onSubmit={handleSubmit} className="p-4">
        <div className="mx-auto max-w-2xl flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 font-mono"
          />
          <Button type="submit" size="icon" disabled={!inputValue.trim()}>
            <Plus className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
