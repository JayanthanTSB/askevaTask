import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  RiMenuLine,
  RiBellLine,
  RiUserLine,
  RiLogoutBoxLine,
  RiSettings4Line,
} from 'react-icons/ri';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/constants';
import { cn } from '@/utils';
import toast from 'react-hot-toast';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Dashboard',
  '/employees': 'Employees',
  '/analytics': 'Analytics',
};

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const pageTitle = PAGE_TITLES[location.pathname] ?? 'Dashboard';

  
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = async () => {
    setDropdownOpen(false);
    await logout();
    toast.success('Logged out successfully');
    navigate(ROUTES.LOGIN);
  };

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-surface-800 bg-surface-950 px-4 sm:px-6">
      {}
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
          className="rounded-lg p-2 text-surface-400 transition-colors hover:bg-surface-800 hover:text-surface-100 lg:hidden"
        >
          <RiMenuLine size={20} />
        </button>
        <h1 className="text-lg font-semibold text-surface-100">{pageTitle}</h1>
      </div>

      {}
      <div className="flex items-center gap-2">
        {}
        <button
          aria-label="Notifications"
          className="relative rounded-lg p-2 text-surface-400 transition-colors hover:bg-surface-800 hover:text-surface-100"
        >
          <RiBellLine size={20} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary-500" />
        </button>

        {}
        <div ref={dropdownRef} className="relative">
          <button
            id="user-menu-btn"
            aria-label="User menu"
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-surface-400 transition-colors hover:bg-surface-800 hover:text-surface-100"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-500/20 text-sm font-semibold text-primary-400">
              <RiUserLine size={16} />
            </div>
            <span className="hidden text-sm font-medium text-surface-200 sm:block">
              {user?.name}
            </span>
          </button>

          {}
          {dropdownOpen && (
            <div
              className={cn(
                'absolute right-0 top-full z-50 mt-2 w-52',
                'rounded-xl border border-surface-700 bg-surface-900 py-1.5',
                'shadow-modal animate-fade-in',
              )}
            >
              <div className="border-b border-surface-800 px-4 py-2.5">
                <p className="text-sm font-semibold text-surface-100">{user?.name}</p>
                <p className="text-xs text-surface-400">{user?.email}</p>
                <span className="mt-1 inline-block rounded-full bg-primary-500/15 px-2 py-0.5 text-xs capitalize text-primary-400">
                  {user?.role}
                </span>
              </div>

              <button
                className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-surface-300 transition-colors hover:bg-surface-800 hover:text-surface-100"
                onClick={() => setDropdownOpen(false)}
              >
                <RiSettings4Line size={15} />
                Settings
              </button>

              <button
                className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-danger-400 transition-colors hover:bg-danger-500/10"
                onClick={handleLogout}
              >
                <RiLogoutBoxLine size={15} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
