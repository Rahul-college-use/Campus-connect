import React, { useState } from "react";
import {
  CalendarDays,
  Users,
  Image as ImageIcon,
  Award,
  TrendingUp,
  Plus,
  Camera,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronRight,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";

const STATS = [
  {
    title: "Total Events",
    value: "12",
    change: "+3 this month",
    icon: CalendarDays,
    trend: "up",
  },
  {
    title: "Total Registrations",
    value: "1,482",
    change: "+18% vs last month",
    icon: Users,
    trend: "up",
  },
  {
    title: "Gallery Photos",
    value: "128",
    change: "+24 new uploads",
    icon: ImageIcon,
    trend: "up",
  },
  {
    title: "Certificates Issued",
    value: "860",
    change: "98% delivery rate",
    icon: Award,
    trend: "neutral",
  },
];

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "HackCampus 2026 - 24hr Flagship Hackathon",
    category: "Technical",
    date: "Oct 12, 2026",
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
    venue: "Sports Complex",
    capacity: 150,
    registered: 95,
    status: "Upcoming",
  },
];

const RECENT_PHOTOS = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=400&q=80",
    event: "HackCampus 2026",
    caption: "Hackathon project presentation round",
    likes: 42,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80",
    event: "Tech Fest",
    caption: "Auditorium crowd during keynote",
    likes: 68,
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80",
    event: "Sports Meet",
    caption: "Winners team trophy celebration",
    likes: 89,
  },
];

export default function AdminDashboard({ user = { name: "Admin User", role: "SUPER_ADMIN" } }) {
  return (
    <div className="min-h-screen bg-zinc-50/50 pb-20">
      {/* Top Welcome Banner */}
      <div className="border-b border-zinc-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600 mb-1.5">
                <Sparkles className="h-3 w-3 text-zinc-900" /> Admin Command Center
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
                Welcome back, {user.name}
              </h1>
              <p className="text-xs text-zinc-500">
                Monitor campus events, registrations, gallery uploads, and analytics from one unified hub.
              </p>
            </div>

            {/* Top Quick Actions */}
            <div className="flex items-center gap-2">
              <Link
                to="/admin/events/post-photo"
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-xs font-medium text-zinc-700 shadow-xs hover:bg-zinc-50 transition active:scale-95"
              >
                <Camera className="h-3.5 w-3.5 text-zinc-500" /> Post Photo
              </Link>
              <Link
                to="/admin/events/create"
                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 transition active:scale-95"
              >
                <Plus className="h-3.5 w-3.5" /> Create Event
              </Link>
            </div>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8 space-y-8">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs transition hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-500">{stat.title}</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-100 text-zinc-800">
                    <Icon className="h-4 w-4" />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-bold tracking-tight text-zinc-900">{stat.value}</p>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-zinc-400">
                  <TrendingUp className="h-3 w-3 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">{stat.change}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Two Columns: Active Events Roster & Quick Shortcuts */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Active Events Overview (8 Columns) */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-zinc-900">Upcoming Campus Events</h2>
                <p className="text-xs text-zinc-500">Live seat bookings and venue schedules</p>
              </div>
              <Link
                to="/admin/events/manage"
                className="inline-flex items-center gap-1 text-xs font-medium text-zinc-600 hover:text-zinc-900"
              >
                View all <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
              <div className="divide-y divide-zinc-100">
                {UPCOMING_EVENTS.map((event) => {
                  const fillPercentage = Math.round((event.registered / event.capacity) * 100);
                  return (
                    <div
                      key={event.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 hover:bg-zinc-50/50 transition gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-semibold text-zinc-700">
                            {event.category}
                          </span>
                          <span className="text-[11px] text-zinc-400">{event.date}</span>
                        </div>
                        <h3 className="text-sm font-semibold text-zinc-900">{event.title}</h3>
                        <p className="text-xs text-zinc-500">{event.venue}</p>
                      </div>

                      <div className="flex sm:flex-col items-end justify-between sm:justify-center shrink-0">
                        <div className="text-right">
                          <span className="text-xs font-bold text-zinc-900">
                            {event.registered}/{event.capacity}
                          </span>
                          <span className="text-[11px] text-zinc-400 ml-1">({fillPercentage}%)</span>
                        </div>
                        <div className="mt-1.5 h-1.5 w-28 rounded-full bg-zinc-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              fillPercentage > 90 ? "bg-amber-500" : "bg-zinc-900"
                            }`}
                            style={{ width: `${fillPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Side: Quick Shortcuts & Recent Media (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Quick Actions Card */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Quick Shortcuts
              </h3>
              <div className="space-y-2">
                <Link
                  to="/admin/events/create"
                  className="flex items-center justify-between rounded-xl border border-zinc-200/80 p-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <CalendarDays className="h-4 w-4 text-zinc-500" />
                    <span>Launch New Event</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
                </Link>

                <Link
                  to="/admin/events/post-photo"
                  className="flex items-center justify-between rounded-xl border border-zinc-200/80 p-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Camera className="h-4 w-4 text-zinc-500" />
                    <span>Post Photo to Gallery</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
                </Link>

                <Link
                  to="/admin/events"
                  className="flex items-center justify-between rounded-xl border border-zinc-200/80 p-3 text-xs font-semibold text-zinc-800 hover:bg-zinc-50 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="h-4 w-4 text-zinc-500" />
                    <span>View Student Rosters</span>
                  </div>
                  <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
                </Link>
              </div>
            </div>

            {/* Recent Gallery Highlights */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Recent Gallery Posts
                </h3>
                <Link to="/admin/gallery" className="text-[11px] font-medium text-zinc-500 hover:text-zinc-900">
                  Gallery
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {RECENT_PHOTOS.map((photo) => (
                  <div
                    key={photo.id}
                    className="group relative h-20 overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200/60"
                  >
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}