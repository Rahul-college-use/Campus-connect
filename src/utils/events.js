export const DEFAULT_EVENTS = [
  // =========================
  // UPCOMING EVENTS
  // =========================
  {
    id: 'alumni-meet-2026',
    title: 'Alumni Meet 2026',
    category: 'Cultural',
    date: 'August 10',
    location: 'College Auditorium',
    seats: 'Registration open',
    description:
      'Alumni gathering featuring networking, memories, career discussions, and student interaction sessions.',
    image:
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=1000',
    register: 'https://forms.gle/example-alumni',
    organizer: 'Alumni Relations & Student Affairs',
    contactEmail: 'alumni@campus.edu',
    agenda: [
      { time: '10:00 AM', activity: 'Welcome Speech & Guest Registrations' },
      { time: '11:30 AM', activity: 'Panel Discussion on Industry Trends' },
      { time: '01:00 PM', activity: 'Networking Lunch' },
      { time: '03:00 PM', activity: 'Cultural Performances & Closing' },
    ],
    active: true,
    registrationOpen: true,
    isPast: false,
  },
  {
    id: 'independence-day-celebration',
    title: 'Independence Day Celebration',
    category: 'Cultural',
    date: 'August 15',
    location: 'Main Ground',
    seats: 'Open for all',
    description:
      'Flag hoisting ceremony followed by cultural performances, speeches, and student activities.',
    image:
      'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=1000',
    register: 'https://forms.gle/example-ind-day',
    organizer: 'Cultural Society',
    contactEmail: 'cultural@campus.edu',
    agenda: [
      { time: '08:00 AM', activity: 'Flag Hoisting Ceremony' },
      { time: '09:00 AM', activity: 'National Anthem & Parade' },
      { time: '10:00 AM', activity: 'Cultural Songs & Dances' },
    ],
    active: true,
    registrationOpen: true,
    isPast: false,
  },
  {
    id: 'teachers-day-celebration',
    title: 'Teachers Day Celebration',
    category: 'Cultural',
    date: 'September 5',
    location: 'Main Auditorium',
    seats: 'Registration open',
    description:
      'Students celebrate teachers through cultural performances, appreciation awards, and interactive activities.',
    image:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=1000',
    register: 'https://forms.gle/example-teachers-day',
    organizer: 'Student Council',
    contactEmail: 'council@campus.edu',
    agenda: [
      { time: '11:00 AM', activity: 'Felicitation of Faculty Members' },
      { time: '12:30 PM', activity: 'Student Performances' },
      { time: '02:00 PM', activity: 'High Tea & Interactions' },
    ],
    active: true,
    registrationOpen: true,
    isPast: false,
  },

  // =========================
  // PAST / COMPLETED EVENTS
  // =========================
  {
    id: 'campus-hackathon-2026',
    title: 'Campus Hackathon 2026',
    category: 'Tech',
    date: 'May 18',
    location: 'Innovation Hall',
    seats: 'Event Completed',
    description:
      '24-hour rapid prototyping challenge with expert mentors and cash prizes.',
    image:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000',
    register: '',
    organizer: 'Tech Club & Innovation Cell',
    contactEmail: 'techclub@campus.edu',
    agenda: [
      { time: '09:00 AM', activity: 'Hackathon Hackoff Begins' },
      { time: '02:00 PM', activity: 'Mentorship Checkpoint 1' },
      { time: '09:00 AM (Next Day)', activity: 'Final Submissions & Judging' },
    ],
    active: true,
    registrationOpen: false,
    isPast: true,
  },
  {
    id: 'farewell-2026',
    title: 'Farewell 2026',
    category: 'Cultural',
    date: 'April 25',
    location: 'Main Auditorium',
    seats: 'Event Completed',
    description:
      'A memorable farewell celebration for graduating students featuring performances, awards, and memories.',
    image:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=1000',
    register: '',
    organizer: 'Final Year Committee',
    contactEmail: 'farewell2026@campus.edu',
    agenda: [
      { time: '04:00 PM', activity: 'Red Carpet Entry' },
      { time: '05:30 PM', activity: 'Titles & Awards Ceremony' },
      { time: '08:00 PM', activity: 'Gala Dinner & DJ Night' },
    ],
    active: true,
    registrationOpen: false,
    isPast: true,
  },
  {
    id: 'football-tournament',
    title: 'Football Tournament',
    category: 'Sports',
    date: 'May 22',
    location: 'Stadium',
    seats: 'Event Completed',
    description:
      'Inter-department football tournament with semi-finals and finals on Sunday.',
    image:
      'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&q=80&w=1000',
    register: '',
    organizer: 'Sports Authority',
    contactEmail: 'sports@campus.edu',
    agenda: [
      { time: '08:00 AM', activity: 'League Matches' },
      { time: '02:00 PM', activity: 'Semi-Finals' },
      { time: '05:00 PM', activity: 'Grand Finals & Trophy Distribution' },
    ],
    active: true,
    registrationOpen: false,
    isPast: true,
  },
];

export const EVENT_CATEGORIES = [
  'All',
  'Tech',
  'Cultural',
  'Sports',
  'Creative',
  'Innovation',
  'Academic',
];

export function createEventId(title) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function checkIsPastEvent(eventDateString, year = 2026) {
  if (!eventDateString) return false;
  const eventDate = new Date(`${eventDateString}, ${year}`);
  const today = new Date();
  return eventDate < today;
}