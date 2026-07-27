import { cn } from '@/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-surface-800 bg-surface-900 p-5',
        hover && 'transition-all duration-200 hover:border-surface-700 hover:shadow-lg',
        className,
      )}
    >
      {children}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  iconBg: string;
  trend?: { value: number; label: string };
}

export function StatCard({ title, value, subtitle, icon, iconBg, trend }: StatCardProps) {
  const isPositive = (trend?.value ?? 0) >= 0;

  return (
    <Card hover className="animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-surface-400">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-surface-100">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-surface-500">{subtitle}</p>
          )}
          {trend && (
            <div className="mt-3 flex items-center gap-1">
              <span
                className={cn(
                  'text-xs font-medium',
                  isPositive ? 'text-success-400' : 'text-danger-400',
                )}
              >
                {isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-surface-500">{trend.label}</span>
            </div>
          )}
        </div>
        <div className={cn('flex h-12 w-12 items-center justify-center rounded-xl text-2xl', iconBg)}>
          {icon}
        </div>
      </div>
    </Card>
  );
}
