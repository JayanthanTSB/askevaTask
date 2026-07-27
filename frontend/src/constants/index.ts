
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';


export const APP_NAME = 'EmpManage';
export const APP_VERSION = '1.0.0';


export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];


export const DEPARTMENTS = [
  'Engineering',
  'Marketing',
  'Sales',
  'Human Resources',
  'Finance',
  'Operations',
  'Design',
  'Legal',
  'Customer Support',
  'Product',
] as const;

export type Department = (typeof DEPARTMENTS)[number];


export const DESIGNATIONS = [
  'Software Engineer',
  'Senior Software Engineer',
  'Lead Engineer',
  'Engineering Manager',
  'Product Manager',
  'UI/UX Designer',
  'Data Analyst',
  'DevOps Engineer',
  'QA Engineer',
  'HR Manager',
  'Financial Analyst',
  'Marketing Manager',
  'Sales Executive',
  'Customer Support Executive',
  'Operations Manager',
] as const;

export type Designation = (typeof DESIGNATIONS)[number];


export const EMPLOYEE_STATUS = ['active', 'inactive', 'on-leave'] as const;

export type EmployeeStatus = (typeof EMPLOYEE_STATUS)[number];


export const STATUS_COLOR_MAP: Record<EmployeeStatus, string> = {
  active: 'text-success-400 bg-success-500/10 border-success-500/20',
  inactive: 'text-danger-400 bg-danger-500/10 border-danger-500/20',
  'on-leave': 'text-warning-400 bg-warning-500/10 border-warning-500/20',
};


export const STORAGE_KEYS = {
  TOKEN: 'emp_token',
  USER: 'emp_user',
} as const;


export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/',
  EMPLOYEES: '/employees',
  EMPLOYEE_NEW: '/employees/new',
  EMPLOYEE_EDIT: (id: string) => `/employees/${id}/edit`,
  EMPLOYEE_VIEW: (id: string) => `/employees/${id}`,
  ANALYTICS: '/analytics',
} as const;
