import Button from '../../components/ui/Button/Button';

const VALUES = [
  {
    title: 'Innovation',
    description: 'We support bold campus ideas that empower students and organizers to create engaging events.',
  },
  {
    title: 'Community',
    description: 'We connect departments, volunteers, and participants with a shared platform for campus life.',
  },
  {
    title: 'Accessibility',
    description: 'Every experience is designed to be inclusive, easy to navigate, and welcoming.',
  },
];

const TEAM_MEMBERS = [
  { name: 'Asha Mehta', role: 'Event Coordinator' },
  { name: 'Nikhil Rao', role: 'Platform Designer' },
  { name: 'Sana Patel', role: 'Community Lead' },
];

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
      <div className="space-y-12">
        <section className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">About Campus Connect</p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-950">A hub for campus events, competitions, and unforgettable moments.</h1>
            <p className="max-w-xl text-lg leading-8 text-slate-600">
              Campus Connect brings together students, organizers, and volunteers by making event discovery simple, registration effortless, and community engagement more meaningful.
            </p>
            <Button variant="primary" size="lg">Explore Events</Button>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div className="grid gap-6">
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">Our mission</p>
                <p className="mt-4 text-base leading-7 text-slate-600">To power a vibrant campus culture by helping participants discover the best events and stay connected with every moment that matters.</p>
              </div>
              <div className="rounded-3xl bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">Our promise</p>
                <p className="mt-4 text-base leading-7 text-slate-600">Reliable communication, clear event details, and a streamlined experience across every device.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-3">
          {VALUES.map((value) => (
            <div key={value.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">{value.title}</h2>
              <p className="mt-4 text-slate-600">{value.description}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 p-10 text-white shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-300">Why choose us</p>
            <h2 className="mt-5 text-3xl font-bold tracking-tight">Built for every campus celebration.</h2>
            <ul className="mt-8 space-y-4 text-slate-300">
              <li className="rounded-3xl bg-slate-900/80 p-4">Centralized event discovery and registration.</li>
              <li className="rounded-3xl bg-slate-900/80 p-4">Live updates so participants never miss a moment.</li>
              <li className="rounded-3xl bg-slate-900/80 p-4">Mobile-friendly experience on every screen.</li>
            </ul>
          </div>

          <div className="grid gap-6">
            {TEAM_MEMBERS.map((member) => (
              <div key={member.name} className="rounded-[1.75rem] border border-slate-200 bg-white p-8 shadow-sm">
                <p className="text-base font-semibold text-slate-900">{member.name}</p>
                <p className="mt-2 text-sm text-slate-500">{member.role}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
