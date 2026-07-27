import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { employeeService } from '@/services/employeeService';
import type { CreateEmployeePayload, UpdateEmployeePayload } from '@/types';
import { EMPLOYEES_KEY } from './useEmployees';
import { EMPLOYEE_KEY } from './useEmployee';
import { DASHBOARD_STATS_KEY } from './useDashboardStats';


const useInvalidateAll = () => {
  const qc = useQueryClient();
  return () => {
    qc.invalidateQueries({ queryKey: [EMPLOYEES_KEY] });
    qc.invalidateQueries({ queryKey: [DASHBOARD_STATS_KEY] });
  };
};


export function useCreateEmployee() {
  const invalidateAll = useInvalidateAll();

  return useMutation({
    mutationFn: (payload: CreateEmployeePayload) =>
      employeeService.create(payload),
    onSuccess: () => {
      invalidateAll();
      toast.success('Employee created successfully!');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message ?? 'Failed to create employee.');
    },
  });
}


export function useUpdateEmployee(id: string) {
  const qc = useQueryClient();
  const invalidateAll = useInvalidateAll();

  return useMutation({
    mutationFn: (payload: UpdateEmployeePayload) =>
      employeeService.update(id, payload),
    onSuccess: (response) => {
      
      qc.setQueryData([EMPLOYEE_KEY, id], response);
      invalidateAll();
      toast.success('Employee updated successfully!');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message ?? 'Failed to update employee.');
    },
  });
}


export function useDeleteEmployee() {
  const invalidateAll = useInvalidateAll();

  return useMutation({
    mutationFn: (id: string) => employeeService.delete(id),
    onSuccess: () => {
      invalidateAll();
      toast.success('Employee deleted successfully!');
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      toast.error(error.response?.data?.message ?? 'Failed to delete employee.');
    },
  });
}
