"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";

interface ListNameEditorProps {
  name: string;
  onSave: (name: string) => void;
  onCancel: () => void;
}

export function ListNameEditor({ name, onSave, onCancel }: ListNameEditorProps) {
  const [value, setValue] = React.useState(name);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    // Use setTimeout to ensure the component is fully mounted
    const timer = setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    if (isSubmitting) return;
    setIsSubmitting(true);
    
    if (value.trim()) {
      onSave(value.trim());
    } else {
      onCancel();
    }
  };

  const handleBlur = () => {
    handleSubmit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onCancel();
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 w-full">
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="h-8 font-mono text-sm w-full"
        autoFocus
      />
    </form>
  );
}
