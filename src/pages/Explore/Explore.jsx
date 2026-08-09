import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';
import useLocalStorage from '../../hooks/useLocalStorage';
import { DEFAULT_EVENTS, EVENT_CATEGORIES } from '../../utils/events';

const FILTERS = EVENT_CATEGORIES;

export default function Explore() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [events] = useLocalStorage('campus-events', DEFAULT_EVENTS);
  const navigate = useNavigate();

  const visibleEvents = useMemo(
    () => events.filter((event) => event.active !== false),
    [events]
  );

  const filteredEvents = useMemo(() => {
    // 1. First Filter by Category and Search Term
    const matched = visibleEvents.filter((event) => {
      const matchesCategory =
        activeFilter === 'All' || event.category === activeFilter;

      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        event.title?.toLowerCase().includes(query) ||
        event.category?.toLowerCase().includes(query) ||
        event.description?.toLowerCase().includes(query) ||
        event.location?.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });

    // 2. Sort: Active events first, Ended/Past events last
    return matched.sort((a, b) => {
      const aEnded = a.isPast || a.registrationOpen === false;
      const bEnded = b.isPast || b.registrationOpen === false;

      // Agar 'a' active hai aur 'b' ended hai -> 'a' pehle aayega (-1)
      // Agar 'a' ended hai aur 'b' active hai -> 'b' pehle aayega (1)
      if (aEnded !== bEnded) {
        return aEnded ? 1 : -1;
      }

      return 0; // Agar dono active ya dono ended hain to unki position waisi hi rahegi
    });
  }, [activeFilter, searchTerm, visibleEvents]);

  // Helper function to navigate to EventDetails
  const handleViewDetails = (event) => {
    navigate('/events/:eventId', { state: { details: event } });
  };

  return (
    <div className="space-y-12">
      {/* Hero Header Section */}
      <section className="rounded-[2rem] bg-slate-900 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-8 text-white shadow-2xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-400">
              Explore Campus Events
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Find the perfect experience for every moment on campus.
            </h1>
            <p className="text-base leading-8 text-slate-300">
              Browse curated campus experiences across categories, save your
              favorites, and join the events that bring your community together.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register">
                <Button variant="primary" size="lg">
                  Get Started
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-400 text-blue-200 hover:bg-blue-500/20"
              >
                Browse Categories
              </Button>
            </div>
          </div>

          {/* Featured Dynamic Cards */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {visibleEvents.slice(0, 3).map((event) => {
              const isPast = event.isPast || event.registrationOpen === false;
              return (
                <div
                  key={event.id || event.title}
                  onClick={() => handleViewDetails(event)}
                  className="cursor-pointer rounded-[1.5rem] border border-white/10 bg-slate-800/80 p-5 shadow-xl backdrop-blur-xl transition hover:border-white/30 hover:bg-slate-800"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
                      {event.category}
                    </p>
                    {isPast && (
                      <span className="rounded-full bg-red-500/20 px-2 py-0.5 text-[10px] font-bold text-red-300 border border-red-500/30">
                        Ended
                      </span>
                    )}
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-white">
                    {event.title}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-slate-300 line-clamp-2">
                    {event.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase text-slate-300">
                    <span className="rounded-full bg-white/10 px-3 py-1">
                      {event.date}
                    </span>
                    <span className="rounded-full bg-white/10 px-3 py-1">
                      {event.location}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Events Library & Filters */}
      <section className="grid gap-8 lg:grid-cols-[0.9fr_0.4fr]">
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">
                  Events Library
                </p>
                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  Explore by category or schedule
                </h2>
              </div>

              {/* Category Filter Pills */}
              <div role="tablist" aria-label="Event categories" className="flex flex-wrap gap-3">
                {FILTERS.map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    role="tab"
                    aria-selected={activeFilter === filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeFilter === filter
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search events (e.g. Freshers, Farewell, Hackathon)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 pl-11 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <svg
                className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-600"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Event Cards Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredEvents.map((event) => {
                const isPast =
                  event.isPast || event.registrationOpen === false;

                return (
                  <article
                    key={event.id || event.title}
                    className="flex flex-col justify-between rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
                        <span className="rounded-full bg-blue-50 px-3 py-1 font-medium text-blue-600">
                          {event.category}
                        </span>
                        <div className="flex items-center gap-2">
                          {isPast && (
                            <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-600">
                              Ended
                            </span>
                          )}
                          <span>📅 {event.date}</span>
                        </div>
                      </div>

                      <h3 className="mt-4 text-2xl font-semibold text-slate-900">
                        {event.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-600 line-clamp-3">
                        {event.description}
                      </p>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                        <span>📍 {event.location}</span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${isPast
                            ? 'bg-red-50 text-red-600'
                            : 'bg-slate-100 text-slate-700'
                            }`}
                        >
                          {event.seats}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap items-center gap-3 pt-2">
                      {isPast ? (
                        <Button
                          variant="outline"
                          size="sm"
                          disabled
                          className="border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed"
                        >
                          Event Ended
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleViewDetails(event)}
                        >
                          Register
                        </Button>
                      )}

                      <button
                        type="button"
                        onClick={() => handleViewDetails(event)}
                        className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                      >
                        Learn more →
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[1.75rem] border border-dashed border-slate-300 p-12 text-center">
              <p className="text-base font-medium text-slate-600">
                No events found matching "{searchTerm}".
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Try clearing your search term or choosing a different category.
              </p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-500">
              Why Explore Events
            </p>
            <h3 className="mt-2 text-2xl font-bold text-slate-900">
              Campus discovery made easy
            </h3>
          </div>
          <ul className="space-y-4 text-sm text-slate-600">
            <li className="flex gap-3">
              <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-blue-600" />
              Find events across tech, arts, sports, and leadership communities.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-blue-600" />
              Save favorites, review schedules, and RSVP from one central place.
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-3 w-3 shrink-0 rounded-full bg-blue-600" />
              Connect with fellow students, clubs, and organizers instantly.
            </li>
          </ul>
          <div className="rounded-3xl bg-blue-600 p-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-200">
              Featured event
            </p>
            <h4 className="mt-3 text-xl font-semibold">Startup Pitch Night</h4>
            <p className="mt-2 text-sm leading-6 text-blue-100">
              Pitch your ideas to campus leaders and network with founders at
              the innovation hub.
            </p>
            <Button
              variant="ghost"
              size="md"
              className="mt-4 border border-white/20 text-white hover:bg-white/10"
            >
              Save to calendar
            </Button>
          </div>
        </aside>
      </section>
    </div>
  );
}