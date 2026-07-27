import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DEPARTMENTS, DESIGNATIONS, EMPLOYEE_STATUS } from '@/constants';
import { Input, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { Employee } from '@/types';


const employeeSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  department: z.string().min(1, 'Department is required'),
  designation: z.string().min(2, 'Designation is required'),
  salary: z.string().min(1, 'Salary is required'),
  status: z.enum(['active', 'inactive', 'on-leave']),
  joiningDate: z.string().min(1, 'Joining date is required'),
  address: z.string().optional(),
  profileImage: z
    .string()
    .url('Must be a valid URL')
    .optional()
    .or(z.literal('')),
});

type EmployeeRawForm = z.infer<typeof employeeSchema>;

export interface EmployeeFormData {
  fullName: string;
  email: string;
  phone: string;
  department: string;
  designation: string;
  salary: number;
  status: 'active' | 'inactive' | 'on-leave';
  joiningDate: string;
  address?: string;
  profileImage?: string;
}

interface EmployeeFormProps {
  defaultValues?: Partial<Employee>;
  onSubmit: (data: EmployeeFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
  mode: 'create' | 'edit';
}

const DEPT_OPTIONS = DEPARTMENTS.map((d) => ({ value: d, label: d }));
const DESIG_OPTIONS = DESIGNATIONS.map((d) => ({ value: d, label: d }));
const STATUS_OPTIONS = EMPLOYEE_STATUS.map((s) => ({
  value: s,
  label: s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' '),
}));

export function EmployeeForm({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  mode,
}: EmployeeFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeRawForm>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      department: '',
      designation: '',
      salary: '0',
      status: 'active',
      joiningDate: new Date().toISOString().split('T')[0],
      address: '',
      profileImage: '',
    },
  });

  
  useEffect(() => {
    if (defaultValues) {
      reset({
        fullName: defaultValues.fullName ?? '',
        email: defaultValues.email ?? '',
        phone: defaultValues.phone ?? '',
        department: defaultValues.department ?? '',
        designation: defaultValues.designation ?? '',
        salary: String(defaultValues.salary ?? 0),
        status: defaultValues.status ?? 'active',
        joiningDate: defaultValues.joiningDate
          ? defaultValues.joiningDate.split('T')[0]
          : new Date().toISOString().split('T')[0],
        address: defaultValues.address ?? '',
        profileImage: defaultValues.profileImage ?? '',
      });
    }
  }, [defaultValues, reset]);

  
  const handleValidSubmit: SubmitHandler<EmployeeRawForm> = async (raw) => {
    await onSubmit({
      ...raw,
      salary: parseFloat(raw.salary) || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleValidSubmit)} noValidate className="space-y-5">
      {}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Full Name"
          placeholder="Arjun Sharma"
          required
          error={errors.fullName?.message}
          {...register('fullName')}
        />
        <Input
          label="Email"
          type="email"
          placeholder="arjun@company.com"
          required
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      {}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          label="Phone"
          placeholder="+91 98765 43210"
          required
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Input
          label="Salary (₹)"
          type="number"
          placeholder="600000"
          required
          error={errors.salary?.message}
          {...register('salary')}
        />
      </div>

      {}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Department"
          placeholder="Select department"
          required
          options={DEPT_OPTIONS}
          error={errors.department?.message}
          {...register('department')}
        />
        <Select
          label="Designation"
          placeholder="Select designation"
          required
          options={DESIG_OPTIONS}
          error={errors.designation?.message}
          {...register('designation')}
        />
      </div>

      {}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Status"
          options={STATUS_OPTIONS}
          error={errors.status?.message}
          {...register('status')}
        />
        <Input
          label="Joining Date"
          type="date"
          required
          error={errors.joiningDate?.message}
          {...register('joiningDate')}
        />
      </div>

      {}
      <Input
        label="Address"
        placeholder="123, MG Road, Bengaluru, India"
        error={errors.address?.message}
        {...register('address')}
      />

      <Input
        label="Profile Image URL"
        type="url"
        placeholder="https://..."
        error={errors.profileImage?.message}
        hint="Leave blank to use auto-generated avatar"
        {...register('profileImage')}
      />

      {}
      <div className="flex items-center justify-end gap-3 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {mode === 'create' ? 'Create Employee' : 'Save Changes'}
        </Button>
      </div>
    </form>
  );
}
