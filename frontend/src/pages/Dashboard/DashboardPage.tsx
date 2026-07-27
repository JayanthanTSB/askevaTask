import { Link } from 'react-router-dom';
import { RiArrowRightLine, RiTeamLine } from 'react-icons/ri';
import { DashboardCards } from '@/components/charts/DashboardCards';
import { DepartmentChart } from '@/components/charts/DepartmentChart';
import { StatusChart } from '@/components/charts/StatusChart';
import { MonthlyTrendChart } from '@/components/charts/MonthlyTrendChart';
import { Card } from '@/components/ui/Card';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { SkeletonChart } from '@/components/ui/Skeleton';
import { ROUTES } from '@/constants';

export default function DashboardPage() {
  const { data, isLoading } = useDashboardStats();
  const stats = data?.data;

  return (
    <div className="space-y-8 animate-fade-in">
      {}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-surface-100">Overview</h2>
          <p className="mt-1 text-sm text-surface-400">
            Track your workforce metrics at a glance.
          </p>
        </div>
        <Link
          to={ROUTES.EMPLOYEES}
          className="flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          <RiTeamLine size={16} />
          View Employees
          <RiArrowRightLine size={14} />
        </Link>
      </div>

      {}
      <DashboardCards />

      {}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {}
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-surface-100">Department Distribution</h3>
              <p className="text-xs text-surface-500">Employees by department</p>
            </div>
          </div>
          {isLoading ? (
            <SkeletonChart />
          ) : (
            <DepartmentChart data={stats?.departmentDistribution ?? []} />
          )}
        </Card>

        {}
        <Card>
          <div className="mb-4">
            <h3 className="font-semibold text-surface-100">Status Distribution</h3>
            <p className="text-xs text-surface-500">Active vs Inactive vs On-leave</p>
          </div>
          {isLoading ? (
            <SkeletonChart />
          ) : (
            <StatusChart data={stats?.statusDistribution ?? []} />
          )}
        </Card>
      </div>

      {}
      <Card>
        <div className="mb-4">
          <h3 className="font-semibold text-surface-100">Monthly Joining Trend</h3>
          <p className="text-xs text-surface-500">New hires over the last 12 months</p>
        </div>
        {isLoading ? (
          <SkeletonChart />
        ) : (
          <MonthlyTrendChart data={stats?.monthlyJoiningTrend ?? []} />
        )}
      </Card>
    </div>
  );
}
