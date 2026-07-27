
export function SkeletonRow({ cols = 6 }: { cols?: number }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="skeleton h-4 w-full rounded" />
        </td>
      ))}
    </tr>
  );
}


export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-surface-800 bg-surface-900 p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1 space-y-3">
          <div className="skeleton h-3 w-24 rounded" />
          <div className="skeleton h-8 w-16 rounded" />
          <div className="skeleton h-2.5 w-32 rounded" />
        </div>
        <div className="skeleton h-12 w-12 rounded-xl" />
      </div>
    </div>
  );
}


export function SkeletonText({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-3 rounded"
          style={{ width: `${65 + Math.random() * 35}%` }}
        />
      ))}
    </div>
  );
}


export function SkeletonChart() {
  return (
    <div className="flex h-64 items-end gap-3 px-4 pb-4 pt-8">
      {[60, 85, 45, 90, 70, 55, 80, 65, 75, 40, 95, 50].map((h, i) => (
        <div
          key={i}
          className="skeleton flex-1 rounded-t"
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}
