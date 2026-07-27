
import {
  RiArrowUpSLine,
  RiArrowDownSLine,
  RiEditLine,
  RiDeleteBin6Line,
  RiEyeLine,
} from 'react-icons/ri';
import { Avatar } from '@/components/ui/Avatar';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SkeletonRow } from '@/components/ui/Skeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { formatDate, formatCurrency, cn } from '@/utils';
import type { Employee } from '@/types';
import type { EmployeeStatus } from '@/constants';

type SortField = 'fullName' | 'department' | 'salary' | 'joiningDate' | 'status';
type SortOrder = 'asc' | 'desc';

interface EmployeeTableProps {
  employees: Employee[];
  isLoading: boolean;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
  onView: (employee: Employee) => void;
  sort: SortField;
  order: SortOrder;
  onSort: (field: SortField) => void;
}

interface ColHeader {
  key: SortField;
  label: string;
  sortable?: boolean;
}

const COLUMNS: ColHeader[] = [
  { key: 'fullName', label: 'Employee', sortable: true },
  { key: 'department', label: 'Department', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'salary', label: 'Salary', sortable: true },
  { key: 'joiningDate', label: 'Joined', sortable: true },
];

function SortIcon({ field, sort, order }: { field: SortField; sort: SortField; order: SortOrder }) {
  if (field !== sort) {
    return <span className="text-surface-600">⇅</span>;
  }
  return order === 'asc' ? (
    <RiArrowUpSLine className="text-primary-400" size={16} />
  ) : (
    <RiArrowDownSLine className="text-primary-400" size={16} />
  );
}

export function EmployeeTable({
  employees,
  isLoading,
  onEdit,
  onDelete,
  onView,
  sort,
  order,
  onSort,
}: EmployeeTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-surface-800">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          {}
          <thead>
            <tr className="border-b border-surface-800 bg-surface-900/80">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-surface-400',
                    col.sortable && 'cursor-pointer select-none hover:text-surface-200',
                  )}
                  onClick={col.sortable ? () => onSort(col.key) : undefined}
                >
                  <div className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && (
                      <SortIcon field={col.key} sort={sort} order={order} />
                    )}
                  </div>
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-surface-400">
                Actions
              </th>
            </tr>
          </thead>

          {}
          <tbody className="divide-y divide-surface-800 bg-surface-950">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <SkeletonRow key={i} cols={6} />
              ))
            ) : employees.length === 0 ? (
              <tr>
                <td colSpan={6}>
                  <EmptyState
                    icon="👤"
                    title="No employees found"
                    description="Try adjusting your search or filter criteria."
                  />
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr
                  key={emp._id}
                  className="group transition-colors hover:bg-surface-900"
                >
                  {}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar
                        name={emp.fullName}
                        src={emp.profileImage}
                        size="sm"
                      />
                      <div>
                        <p className="font-medium text-surface-100 group-hover:text-primary-400 transition-colors">
                          {emp.fullName}
                        </p>
                        <p className="text-xs text-surface-500">{emp.email}</p>
                      </div>
                    </div>
                  </td>

                  {}
                  <td className="px-4 py-3">
                    <span className="text-surface-300">{emp.department}</span>
                    <p className="text-xs text-surface-500">{emp.designation}</p>
                  </td>

                  {}
                  <td className="px-4 py-3">
                    <Badge variant="status" status={emp.status as EmployeeStatus}>
                      {emp.status}
                    </Badge>
                  </td>

                  {}
                  <td className="px-4 py-3 text-surface-300">
                    {formatCurrency(emp.salary)}
                  </td>

                  {}
                  <td className="px-4 py-3 text-surface-400">
                    {formatDate(emp.joiningDate)}
                  </td>

                  {}
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="View employee"
                        onClick={() => onView(emp)}
                        className="text-surface-400 hover:text-primary-400"
                      >
                        <RiEyeLine size={15} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Edit employee"
                        onClick={() => onEdit(emp)}
                        className="text-surface-400 hover:text-primary-400"
                      >
                        <RiEditLine size={15} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        aria-label="Delete employee"
                        onClick={() => onDelete(emp)}
                        className="text-surface-400 hover:text-danger-400"
                      >
                        <RiDeleteBin6Line size={15} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
