import { useState, useCallback } from 'react';
import { RiAddLine, RiFilterLine } from 'react-icons/ri';
import { useEmployees } from '@/hooks/useEmployees';
import { useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from '@/hooks/useEmployeeMutations';
import { useDebounce } from '@/hooks/useDebounce';
import { EmployeeTable } from '@/components/tables/EmployeeTable';
import { EmployeeForm, type EmployeeFormData } from '@/components/forms/EmployeeForm';
import { SearchBar } from '@/components/ui/SearchBar';
import { Pagination } from '@/components/ui/Pagination';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';
import { formatDate, formatCurrency } from '@/utils';
import { DEPARTMENTS, EMPLOYEE_STATUS, DEFAULT_PAGE_SIZE } from '@/constants';
import type { Employee } from '@/types';
import type { EmployeeStatus } from '@/constants';

type SortField = 'fullName' | 'department' | 'salary' | 'joiningDate' | 'status';
type SortOrder = 'asc' | 'desc';
type ModalMode = 'create' | 'edit' | 'view' | null;

const DEPT_FILTER_OPTIONS = [
  { value: '', label: 'All Departments' },
  ...DEPARTMENTS.map((d) => ({ value: d, label: d })),
];

const STATUS_FILTER_OPTIONS = [
  { value: '', label: 'All Statuses' },
  ...EMPLOYEE_STATUS.map((s) => ({
    value: s,
    label: s.charAt(0).toUpperCase() + s.slice(1).replace('-', ' '),
  })),
];

export default function EmployeesPage() {
  
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [department, setDepartment] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState<SortField>('createdAt' as SortField);
  const [order, setOrder] = useState<SortOrder>('desc');
  const [showFilters, setShowFilters] = useState(false);

  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);

  
  const search = useDebounce(searchInput, 400);

  
  const { data, isLoading } = useEmployees({
    page,
    limit: DEFAULT_PAGE_SIZE,
    search,
    department,
    status,
    sort,
    order,
  });

  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee(selectedEmployee?._id ?? '');
  const deleteMutation = useDeleteEmployee();

  const employees = data?.data ?? [];
  const pagination = data?.pagination;

  
  const handleSort = useCallback((field: SortField) => {
    if (field === sort) {
      setOrder((o) => (o === 'asc' ? 'desc' : 'asc'));
    } else {
      setSort(field);
      setOrder('asc');
    }
    setPage(1);
  }, [sort]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setPage(1);
  };

  const handleFilterChange = (key: 'department' | 'status', value: string) => {
    if (key === 'department') setDepartment(value);
    if (key === 'status') setStatus(value);
    setPage(1);
  };

  const openCreate = () => {
    setSelectedEmployee(null);
    setModalMode('create');
  };

  const openEdit = (emp: Employee) => {
    setSelectedEmployee(emp);
    setModalMode('edit');
  };

  const openView = (emp: Employee) => {
    setSelectedEmployee(emp);
    setModalMode('view');
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedEmployee(null);
  };

  const handleCreate = async (formData: EmployeeFormData) => {
    await createMutation.mutateAsync({
      ...formData,
      address: formData.address ?? '',
      profileImage: formData.profileImage ?? undefined,
    });
    closeModal();
  };

  const handleUpdate = async (formData: EmployeeFormData) => {
    if (!selectedEmployee) return;
    await updateMutation.mutateAsync({
      ...formData,
      address: formData.address ?? '',
      profileImage: formData.profileImage ?? undefined,
    });
    closeModal();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget._id);
    setDeleteTarget(null);
  };

  
  const activeFilters = [department, status].filter(Boolean).length;

  return (
    <div className="space-y-6 animate-fade-in">
      {}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-surface-100">Employees</h2>
          <p className="mt-1 text-sm text-surface-400">
            {pagination ? `${pagination.total} employees total` : 'Manage your team'}
          </p>
        </div>
        <Button
          leftIcon={<RiAddLine size={16} />}
          onClick={openCreate}
          id="add-employee-btn"
        >
          Add Employee
        </Button>
      </div>

      {}
      <Card className="p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar
            value={searchInput}
            onChange={handleSearchChange}
            className="flex-1"
          />

          <Button
            variant="outline"
            size="sm"
            leftIcon={<RiFilterLine size={14} />}
            onClick={() => setShowFilters((v) => !v)}
            className="shrink-0"
          >
            Filters
            {activeFilters > 0 && (
              <span className="ml-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">
                {activeFilters}
              </span>
            )}
          </Button>
        </div>

        {}
        {showFilters && (
          <div className="mt-4 flex flex-col gap-3 border-t border-surface-800 pt-4 sm:flex-row">
            <Select
              options={DEPT_FILTER_OPTIONS}
              value={department}
              onChange={(e) => handleFilterChange('department', e.target.value)}
              className="sm:w-52"
            />
            <Select
              options={STATUS_FILTER_OPTIONS}
              value={status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="sm:w-44"
            />
            {activeFilters > 0 && (
              <button
                onClick={() => {
                  setDepartment('');
                  setStatus('');
                  setPage(1);
                }}
                className="text-sm text-primary-400 hover:text-primary-300 sm:self-end"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </Card>

      {}
      <EmployeeTable
        employees={employees}
        isLoading={isLoading}
        sort={sort}
        order={order}
        onSort={handleSort}
        onEdit={openEdit}
        onDelete={(emp) => setDeleteTarget(emp)}
        onView={openView}
      />

      {}
      {pagination && pagination.pages > 1 && (
        <Pagination
          page={page}
          totalPages={pagination.pages}
          total={pagination.total}
          limit={DEFAULT_PAGE_SIZE}
          onPageChange={setPage}
        />
      )}

      {}
      <Modal
        isOpen={modalMode === 'create' || modalMode === 'edit'}
        onClose={closeModal}
        title={modalMode === 'create' ? 'Add New Employee' : 'Edit Employee'}
        size="lg"
      >
        <EmployeeForm
          mode={modalMode === 'edit' ? 'edit' : 'create'}
          defaultValues={modalMode === 'edit' ? selectedEmployee ?? undefined : undefined}
          onSubmit={modalMode === 'edit' ? handleUpdate : handleCreate}
          onCancel={closeModal}
          isSubmitting={createMutation.isPending || updateMutation.isPending}
        />
      </Modal>

      {}
      <Modal
        isOpen={modalMode === 'view'}
        onClose={closeModal}
        title="Employee Details"
        size="md"
      >
        {selectedEmployee && (
          <div className="space-y-5">
            {}
            <div className="flex items-center gap-4">
              <Avatar
                name={selectedEmployee.fullName}
                src={selectedEmployee.profileImage}
                size="xl"
              />
              <div>
                <h3 className="text-lg font-semibold text-surface-100">
                  {selectedEmployee.fullName}
                </h3>
                <p className="text-sm text-surface-400">{selectedEmployee.designation}</p>
                <Badge
                  variant="status"
                  status={selectedEmployee.status as EmployeeStatus}
                  className="mt-1"
                >
                  {selectedEmployee.status}
                </Badge>
              </div>
            </div>

            {}
            <div className="grid grid-cols-2 gap-4 rounded-xl bg-surface-800/50 p-4">
              {[
                { label: 'Email', value: selectedEmployee.email },
                { label: 'Phone', value: selectedEmployee.phone },
                { label: 'Department', value: selectedEmployee.department },
                { label: 'Salary', value: formatCurrency(selectedEmployee.salary) },
                { label: 'Joining Date', value: formatDate(selectedEmployee.joiningDate) },
                { label: 'Address', value: selectedEmployee.address || '—' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs text-surface-500">{label}</p>
                  <p className="mt-0.5 text-sm font-medium text-surface-200 break-all">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button variant="outline" size="sm" onClick={() => { closeModal(); openEdit(selectedEmployee); }}>
                Edit
              </Button>
              <Button variant="ghost" size="sm" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Employee"
        description={`Are you sure you want to delete "${deleteTarget?.fullName}"? This action cannot be undone.`}
        confirmLabel="Delete"
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
}
