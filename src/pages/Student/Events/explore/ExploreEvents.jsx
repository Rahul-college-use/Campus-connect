import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Calendar,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  X,
  SlidersHorizontal,
  Clock,
} from "lucide-react";

const INITIAL_EVENTS = [
  {
    id: 1,
    title: "HackCampus 2026 - 24hr Flagship Hackathon",
    category: "Technical",
    date: "Oct 12, 2026",
    time: "09:00 AM",
    venue: "Main Auditorium",
    capacity: 200,
    registered: 184,
    fee: "Free",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    description: "Compete against top developers to build impactful AI, Web3, and Open Source solutions.",
  },
  {
    id: 2,
    title: "Full-Stack Web Architecture Workshop",
    category: "Workshop",
    date: "Oct 18, 2026",
    time: "02:00 PM",
    venue: "CS Lab 3",
    capacity: 60,
    registered: 58,
    fee: "Free",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    description: "Hands-on session building scalable Node.js microservices with React & Tailwind CSS.",
  },
  {
    id: 3,
    title: "Inter-College Cricket Championship",
    category: "Sports",
    date: "Nov 02, 2026",
    time: "08:30 AM",
    venue: "Sports Complex",
    capacity: 150,
    registered: 95,
    fee: "Free",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
    description: "Annual knockout cricket tournament with teams competing across 8 regional engineering colleges.",
  },
  {
    id: 4,
    title: "AI in Production: LLMs & Agents Masterclass",
    category: "Technical",
    date: "Nov 08, 2026",
    time: "11:00 AM",
    venue: "Seminar Hall 1",
    capacity: 120,
    registered: 110,
    fee: "Free",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    description: "Learn how to deploy autonomous AI agents and optimize inference pipelines in production.",
  },
  {
    id: 5,
    title: "Acoustic Night & Open Mic Fest",
    category: "Cultural",
    date: "Nov 14, 2026",
    time: "06:00 PM",
    venue: "Open Air Amphitheatre",
    capacity: 350,
    registered: 240,
    fee: "Free",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    description: "An evening of live band performances, poetry, and stand-up comedy organized by the music society.",
  },
  {
    id: 6,
    title: "UI/UX Design Sprint & Figma Masterclass",
    category: "Workshop",
    date: "Nov 20, 2026",
    time: "01:00 PM",
    venue: "Design Innovation Lab",
    capacity: 50,
    registered: 49,
    fee: "Free",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
    description: "Wireframing, modern design systems, and rapid prototyping workflows for web & mobile apps.",
  },
  {
    id: 7,
    title: "Campus Badminton Open Tournament",
    category: "Sports",
    date: "Nov 25, 2026",
    time: "09:00 AM",
    venue: "Indoor Badminton Courts",
    capacity: 64,
    registered: 40,
    fee: "Free",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
    description: "Singles and doubles knockout matches with official trophies and certificates for finalists.",
  },
  {
    id: 8,
    title: "Cybersecurity & Ethical Hacking Bootcamp",
    category: "Technical",
    date: "Dec 01, 2026",
    time: "10:00 AM",
    venue: "Cyber Security Lab",
    capacity: 80,
    registered: 76,
    fee: "Free",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    description: "Learn network vulnerability assessment, packet sniffing, and secure coding practices.",
  },
  {
    id: 9,
    title: "Annual Drama & Street Play Showcase",
    category: "Cultural",
    date: "Dec 05, 2026",
    time: "05:00 PM",
    venue: "Central Plaza",
    capacity: 300,
    registered: 180,
    fee: "Free",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80",
    description: "Theatrical street acts highlighting social awareness, comedy skits, and stage dramas.",
  },
  {
    id: 10,
    title: "Robotics & Embedded Systems Expo",
    category: "Technical",
    date: "Dec 10, 2026",
    time: "10:30 AM",
    venue: "ECE Project Centre",
    capacity: 100,
    registered: 88,
    fee: "Free",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    description: "Live robotics arena featuring line followers, obstacle avoiders, and IoT drone demonstrations.",
  },
  {
    id: 11,
    title: "Cloud & DevOps Zero-to-Hero Workshop",
    category: "Workshop",
    date: "Dec 15, 2026",
    time: "02:00 PM",
    venue: "Virtual Room A",
    capacity: 250,
    registered: 210,
    fee: "Free",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    description: "Practical setup for Docker containers, CI/CD GitHub Actions, and AWS serverless hosting.",
  },
  {
    id: 12,
    title: "Battle of the Bands - Rock Night",
    category: "Cultural",
    date: "Dec 20, 2026",
    time: "06:30 PM",
    venue: "Open Grounds",
    capacity: 500,
    registered: 420,
    fee: "Free",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    description: "College rock bands battle for the annual rolling trophy and studio recording sponsorships.",
  },
];

const ITEMS_PER_PAGE = 10;
const CATEGORIES = ["All", "Technical", "Workshop", "Sports", "Cultural"];

export default function ExploreEvents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("soonest");
  const [currentPage, setCurrentPage] = useState(1);
  const [savedIds, setSavedIds] = useState(new Set());
  const [registeredIds, setRegisteredIds] = useState(new Set([1]));
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    document.body.style.overflow = selectedEvent ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedEvent]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedEvent(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredEvents = useMemo(() => {
    return INITIAL_EVENTS.filter((e) => {
      const matchesCategory = activeCategory === "All" || e.category === activeCategory;
      const matchesSearch =
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "seats") return (b.capacity - b.registered) - (a.capacity - a.registered);
      if (sortBy === "popular") return b.registered - a.registered;
      return a.id - b.id;
    });
  }, [searchTerm, activeCategory, sortBy]);

  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE) || 1;
  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  const toggleSave = (id, e) => {
    e.stopPropagation();
    setSavedIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
    });
  };

  const toggleRegistration = (id) => {
    setRegisteredIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) updated.delete(id);
      else updated.add(id);
      return updated;
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-16">
      <div className="border-b border-zinc-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/80 bg-zinc-50 px-3 py-1 text-[11px] font-medium text-zinc-600 mb-2">
                <Sparkles className="h-3 w-3 text-zinc-900" />
                Live Campus Discoveries
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                Explore Events
              </h1>
              <p className="mt-1 text-xs text-zinc-500 max-w-lg">
                Discover technical hackathons, cultural fests, sports leagues, and expert workshops organized across campus.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2">
                <span className="text-[10px] text-zinc-400 block uppercase font-medium">Total Events</span>
                <span className="text-base font-semibold text-zinc-900">{INITIAL_EVENTS.length}</span>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 px-4 py-2">
                <span className="text-[10px] text-zinc-400 block uppercase font-medium">My Registrations</span>
                <span className="text-base font-semibold text-zinc-900">{registeredIds.size}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by event title, venue, or keyword..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 py-2 pl-10 pr-4 text-xs text-zinc-900 placeholder:text-zinc-400 transition focus:border-zinc-900 focus:bg-white focus:outline-none"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-xs text-zinc-500">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-800 focus:border-zinc-900 focus:outline-none"
              >
                <option value="soonest">Upcoming First</option>
                <option value="popular">Most Popular</option>
                <option value="seats">Most Seats Left</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 pt-2">
            {CATEGORIES.map((cat) => {
              const count =
                cat === "All"
                  ? INITIAL_EVENTS.length
                  : INITIAL_EVENTS.filter((e) => e.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentPage(1);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    isActive
                      ? "bg-zinc-900 text-white shadow-xs"
                      : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                  }`}
                >
                  {cat}
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      isActive ? "bg-zinc-800 text-zinc-200" : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between text-xs text-zinc-500 mb-4">
          <span>
            Showing <strong className="text-zinc-900">{paginatedEvents.length}</strong> of{" "}
            <strong className="text-zinc-900">{filteredEvents.length}</strong> events (Page {currentPage} of {totalPages})
          </span>
        </div>

        {paginatedEvents.length === 0 && (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200 bg-white p-12 text-center">
            <Search className="h-8 w-8 text-zinc-300 mb-2" />
            <h3 className="text-sm font-semibold text-zinc-900">No events found</h3>
            <p className="mt-1 text-xs text-zinc-500">
              No results matching "{searchTerm}" in category "{activeCategory}".
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedEvents.map((event) => {
            const isRegistered = registeredIds.has(event.id);
            const isSaved = savedIds.has(event.id);
            const fillPercentage = Math.min(100, Math.round((event.registered / event.capacity) * 100));
            const isFull = event.registered >= event.capacity;

            return (
              <div
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-zinc-300 cursor-pointer"
              >
                <div className="relative h-44 w-full overflow-hidden bg-zinc-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 rounded-md bg-white/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-zinc-900 shadow-xs">
                    {event.category}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => toggleSave(event.id, e)}
                    className="absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 backdrop-blur-md text-zinc-700 transition hover:bg-white active:scale-90"
                    aria-label="Save Event"
                  >
                    <Bookmark className={`h-3.5 w-3.5 ${isSaved ? "fill-zinc-900 text-zinc-900" : ""}`} />
                  </button>

                  {isRegistered && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-medium text-white shadow-xs">
                      <CheckCircle2 className="h-3 w-3" /> Registered
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 line-clamp-1 group-hover:text-zinc-700">
                      {event.title}
                    </h3>
                    <p className="mt-1.5 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>

                    <div className="mt-4 space-y-1.5 text-xs text-zinc-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                        <span>{event.date} • {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                        <span className="truncate">{event.venue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 border-t border-zinc-100 pt-3">
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1.5">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-zinc-400" />
                        {event.registered}/{event.capacity} Filled
                      </span>
                      <span className="font-semibold text-zinc-700">{fillPercentage}%</span>
                    </div>

                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          fillPercentage > 90 ? "bg-amber-500" : "bg-zinc-900"
                        }`}
                        style={{ width: `${fillPercentage}%` }}
                      />
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleRegistration(event.id);
                        }}
                        className={`flex-1 rounded-xl py-2 text-xs font-medium transition active:scale-95 ${
                          isRegistered
                            ? "border border-zinc-200 bg-zinc-100 text-zinc-700 hover:bg-zinc-200/70"
                            : isFull
                            ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                            : "bg-zinc-900 text-white hover:bg-zinc-800"
                        }`}
                        disabled={isFull && !isRegistered}
                      >
                        {isRegistered ? "Cancel Registration" : isFull ? "Housefull" : "1-Click Register"}
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedEvent(event);
                        }}
                        className="flex h-8 w-8 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                        aria-label="View details"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/80 pt-6 sm:flex-row">
            <p className="text-xs text-zinc-500">
              Showing page <strong className="text-zinc-900">{currentPage}</strong> of{" "}
              <strong className="text-zinc-900">{totalPages}</strong>
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-7 w-7 rounded-lg text-xs font-medium transition ${
                    currentPage === pageNum
                      ? "bg-zinc-900 text-white font-semibold shadow-xs"
                      : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </main>

      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedEvent(null)}
          />

          <div className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-4 right-4 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
            >
              <X className="h-5 w-5" />
            </button>

            <img
              src={selectedEvent.image}
              alt={selectedEvent.title}
              className="h-44 w-full rounded-xl object-cover mb-4"
            />

            <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700">
              {selectedEvent.category}
            </span>
            <h2 className="mt-2 text-lg font-bold text-zinc-900">{selectedEvent.title}</h2>
            <p className="mt-2 text-xs text-zinc-600 leading-relaxed">{selectedEvent.description}</p>

            <div className="mt-4 grid grid-cols-2 gap-3 border-y border-zinc-100 py-3 text-xs text-zinc-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                <span>{selectedEvent.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-zinc-400" />
                <span>{selectedEvent.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                <span>{selectedEvent.venue}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-3.5 w-3.5 text-zinc-400" />
                <span>{selectedEvent.registered} / {selectedEvent.capacity} Spots</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-2">
              <button
                onClick={() => setSelectedEvent(null)}
                className="rounded-xl border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  toggleRegistration(selectedEvent.id);
                  setSelectedEvent(null);
                }}
                className={`rounded-xl px-4 py-2 text-xs font-semibold text-white transition ${
                  registeredIds.has(selectedEvent.id)
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-zinc-900 hover:bg-zinc-800"
                }`}
              >
                {registeredIds.has(selectedEvent.id) ? "Cancel Booking" : "Confirm Registration"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}