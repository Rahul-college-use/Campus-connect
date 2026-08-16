import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider, useToast } from './components/ui/Toast/ToastContext';
import MainLayout from './layouts/MainLayout';

// Pages
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

// Context
import { AuthProvider, useAuth } from './context/auth.context.jsx';

//admin
import AdminEvents from './pages/Admin/Events/explore/ManageEvents';
import CreateEvent from './pages/Admin/Events/explore/CreateEvent';
import PostPhoto from './pages/Admin/Events/explore/PostPhoto';
import GalleryAdmin from './pages/Admin/Events/gallery/Gallery';
import ExploreEvents from './pages/Admin/Events/explore/ExploreEvents';

//student
import MyEvents from './pages/Student/Events/explore/MyEvents.jsx';
import MyCertificates from './pages/Student/Events/explore/MyCertificates.jsx';
import MyExploreEvent from './pages/Student/Events/explore/ExploreEvents.jsx'
import MyGallery from './pages/Student/Events/explore/Gallery.jsx'

// Protected Route Component (Toast और Redirect हैंडलिंग)
const ProtectedAdmin = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (!isAuthenticated) {
      toast.addToast({
        title: 'Access Denied',
        message: 'You need to log in first to access the admin panel.',
        variant: 'error',
      });
    }
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default function App() {
  return (
    <AuthProvider>
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
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="events/:eventId" element={<EventDetails />} />

              {/* ✅ Protected Admin Route */}
              <Route
                path="admin"
                element={
                  <ProtectedAdmin>
                    <Admin />
                  </ProtectedAdmin>
                }
              >
                <Route path="events" element={<ExploreEvents />} />
                <Route path="manager" element={<AdminEvents />} />
                <Route path="events/create" element={<CreateEvent />} />
                <Route path="gallery" element={<GalleryAdmin />} />
                <Route path="events/post-photo" element={<PostPhoto />} />
              </Route>

              {/* Student Routes */}
              <Route path="student">
                
                <Route path='events' element={<MyExploreEvent/>}/>
                <Route path="my-events" element={<MyEvents />} />
                <Route path='gallery' element={<MyGallery/>}/>
                <Route path="certificates" element={<MyCertificates />} />
                
              </Route>

              {/* Common Footer Pages */}
              <Route path="features" element={<CommonPage />} />
              <Route path="integrations" element={<CommonPage />} />
              <Route path="pricing" element={<CommonPage />} />
              <Route path="changelog" element={<CommonPage />} />
              <Route path="documentation" element={<CommonPage />} />
              <Route path="guides" element={<CommonPage />} />
              <Route path="api" element={<CommonPage />} />
              <Route path="community" element={<CommonPage />} />
              <Route path="careers" element={<CommonPage />} />
              <Route path="privacy" element={<CommonPage />} />
              <Route path="terms" element={<CommonPage />} />

              {/* 404 Fallback Route */}
              <Route path="*" element={<div className="text-center py-12">404 - Page Not Found</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider >
  );
}