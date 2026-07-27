import { useQuery } from '@tanstack/react-query';
import { employeeService } from '@/services/employeeService';

export const DASHBOARD_STATS_KEY = 'dashboard-stats';

export function useDashboardStats() {
  return useQuery({
    queryKey: [DASHBOARD_STATS_KEY],
    queryFn: () => employeeService.getDashboardStats(),
    staleTime: 1000 * 60 * 5, 
  });
}
