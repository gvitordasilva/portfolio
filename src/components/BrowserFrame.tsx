import { cn } from "@/lib/utils";

/** Moldura de navegador para mockups de produto. */
export function BrowserFrame({
  url,
  children,
  className,
  status,
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
  status?: React.ReactNode;
}) {
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]",
        className
      )}
    >
      <div className="flex items-center gap-3 border-b border-border bg-surface-2/70 px-3 py-2">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="mono flex min-w-0 flex-1 items-center gap-2 rounded-md bg-background/70 px-3 py-1 text-[11px] text-muted-foreground">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0 text-brand">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          <span className="truncate">{host}</span>
        </div>
        {status}
      </div>
      <div className="relative aspect-[16/10] w-full bg-background">{children}</div>
    </div>
  );
}
