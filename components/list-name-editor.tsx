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
  const mountedTimeRef = React.useRef<number>(Date.now());

  React.useEffect(() => {
    mountedTimeRef.current = Date.now();
    // Use setTimeout to ensure the component is fully mounted
    const timer = setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 50);
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
    // Only process blur if component has been mounted for at least 300ms
    // This prevents the blur from firing immediately after mount
    const timeSinceMount = Date.now() - mountedTimeRef.current;
    console.log("handleBlur called, timeSinceMount:", timeSinceMount);
    if (timeSinceMount > 300) {
      handleSubmit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      console.log("Escape pressed, calling onCancel");
      onCancel();
    } else if (e.key === "Enter") {
      e.preventDefault();
      console.log("Enter pressed, calling handleSubmit");
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
