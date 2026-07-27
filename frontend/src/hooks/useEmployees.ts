import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { employeeService } from '@/services/employeeService';
import type { EmployeeQueryParams } from '@/types';

export const EMPLOYEES_KEY = 'employees';

export function useEmployees(params: EmployeeQueryParams = {}) {
  return useQuery({
    queryKey: [EMPLOYEES_KEY, params],
    queryFn: () => employeeService.getAll(params),
    placeholderData: keepPreviousData, 
  });
}
