import React, { useState, useMemo, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Users,
  Search,
  ChevronLeft,
  ChevronRight,
  Download,
  Calendar,
  MapPin,
  Clock,
  CheckCircle2,
  X,
  Sparkles,
  SlidersHorizontal,
  ArrowUpDown,
  FileSpreadsheet,
} from "lucide-react";
import { Link } from "react-router-dom";

const INITIAL_EVENTS = [
  {
    id: 1,
    title: "HackCampus 2026 - 24hr Hackathon",
    category: "Technical",
    date: "Oct 12, 2026",
    time: "09:00 AM",
    venue: "Main Auditorium",
    capacity: 200,
    registered: 184,
    status: "Upcoming",
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
    status: "Upcoming",
  },
  {
    id: 3,
    title: "Inter-College Cricket Championship",
    category: "Sports",
    date: "Nov 02, 2026",
    time: "08:30 AM",
    venue: "Sports Ground",
    capacity: 150,
    registered: 95,
    status: "Upcoming",
  },
  {
    id: 4,
    title: "AI in Production: LLMs & Agents",
    category: "Technical",
    date: "Nov 08, 2026",
    time: "11:00 AM",
    venue: "Seminar Hall 1",
    capacity: 120,
    registered: 110,
    status: "Upcoming",
  },
  {
    id: 5,
    title: "Acoustic Night & Open Mic Fest",
    category: "Cultural",
    date: "Nov 14, 2026",
    time: "06:00 PM",
    venue: "Open Amphitheatre",
    capacity: 350,
    registered: 240,
    status: "Upcoming",
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
    status: "Draft",
  },
  {
    id: 7,
    title: "Campus Badminton Open Tournament",
    category: "Sports",
    date: "Nov 25, 2026",
    time: "09:00 AM",
    venue: "Badminton Court",
    capacity: 64,
    registered: 40,
    status: "Upcoming",
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
    status: "Upcoming",
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
    status: "Upcoming",
  },
  {
    id: 11,
    title: "Cloud & DevOps Zero-to-Hero",
    category: "Workshop",
    date: "Dec 15, 2026",
    time: "02:00 PM",
    venue: "Virtual Lab 1",
    capacity: 250,
    registered: 210,
    status: "Completed",
  },
  {
    id: 12,
    title: "AI & ML Seminar 2026",
    date: "Sep 20, 2026",
    time: "10:00 AM",
    venue: "Auditorium Hall B",
    category: "Technical",
    capacity: 120,
    registered: 120,
    status: "Completed",
  },
];

const ITEMS_PER_PAGE = 10;
const CATEGORIES = ["All", "Technical", "Workshop", "Sports", "Cultural"];
const STATUSES = ["All", "Upcoming", "Draft", "Completed"];

export default function ManageEvents() {
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  // Modals
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Background Scroll Freeze when any modal is open
  useEffect(() => {
    const isModalActive = Boolean(editingEvent || deleteTargetId);
    if (isModalActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [editingEvent, deleteTargetId]);

  // ESC Key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setEditingEvent(null);
        setDeleteTargetId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter & Sort computation
  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        const matchesCategory =
          selectedCategory === "All" || event.category === selectedCategory;
        const matchesStatus =
          selectedStatus === "All" || event.status === selectedStatus;
        const matchesSearch =
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.venue.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        let valA = a[sortField];
        let valB = b[sortField];

        if (typeof valA === "string") {
          return sortOrder === "asc"
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }
        return sortOrder === "asc" ? valA - valB : valB - valA;
      });
  }, [events, searchTerm, selectedCategory, selectedStatus, sortField, sortOrder]);

  // Exact 10 items pagination slice
  const totalPages = Math.ceil(filteredEvents.length / ITEMS_PER_PAGE) || 1;
  const paginatedEvents = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEvents.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEvents, currentPage]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const confirmDelete = () => {
    setEvents((prev) => prev.filter((e) => e.id !== deleteTargetId));
    setDeleteTargetId(null);
    if (paginatedEvents.length === 1 && currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };

  const handleUpdateEvent = (e) => {
    e.preventDefault();
    setEvents((prev) =>
      prev.map((item) => (item.id === editingEvent.id ? editingEvent : item))
    );
    setEditingEvent(null);
  };

  const handleExportCSV = () => {
    const headers = "ID,Title,Category,Date,Time,Venue,Capacity,Registered,Status\n";
    const rows = filteredEvents
      .map(
        (e) =>
          `"${e.id}","${e.title}","${e.category}","${e.date}","${e.time}","${e.venue}","${e.capacity}","${e.registered}","${e.status}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Campus_Events_Report_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-16">
      {/* Top Header */}
      <div className="border-b border-zinc-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600 mb-1.5">
                <Sparkles className="h-3 w-3 text-zinc-900" /> Admin Console
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                Manage Campus Events
              </h1>
              <p className="text-xs text-zinc-500">
                Oversee event schedules, capacities, registrations, and publish states.
              </p>
            </div>

            {/* Top Action Buttons */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-xs font-medium text-zinc-700 shadow-xs hover:bg-zinc-50 active:scale-95 transition"
              >
                <FileSpreadsheet className="h-3.5 w-3.5 text-zinc-500" />
                Export CSV
              </button>
              <Link
                to="/admin/events/create"
                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 active:scale-95 transition"
              >
                <Plus className="h-4 w-4" />
                Create Event
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-3">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400">
                Total Events
              </span>
              <p className="mt-0.5 text-lg font-bold text-zinc-900">{events.length}</p>
            </div>
            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-3">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-emerald-600">
                Upcoming Active
              </span>
              <p className="mt-0.5 text-lg font-bold text-zinc-900">
                {events.filter((e) => e.status === "Upcoming").length}
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-3">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-amber-600">
                Drafts
              </span>
              <p className="mt-0.5 text-lg font-bold text-zinc-900">
                {events.filter((e) => e.status === "Draft").length}
              </p>
            </div>
            <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/60 p-3">
              <span className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400">
                Total Attendees
              </span>
              <p className="mt-0.5 text-lg font-bold text-zinc-900">
                {events.reduce((acc, curr) => acc + curr.registered, 0)}
              </p>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Search Box */}
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
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 py-2 pl-10 pr-4 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none transition"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setCurrentPage(1);
                  }}
                  className="absolute right-3 top-2.5 text-zinc-400 hover:text-zinc-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Dropdown Filters */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5">
                <SlidersHorizontal className="h-3.5 w-3.5 text-zinc-400" />
                <span className="text-zinc-500">Category:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="font-medium text-zinc-800 focus:outline-none bg-transparent"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 py-1.5">
                <span className="text-zinc-500">Status:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="font-medium text-zinc-800 focus:outline-none bg-transparent"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Table Content */}
      <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mb-3 flex items-center justify-between text-xs text-zinc-500">
          <span>
            Showing <strong className="text-zinc-900">{paginatedEvents.length}</strong> of{" "}
            <strong className="text-zinc-900">{filteredEvents.length}</strong> total events (Page {currentPage} of {totalPages})
          </span>
        </div>

        {/* Table Card Container */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-zinc-200 text-left text-xs">
              <thead className="bg-zinc-50/80 text-zinc-500 font-medium select-none">
                <tr>
                  <th
                    className="px-6 py-3.5 cursor-pointer hover:text-zinc-900"
                    onClick={() => handleSort("title")}
                  >
                    <div className="flex items-center gap-1.5">
                      Event Name
                      <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3.5">Category</th>
                  <th
                    className="px-6 py-3.5 cursor-pointer hover:text-zinc-900"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center gap-1.5">
                      Date & Venue
                      <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                    </div>
                  </th>
                  <th
                    className="px-6 py-3.5 cursor-pointer hover:text-zinc-900"
                    onClick={() => handleSort("registered")}
                  >
                    <div className="flex items-center gap-1.5">
                      Capacity / Filled
                      <ArrowUpDown className="h-3 w-3 text-zinc-400" />
                    </div>
                  </th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 text-zinc-700">
                {paginatedEvents.length > 0 ? (
                  paginatedEvents.map((event) => {
                    const fillPercent = Math.min(
                      100,
                      Math.round((event.registered / event.capacity) * 100)
                    );

                    return (
                      <tr key={event.id} className="hover:bg-zinc-50/60 transition">
                        {/* Event Title */}
                        <td className="px-6 py-4">
                          <p className="font-semibold text-zinc-900 line-clamp-1">{event.title}</p>
                          <span className="text-[11px] text-zinc-400">ID: #EV-{event.id}</span>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4">
                          <span className="inline-block rounded-md bg-zinc-100 px-2 py-0.5 text-[11px] font-medium text-zinc-700">
                            {event.category}
                          </span>
                        </td>

                        {/* Date & Venue */}
                        <td className="px-6 py-4">
                          <p className="font-medium text-zinc-800">{event.date}</p>
                          <p className="text-[11px] text-zinc-400">{event.venue}</p>
                        </td>

                        {/* Capacity Progress */}
                        <td className="px-6 py-4">
                          <div className="w-36">
                            <div className="flex items-center justify-between text-[11px] mb-1">
                              <span className="font-semibold text-zinc-800">
                                {event.registered}/{event.capacity}
                              </span>
                              <span className="text-zinc-400">{fillPercent}%</span>
                            </div>
                            <div className="h-1.5 w-full rounded-full bg-zinc-100 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${
                                  fillPercent > 90 ? "bg-amber-500" : "bg-zinc-900"
                                }`}
                                style={{ width: `${fillPercent}%` }}
                              />
                            </div>
                          </div>
                        </td>

                        {/* Status Badge */}
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                              event.status === "Upcoming"
                                ? "bg-emerald-50 text-emerald-700"
                                : event.status === "Draft"
                                ? "bg-amber-50 text-amber-700"
                                : "bg-zinc-100 text-zinc-600"
                            }`}
                          >
                            {event.status === "Upcoming" && (
                              <CheckCircle2 className="h-2.5 w-2.5" />
                            )}
                            {event.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => setEditingEvent({ ...event })}
                              className="rounded-lg p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 transition"
                              title="Edit Event"
                            >
                              <Edit2 className="h-3.5 w-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteTargetId(event.id)}
                              className="rounded-lg p-1.5 text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition"
                              title="Delete Event"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-zinc-400">
                      No events found matching your search and filter criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 10 Items Pagination Bar */}
          {totalPages > 1 && (
            <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-100 px-6 py-4 sm:flex-row">
              <p className="text-xs text-zinc-500">
                Page <strong className="text-zinc-900">{currentPage}</strong> of{" "}
                <strong className="text-zinc-900">{totalPages}</strong>
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  <ChevronLeft className="h-3.5 w-3.5" /> Previous
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
                  className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Next <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Edit Event Modal (Background Freeze Active) */}
      {editingEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs transition-opacity"
            onClick={() => setEditingEvent(null)}
          />
          <div className="relative w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-100">
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3 mb-4">
              <h2 className="text-base font-bold text-zinc-900">Edit Event Information</h2>
              <button
                onClick={() => setEditingEvent(null)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateEvent} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-zinc-700 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={editingEvent.title}
                  onChange={(e) =>
                    setEditingEvent({ ...editingEvent, title: e.target.value })
                  }
                  className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Category</label>
                  <select
                    value={editingEvent.category}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, category: e.target.value })
                    }
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:outline-none bg-white"
                  >
                    <option>Technical</option>
                    <option>Workshop</option>
                    <option>Sports</option>
                    <option>Cultural</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Status</label>
                  <select
                    value={editingEvent.status}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, status: e.target.value })
                    }
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:outline-none bg-white"
                  >
                    <option>Upcoming</option>
                    <option>Draft</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Date</label>
                  <input
                    type="text"
                    required
                    value={editingEvent.date}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, date: e.target.value })
                    }
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={editingEvent.time || "10:00 AM"}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, time: e.target.value })
                    }
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Venue</label>
                  <input
                    type="text"
                    required
                    value={editingEvent.venue}
                    onChange={(e) =>
                      setEditingEvent({ ...editingEvent, venue: e.target.value })
                    }
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium text-zinc-700 mb-1">Capacity</label>
                  <input
                    type="number"
                    required
                    value={editingEvent.capacity}
                    onChange={(e) =>
                      setEditingEvent({
                        ...editingEvent,
                        capacity: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2">
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

      {/* Delete Confirmation Modal (Background Freeze Active) */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-xs transition-opacity"
            onClick={() => setDeleteTargetId(null)}
          />
          <div className="relative w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-100 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600 mb-3">
              <Trash2 className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900">Delete Event?</h3>
            <p className="mt-1 text-xs text-zinc-500">
              This will permanently remove this event from campus listings and cancel all student entries.
            </p>
            <div className="mt-5 flex items-center justify-center gap-2">
              <button
                onClick={() => setDeleteTargetId(null)}
                className="w-full rounded-lg border border-zinc-200 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="w-full rounded-lg bg-rose-600 py-2 text-xs font-semibold text-white hover:bg-rose-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}