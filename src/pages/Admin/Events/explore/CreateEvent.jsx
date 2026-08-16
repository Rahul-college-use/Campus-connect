import React, { useState } from "react";
import {
  CalendarPlus,
  ArrowLeft,
  UploadCloud,
  Eye,
  Calendar,
  MapPin,
  Users,
  Clock,
  Sparkles,
  CheckCircle2,
  Image as ImageIcon,
  Tag,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "Technical",
    venue: "",
    date: "",
    time: "10:00 AM",
    deadline: "",
    capacity: "100",
    fee: "Free",
    image: "",
    description: "",
  });

  const [imagePreview, setImagePreview] = useState(
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80"
  );
  const [isPublishing, setIsPublishing] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);
      setImagePreview(fileUrl);
      setFormData({ ...formData, image: fileUrl });
    }
  };

  const handlePublish = (status = "Published") => {
    if (!formData.title || !formData.venue || !formData.date) {
      alert("Please fill in all mandatory fields (Title, Venue, Date).");
      return;
    }

    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      alert(`Event successfully saved as ${status}!`);
      navigate("/admin/events/manage");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-20">
      {/* Top Header */}
      <div className="border-b border-zinc-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Link
            to="/admin/manager"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 transition hover:text-zinc-900 mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Event Management
          </Link>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600 mb-1">
                <Sparkles className="h-3 w-3 text-zinc-900" /> Admin Studio
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                Create & Publish Event
              </h1>
              <p className="text-xs text-zinc-500">
                Configure event specifics with real-time student-view preview.
              </p>
            </div>

            {/* Quick Header CTA Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handlePublish("Draft")}
                className="rounded-lg border border-zinc-200 bg-white px-3.5 py-2 text-xs font-medium text-zinc-700 shadow-xs hover:bg-zinc-50 transition"
              >
                Save as Draft
              </button>
              <button
                type="button"
                onClick={() => handlePublish("Published")}
                disabled={isPublishing}
                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 disabled:opacity-50 transition"
              >
                <CalendarPlus className="h-3.5 w-3.5" />
                {isPublishing ? "Publishing..." : "Publish Event"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <main className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          
          {/* Left Form: 7 Columns */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Banner Image Upload */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 sm:p-6 shadow-xs">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                Event Banner & Media
              </h3>
              <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-200 p-6 bg-zinc-50/50 hover:border-zinc-300 transition">
                <UploadCloud className="h-8 w-8 text-zinc-400 mb-2" />
                <p className="text-xs font-semibold text-zinc-800">
                  Upload high-resolution poster
                </p>
                <p className="text-[10px] text-zinc-400 mt-0.5">
                  16:9 ratio recommended • PNG, JPG up to 5MB
                </p>
                <label className="mt-3 cursor-pointer rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-xs hover:bg-zinc-50">
                  Select Banner File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* General Information Form */}
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-5 sm:p-6 shadow-xs space-y-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Core Information
              </h3>

              {/* Event Title */}
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Event Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  placeholder="e.g. HackCampus 2026 - 24hr Flagship Hackathon"
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none"
                />
              </div>

              {/* Category & Fee */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  >
                    <option>Technical</option>
                    <option>Workshop</option>
                    <option>Sports</option>
                    <option>Cultural</option>
                    <option>Seminar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Registration Fee
                  </label>
                  <input
                    type="text"
                    name="fee"
                    value={formData.fee}
                    placeholder="e.g. Free or ₹100/Team"
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Venue & Capacity */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Venue / Room <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="venue"
                    value={formData.venue}
                    placeholder="e.g. Main Auditorium Hall A"
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Total Seat Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    value={formData.capacity}
                    placeholder="e.g. 150"
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Schedule: Date, Time & Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Event Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Start Time
                  </label>
                  <input
                    type="text"
                    name="time"
                    value={formData.time}
                    placeholder="e.g. 10:00 AM"
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-700 mb-1">
                    Reg. Deadline
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-zinc-200 px-3 py-2 text-xs text-zinc-900 focus:border-zinc-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1">
                  Event Description & Guidelines
                </label>
                <textarea
                  rows="4"
                  name="description"
                  value={formData.description}
                  placeholder="Outline key topics, schedule agenda, eligibility criteria, prize pools, and prerequisites..."
                  onChange={handleChange}
                  className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:outline-none leading-relaxed"
                />
              </div>
            </div>
          </div>

          {/* Right Column: 5 Columns (Live Preview Card) */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-900">
                  <Eye className="h-3.5 w-3.5 text-zinc-500" />
                  Live Student Feed Preview
                </div>
                <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
                  Real-time card
                </span>
              </div>

              {/* Interactive Event Card */}
              <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md transition duration-200">
                {/* Banner Thumbnail */}
                <div className="relative h-48 w-full overflow-hidden bg-zinc-100">
                  <img
                    src={imagePreview}
                    alt="Event Poster Preview"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 rounded-md bg-white/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-semibold text-zinc-900">
                    {formData.category}
                  </span>

                  {/* Fee Pill */}
                  <span className="absolute top-3 right-3 rounded-md bg-zinc-900/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-medium text-white">
                    {formData.fee || "Free"}
                  </span>

                  {/* Bottom Text Over Banner */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-semibold truncate">
                      {formData.venue || "Venue not specified"}
                    </p>
                    <p className="text-[11px] text-zinc-300">
                      {formData.date || "Date Pending"} • {formData.time}
                    </p>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h4 className="text-sm font-bold text-zinc-900 line-clamp-1">
                    {formData.title || "Untitled Campus Event"}
                  </h4>
                  <p className="mt-1.5 text-xs text-zinc-500 line-clamp-2 leading-relaxed">
                    {formData.description ||
                      "Event summary and detailed instructions will be showcased here to prospective student attendees."}
                  </p>

                  {/* Metadata Chips */}
                  <div className="mt-4 space-y-2 border-t border-zinc-100 pt-3 text-xs text-zinc-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                      <span>{formData.date || "TBD"} ({formData.time})</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                      <span className="truncate">{formData.venue || "Campus Venue TBD"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                      <span>0 / {formData.capacity || "100"} Seats Registered</span>
                    </div>
                  </div>

                  {/* Simulated Action */}
                  <div className="mt-5 pt-3 border-t border-zinc-100">
                    <button
                      type="button"
                      disabled
                      className="w-full rounded-xl bg-zinc-900 py-2.5 text-xs font-semibold text-white shadow-xs opacity-90 cursor-default"
                    >
                      1-Click Register (Student View)
                    </button>
                  </div>
                </div>
              </div>

              {/* Helper Tip Box */}
              <div className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-3.5 text-[11px] text-zinc-500 leading-relaxed">
                <span className="font-semibold text-zinc-700">Admin Tip:</span> Publishing this event immediately reflects across the Student Explore Feed and sends alerts to subscribers.
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}