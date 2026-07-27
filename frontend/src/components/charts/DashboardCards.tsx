import {
  RiTeamLine,
  RiCheckboxCircleLine,
  RiCloseCircleLine,
  RiUserAddLine,
} from 'react-icons/ri';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { StatCard } from '@/components/ui/Card';
import { SkeletonCard } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';

export function DashboardCards() {
  const { data, isLoading, isError } = useDashboardStats();
  const stats = data?.data;

  if (isError) {
    return (
      <EmptyState
        icon="⚠️"
        title="Failed to load stats"
        description="Could not connect to server. Make sure the backend is running."
      />
    );
  }

  if (isLoading || !stats) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Employees',
      value: stats.totalEmployees,
      subtitle: 'All registered employees',
      icon: <RiTeamLine />,
      iconBg: 'bg-primary-500/15 text-primary-400',
    },
    {
      title: 'Active Employees',
      value: stats.activeEmployees,
      subtitle: `${Math.round((stats.activeEmployees / (stats.totalEmployees || 1)) * 100)}% of total`,
      icon: <RiCheckboxCircleLine />,
      iconBg: 'bg-success-500/15 text-success-400',
    },
    {
      title: 'Inactive Employees',
      value: stats.inactiveEmployees,
      subtitle: `${Math.round((stats.inactiveEmployees / (stats.totalEmployees || 1)) * 100)}% of total`,
      icon: <RiCloseCircleLine />,
      iconBg: 'bg-danger-500/15 text-danger-400',
    },
    {
      title: 'New This Month',
      value: stats.newThisMonth,
      subtitle: 'Joined in current month',
      icon: <RiUserAddLine />,
      iconBg: 'bg-warning-500/15 text-warning-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </div>
  );
}
