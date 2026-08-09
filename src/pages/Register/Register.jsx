import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../components/ui/Toast/ToastContext';
import Button from '../../components/ui/Button/Button';
import FormField from '../../components/ui/FormField/FormField';
import Input from '../../components/ui/Input/Input';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const toast = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please complete all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setError('');
    toast.addToast({
      title: 'Registration successful',
      message: 'Your account has been created. You can now log in.',
      variant: 'success',
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">Register</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">Create your Campus Connect account</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Sign up to discover events, save favorites, and manage your campus experience.</p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <FormField label="Full Name" htmlFor="register-name" error={error && !name ? error : ''}>
              <Input
                id="register-name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FormField>

            <FormField label="Email" htmlFor="register-email" error={error && !email ? error : ''}>
              <Input
                id="register-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormField>

            <FormField label="Password" htmlFor="register-password" error={error && (!password || password !== confirmPassword) ? error : ''}>
              <Input
                id="register-password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </FormField>

            <FormField label="Confirm Password" htmlFor="register-confirm" error={error && !confirmPassword ? error : ''}>
              <Input
                id="register-confirm"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
            </FormField>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Button type="submit" variant="primary" size="lg" className="w-full sm:w-auto">Create Account</Button>
              <Link to="/login" className="text-sm font-semibold text-blue-600 transition hover:text-blue-800">
                Already have an account? Login
              </Link>
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-500">
            Join the campus community in a few seconds.
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-950">Start your campus journey</h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Register in minutes and unlock event invitations, campus news, and access to the newest competitions.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">Fast onboarding</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">Start exploring events with a secure student profile.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">Personal experience</p>
              <p className="mt-3 text-lg font-semibold text-slate-900">Save favorites, track registrations, and get important reminders.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
