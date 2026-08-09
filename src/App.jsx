import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast/ToastContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Explore from './pages/Explore/Explore';
import Gallery from './pages/Gallery/Gallery';
import Admin from './pages/Admin/Admin';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import EventDetails from './pages/Event/EventDetails';
import ScrollToTop from './components/common/ScrollToTop/ScrollToTop';
import CommonPage from './components/common/Footer/CommonPage';
export default function App() {

  return (
    <ToastProvider position="top-right">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Main Layout Route Wrap */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="explore" element={<Explore />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="admin" element={<Admin />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="events/:eventId" element={<EventDetails />} />

            {/* 404 Fallback Route */}
            <Route path="*" element={<div className="text-center py-12">404 - Page Not Found</div>} />



            {/* Common Footer Pages */}
            <Route path="/features" element={<CommonPage />} />
            <Route path="/integrations" element={<CommonPage />} />
            <Route path="/pricing" element={<CommonPage />} />
            <Route path="/changelog" element={<CommonPage />} />
            <Route path="/documentation" element={<CommonPage />} />
            <Route path="/guides" element={<CommonPage />} />
            <Route path="/api" element={<CommonPage />} />
            <Route path="/community" element={<CommonPage />} />
            <Route path="/about" element={<CommonPage />} />
            <Route path="/careers" element={<CommonPage />} />
            <Route path="/privacy" element={<CommonPage />} />
            <Route path="/terms" element={<CommonPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  );
}