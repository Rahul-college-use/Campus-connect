// Example Logout.jsx
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth.context.jsx';
import { useToast } from '../../components/ui/Toast/ToastContext.jsx';

export default function Logout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogout = () => {
        logout();
        toast.addToast({
            title: 'Logged Out',
            message: 'You have been successfully logged out.',
            variant: 'success',
           
        });

        navigate('/', { replace: true });
    };

    return (
        <button
            onClick={handleLogout}
            className="text-sm font-medium text-red-600 hover:text-red-700 transition"
        >
            Logout
        </button>
    );
}