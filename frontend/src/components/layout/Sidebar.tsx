import { NavLink, useNavigate } from 'react-router-dom';
import {
  RiDashboardLine,
  RiTeamLine,
  RiBarChartLine,
  RiLogoutBoxLine,
  RiUserLine,
} from 'react-icons/ri';
import { useAuth } from '@/context/AuthContext';
import { ROUTES, APP_NAME } from '@/constants';
import { cn } from '@/utils';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', to: ROUTES.DASHBOARD, icon: <RiDashboardLine size={20} /> },
  { label: 'Employees', to: ROUTES.EMPLOYEES, icon: <RiTeamLine size={20} /> },
  { label: 'Analytics', to: ROUTES.ANALYTICS, icon: <RiBarChartLine size={20} /> },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
    navigate(ROUTES.LOGIN);
  };

  return (
    <>
      {}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-30 flex w-64 flex-col',
          'border-r border-surface-800 bg-surface-950',
          'transition-transform duration-300 ease-in-out',
          'lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {}
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-surface-800 px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-sm font-bold text-white">
            EM
          </div>
          <span className="text-base font-bold tracking-tight text-surface-100">
            {APP_NAME}
          </span>
        </div>

        {}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-surface-600">
            Menu
          </p>
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium',
                  'transition-all duration-150',
                  isActive
                    ? 'bg-primary-600/15 text-primary-400 border border-primary-500/20'
                    : 'text-surface-400 hover:bg-surface-800 hover:text-surface-100',
                )
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {}
        <div className="shrink-0 border-t border-surface-800 p-4 space-y-3">
          {}
          <div className="flex items-center gap-3 rounded-lg bg-surface-800/50 px-3 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-500/20 text-sm font-semibold text-primary-400">
              <RiUserLine size={16} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-surface-200">
                {user?.name ?? 'User'}
              </p>
              <p className="truncate text-xs capitalize text-surface-500">{user?.role}</p>
            </div>
          </div>

          {}
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<RiLogoutBoxLine size={16} />}
            onClick={handleLogout}
            className="w-full justify-start text-surface-400 hover:text-danger-400 hover:bg-danger-500/10"
          >
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
}
