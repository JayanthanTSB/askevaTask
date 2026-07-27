import { cn } from '@/utils';

type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';

const SIZE_MAP: Record<SpinnerSize, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-[3px]',
  xl: 'h-14 w-14 border-4',
};

interface SpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn(
        'animate-spin rounded-full',
        'border-surface-700 border-t-primary-500',
        SIZE_MAP[size],
        className,
      )}
    />
  );
}


export function PageSpinner() {
  return (
    <div className="flex h-full min-h-[400px] items-center justify-center">
      <Spinner size="xl" />
    </div>
  );
}
