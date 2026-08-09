export const CATEGORIES = [
  'All',
  'Cultural',
  'Tech',
  'Sports',
  'Creative',
  'Innovation',
  'Academic',
];

// Base curated campus event photos with optimized CDN parameters
const BASE_GALLERY_DATA = [
  {
    id: 'img-1',
    title: 'Campus Hackathon 2026',
    category: 'Tech',
    date: 'May 18, 2026',
    location: 'Innovation Hall',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
    caption: '24-hour rapid prototyping challenge with expert mentors and cash prizes.',
  },
  {
    id: 'img-2',
    title: 'Farewell 2026 Celebrations',
    category: 'Cultural',
    date: 'April 25, 2026',
    location: 'Main Auditorium',
    imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
    caption: 'Graduating seniors celebrating their memorable journey with music and awards.',
  },
  {
    id: 'img-3',
    title: 'Football Tournament Finals',
    category: 'Sports',
    date: 'May 22, 2026',
    location: 'Campus Stadium',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
    caption: 'Thrill and excitement as departments clashed in the inter-departmental finals.',
  },
  {
    id: 'img-4',
    title: 'Robotics Challenge Live',
    category: 'Innovation',
    date: 'May 26, 2026',
    location: 'Tech Lab',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=600&q=80',
    caption: 'Autonomous robots undergoing live obstacle navigation scoring.',
  },
  {
    id: 'img-5',
    title: 'Cultural Night Dance',
    category: 'Cultural',
    date: 'March 15, 2026',
    location: 'Open Air Theatre',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    caption: 'Electrifying group dance performances under the stars.',
  },
  {
    id: 'img-6',
    title: 'Design Sprint Workshop',
    category: 'Creative',
    date: 'May 24, 2026',
    location: 'Studio 3',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=600&q=80',
    caption: 'Wireframing ideas and UI/UX design sessions with student creators.',
  },
  {
    id: 'img-7',
    title: 'Cricket Championship Cup',
    category: 'Sports',
    date: 'June 8, 2026',
    location: 'College Ground',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80',
    caption: 'Winning team celebrating with the championship trophy.',
  },
  {
    id: 'img-8',
    title: 'Open Mic Poetry Session',
    category: 'Creative',
    date: 'June 10, 2026',
    location: 'Student Activity Center',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80',
    caption: 'Students sharing original poetry, comedy, and acoustic sets.',
  },
  {
    id: 'img-9',
    title: 'Student Project Expo',
    category: 'Academic',
    date: 'July 5, 2026',
    location: 'Innovation Center',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80',
    caption: 'Exhibition of final year engineering and software research projects.',
  },
  {
    id: 'img-10',
    title: 'Code Clash Programming',
    category: 'Tech',
    date: 'May 28, 2026',
    location: 'Computer Lab 1',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
    caption: 'Intense competitive programming round covering advanced algorithms.',
  },
  {
    id: 'img-11',
    title: 'Badminton Singles Tournament',
    category: 'Sports',
    date: 'June 12, 2026',
    location: 'Indoor Sports Complex',
    imageUrl: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80',
    caption: 'Fast-paced badminton action during the inter-college championship.',
  },
  {
    id: 'img-12',
    title: 'Campus Photography Exhibition',
    category: 'Creative',
    date: 'June 20, 2026',
    location: 'Media Studio',
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&w=600&q=80',
    caption: 'Showcase of winning student photographs depicting campus life.',
  },
];

/**
 * Generator function to scale up gallery items to 200+ photos for testing and production
 */
function createExpandedGallery(targetCount = 200) {
  const expanded = [];
  
  for (let i = 0; i < targetCount; i++) {
    const baseItem = BASE_GALLERY_DATA[i % BASE_GALLERY_DATA.length];
    const imageId = (i % 50) + 10;
    
    expanded.push({
      ...baseItem,
      id: `img-${i + 1}`,
      title: i < BASE_GALLERY_DATA.length ? baseItem.title : `${baseItem.title} #${Math.floor(i / BASE_GALLERY_DATA.length) + 1}`,
      // Dynamic Unsplash image with unique IDs for variety
      imageUrl: `https://picsum.photos/id/${imageId + 100}/800/600`,
    });
  }
  
  return expanded;
}

// Export 200+ generated gallery items
export const GALLERY_DATA = createExpandedGallery(200);