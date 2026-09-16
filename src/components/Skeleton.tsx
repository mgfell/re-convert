type Props = {
  className?: string;
};

export default function Skeleton({ className = "" }: Props) {
  return (
    <div
      className={`animate-pulse rounded-xl bg-white/[0.04] border border-white/[0.04] ${className}`}
    />
  );
}

export function FileRowSkeleton() {
  return (
    <div className="glass-soft rounded-2xl p-4 flex items-start gap-3">
      <Skeleton className="w-10 h-10 shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-2.5 w-1/4" />
      </div>
    </div>
  );
}