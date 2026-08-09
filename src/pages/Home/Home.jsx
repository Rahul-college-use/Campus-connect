import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';
import heroImage from '../../assets/images/heroImage.png';

const LIVE_EVENTS = [
  {
    title: 'Inauguration Ceremony',
    description: 'Opening keynote and welcome address',
    viewers: '2.4k watching',
    status: 'Live',
  },
  {
    title: 'Coding Battle Round 2',
    description: 'Real-time algorithm challenges and leaderboard updates',
    viewers: '1.6k watching',
    status: 'Live',
  },
  {
    title: 'Robotics Challenge',
    description: 'Engineering teams compete with autonomous robots',
    viewers: '940 watching',
    status: 'Live',
  },
];

const UPCOMING_EVENTS = [
  { title: 'Hackathon 2026', date: 'May 18', category: 'Tech', seats: '24 spots left' , register: "https://google.com" , description: "Hackathon 2026 details",image: "https://images.unsplash.com/photo-1581091870620-3c7f1e5b6f8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
  { title: 'Dance Competition', date: 'May 20', category: 'Creative', seats: '18 spots left' , register: "https://google.com" , description: "Dance Competition details",image: "https://images.unsplash.com/photo-1544551763-9ab0d531200d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
  { title: 'Photography Contest', date: 'May 22', category: 'Arts', seats: '30 spots left' , register: "https://google.com" , description: "Photography Contest details",image: "https://images.unsplash.com/photo-1470071459404-37995c9b76a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
  { title: 'Football Tournament', date: 'May 25', category: 'Sports', seats: '12 spots left' , register: "https://google.com" , description: "Football Tournament details",image: "https://images.unsplash.com/photo-1517646287270-a5a9ca602a7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
];

const CATEGORIES = [
  { label: 'Technical', icon: '⚙️' },
  { label: 'Cultural', icon: '🎭' },
  { label: 'Sports', icon: '🏆' },
  { label: 'Creative', icon: '🎨' },
  { label: 'Innovation', icon: '💡' },
  { label: 'Workshops', icon: '🧑‍🏫' },
];

const STAT_CARDS = [
  { label: 'Events', value: '50+' },
  { label: 'Participants', value: '2500+' },
  { label: 'Departments', value: '20+' },
  { label: 'Volunteers', value: '100+' },
  { label: 'Memories', value: '5000+' },
];

const TOP_WINNERS = [
  { name: 'Rahul Verma', score: '98.4', role: 'Coding Champion' },
  { name: 'Arun Singh', score: '96.6', role: 'Hackathon Winner' },
  { name: 'Priya Sharma', score: '94.2', role: 'Design Lead' },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-[2rem] bg-slate-950 text-white shadow-2xl">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Campus events showcase"
            className="h-full w-full object-cover object-center opacity-100"
          />
          <div className="absolute inset-0 bg-slate-950/90" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-14 sm:px-8 lg:px-12 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                Live events happening now
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  Where Campus <span className="text-blue-400">Comes Alive</span>.
                </h1>
                <p className="max-w-xl text-base leading-8 text-slate-300">
                  Discover amazing events, connect with people and create unforgettable memories while exploring the biggest campus celebration of the year.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link to="/explore">
                  <Button variant="primary" size="lg">Explore Events</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" size="lg" className="border-blue-400 text-blue-200 hover:bg-blue-500/20">
                    Register Now
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {STAT_CARDS.slice(0, 4).map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center">
                    <p className="text-2xl font-semibold text-white">{stat.value}</p>
                    <p className="text-sm text-slate-300">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {LIVE_EVENTS.map((event) => (
                <div key={event.title} className="rounded-[1.5rem] border border-white/10 bg-slate-900/90 p-6 shadow-xl backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-3 text-sm font-medium text-slate-300">
                    <span className="rounded-full bg-rose-500/15 px-3 py-1 text-rose-200">{event.status}</span>
                    <span>{event.viewers}</span>
                  </div>
                  <h2 className="mt-5 text-xl font-semibold text-white">{event.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{event.description}</p>
                  <div className="mt-6 flex items-center gap-3">
                    <Button variant="ghost" size="md" className="text-white border border-white/10 bg-white/5 hover:bg-white/10">
                      Watch Live
                    </Button>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                      Campus Connect
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">Upcoming Events</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">Plan your next campus adventure</h2>
          </div>
          <Link to="/explore" className="text-sm font-semibold text-blue-600 transition hover:text-blue-800">
            View All Events →
          </Link>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-4 lg:grid-cols-2">
          {UPCOMING_EVENTS.map((event) => (
            <div key={event.title} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex items-center justify-between text-sm font-semibold text-slate-500">
                <span>{event.date}</span>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-blue-600">{event.category}</span>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-slate-900">{event.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{event.seats}</p>
              <div className="mt-6 flex items-center gap-3">
                <Button variant="secondary" size="sm" onClick={() => window.open(event.register, '_blank')}>
                  Register
                </Button>
                <Link to={`/events/${event.title.replace(/\s+/g, '-').toLowerCase()}`} state={{ details: event }} className="text-sm font-semibold text-blue-600 transition hover:text-blue-800">
                  Details
                </Link>
              
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">Explore categories</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">Discover events by interest</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {CATEGORIES.map((category) => (
                <div key={category.label} className="flex items-center gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-100 text-2xl">{category.icon}</div>
                  <div>
                    <p className="font-semibold text-slate-900">{category.label}</p>
                    <p className="text-sm text-slate-500">Explore popular campus activities</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {STAT_CARDS.map((stat) => (
                <div key={stat.label} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-center shadow-sm">
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">Top Winners</p>
                  <h3 className="mt-2 text-2xl font-bold text-slate-900">Leaderboards</h3>
                </div>
                <Button variant="ghost" size="sm" className="text-slate-700 border border-slate-200 bg-slate-100 hover:bg-slate-200">
                  View full board
                </Button>
              </div>

              <div className="mt-8 space-y-4">
                {TOP_WINNERS.map((winner) => (
                  <div key={winner.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold text-slate-900">{winner.name}</p>
                        <p className="text-sm text-slate-500">{winner.role}</p>
                      </div>
                      <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">{winner.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}