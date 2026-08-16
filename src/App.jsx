import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast/ToastContext';
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

// Admin Pages
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import AdminEvents from './pages/Admin/Events/explore/ManageEvents';
import CreateEvent from './pages/Admin/Events/explore/CreateEvent';
import PostPhoto from './pages/Admin/Events/explore/PostPhoto';
import GalleryAdmin from './pages/Admin/Events/gallery/Gallery';
import ExploreEvents from './pages/Admin/Events/explore/ExploreEvents';

// Student Pages
import MyEvents from './pages/Student/Events/explore/MyEvents.jsx';
import MyCertificates from './pages/Student/Events/explore/MyCertificates.jsx';
import MyExploreEvent from './pages/Student/Events/explore/ExploreEvents.jsx';
import MyGallery from './pages/Student/Events/explore/Gallery.jsx';

// ✅ 1. Dynamic Root Index Component (Role-based Home view)
const HomeIndex = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated || !user) {
    return <Home />;
  }

  const role = user?.role?.toLowerCase();

  if (role === 'admin') {
    return <AdminDashboard />;
  }

  if (role === 'student' || role === 'students') {
    return <MyExploreEvent />;
  }

  return <Home />;
};

// ✅ 2. Clean & Safe Protected Route (No Toast Spam / No State Lag)
const ProtectedRoute = ({ allowedRoles = [], children }) => {
  const { isAuthenticated, user } = useAuth();

  // 1. Agar logged in nahi hai -> Seedha login page bhej do
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2. Login state update hote time lag ho to spinner dikhao (false unauthorized se bachne ke liye)
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const userRole = user?.role?.toLowerCase();
  const rolesArray = Array.isArray(allowedRoles)
    ? allowedRoles.map((r) => r.toLowerCase())
    : [allowedRoles.toLowerCase()];

  const isRoleAllowed = rolesArray.length === 0 || rolesArray.includes(userRole);

  // 3. Agar wrong role hai -> Home redirect
  if (!isRoleAllowed) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider position="top-right">
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<MainLayout />}>
              
              {/* ✅ Dynamic Home: Admin -> AdminDashboard | Student -> Events | Guest -> Home */}
              <Route index element={<HomeIndex />} />

              {/* ✅ Protected Admin Routes */}
              <Route
                path="admin"
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <Admin />
                  </ProtectedRoute>
                }
              >
                <Route index element={<AdminDashboard />} />
                <Route path="events" element={<ExploreEvents />} />
                <Route path="manager" element={<AdminEvents />} />
                <Route path="events/create" element={<CreateEvent />} />
                <Route path="gallery" element={<GalleryAdmin />} />
                <Route path="events/post-photo" element={<PostPhoto />} />
              </Route>

              {/* ✅ Protected Student Routes */}
              <Route
                path="student"
                element={
                  <ProtectedRoute allowedRoles={['student', 'students']}>
                    <Outlet />
                  </ProtectedRoute>
                }
              >
                <Route index element={<MyExploreEvent />} />
                <Route path="events" element={<MyExploreEvent />} />
                <Route path="my-events" element={<MyEvents />} />
                <Route path="gallery" element={<MyGallery />} />
                <Route path="certificates" element={<MyCertificates />} />
              </Route>

              {/* Public Pages */}
              <Route path="about" element={<About />} />
              <Route path="explore" element={<Explore />} />
              <Route path="gallery" element={<Gallery />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="events/:eventId" element={<EventDetails />} />

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

              {/* 404 Fallback */}
              <Route
                path="*"
                element={
                  <div className="flex flex-col items-center justify-center py-20">
                    <h1 className="text-4xl font-bold text-gray-800">404</h1>
                    <p className="text-gray-500 mt-2">Page Not Found</p>
                  </div>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}