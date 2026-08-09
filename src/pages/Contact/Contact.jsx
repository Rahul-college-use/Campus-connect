import { useState, useEffect } from 'react';
import { useToast } from '../../components/ui/Toast/ToastContext';
import Button from '../../components/ui/Button/Button';
import FormField from '../../components/ui/FormField/FormField';
import Input from '../../components/ui/Input/Input';

const CONTACT_FIELDS = [
  { label: 'Email', id: 'contact-email', type: 'email', placeholder: 'you@example.com' },
  { label: 'Subject', id: 'contact-subject', type: 'text', placeholder: 'Event question or feedback' },
];

export default function Contact() {
  const [formState, setFormState] = useState({
    email: '',
    subject: '',
    message: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleChange = (field) => (event) => {
    setFormState((prev) => ({ ...prev, [field]: event.target.value }));
    if (error) setError('');
  };

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!formState.email.trim() || !formState.subject.trim() || !formState.message.trim()) {
      setError('Please complete all fields before sending your message.');
      return;
    }

    if (!validateEmail(formState.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    // Simulate network submission delay
    setTimeout(() => {
      toast.addToast({
        title: 'Message sent',
        message: 'Our team will get back to you soon.',
        variant: 'success',
      });
      setFormState({ email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        {/* Info Column */}
        <div className="space-y-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">
            Contact Campus Connect
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Let us know how we can help.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-slate-600">
            Reach out with questions about events, registrations, or partnerships. We&apos;re here to support your campus experience.
          </p>

          <div className="gap-4 sm:grid-cols-2 ">
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">
                Email
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-900">
                support@campusconnect.io
              </p>
            </div>
            <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">
                Office
              </p>
              <p className="mt-3 text-lg font-semibold text-slate-900">
                Campus Events Center, Main Hall
              </p>
            </div>
          </div>
        </div>

        {/* Form Column */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">
              Send a message
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              We typically reply within one business day.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {CONTACT_FIELDS.map((field) => {
              const fieldName = field.id.split('-')[1];
              return (
                <FormField key={field.id} label={field.label} htmlFor={field.id} required>
                  <Input
                    id={field.id}
                    type={field.type}
                    placeholder={field.placeholder}
                    value={formState[fieldName]}
                    onChange={handleChange(fieldName)}
                    disabled={isSubmitting}
                  />
                </FormField>
              );
            })}

            <FormField label="Message" htmlFor="contact-message" required>
              <textarea
                id="contact-message"
                rows="6"
                value={formState.message}
                onChange={handleChange('message')}
                disabled={isSubmitting}
                placeholder="Tell us what you need help with"
                className="block w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 transition-colors duration-150 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-100 disabled:text-gray-500"
              />
            </FormField>

            {error && <p className="text-sm font-semibold text-red-600">{error}</p>}

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? 'Sending Message...' : 'Send Message'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}