import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { installCommand } from "@/lib/omart/types";
import { cn } from "@/lib/utils";

export function CommandCopy({ git, className }: { git: string; className?: string }) {
  const cmd = installCommand(git);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(cmd);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={cn(
        "flex items-stretch gap-2 rounded-lg bg-raised p-1.5 shadow-[var(--shadow-border)]",
        className,
      )}
    >
      <code className="flex min-w-0 flex-1 items-center overflow-x-auto px-3 font-mono text-[12px] text-fg">
        {cmd}
      </code>
      <Button type="button" size="sm" variant="secondary" onClick={copy} className="shrink-0">
        {copied ? <Check /> : <Copy />}
        {copied ? "Copied" : "Copy"}
      </Button>
    </div>
  );
}
