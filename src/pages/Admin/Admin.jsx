import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';
import FormField from '../../components/ui/FormField/FormField';
import Input from '../../components/ui/Input/Input';
import useLocalStorage from '../../hooks/useLocalStorage';
import { DEFAULT_EVENTS, EVENT_CATEGORIES, createEventId } from '../../utils/events';
import { GALLERY_DATA, CATEGORIES as GALLERY_CATEGORIES } from '../Gallery/galleryData';

const INITIAL_EVENT_FORM = {
  title: '',
  category: 'Tech',
  date: '',
  location: '',
  seats: '',
  description: '',
  image: '',
  register: '',
  active: true,
  registrationOpen: true,
  isPast: false,
};

const INITIAL_PHOTO_FORM = {
  title: '',
  category: 'Cultural',
  date: '',
  location: '',
  imageUrl: '',
  caption: '',
};

export default function Admin() {
  const [activeTab, setActiveTab] = useState('event'); // 'event' | 'photo'
  const [events, setEvents] = useLocalStorage('campus-events', DEFAULT_EVENTS);
  const [galleryPhotos, setGalleryPhotos] = useLocalStorage('campus-gallery', GALLERY_DATA);

  const [eventForm, setEventForm] = useState(INITIAL_EVENT_FORM);
  const [photoForm, setPhotoForm] = useState(INITIAL_PHOTO_FORM);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Metrics
  const activeCount = useMemo(() => events.filter((e) => e.active && !e.isPast).length, [events]);
  const pastCount = useMemo(() => events.filter((e) => e.isPast).length, [events]);

  const handleInputChange = (formType, field, value) => {
    setError('');
    setSuccessMsg('');
    if (formType === 'event') {
      setEventForm((prev) => ({ ...prev, [field]: value }));
    } else {
      setPhotoForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  // Convert image file upload to Base64 string
  const handleImageUpload = (formType, file) => {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setError('Image size should be under 2MB.');
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      if (formType === 'event') {
        setEventForm((prev) => ({ ...prev, image: reader.result }));
      } else {
        setPhotoForm((prev) => ({ ...prev, imageUrl: reader.result }));
      }
    };
    reader.readAsDataURL(file);
  };

  const resetForms = () => {
    setEditingId(null);
    setEventForm(INITIAL_EVENT_FORM);
    setPhotoForm(INITIAL_PHOTO_FORM);
    setError('');
    setSuccessMsg('');
  };

  // Handle Event Submit
  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (!eventForm.title.trim() || !eventForm.category.trim() || !eventForm.date.trim()) {
      setError('Please provide a title, category, and date.');
      return;
    }

    const newEvent = {
      id: editingId ? editingId : `${createEventId(eventForm.title)}-${Date.now()}`,
      title: eventForm.title.trim(),
      category: eventForm.category,
      date: eventForm.date.trim(),
      location: eventForm.location.trim() || 'Campus Venue',
      seats: eventForm.isPast ? 'Event Completed' : eventForm.seats.trim() || 'Registration open',
      description: eventForm.description.trim() || 'No description available.',
      image:
        eventForm.image.trim() ||
        'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=1000',
      register: eventForm.register.trim(),
      active: eventForm.active,
      registrationOpen: eventForm.isPast ? false : eventForm.registrationOpen,
      isPast: eventForm.isPast,
    };

    setEvents((current) =>
      editingId ? current.map((item) => (item.id === editingId ? newEvent : item)) : [newEvent, ...current]
    );

    setSuccessMsg(editingId ? 'Event updated successfully!' : 'Event published successfully!');
    resetForms();
  };

  // Handle Gallery Photo Submit
  const handlePhotoSubmit = (e) => {
    e.preventDefault();
    if (!photoForm.title.trim() || !photoForm.imageUrl.trim()) {
      setError('Please provide a photo title and image.');
      return;
    }

    const newPhoto = {
      id: `img-${Date.now()}`,
      title: photoForm.title.trim(),
      category: photoForm.category,
      date: photoForm.date.trim() || 'Recent Event',
      location: photoForm.location.trim() || 'Campus',
      imageUrl: photoForm.imageUrl.trim(),
      caption: photoForm.caption.trim() || photoForm.title.trim(),
    };

    setGalleryPhotos((current) => [newPhoto, ...current]);
    setSuccessMsg('Photo added to gallery!');
    setPhotoForm(INITIAL_PHOTO_FORM);
  };

  const handleDeleteEvent = (id) => {
    setEvents((current) => current.filter((e) => e.id !== id));
    if (editingId === id) resetForms();
  };

  const handleDeletePhoto = (id) => {
    setGalleryPhotos((current) => current.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-[2rem] bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-8 text-white shadow-2xl">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-400">
              Admin Dashboard
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Manage Events & Gallery
            </h1>
            <p className="text-base leading-8 text-slate-300">
              Publish upcoming campus activities or upload event photos directly to the gallery.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/explore">
                <Button variant="outline" size="md" className="border-blue-400 text-blue-200">
                  View Events Page
                </Button>
              </Link>
              <Link to="/gallery">
                <Button variant="outline" size="md" className="border-blue-400 text-blue-200">
                  View Photo Gallery
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.75rem] bg-white/10 p-5 text-center backdrop-blur-md">
              <p className="text-xs uppercase tracking-wider text-blue-200">Upcoming Events</p>
              <p className="mt-2 text-3xl font-extrabold">{activeCount}</p>
            </div>
            <div className="rounded-[1.75rem] bg-white/10 p-5 text-center backdrop-blur-md">
              <p className="text-xs uppercase tracking-wider text-red-300">Ended Events</p>
              <p className="mt-2 text-3xl font-extrabold">{pastCount}</p>
            </div>
            <div className="rounded-[1.75rem] bg-white/10 p-5 text-center backdrop-blur-md">
              <p className="text-xs uppercase tracking-wider text-emerald-300">Gallery Photos</p>
              <p className="mt-2 text-3xl font-extrabold">{galleryPhotos.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Control Panel Grid */}
      <section className="grid gap-8 lg:grid-cols-[0.9fr_0.5fr]">
        {/* Left Column: Manage Lists */}
        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">
              {activeTab === 'event' ? 'Published Events' : 'Gallery Photos'}
            </h2>

            <div className="mt-6 space-y-4 max-h-[750px] overflow-y-auto pr-1">
              {activeTab === 'event'
                ? events.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-16 w-20 rounded-xl object-cover"
                        />
                        <div>
                          <h3 className="font-bold text-slate-900">{item.title}</h3>
                          <p className="text-xs text-slate-500">
                            {item.category} • {item.date} • {item.location}
                          </p>
                          <span
                            className={`inline-block mt-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                              item.isPast
                                ? 'bg-red-100 text-red-700'
                                : 'bg-emerald-100 text-emerald-700'
                            }`}
                          >
                            {item.isPast ? 'Ended' : 'Upcoming'}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            setEditingId(item.id);
                            setEventForm(item);
                            setActiveTab('event');
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteEvent(item.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                : galleryPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={photo.imageUrl}
                          alt={photo.title}
                          className="h-16 w-20 rounded-xl object-cover"
                        />
                        <div>
                          <h3 className="font-bold text-slate-900">{photo.title}</h3>
                          <p className="text-xs text-slate-500">
                            {photo.category} • {photo.location}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeletePhoto(photo.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* Right Column: Creation Forms */}
        <aside className="space-y-6 rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          {/* TAB SWITCHER */}
          <div className="flex rounded-xl bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => {
                setActiveTab('event');
                setError('');
              }}
              className={`flex-1 rounded-lg py-2 text-sm font-bold transition ${
                activeTab === 'event' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
              }`}
            >
              📅 Post Event
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('photo');
                setError('');
              }}
              className={`flex-1 rounded-lg py-2 text-sm font-bold transition ${
                activeTab === 'photo' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600'
              }`}
            >
              📷 Post Photo
            </button>
          </div>

          {/* FORM 1: POST EVENT */}
          {activeTab === 'event' && (
            <form onSubmit={handleEventSubmit} className="space-y-4">
              <FormField label="Event Name" htmlFor="event-title" required>
                <Input
                  id="event-title"
                  value={eventForm.title}
                  onChange={(e) => handleInputChange('event', 'title', e.target.value)}
                  placeholder="Campus Hackathon 2026"
                />
              </FormField>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Category" htmlFor="event-category" required>
                  <select
                    id="event-category"
                    value={eventForm.category}
                    onChange={(e) => handleInputChange('event', 'category', e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-slate-900"
                  >
                    {EVENT_CATEGORIES.filter((c) => c !== 'All').map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField label="Date" htmlFor="event-date" required>
                  <Input
                    id="event-date"
                    value={eventForm.date}
                    onChange={(e) => handleInputChange('event', 'date', e.target.value)}
                    placeholder="May 18"
                  />
                </FormField>
              </div>

              <FormField label="Image URL or Upload" htmlFor="event-image">
                <Input
                  id="event-image"
                  value={eventForm.image}
                  onChange={(e) => handleInputChange('event', 'image', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('event', e.target.files[0])}
                  className="mt-2 block w-full text-xs text-slate-500"
                />
              </FormField>

              <FormField label="Location" htmlFor="event-location">
                <Input
                  id="event-location"
                  value={eventForm.location}
                  onChange={(e) => handleInputChange('event', 'location', e.target.value)}
                  placeholder="Innovation Hall"
                />
              </FormField>

              <FormField label="Description" htmlFor="event-description">
                <textarea
                  id="event-description"
                  value={eventForm.description}
                  onChange={(e) => handleInputChange('event', 'description', e.target.value)}
                  rows="3"
                  className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-slate-900"
                  placeholder="Add description..."
                />
              </FormField>

              <label className="inline-flex w-full items-center justify-between rounded-xl border border-red-200 bg-red-50/50 px-4 py-2 text-xs font-semibold text-red-700">
                <span>Mark as Ended / Past Event</span>
                <input
                  type="checkbox"
                  checked={eventForm.isPast}
                  onChange={(e) => handleInputChange('event', 'isPast', e.target.checked)}
                />
              </label>

              {error && <p className="text-xs font-bold text-red-600">{error}</p>}
              {successMsg && <p className="text-xs font-bold text-emerald-600">{successMsg}</p>}

              <div className="flex gap-2">
                <Button type="submit" variant="primary" size="md">
                  {editingId ? 'Update Event' : 'Publish Event'}
                </Button>
                <Button type="button" variant="outline" size="md" onClick={resetForms}>
                  Clear
                </Button>
              </div>
            </form>
          )}

          {/* FORM 2: POST GALLERY PHOTO */}
          {activeTab === 'photo' && (
            <form onSubmit={handlePhotoSubmit} className="space-y-4">
              <FormField label="Photo Title" htmlFor="photo-title" required>
                <Input
                  id="photo-title"
                  value={photoForm.title}
                  onChange={(e) => handleInputChange('photo', 'title', e.target.value)}
                  placeholder="Cultural Fest Dance Winners"
                />
              </FormField>

              <FormField label="Category" htmlFor="photo-category" required>
                <select
                  id="photo-category"
                  value={photoForm.category}
                  onChange={(e) => handleInputChange('photo', 'category', e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-slate-900"
                >
                  {GALLERY_CATEGORIES.filter((c) => c !== 'All').map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField label="Image URL or Upload" htmlFor="photo-url" required>
                <Input
                  id="photo-url"
                  value={photoForm.imageUrl}
                  onChange={(e) => handleInputChange('photo', 'imageUrl', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload('photo', e.target.files[0])}
                  className="mt-2 block w-full text-xs text-slate-500"
                />
              </FormField>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Event Date" htmlFor="photo-date">
                  <Input
                    id="photo-date"
                    value={photoForm.date}
                    onChange={(e) => handleInputChange('photo', 'date', e.target.value)}
                    placeholder="May 20, 2026"
                  />
                </FormField>

                <FormField label="Location" htmlFor="photo-location">
                  <Input
                    id="photo-location"
                    value={photoForm.location}
                    onChange={(e) => handleInputChange('photo', 'location', e.target.value)}
                    placeholder="Main Quad"
                  />
                </FormField>
              </div>

              <FormField label="Caption / Description" htmlFor="photo-caption">
                <textarea
                  id="photo-caption"
                  value={photoForm.caption}
                  onChange={(e) => handleInputChange('photo', 'caption', e.target.value)}
                  rows="2"
                  className="block w-full rounded-lg border border-gray-300 p-2.5 text-sm text-slate-900"
                  placeholder="Brief note about this photo..."
                />
              </FormField>

              {error && <p className="text-xs font-bold text-red-600">{error}</p>}
              {successMsg && <p className="text-xs font-bold text-emerald-600">{successMsg}</p>}

              <Button type="submit" variant="primary" size="md" className="w-full">
                Add Photo to Gallery
              </Button>
            </form>
          )}
        </aside>
      </section>
    </div>
  );
}