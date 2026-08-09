import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { GALLERY_DATA, CATEGORIES } from '../Gallery/galleryData';

const ITEMS_PER_PAGE = 12;

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Reset pagination when filter or search changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeCategory, searchTerm]);

  // Freeze background scrolling when Lightbox Modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage]);

  // Filter gallery items
  const filteredGallery = useMemo(() => {
    return GALLERY_DATA.filter((item) => {
      const matchesCategory =
        activeCategory === 'All' || item.category === activeCategory;
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        item.title.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  // Current selected image index within filtered list
  const currentIndex = useMemo(() => {
    if (!selectedImage) return -1;
    return filteredGallery.findIndex((img) => img.id === selectedImage.id);
  }, [selectedImage, filteredGallery]);

  // Navigation handlers for Modal
  const handlePrev = useCallback(
    (e) => {
      e?.stopPropagation();
      if (filteredGallery.length === 0) return;
      const prevIdx =
        currentIndex > 0 ? currentIndex - 1 : filteredGallery.length - 1;
      setSelectedImage(filteredGallery[prevIdx]);
    },
    [currentIndex, filteredGallery]
  );

  const handleNext = useCallback(
    (e) => {
      e?.stopPropagation();
      if (filteredGallery.length === 0) return;
      const nextIdx =
        currentIndex < filteredGallery.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(filteredGallery[nextIdx]);
    },
    [currentIndex, filteredGallery]
  );

  // Keyboard navigation shortcuts (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === 'Escape') setSelectedImage(null);
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, handlePrev, handleNext]);

  // Slice visible items for pagination
  const displayedGallery = useMemo(() => {
    return filteredGallery.slice(0, visibleCount);
  }, [filteredGallery, visibleCount]);

  return (
<div className="relative min-h-screen overflow-x-hidden rounded-[1.5rem] sm:rounded-[2.5rem] bg-slate-50 p-3 sm:p-6 lg:p-8 space-y-6 sm:space-y-10">
      {/* SOFT PREMIUM LIGHT BACKGROUND GRADIENTS */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-blue-100/70 blur-[80px] sm:blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 -right-24 h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-indigo-100/60 blur-[80px] sm:blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl space-y-6 sm:space-y-10">
        {/* HERO BANNER - RESPONSIVE CONTAINER */}
        <section className="relative overflow-hidden rounded-[1.5rem] sm:rounded-[2rem] border border-slate-200/80 bg-white/80 p-5 sm:p-8 lg:p-12 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-2 sm:space-y-4">
              <span className="inline-block rounded-full bg-blue-50 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 border border-blue-100">
                Campus Memories
              </span>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                Event Photo Gallery
              </h1>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                Relive the most exciting moments, performances, competitions, and gatherings captured across campus events.
              </p>
            </div>

            {/* Stats Counter */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-xl sm:rounded-2xl border border-slate-200/60 bg-slate-50/80 p-3 sm:p-4 text-center shadow-inner">
                <p className="text-2xl sm:text-3xl font-black text-blue-600">{GALLERY_DATA.length}+</p>
                <p className="text-[11px] sm:text-xs font-medium text-slate-500">Captured Moments</p>
              </div>
              <div className="rounded-xl sm:rounded-2xl border border-slate-200/60 bg-slate-50/80 p-3 sm:p-4 text-center shadow-inner">
                <p className="text-2xl sm:text-3xl font-black text-blue-600">20+</p>
                <p className="text-[11px] sm:text-xs font-medium text-slate-500">Campus Events</p>
              </div>
            </div>
          </div>
        </section>

        {/* CONTROLS: CATEGORIES & SEARCH */}
        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Category Tabs (Scrollable on small mobile screens) */}
          <div
            role="tablist"
            aria-label="Gallery Categories"
            className="flex max-w-full overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap gap-2 sm:gap-2.5 scrollbar-none"
          >
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={activeCategory === category}
                onClick={() => setActiveCategory(category)}
                className={`shrink-0 rounded-full px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-blue-600 text-white shadow-md sm:shadow-lg shadow-blue-500/25'
                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full lg:w-80">
            <input
              type="text"
              placeholder="Search gallery photos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-slate-200 bg-white px-4 sm:px-5 py-2 sm:py-2.5 pl-10 sm:pl-11 text-xs sm:text-sm text-slate-800 placeholder-slate-400 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
            <svg
              className="absolute left-3.5 sm:left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
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
                className="absolute right-3.5 sm:right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* IMAGE GRID */}
        {displayedGallery.length > 0 ? (
          <>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {displayedGallery.map((item) => (
                <article
                  key={item.id}
                  onClick={() => setSelectedImage(item)}
                  className="group relative cursor-pointer overflow-hidden rounded-xl sm:rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:sm:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="aspect-4/3 w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3">
                    <span className="rounded-full bg-white/90 px-2.5 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-blue-600 shadow-md backdrop-blur-md border border-slate-100">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-3.5 sm:p-4">
                    <h3 className="line-clamp-1 text-sm sm:text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                      {item.title}
                    </h3>
                    <div className="mt-1.5 sm:mt-2 flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
                      <span>📅 {item.date}</span>
                      <span>📍 {item.location}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More Button */}
            {visibleCount < filteredGallery.length && (
              <div className="flex flex-col items-center justify-center pt-4 sm:pt-8">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + ITEMS_PER_PAGE)}
                  className="w-full sm:w-auto rounded-full border border-blue-200 bg-white px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold text-blue-600 shadow-md transition hover:bg-blue-600 hover:text-white hover:shadow-lg"
                >
                  Load More Photos ({filteredGallery.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl sm:rounded-3xl border border-dashed border-slate-300 bg-white p-8 sm:p-12 text-center text-slate-500">
            <p className="text-sm sm:text-lg font-medium">No gallery photos match your search.</p>
          </div>
        )}
      </div>

      {/* LIGHTBOX MODAL WITH RESPONSIVE CONTROLS */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/70 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-3 sm:p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 border border-slate-200 transition hover:bg-slate-200 hover:text-slate-900"
            >
              ✕
            </button>

            {/* Image Preview & Navigation Buttons */}
            <div className="relative flex min-h-[35vh] max-h-[50vh] sm:max-h-[65vh] w-full items-center justify-center overflow-hidden rounded-xl sm:rounded-2xl bg-slate-900">
              <img
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                className="max-h-[50vh] sm:max-h-[65vh] w-full object-contain mx-auto"
              />

              {/* PREVIOUS BUTTON */}
              <button
                type="button"
                onClick={handlePrev}
                className="absolute left-2 sm:left-4 top-1/2 z-20 flex h-9 w-9 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xs sm:text-base text-slate-900 shadow-xl border border-slate-200 backdrop-blur-md transition hover:bg-blue-600 hover:text-white hover:scale-110 active:scale-95"
                title="Previous Image (Left Arrow)"
              >
                ❮
              </button>

              {/* NEXT BUTTON */}
              <button
                type="button"
                onClick={handleNext}
                className="absolute right-2 sm:right-4 top-1/2 z-20 flex h-9 w-9 sm:h-12 sm:w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xs sm:text-base text-slate-900 shadow-xl border border-slate-200 backdrop-blur-md transition hover:bg-blue-600 hover:text-white hover:scale-110 active:scale-95"
                title="Next Image (Right Arrow)"
              >
                ❯
              </button>
            </div>

            {/* Image Details Footer */}
            <div className="mt-4 sm:mt-5 space-y-1.5 sm:space-y-2 text-left">
              <div className="flex flex-wrap items-center justify-between gap-2 pr-8 sm:pr-0">
                <h2 className="text-lg font-bold text-slate-900 sm:text-2xl lg:text-3xl">
                  {selectedImage.title}
                </h2>
                <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-0.5 sm:px-3.5 sm:py-1 text-[10px] sm:text-xs font-bold text-blue-600">
                  {selectedImage.category}
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5 sm:gap-4 text-[11px] sm:text-xs font-semibold text-slate-500">
                <span>📅 {selectedImage.date}</span>
                <span>📍 {selectedImage.location}</span>
                <span className="text-blue-600">
                  Image {currentIndex + 1} of {filteredGallery.length}
                </span>
              </div>

              {selectedImage.caption && (
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedImage.caption}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}