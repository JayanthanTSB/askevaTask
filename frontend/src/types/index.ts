
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'hr' | 'viewer';
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: AuthUser;
}


export interface Employee {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  status: 'active' | 'inactive' | 'on-leave';
  joiningDate: string;
  address: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export type CreateEmployeePayload = Omit<Employee, '_id' | 'createdAt' | 'updatedAt'>;
export type UpdateEmployeePayload = Partial<CreateEmployeePayload>;


export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}


export interface EmployeeQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  department?: string;
  status?: string;
  designation?: string;
  sort?: string;
  order?: 'asc' | 'desc';
}


export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  inactiveEmployees: number;
  newThisMonth: number;
  departmentDistribution: Array<{ _id: string; count: number }>;
  statusDistribution: Array<{ _id: string; count: number }>;
  monthlyJoiningTrend: Array<{ month: string; count: number }>;
}
