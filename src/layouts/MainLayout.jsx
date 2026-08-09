import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar/Navbar';
import Footer from '../components/common/Footer/Footer';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900">
      <Navbar />
      
      {/* Dynamic Page Component Renders Here */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}