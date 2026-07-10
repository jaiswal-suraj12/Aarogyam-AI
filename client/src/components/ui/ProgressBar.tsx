export default function ProgressBar({
  value,
  max = 100,
  className = "",
}: {
  value: number;
  max?: number;
  className?: string;
}) {
  const percentage =
    max > 0
      ? Math.min(
          Math.round((value / max) * 100),
          100
        )
      : 0;

  const isOverLimit = value > max;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden h-3">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isOverLimit
              ? "bg-red-500"
              : "bg-emerald-500"
          }`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}