import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';

const EventDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { details } = location.state || {};

  useEffect(() => {
    window.scroll({ top: 0, behavior: 'smooth' });
  }, []);

  // Fallback view when accessed directly without route state
  if (!details) {
    return (
      <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden rounded-[2rem] bg-slate-950 p-8 text-center text-white shadow-2xl">
        <div className="absolute -top-24 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-600/30 blur-[120px]" />
        <h2 className="text-3xl font-bold">Event Not Found</h2>
        <p className="mt-2 text-slate-400">
          No event details were found. Please select an event from the library.
        </p>
        <Button
          variant="primary"
          size="md"
          className="mt-6"
          onClick={() => navigate('/explore')}
        >
          Back to Explore
        </Button>
      </div>
    );
  }

  // Check if the event is completed or registration is closed
  const isClosedOrPast =
    details.isPast ||
    details.registrationOpen === false ||
    details.status === 'past';

  return (
    <div className="relative min-h-screen overflow-hidden rounded-[2.5rem] bg-slate-950 p-4 text-white sm:p-8">
      {/* BACKGROUND EFFECT 1: Ambient Blurred Backdrop from Image */}
      {details.image && (
        <div
          className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-center opacity-30 blur-3xl"
          style={{ backgroundImage: `url('${details.image}')` }}
        />
      )}

      {/* BACKGROUND EFFECT 2: Glowing Radial Gradients */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/25 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />

      {/* BACKGROUND EFFECT 3: Dark Overlay Grid Mask */}
      <div className="pointer-events-none absolute inset-0 bg-slate-950/70 backdrop-blur-xl" />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-4xl space-y-6">
        {/* Back Navigation Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white"
        >
          ← Back to Events
        </button>

        {/* Glassmorphic Event Card Container */}
        <article className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-900/50 shadow-2xl backdrop-blur-2xl">
          {/* Banner Image Container */}
          <div className="relative h-64 w-full overflow-hidden sm:h-96">
            {details.image ? (
              <img
                src={details.image}
                alt={details.title}
                className={`h-full w-full object-cover transition duration-300 ${
                  isClosedOrPast ? 'grayscale opacity-70' : ''
                }`}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-800 text-slate-400">
                <span>No Banner Image Available</span>
              </div>
            )}

            {/* Category Tag Overlay */}
            <div className="absolute left-6 top-6 flex gap-2">
              <span className="rounded-full bg-blue-600/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md">
                {details.category}
              </span>
              {isClosedOrPast && (
                <span className="rounded-full bg-red-600/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md">
                  Ended
                </span>
              )}
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          </div>

          {/* Details Body */}
          <div className="space-y-8 p-6 sm:p-10">
            {/* 1. Header & Title Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
                  {details.title}
                </h1>
                {details.location && (
                  <p className="flex items-center gap-1.5 text-sm font-medium text-slate-400">
                    📍 {details.location}
                  </p>
                )}
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 sm:flex-col sm:items-end">
                <span className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-slate-200 backdrop-blur-md">
                  📅 {details.date}
                </span>
                {details.seats && (
                  <span
                    className={`rounded-full border px-4 py-1.5 text-xs font-semibold backdrop-blur-md ${
                      isClosedOrPast
                        ? 'border-red-500/30 bg-red-500/15 text-red-300'
                        : 'border-blue-400/30 bg-blue-500/20 text-blue-300'
                    }`}
                  >
                    {isClosedOrPast ? '🔴 Event Completed' : `🎟️ ${details.seats}`}
                  </span>
                )}
              </div>
            </div>

            <hr className="border-white/10" />

            {/* 2. Overview / About Section */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-slate-200">
                About this event
              </h2>
              <p className="text-base leading-relaxed text-slate-300">
                {details.description}
              </p>
            </div>

            {/* 3. Event Schedule / Agenda */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-slate-200">
                Event Schedule & Agenda
              </h2>
              <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md">
                {(
                  details.agenda || [
                    { time: '10:00 AM', activity: 'Welcome Speech & Introduction' },
                    { time: '11:30 AM', activity: 'Main Event Session / Competition Round' },
                    { time: '02:00 PM', activity: 'Judging & Evaluation' },
                    { time: '04:00 PM', activity: 'Award Ceremony & Closing' },
                  ]
                ).map((slot, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-1 border-b border-white/5 pb-2.5 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:gap-4"
                  >
                    <span className="w-24 text-xs font-bold text-blue-400">
                      {slot.time}
                    </span>
                    <span className="text-sm text-slate-300">{slot.activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Guidelines & Perks Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Rules & Guidelines */}
              <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-blue-300">
                  Guidelines & Prerequisites
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li>• Open to all active college department students.</li>
                  <li>• Carry a valid Student ID card to the venue.</li>
                  <li>• Arrive 15 minutes prior to start time.</li>
                </ul>
              </div>

              {/* Perks & Rewards */}
              <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-blue-300">
                  Perks & Rewards
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li>• Participation certificates for all attendees.</li>
                  <li>• Exciting prizes & goodies for top performers.</li>
                  <li>• Networking with industry mentors and campus leaders.</li>
                </ul>
              </div>
            </div>

            {/* 5. Organizer Contact Card */}
            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-800/40 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400">
                  Organized By
                </p>
                <p className="text-sm font-semibold text-white">
                  {details.organizer || 'Campus Student Affairs & Clubs'}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">
                  Contact: {details.contactEmail || 'events@campus.edu'}
                </p>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="border-white/20 text-slate-200 hover:bg-white/10"
                onClick={() =>
                  window.open(`mailto:${details.contactEmail || 'events@campus.edu'}`, '_blank')
                }
              >
                Contact Host
              </Button>
            </div>

            {/* 6. Registration Box */}
            <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400">
                  Registration Status
                </p>
                <p className="text-sm font-semibold text-white">
                  {isClosedOrPast
                    ? 'Registration Closed'
                    : details.seats || 'Open for entry'}
                </p>
              </div>

              {isClosedOrPast ? (
                <Button
                  variant="outline"
                  size="lg"
                  disabled
                  className="w-full border-slate-700 bg-slate-800/60 text-slate-400 cursor-not-allowed opacity-80 sm:w-auto"
                >
                  Event Ended
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() =>
                    details.register && window.open(details.register, '_blank')
                  }
                  disabled={!details.register}
                  className="w-full sm:w-auto"
                >
                  Register Now
                </Button>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default EventDetails;