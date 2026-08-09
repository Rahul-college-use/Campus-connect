# 🎓 Campus Connect

> A modern, responsive, and feature-rich Web Application designed for college students and campus event organizers to discover, manage, and showcase events and memories effortlessly.

![Campus Connect Banner](https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1200)

---

## 📌 Overview

**Campus Connect** bridges the gap between campus event organizers and students. Built with **React** and **Tailwind CSS**, it provides a sleek glassmorphic UI, real-time filtering, dynamic routing, lightbox gallery controls, and a fully interactive Admin Panel to publish events and photos on the fly.

---

## ✨ Key Features

### 📅 1. Event Discovery & Filtering
* **Category Filtering:** Filter events across `Tech`, `Cultural`, `Sports`, `Creative`, `Innovation`, and `Academic`.
* **Dynamic Search Bar:** Instantly search events by title, description, category, or location.
* **Auto-Sorting:** Past and completed events (`Event Ended`) automatically shift to the bottom of the list.

### 🔍 2. Rich Event Details (`Learn More`)
* **Comprehensive Metadata:** Event date, time, venue, category badges, and entry requirements.
* **Schedule & Agenda:** Step-by-step event timeline and activity slots.
* **Rules & Perks:** Detailed guidelines, eligibility criteria, and rewards/certificates.
* **Host Details:** Organizer contact information with instant email triggers.

### 🖼️ 3. Interactive Photo Gallery
* **Responsive Lightbox Modal:** Fullscreen photo preview with keyboard shortcuts (`Escape`, `← Left Arrow`, `→ Right Arrow`).
* **Pagination & Performance:** Optimized batch rendering ("Load More") for smooth performance across 200+ images.
* **Background Scroll Freeze:** Page scroll freezes automatically when the preview modal is active.

### ⚙️ 4. Full-Featured Admin Panel
* **Dual Action Switcher:** Toggle between **Post Event** and **Post Photo**.
* **Image Uploads & URLs:** Upload images from your local device or paste CDN links.
* **Event Controls:** Easily mark events as `Visible/Hidden`, `Registration Open/Closed`, or `Ended/Past`.
* **Local Persistence:** All event and gallery updates persist using `localStorage`.

---

## 🛠️ Tech Stack & Libraries

* **Frontend Library:** [React.js](https://react.dev/) (Vite)
* **Styling & UI:** [Tailwind CSS](https://tailwindcss.com/)
* **Routing:** [React Router DOM](https://reactrouter.com/) (v6)
* **Icons & Assets:** Heroicons / Inline SVGs
* **State Management:** React Hooks (`useState`, `useMemo`, `useEffect`, `useCallback`) & `localStorage`

---

## 📂 Project Directory Structure

```text
campus-connect/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── Button/
│   │       ├── FormField/
│   │       ├── Input/
│   │       └── Toast/
│   ├── pages/
│   │   ├── Explore.jsx
│   │   ├── EventDetails.jsx
│   │   ├── Gallery.jsx
│   │   ├── Admin.jsx
│   │   ├── Contact.jsx
│   │   └── CommonPage.jsx
│   ├── utils/
│   │   ├── events.js
│   │   └── galleryData.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
└── README.md