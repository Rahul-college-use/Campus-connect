import React, { useState, useMemo, useEffect } from "react";
import {
  Search,
  Calendar,
  MapPin,
  Users,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Edit3,
  Trash2,
  Download,
  Plus,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";

const INITIAL_ADMIN_EVENTS = [
  {
    id: 1,
    title: "HackCampus 2026 - 24hr Flagship Hackathon",
    category: "Technical",
    date: "Oct 12, 2026",
    time: "09:00 AM",
    venue: "Main Auditorium",
    capacity: 200,
    registered: 184,
    status: "Published",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    description: "24-hour coding sprint focusing on AI, Web3, and Open-Source solutions.",
    participants: [
      { id: "S101", name: "Rahul Kumar", roll: "221051", email: "rahul@campus.edu", branch: "CSE" },
      { id: "S102", name: "Aman Verma", roll: "221045", email: "aman@campus.edu", branch: "ECE" },
      { id: "S103", name: "Priya Singh", roll: "221089", email: "priya@campus.edu", branch: "CSE" },
    ],
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
    status: "Published",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    description: "Hands-on session building scalable Node.js microservices with React & Tailwind CSS.",
    participants: [
      { id: "S104", name: "Neha Sharma", roll: "221012", email: "neha@campus.edu", branch: "CSE" },
    ],
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
    status: "Published",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80",
    description: "Knockout cricket tournament across 8 regional engineering colleges.",
    participants: [],
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
    status: "Published",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    description: "Deploy autonomous AI agents and optimize inference pipelines in production.",
    participants: [],
  },
  {
    id: 5,
    title: "Acoustic Night & Open Mic Fest",
    category: "Cultural",
    date: "Nov 14, 2026",
    time: "06:00 PM",
    venue: "Amphitheatre",
    capacity: 350,
    registered: 240,
    status: "Published",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80",
    description: "Live acoustic performances, poetry, and stand-up comedy.",
    participants: [],
  },
  {
    id: 6,
    title: "UI/UX Design Sprint & Figma Masterclass",
    category: "Workshop",
    date: "Nov 20, 2026",
    time: "01:00 PM",
    venue: "Design Lab",
    capacity: 50,
    registered: 49,
    status: "Draft",
    image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80",
    description: "Modern design systems and rapid prototyping workflows.",
    participants: [],
  },
  {
    id: 7,
    title: "Campus Badminton Open Tournament",
    category: "Sports",
    date: "Nov 25, 2026",
    time: "09:00 AM",
    venue: "Badminton Courts",
    capacity: 64,
    registered: 40,
    status: "Published",
    image: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=800&q=80",
    description: "Singles and doubles knockout matches with official trophies.",
    participants: [],
  },
  {
    id: 8,
    title: "Cybersecurity & Ethical Hacking Bootcamp",
    category: "Technical",
    date: "Dec 01, 2026",
    time: "10:00 AM",
    venue: "Security Lab",
    capacity: 80,
    registered: 76,
    status: "Published",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    description: "Network vulnerability assessment, packet analysis, and secure coding.",
    participants: [],
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
    status: "Draft",
    image: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=800&q=80",
    description: "Theatrical street acts highlighting social awareness and satire.",
    participants: [],
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
    status: "Published",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    description: "Live arena featuring line followers, maze solvers, and IoT drones.",
    participants: [],
  },
  {
    id: 11,
    title: "Cloud & DevOps Workshop",
    category: "Workshop",
    date: "Dec 15, 2026",
    time: "02:00 PM",
    venue: "Virtual Lab 1",
    capacity: 250,
    registered: 210,
    status: "Completed",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    description: "Docker, Kubernetes, and CI/CD automated deployment pipelines.",
    participants: [],
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
    status: "Published",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
    description: "College bands battle for the rolling trophy and sponsorships.",
    participants: [],
  },
];

const ITEMS_PER_PAGE = 10;
const CATEGORIES = ["All", "Technical", "Workshop", "Sports", "Cultural"];

export default function AdminExploreEvents() {
  const [events, setEvents] = useState(INITIAL_ADMIN_EVENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeRosterEvent, setActiveRosterEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  // Background Scroll Freeze & Cleanup
  useEffect(() => {
    const isAnyModalOpen = Boolean(activeRosterEvent || editingEvent);
    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeRosterEvent, editingEvent]);

  // ESC Key to dismiss open modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveRosterEvent(null);
        setEditingEvent(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter Logic
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesCategory = activeCategory === "All" || e.category === activeCategory;
      const matchesStatus = statusFilter === "All" || e.status === statusFilter;
      const matchesSearch =
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.venue.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [events, searchTerm, activeCategory, statusFilter]);

  // 10 Items Pagination Slice
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE) || 1;
  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const handleStatusToggle = (id) => {
    setEvents((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextStatus = item.status === "Published" ? "Draft" : "Published";
          return { ...item, status: nextStatus };
        }
        return item;
      })
    );
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setEvents((prev) =>
      prev.map((item) => (item.id === editingEvent.id ? editingEvent : item))
    );
    setEditingEvent(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-16">
      {/* Top Admin Header */}
      <div className="border-b border-zinc-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600 mb-1.5">
                <Sparkles className="h-3 w-3 text-zinc-900" /> Admin Overview
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                Explore & Oversee Events
              </h1>
              <p className="text-xs text-zinc-500">
                Live monitoring, registration rosters, and quick status toggles for campus events.
              </p>
            </div>

            {/* Quick Create Action */}
            <Link
              to="/admin/events/create"
              className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 transition active:scale-95"
            >
              <Plus className="h-4 w-4" /> Create New Event
            </Link>
          </div>

          {/* Search, Status & Category Filters */}
          <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by event title or venue..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 py-2 pl-10 pr-4 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none"
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

            {/* Status Filter */}
            <div className="flex items-center gap-2 text-xs">
              <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400" />
              <span className="text-zinc-500">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-800 focus:border-zinc-900 focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Published">Published Only</option>
                <option value="Draft">Drafts Only</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Categories */}
          <div className="mt-4 flex flex-wrap gap-2 pt-1">
            {CATEGORIES.map((cat) => {
              const count =
                cat === "All"
                  ? events.length
                  : events.filter((e) => e.category === cat).length;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                    isActive
                      ? "bg-zinc-900 text-white"
                      : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100"
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

      {/* Main Admin Cards Grid */}
      <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between text-xs text-zinc-500">
          <span>
            Displaying <strong className="text-zinc-900">{paginatedEvents.length}</strong> of{" "}
            <strong className="text-zinc-900">{filteredEvents.length}</strong> events (Page {currentPage} of {totalPages})
          </span>
        </div>

        {paginatedEvents.length === 0 && (
          <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-12 text-center text-xs text-zinc-500">
            No events match your current filter criteria.
          </div>
        )}

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {paginatedEvents.map((event) => {
            const fillPercentage = Math.min(
              100,
              Math.round((event.registered / event.capacity) * 100)
            );

            return (
              <div
                key={event.id}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-xs transition hover:shadow-md hover:border-zinc-300"
              >
                {/* Image Banner */}
                <div className="relative h-44 w-full overflow-hidden bg-zinc-100">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 rounded-md bg-white/90 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-zinc-900">
                    {event.category}
                  </span>

                  <button
                    onClick={() => handleStatusToggle(event.id)}
                    className={`absolute top-3 right-3 rounded-md px-2 py-0.5 text-[10px] font-semibold backdrop-blur-md transition ${
                      event.status === "Published"
                        ? "bg-emerald-600/90 text-white hover:bg-emerald-700"
                        : event.status === "Completed"
                        ? "bg-zinc-800/90 text-zinc-200"
                        : "bg-amber-500/90 text-white hover:bg-amber-600"
                    }`}
                  >
                    {event.status}
                  </button>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-semibold truncate">{event.venue}</p>
                    <p className="text-[11px] text-zinc-300">
                      {event.date} • {event.time}
                    </p>
                  </div>
                </div>

                {/* Event Body */}
                <div className="flex flex-1 flex-col justify-between p-4 sm:p-5">
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 line-clamp-1">{event.title}</h3>
                    <p className="mt-1 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Capacity Bar */}
                  <div className="mt-5 border-t border-zinc-100 pt-3">
                    <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5 text-zinc-400" />
                        <strong>{event.registered}</strong> / {event.capacity} Registered
                      </span>
                      <span className="font-semibold text-zinc-700">{fillPercentage}%</span>
                    </div>

                    <div className="h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          fillPercentage > 90 ? "bg-amber-500" : "bg-zinc-900"
                        }`}
                        style={{ width: `${fillPercentage}%` }}
                      />
                    </div>

                    {/* Admin Action Buttons */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      <button
                        onClick={() => setActiveRosterEvent(event)}
                        className="inline-flex items-center justify-center gap-1 rounded-lg border border-zinc-200 bg-white py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                      >
                        <Users className="h-3.5 w-3.5 text-zinc-500" /> Roster
                      </button>

                      <button
                        onClick={() => setEditingEvent(event)}
                        className="inline-flex items-center justify-center gap-1 rounded-lg border border-zinc-200 bg-white py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
                      >
                        <Edit3 className="h-3.5 w-3.5 text-zinc-500" /> Edit
                      </button>

                      <button
                        onClick={(e) => handleDelete(event.id, e)}
                        className="inline-flex items-center justify-center gap-1 rounded-lg border border-rose-200 bg-rose-50/40 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-100/70"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 10 Items Pagination Bar */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/80 pt-6 sm:flex-row">
            <p className="text-xs text-zinc-500">
              Page <strong className="text-zinc-900">{currentPage}</strong> of{" "}
              <strong className="text-zinc-900">{totalPages}</strong>
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-40"
              >
                <ChevronLeft className="h-3.5 w-3.5" /> Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`h-7 w-7 rounded-lg text-xs font-medium transition ${
                    currentPage === pageNum
                      ? "bg-zinc-900 text-white font-semibold"
                      : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-40"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Roster / Registered Students Modal */}
      {activeRosterEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs transition-opacity"
            onClick={() => setActiveRosterEvent(null)}
          />
          <div className="relative w-full max-w-2xl rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-zinc-900">
                  {activeRosterEvent.title}
                </h2>
                <p className="text-xs text-zinc-500">
                  Total Registrations: {activeRosterEvent.registered} students
                </p>
              </div>
              <button
                onClick={() => setActiveRosterEvent(null)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 max-h-72 overflow-y-auto">
              {activeRosterEvent.participants.length > 0 ? (
                <table className="min-w-full divide-y divide-zinc-200 text-left text-xs">
                  <thead className="bg-zinc-50 text-zinc-500">
                    <tr>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Roll No</th>
                      <th className="px-4 py-2">Branch</th>
                      <th className="px-4 py-2">Email</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-100 text-zinc-700">
                    {activeRosterEvent.participants.map((student) => (
                      <tr key={student.id}>
                        <td className="px-4 py-2.5 font-medium text-zinc-900">{student.name}</td>
                        <td className="px-4 py-2.5">{student.roll}</td>
                        <td className="px-4 py-2.5">{student.branch}</td>
                        <td className="px-4 py-2.5">{student.email}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="py-8 text-center text-xs text-zinc-500">
                  No detailed participant records entered yet.
                </p>
              )}
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-3">
              <button
                onClick={() => alert("Exporting participants CSV...")}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
              >
                <Download className="h-3.5 w-3.5" /> Export CSV
              </button>
              <button
                onClick={() => setActiveRosterEvent(null)}
                className="rounded-lg bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-zinc-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Edit Modal */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs transition-opacity"
            onClick={() => setEditingEvent(null)}
          />
          <div className="relative w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-100">
            <h2 className="text-base font-bold text-zinc-900 mb-4">Edit Event Details</h2>
            <form onSubmit={handleSaveEdit} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-zinc-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingEvent.title}
                  onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Venue</label>
                  <input
                    type="text"
                    value={editingEvent.venue}
                    onChange={(e) => setEditingEvent({ ...editingEvent, venue: e.target.value })}
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900"
                    required
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Capacity</label>
                  <input
                    type="number"
                    value={editingEvent.capacity}
                    onChange={(e) => setEditingEvent({ ...editingEvent, capacity: Number(e.target.value) })}
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-zinc-700 mb-1">Description</label>
                <textarea
                  rows="3"
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-zinc-900 focus:outline-none focus:border-zinc-900"
                />
              </div>

              <div className="mt-4 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingEvent(null)}
                  className="rounded-lg border border-zinc-200 px-4 py-2 font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-zinc-900 px-4 py-2 font-semibold text-white hover:bg-zinc-800"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}