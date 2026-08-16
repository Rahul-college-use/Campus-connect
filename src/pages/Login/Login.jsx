import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ui/Toast/ToastContext';
import Button from '../../components/ui/Button/Button';
import FormField from '../../components/ui/FormField/FormField';
import Input from '../../components/ui/Input/Input';

import { useAuth } from '../../context/auth.context';
import apiServices from '../../context/api.context';

export default function Login() {

  const { login: contextLogin } = useAuth();
  // console.log(contextLogin)
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    try {
      setLoading(true);

      const response = await apiServices.login({ email, password });
      const data = response.data; // Axios रिस्पॉन्स डेटा

      if (data && data.token) {
        contextLogin(data.user, data.token);
      }

      toast.addToast({
        title: 'Login successful',
        message: 'Welcome back! You are now logged in.',
        variant: 'success',
      });

      navigate('/admin');

    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Invalid email or password.';
      setError(errMsg);
      toast.addToast({
        title: 'Access Denied',
        message: errMsg,
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-500">
            Secure campus access for students and organizers.
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-950">Login to Campus Connect</h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Access event registrations, view your personalized schedule, and manage your participation in one place.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">Attendee</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">Join live sessions, register for events, and track your progress.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">Organizer</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">Manage event details, publish schedules, and coordinate volunteers.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">Login</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">Welcome back</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Use your registered account to continue.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <FormField label="Email" htmlFor="login-email">
              <Input
                id="login-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormField>

            <FormField label="Password" htmlFor="login-password">
              <Input
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormField>

            {error && <p className="text-sm font-medium text-red-600">{error}</p>}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={loading}
                className="w-full sm:w-auto"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              <Link to="/register" className="text-sm font-semibold text-blue-600 transition hover:text-blue-800">
                Need an account? Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}