import React, { useState, useMemo, useEffect } from "react";
import {
  Heart,
  Share2,
  Download,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  Camera,
  X,
  Sparkles,
  Maximize2,
  Check,
  Calendar,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";

const INITIAL_GALLERY_PHOTOS = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    caption: "Hackathon project presentation round in Main Auditorium",
    event: "HackCampus 2026",
    category: "Technical",
    date: "Oct 12, 2026",
    photographer: "Rahul Kumar (Media Cell)",
    likes: 42,
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    caption: "Auditorium crowd during keynote session by Industry Experts",
    event: "Tech Fest",
    category: "Technical",
    date: "Oct 14, 2026",
    photographer: "Media Team",
    likes: 68,
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    caption: "Cricket championship winners team trophy celebration",
    event: "Sports Meet",
    category: "Sports",
    date: "Nov 02, 2026",
    photographer: "Sports Council",
    likes: 89,
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80",
    caption: "Full-stack React & Node.js live coding demonstration",
    event: "Web Dev Workshop",
    category: "Workshop",
    date: "Nov 05, 2026",
    photographer: "Aman Verma",
    likes: 35,
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
    caption: "Live band performance under the lights at Amphitheatre",
    event: "Acoustic Night",
    category: "Cultural",
    date: "Nov 14, 2026",
    photographer: "Cultural Society",
    likes: 112,
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    caption: "Students collaborating on open-source bug bounty challenge",
    event: "HackCampus 2026",
    category: "Technical",
    date: "Oct 12, 2026",
    photographer: "Media Team",
    likes: 54,
  },
  {
    id: 7,
    url: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    caption: "UI/UX Figma design sprint wireframing critique session",
    event: "Design Sprint",
    category: "Workshop",
    date: "Nov 20, 2026",
    photographer: "Design Club",
    likes: 47,
  },
  {
    id: 8,
    url: "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=1200&q=80",
    caption: "Intense smash rally in Badminton Championship Semi-Finals",
    event: "Badminton Open",
    category: "Sports",
    date: "Nov 25, 2026",
    photographer: "Sports Council",
    likes: 73,
  },
  {
    id: 9,
    url: "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=1200&q=80",
    caption: "Street play drama team enacting social awareness skit",
    event: "Drama Showcase",
    category: "Cultural",
    date: "Dec 05, 2026",
    photographer: "Media Cell",
    likes: 61,
  },
  {
    id: 10,
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
    caption: "Autonomous line follower robot arena testing trial",
    event: "Robotics Expo",
    category: "Technical",
    date: "Dec 10, 2026",
    photographer: "ECE Club",
    likes: 95,
  },
  {
    id: 11,
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    caption: "Rock band lead guitarist during festival closing ceremony",
    event: "Rock Fest",
    category: "Cultural",
    date: "Dec 20, 2026",
    photographer: "Media Cell",
    likes: 128,
  },
  {
    id: 12,
    url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
    caption: "Packet sniffing & network security live vulnerability audit",
    event: "Security Bootcamp",
    category: "Technical",
    date: "Dec 22, 2026",
    photographer: "CyberSec Lab",
    likes: 80,
  },
];

const ITEMS_PER_PAGE = 10;
const CATEGORIES = ["All", "Technical", "Workshop", "Sports", "Cultural"];

export default function Gallery() {
  const [photos, setPhotos] = useState(INITIAL_GALLERY_PHOTOS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [likes, setLikes] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  // Modals
  const [lightboxPhoto, setLightboxPhoto] = useState(null);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  // Freeze background scrolling when any modal is open
  useEffect(() => {
    const isModalOpen = Boolean(lightboxPhoto || deleteTargetId);
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxPhoto, deleteTargetId]);

  // ESC Key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxPhoto(null);
        setDeleteTargetId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filter & Search Logic
  const filteredPhotos = useMemo(() => {
    return photos.filter((photo) => {
      const matchesCategory =
        selectedCategory === "All" || photo.category === selectedCategory;
      const matchesSearch =
        photo.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        photo.photographer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [photos, searchTerm, selectedCategory]);

  // Exact 10 items pagination slice
  const totalPages = Math.ceil(filteredPhotos.length / ITEMS_PER_PAGE) || 1;
  const paginatedPhotos = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredPhotos.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPhotos, currentPage]);

  const toggleLike = (id, e) => {
    e?.stopPropagation();
    setLikes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShare = (photo, e) => {
    e?.stopPropagation();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(photo.url);
      setCopiedId(photo.id);
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      alert("Image link copied!");
    }
  };

  const handleDownload = (photo, e) => {
    e?.stopPropagation();
    const a = document.createElement("a");
    a.href = photo.url;
    a.download = `CampusConnect_${photo.event.replace(/\s+/g, "_")}_${photo.id}.jpg`;
    a.target = "_blank";
    a.rel = "noreferrer";
    a.click();
  };

  const confirmDelete = () => {
    setPhotos((prev) => prev.filter((p) => p.id !== deleteTargetId));
    if (lightboxPhoto?.id === deleteTargetId) {
      setLightboxPhoto(null);
    }
    setDeleteTargetId(null);
    if (paginatedPhotos.length === 1 && currentPage > 1) {
      setCurrentPage((p) => p - 1);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50/50 pb-20">
      {/* Top Header Banner */}
      <div className="border-b border-zinc-200/80 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600 mb-1.5">
                <Sparkles className="h-3 w-3 text-zinc-900" /> Campus Media Hub
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
                Campus Gallery
              </h1>
              <p className="text-xs text-zinc-500">
                Curate, moderate, and explore high-resolution memories across campus events.
              </p>
            </div>

            {/* Post Photo CTA */}
            <Link
              to="/admin/events/post-photo"
              className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800 transition active:scale-95"
            >
              <Camera className="h-3.5 w-3.5" />
              Post New Photo
            </Link>
          </div>

          {/* Search & Category Filter Bar */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Search Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                placeholder="Search by event, caption, or photographer..."
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

            {/* Category Chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              {CATEGORIES.map((cat) => {
                const count =
                  cat === "All"
                    ? photos.length
                    : photos.filter((p) => p.category === cat).length;
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                      isActive
                        ? "bg-zinc-900 text-white shadow-xs"
                        : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100"
                    }`}
                  >
                    {cat}
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

      {/* Main Grid Content */}
      <main className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between text-xs text-zinc-500">
          <span>
            Displaying <strong className="text-zinc-900">{paginatedPhotos.length}</strong> of{" "}
            <strong className="text-zinc-900">{filteredPhotos.length}</strong> photos (Page {currentPage} of {totalPages})
          </span>
        </div>

        {/* Empty State */}
        {paginatedPhotos.length === 0 && (
          <div className="rounded-2xl border border-dashed border-zinc-200 bg-white p-12 text-center text-xs text-zinc-500">
            No gallery photos match your search or filter criteria.
          </div>
        )}

        {/* 10 Items per Page Responsive Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedPhotos.map((photo) => {
            const isLiked = likes[photo.id];
            const currentLikes = photo.likes + (isLiked ? 1 : 0);

            return (
              <div
                key={photo.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-xs transition hover:shadow-md hover:border-zinc-300"
              >
                {/* Image Container with Hover Actions */}
                <div
                  onClick={() => setLightboxPhoto(photo)}
                  className="relative h-56 w-full cursor-pointer overflow-hidden bg-zinc-100"
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent opacity-90 transition-opacity" />

                  {/* Event Tag */}
                  <span className="absolute top-2.5 left-2.5 rounded-md bg-zinc-900/80 backdrop-blur-md px-2 py-0.5 text-[10px] font-medium text-white shadow-xs">
                    {photo.event}
                  </span>

                  {/* Admin Quick Delete & Zoom Overlay Buttons */}
                  <div className="absolute top-2.5 right-2.5 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition duration-200">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxPhoto(photo);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-900/80 text-white backdrop-blur-xs hover:bg-zinc-900"
                      title="Enlarge Photo"
                    >
                      <Maximize2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteTargetId(photo.id);
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-600/90 text-white backdrop-blur-xs hover:bg-rose-700"
                      title="Delete Photo"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Date & Credit */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-[11px] text-zinc-200 truncate">
                    <span>{photo.photographer}</span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="flex flex-1 flex-col justify-between p-4">
                  <p className="text-xs font-medium text-zinc-800 line-clamp-2 leading-relaxed">
                    {photo.caption}
                  </p>

                  {/* Action Footer */}
                  <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-500">
                    {/* Like Button */}
                    <button
                      type="button"
                      onClick={(e) => toggleLike(photo.id, e)}
                      className={`flex items-center gap-1.5 transition ${
                        isLiked
                          ? "text-rose-600 font-semibold"
                          : "text-zinc-500 hover:text-zinc-900"
                      }`}
                    >
                      <Heart
                        className={`h-3.5 w-3.5 ${
                          isLiked ? "fill-rose-600 text-rose-600" : ""
                        }`}
                      />
                      <span>{currentLikes}</span>
                    </button>

                    {/* Share & Download Actions */}
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={(e) => handleShare(photo, e)}
                        className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-800 transition"
                        title="Copy Image Link"
                      >
                        {copiedId === photo.id ? (
                          <Check className="h-3.5 w-3.5 text-emerald-600" />
                        ) : (
                          <Share2 className="h-3.5 w-3.5" />
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleDownload(photo, e)}
                        className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-800 transition"
                        title="Download High-Res"
                      >
                        <Download className="h-3.5 w-3.5" />
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
                className="inline-flex items-center gap-1 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
              >
                Next <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Lightbox Modal (Background Scroll Freeze Active) */}
      {lightboxPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-zinc-950/70 backdrop-blur-xs transition-opacity"
            onClick={() => setLightboxPhoto(null)}
          />

          <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-100">
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between border-b border-zinc-100 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-800">
                  {lightboxPhoto.event}
                </span>
                <span className="text-xs text-zinc-400">• {lightboxPhoto.category}</span>
              </div>
              <button
                onClick={() => setLightboxPhoto(null)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Image View */}
            <div className="max-h-[60vh] w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
              <img
                src={lightboxPhoto.url}
                alt={lightboxPhoto.caption}
                className="max-h-[60vh] w-auto object-contain"
              />
            </div>

            {/* Modal Footer Info & Actions */}
            <div className="p-5">
              <p className="text-xs font-medium text-zinc-800 sm:text-sm">
                {lightboxPhoto.caption}
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-100 pt-3 text-xs text-zinc-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-zinc-400" />
                    {lightboxPhoto.photographer}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                    {lightboxPhoto.date}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLike(lightboxPhoto.id)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 font-medium transition ${
                      likes[lightboxPhoto.id]
                        ? "bg-rose-50 text-rose-600 border-rose-200"
                        : "hover:bg-zinc-50 text-zinc-700"
                    }`}
                  >
                    <Heart
                      className={`h-3.5 w-3.5 ${
                        likes[lightboxPhoto.id] ? "fill-current" : ""
                      }`}
                    />
                    {lightboxPhoto.likes + (likes[lightboxPhoto.id] ? 1 : 0)} Likes
                  </button>

                  <button
                    onClick={() => handleDownload(lightboxPhoto)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3.5 py-1.5 font-medium text-white hover:bg-zinc-800 transition"
                  >
                    <Download className="h-3.5 w-3.5" /> Download
                  </button>
                </div>
              </div>
            </div>
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
            <h3 className="text-sm font-bold text-zinc-900">Delete Photo?</h3>
            <p className="mt-1 text-xs text-zinc-500">
              Are you sure you want to delete this photo from the campus gallery? This action cannot be undone.
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