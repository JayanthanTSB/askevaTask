import { useQuery } from '@tanstack/react-query';
import { employeeService } from '@/services/employeeService';

export const EMPLOYEE_KEY = 'employee';

export function useEmployee(id: string) {
  return useQuery({
    queryKey: [EMPLOYEE_KEY, id],
    queryFn: () => employeeService.getById(id),
    enabled: !!id,
  });
}
