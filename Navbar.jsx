import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import {
    FaHome,
    FaUser,
    FaCarAlt,
    FaHistory,
    FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/");
    };

    return (
        <nav className="bg-gradient-to-r from-teal-800 to-emerald-600 shadow-lg">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex justify-between h-20">
                    <div className="flex items-center -ml-24">
                        <button
                            onClick={() => navigate("/")}
                            className="flex-shrink-0 flex items-center gap-1"
                        >
                            <img
                                src={logo}
                                alt="Rent Elite Logo"
                                className="h-32 w-32 object-cover"
                            />
                            <span className="text-2xl font-bold text-white">
                                Rent Elite
                            </span>
                        </button>
                    </div>
                    <div className="flex items-center space-x-8">
                        <Link
                            to="/dashboard"
                            className="text-white hover:text-gray-200 flex items-center gap-3"
                        >
                            <FaHome className="text-2xl" /> Dashboard
                        </Link>
                        <Link
                            to="/bookings"
                            className="text-white hover:text-gray-200 flex items-center gap-3"
                        >
                            <FaHistory className="text-2xl" /> My Bookings
                        </Link>
                        <Link
                            to="/profile"
                            className="text-white hover:text-gray-200 flex items-center gap-3"
                        >
                            <FaUser className="text-2xl" /> Profile
                        </Link>
                        <Link
                            to="/"
                            className="text-white hover:text-gray-200 flex items-center gap-3"
                        >
                            <FaSignOutAlt className="text-2xl" /> Logout
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
