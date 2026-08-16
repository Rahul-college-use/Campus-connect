import React, { useState, useMemo, useEffect } from "react";
import {
  Calendar,
  MapPin,
  QrCode,
  CheckCircle2,
  Clock,
  Search,
  X,
  Sparkles,
  Download,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const INITIAL_REGISTERED_EVENTS = [
  {
    id: 1,
    title: "HackCampus 2026 - 24hr Flagship Hackathon",
    category: "Technical",
    date: "Oct 12, 2026",
    time: "09:00 AM",
    venue: "Main Auditorium",
    passId: "CC-HACK-8492",
    seatNo: "Table 14-B",
    status: "Confirmed",
    teamName: "ByteCoders",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Full-Stack Web Architecture Workshop",
    category: "Workshop",
    date: "Oct 18, 2026",
    time: "02:00 PM",
    venue: "CS Lab 3",
    passId: "CC-WKS-1920",
    seatNo: "Lab Terminal #24",
    status: "Confirmed",
    teamName: "Individual",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "AI in Production: LLMs & Agents Masterclass",
    category: "Technical",
    date: "Nov 08, 2026",
    time: "11:00 AM",
    venue: "Seminar Hall 1",
    passId: "CC-SEM-4412",
    seatNo: "Row D - 12",
    status: "Confirmed",
    teamName: "Individual",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "AI & ML Seminar 2026",
    category: "Technical",
    date: "Sep 20, 2026",
    time: "10:00 AM",
    venue: "Auditorium Hall B",
    passId: "CC-SEM-9011",
    seatNo: "General Entry",
    status: "Attended",
    teamName: "Individual",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
  },
];

const STATUS_TABS = ["All", "Confirmed", "Attended"];

export default function MyEvents() {
  const [events, setEvents] = useState(INITIAL_REGISTERED_EVENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // Modals
  const [selectedPass, setSelectedPass] = useState(null);
  const [cancelTargetId, setCancelTargetId] = useState(null);

  // Background Scroll Freeze when any modal is open
  useEffect(() => {
    const isModalOpen = Boolean(selectedPass || cancelTargetId);
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedPass, cancelTargetId]);

  // ESC Key listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedPass(null);
        setCancelTargetId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredEvents = useMemo(() => {
    return events.filter((item) => {
      const matchesTab = activeTab === "All" || item.status === activeTab;
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.passId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.venue.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    });
  }, [events, activeTab, searchTerm]);

  const confirmCancel = () => {
    setEvents((prev) => prev.filter((e) => e.id !== cancelTargetId));
    setCancelTargetId(null);
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-20">
      {/* Top Header */}
      <div className="border-b border-zinc-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600 mb-1.5">
                <Sparkles className="h-3 w-3 text-zinc-900" /> Student Pass Center
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                My Registered Events
              </h1>
              <p className="text-xs text-zinc-500">
                Access your digital QR entry passes, seat numbers, and venue schedules.
              </p>
            </div>

            {/* Explore More CTA */}
            <Link
              to="/events"
              className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 transition active:scale-95"
            >
              Explore More Events <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Search & Status Tabs */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search registered events or Pass ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-zinc-50/60 py-2 pl-10 pr-4 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:bg-white focus:outline-none transition"
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

            {/* Status Tabs */}
            <div className="flex items-center gap-1.5">
              {STATUS_TABS.map((tab) => {
                const count =
                  tab === "All"
                    ? events.length
                    : events.filter((e) => e.status === tab).length;
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      isActive
                        ? "bg-zinc-900 text-white shadow-xs"
                        : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    {tab}
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                        isActive
                          ? "bg-zinc-800 text-zinc-200"
                          : "bg-zinc-100 text-zinc-500"
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
      </div>

      {/* Main Registered Events List */}
      <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between text-xs text-zinc-500">
          <span>
            Total Entries: <strong className="text-zinc-900">{filteredEvents.length} Events</strong>
          </span>
        </div>

        {filteredEvents.length === 0 && (
          <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-12 text-center text-xs text-zinc-500">
            No registered events match your current filter.
          </div>
        )}

        <div className="space-y-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="flex flex-col md:flex-row items-stretch justify-between overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-xs transition hover:shadow-md hover:border-zinc-300"
            >
              {/* Event Image Banner */}
              <div className="relative h-44 md:h-auto md:w-64 shrink-0 overflow-hidden bg-zinc-100">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover"
                />
                <span className="absolute top-3 left-3 rounded-md bg-zinc-900/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-semibold text-white">
                  {event.category}
                </span>
              </div>

              {/* Event Info */}
              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span
                      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                        event.status === "Confirmed"
                          ? "bg-emerald-50 text-emerald-700"
                          : "bg-zinc-100 text-zinc-600"
                      }`}
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      {event.status}
                    </span>
                    <span className="text-[11px] font-medium text-zinc-400">
                      Pass: <strong className="text-zinc-700">{event.passId}</strong>
                    </span>
                    <span className="text-[11px] text-zinc-400">
                      • {event.seatNo}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-zinc-900">
                    {event.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-zinc-600">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-zinc-400" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5 text-zinc-400" />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-3">
                  <span className="text-[11px] text-zinc-400">
                    Participation: <strong className="text-zinc-700">{event.teamName}</strong>
                  </span>

                  <div className="flex items-center gap-2">
                    {event.status === "Confirmed" && (
                      <button
                        type="button"
                        onClick={() => setCancelTargetId(event.id)}
                        className="rounded-xl border border-zinc-200 px-3 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 transition"
                      >
                        Cancel Booking
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setSelectedPass(event)}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-zinc-900 px-4 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 transition active:scale-95"
                    >
                      <QrCode className="h-3.5 w-3.5" /> View Entry Pass
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Digital QR Entry Pass Modal (Background Freeze Active) */}
      {selectedPass && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xs transition-opacity"
            onClick={() => setSelectedPass(null)}
          />

          <div className="relative w-full max-w-sm overflow-hidden rounded-3xl border border-zinc-200 bg-white p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-100 text-center">
            <button
              onClick={() => setSelectedPass(null)}
              className="absolute top-4 right-4 rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Pass Header */}
            <div className="mb-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">
                Official Campus Entry Pass
              </span>
              <h2 className="mt-1 text-base font-bold text-zinc-900 leading-tight">
                {selectedPass.title}
              </h2>
            </div>

            {/* Generated QR Code Graphic Representation */}
            <div className="mx-auto my-4 flex h-48 w-48 items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 bg-zinc-50 p-4">
              <div className="flex flex-col items-center justify-center">
                <QrCode className="h-32 w-32 text-zinc-900" />
                <span className="mt-1 font-mono text-[10px] font-bold text-zinc-600">
                  {selectedPass.passId}
                </span>
              </div>
            </div>

            {/* Pass Metadata Table */}
            <div className="space-y-1.5 rounded-2xl bg-zinc-50 p-3.5 text-left text-xs text-zinc-600 border border-zinc-100">
              <div className="flex justify-between">
                <span className="text-zinc-400">Attendee:</span>
                <strong className="text-zinc-900">Rahul Kumar (221051)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Venue:</span>
                <span className="text-zinc-800">{selectedPass.venue}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Date & Time:</span>
                <span className="text-zinc-800">{selectedPass.date} • {selectedPass.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Assigned Seat:</span>
                <strong className="text-emerald-700 font-semibold">{selectedPass.seatNo}</strong>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="mt-5 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedPass(null)}
                className="w-full rounded-xl border border-zinc-200 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Close
              </button>
              <button
                onClick={() => alert(`Saving pass: ${selectedPass.passId}`)}
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-zinc-900 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
              >
                <Download className="h-3.5 w-3.5" /> Save Pass
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      {cancelTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-zinc-950/50 backdrop-blur-xs"
            onClick={() => setCancelTargetId(null)}
          />
          <div className="relative w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-100">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600 mb-3">
              <AlertCircle className="h-5 w-5" />
            </div>
            <h3 className="text-sm font-bold text-zinc-900">Cancel Registration?</h3>
            <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
              Your digital pass and reserved seat will be released for other students.
            </p>
            <div className="mt-5 flex items-center gap-2">
              <button
                onClick={() => setCancelTargetId(null)}
                className="w-full rounded-xl border border-zinc-200 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Keep Booking
              </button>
              <button
                onClick={confirmCancel}
                className="w-full rounded-xl bg-rose-600 py-2 text-xs font-semibold text-white hover:bg-rose-700"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}