import { RiSearchLine, RiCloseLine } from 'react-icons/ri';
import { cn } from '@/utils';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ value, onChange, placeholder = 'Search employees…', className }: SearchBarProps) {
  return (
    <div className={cn('relative', className)}>
      <RiSearchLine
        size={16}
        className="pointer-events-none absolute inset-y-0 left-3 my-auto text-surface-500"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search"
        className={cn(
          'h-9 w-full rounded-lg border border-surface-700 bg-surface-800',
          'pl-9 pr-8 text-sm text-surface-100 placeholder:text-surface-500',
          'transition-colors focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30',
        )}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="absolute inset-y-0 right-2 my-auto rounded p-0.5 text-surface-500 hover:text-surface-300"
        >
          <RiCloseLine size={15} />
        </button>
      )}
    </div>
  );
}
