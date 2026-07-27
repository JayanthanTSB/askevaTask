import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { RiEyeLine, RiEyeOffLine, RiMailLine, RiLockLine } from 'react-icons/ri';
import { useAuth } from '@/context/AuthContext';
import { ROUTES, APP_NAME } from '@/constants';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';


const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
  register,
  handleSubmit,
  setValue,
  formState: { errors, isSubmitting },
} = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data);
      toast.success('Welcome back! 👋');
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const message = err.response?.data?.message ?? 'Invalid credentials. Please try again.';
      toast.error(message);
    }
  };

  
  const fillDemo = (role: 'admin' | 'hr') => {
  const credentials = {
    admin: {
      email: 'admin@empmanage.com',
      password: 'Admin@123',
    },
    hr: {
      email: 'hr@empmanage.com',
      password: 'Hr@12345',
    },
  };

  const { email, password } = credentials[role];

  setValue('email', email, {
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch: true,
  });

  setValue('password', password, {
    shouldValidate: true,
    shouldDirty: true,
    shouldTouch: true,
  });
};

  return (
    <div className="flex min-h-screen bg-surface-950">
      {}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-surface-900 p-12 lg:flex lg:w-1/2">
        {}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-96 w-96 rounded-full bg-primary-500 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-primary-400 blur-3xl" />
        </div>

        <div className="relative">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-base font-bold text-white backdrop-blur-sm">
              EM
            </div>
            <span className="text-xl font-bold text-white">{APP_NAME}</span>
          </div>
        </div>

        <div className="relative space-y-6">
          <div className="space-y-2">
            <h2 className="text-4xl font-bold leading-tight text-white">
              Manage your team
              <br />
              <span className="text-primary-300">efficiently.</span>
            </h2>
            <p className="text-lg text-primary-200/80">
              A modern employee management platform built for growing teams.
            </p>
          </div>

          {}
          <ul className="space-y-3">
            {[
              'Real-time employee analytics',
              'Role-based access control',
              'Advanced search & filtering',
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm text-primary-100">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary-500/30 text-primary-300 text-xs">
                  ✓
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative text-sm text-primary-300/60">
          © 2026 {APP_NAME}. Enterprise Employee Management.
        </p>
      </div>

      {}
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md animate-fade-in space-y-8">
          {}
          <div className="flex items-center gap-2 lg:hidden">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-600 text-sm font-bold text-white">
              EM
            </div>
            <span className="text-lg font-bold text-surface-100">{APP_NAME}</span>
          </div>

          {}
          <div>
            <h1 className="text-2xl font-bold text-surface-100">Sign in to your account</h1>
            <p className="mt-1 text-sm text-surface-400">
              Enter your credentials to access the dashboard.
            </p>
          </div>

          {}
          <div className="rounded-xl border border-primary-500/20 bg-primary-500/5 p-4">
            <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-primary-400">
              Demo Accounts
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => fillDemo('admin')}
                className="flex-1 rounded-lg bg-surface-800 py-1.5 text-xs font-medium text-surface-300 transition-colors hover:bg-surface-700 hover:text-surface-100"
              >
                Admin
              </button>
              <button
                type="button"
                onClick={() => fillDemo('hr')}
                className="flex-1 rounded-lg bg-surface-800 py-1.5 text-xs font-medium text-surface-300 transition-colors hover:bg-surface-700 hover:text-surface-100"
              >
                HR Manager
              </button>
            </div>
          </div>

          {}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            <Input
              id="email"
              label="Email address"
              type="email"
              placeholder="admin@empmanage.com"
              autoComplete="email"
              required
              leftIcon={<RiMailLine size={16} />}
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              leftIcon={<RiLockLine size={16} />}
              error={errors.password?.message}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-surface-400 hover:text-surface-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <RiEyeOffLine size={16} /> : <RiEyeLine size={16} />}
                </button>
              }
              {...register('password')}
            />

            <Button
              type="submit"
              className="w-full"
              size="lg"
              isLoading={isSubmitting}
            >
              {isSubmitting ? 'Signing in…' : 'Sign in'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
