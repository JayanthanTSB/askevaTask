import { DashboardCards } from '@/components/charts/DashboardCards';
import { DepartmentChart } from '@/components/charts/DepartmentChart';
import { StatusChart } from '@/components/charts/StatusChart';
import { MonthlyTrendChart } from '@/components/charts/MonthlyTrendChart';
import { Card } from '@/components/ui/Card';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { SkeletonChart, SkeletonCard } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';

export default function AnalyticsPage() {
  const { data, isLoading, isError, refetch } = useDashboardStats();
  const stats = data?.data;

  if (isError) {
    return (
      <EmptyState
        icon="⚠️"
        title="Failed to load analytics"
        description="Could not fetch analytics data. Please ensure the backend is running."
        action={
          <button
            onClick={() => refetch()}
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
          >
            Try Again
          </button>
        }
      />
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {}
      <div>
        <h2 className="text-2xl font-bold text-surface-100">Analytics</h2>
        <p className="mt-1 text-sm text-surface-400">
          In-depth workforce analytics and trends.
        </p>
      </div>

      {}
      {isLoading ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : (
        <DashboardCards />
      )}

      {}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="mb-1 font-semibold text-surface-100">Department Breakdown</h3>
          <p className="mb-4 text-xs text-surface-500">
            Number of employees in each department
          </p>
          {isLoading ? <SkeletonChart /> : (
            <DepartmentChart data={stats?.departmentDistribution ?? []} />
          )}
        </Card>

        <Card>
          <h3 className="mb-1 font-semibold text-surface-100">Employment Status</h3>
          <p className="mb-4 text-xs text-surface-500">
            Proportion of active, inactive, and on-leave employees
          </p>
          {isLoading ? <SkeletonChart /> : (
            <StatusChart data={stats?.statusDistribution ?? []} />
          )}
        </Card>
      </div>

      {}
      <Card>
        <h3 className="mb-1 font-semibold text-surface-100">Monthly Joining Trend</h3>
        <p className="mb-4 text-xs text-surface-500">
          New employee hires over the past 12 months
        </p>
        {isLoading ? <SkeletonChart /> : (
          <MonthlyTrendChart data={stats?.monthlyJoiningTrend ?? []} />
        )}
      </Card>

      {}
      {!isLoading && stats && (
        <Card>
          <h3 className="mb-4 font-semibold text-surface-100">Department Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-800 text-xs uppercase text-surface-500">
                  <th className="pb-3 text-left">Department</th>
                  <th className="pb-3 text-right">Employees</th>
                  <th className="pb-3 text-right">Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-800/50">
                {stats.departmentDistribution.map((dept) => (
                  <tr key={dept._id}>
                    <td className="py-3 text-surface-200">{dept._id}</td>
                    <td className="py-3 text-right font-medium text-surface-100">
                      {dept.count}
                    </td>
                    <td className="py-3 text-right text-surface-400">
                      {((dept.count / stats.totalEmployees) * 100).toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
