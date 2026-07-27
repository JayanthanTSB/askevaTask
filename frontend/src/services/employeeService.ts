import apiClient from '@/api/axiosClient';
import type {
  Employee,
  CreateEmployeePayload,
  UpdateEmployeePayload,
  ApiResponse,
  PaginatedResponse,
  EmployeeQueryParams,
  DashboardStats,
} from '@/types';


export const employeeService = {
  getAll: async (
    params: EmployeeQueryParams = {},
  ): Promise<PaginatedResponse<Employee>> => {
    const { data } = await apiClient.get<PaginatedResponse<Employee>>(
      '/employees',
      { params },
    );
    return data;
  },

  getById: async (id: string): Promise<ApiResponse<Employee>> => {
    const { data } = await apiClient.get<ApiResponse<Employee>>(`/employees/${id}`);
    return data;
  },

  create: async (
    payload: CreateEmployeePayload,
  ): Promise<ApiResponse<Employee>> => {
    const { data } = await apiClient.post<ApiResponse<Employee>>(
      '/employees',
      payload,
    );
    return data;
  },

  update: async (
    id: string,
    payload: UpdateEmployeePayload,
  ): Promise<ApiResponse<Employee>> => {
    const { data } = await apiClient.put<ApiResponse<Employee>>(
      `/employees/${id}`,
      payload,
    );
    return data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const { data } = await apiClient.delete<ApiResponse<null>>(
      `/employees/${id}`,
    );
    return data;
  },

  getDashboardStats: async (): Promise<ApiResponse<DashboardStats>> => {
    const { data } =
      await apiClient.get<ApiResponse<DashboardStats>>('/dashboard/stats');
    return data;
  },
};
