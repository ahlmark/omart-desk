import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-md bg-raised px-3 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-muted",
        "focus-visible:outline-none focus-visible:shadow-[var(--shadow-border-hover)]",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-lg bg-raised px-3 py-2.5 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-muted",
        "focus-visible:outline-none focus-visible:shadow-[var(--shadow-border-hover)]",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("text-sm font-medium text-muted", className)} {...props} />;
}
