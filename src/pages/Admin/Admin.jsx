import { useMemo } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import Button from '../../components/ui/Button/Button';
import useLocalStorage from '../../hooks/useLocalStorage';
import { DEFAULT_EVENTS } from '../../utils/events';
import { GALLERY_DATA } from '../Gallery/galleryData';
import AdminDashboard from './AdminDashboard';

export default function Admin() {
  const [events] = useLocalStorage('campus-events', DEFAULT_EVENTS);
  const [galleryPhotos] = useLocalStorage('campus-gallery', GALLERY_DATA);

  // Metrics calculation
  const activeCount = useMemo(
    () => events.filter((e) => e.active && !e.isPast).length,
    [events]
  );
  const pastCount = useMemo(
    () => events.filter((e) => e.isPast).length,
    [events]
  );

  return (
    <div className="space-y-8">
      <main>

        <Outlet />
      </main>
    </div>
  );
}