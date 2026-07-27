import { cn } from '@/utils';
import type { EmployeeStatus } from '@/constants';
import { STATUS_COLOR_MAP } from '@/constants';

type BadgeVariant = 'default' | 'status';

interface BadgeProps {
  children: React.ReactNode;
  status?: EmployeeStatus;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({ children, status, variant = 'default', className }: BadgeProps) {
  if (variant === 'status' && status) {
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize',
          STATUS_COLOR_MAP[status],
          className,
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {children}
      </span>
    );
  }

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-primary-500/10 px-2.5 py-0.5 text-xs font-medium text-primary-400 border border-primary-500/20',
        className,
      )}
    >
      {children}
    </span>
  );
}
