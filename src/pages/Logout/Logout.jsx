import React from 'react';
import { useNavigate } from 'react-router-dom';
import apiServices from '../../context/api.context.js';
import { useAuth } from '../../context/auth.context.jsx';
import { useToast } from '../../components/ui/Toast/ToastContext';


const Logout = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleLogout = async () => {
        const isAgree = window.confirm("Are you sure you want to logout?");

        if (isAgree) {
            try {
                const response = await apiServices.logout();
                console.log(response)
                if (response?.data?.message) {
                    console.log(response.data.message);
                }

                logout();

                navigate('/login');
            } catch (err) {
                console.error("Logout failed:", err);
            }
            toast.addToast({
                title: 'Logout successful',
                message: 'See you later! You are now logged out.',
                variant: 'success',
            });
        }
    };

    return (
        <div className="hidden items-center gap-3 md:flex">
            <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 cursor-pointer"
            >
                Logout
            </button>
        </div>
    );
};

export default Logout;