import React from "react";
import logo from "../assets/logo.png";
// import dashboard from "../assets/dashboard.png";
// import carBooking from "../assets/calendar.png";
// import favorite from "../assets/favorite.png";
// import profile from "../assets/user.png";
// import logout from "../assets/logout.png";
import { useNavigate, useLocation } from "react-router-dom";
import {
    FaHeart,
    FaUser,
    FaCarAlt,
    FaHistory,
    FaSignOutAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSettings } from "../context/SettingsContext";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { darkMode, translate } = useSettings();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const navItems = [
        { path: "/dashboard", icon: FaCarAlt, label: "dashboard" },
        { path: "/my-bookings", icon: FaHistory, label: "myBookings" },
        { path: "/favourites", icon: FaHeart, label: "favourites" },
        { path: "/profile", icon: FaUser, label: "profile" },
        {
            path: "/",
            icon: FaSignOutAlt,
            label: "logout",
            onClick: handleLogout,
        },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav
            className={`${
                darkMode
                    ? "bg-dark-lighter"
                    : "bg-gradient-to-r from-emerald-800 to-emerald-600"
            } shadow-xl`}
        >
            <div className="max-w-8xl mx-auto px-6">
                <div className="flex justify-between items-center h-20">
                    {/* Logo Section */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/dashboard")}
                        className="flex-shrink-0 flex items-center gap-3 group"
                    >
                        <img
                            src={logo}
                            alt="Rent Elite Logo"
                            className="h-16 w-16 ml-8 object-contain transition-transform group-hover:rotate-3"
                        />
                        <span className="text-2xl font-bold text-white tracking-wide">
                            Rent Elite
                        </span>
                    </motion.button>

                    {/* Navigation Items */}
                    <div className="flex items-center mr-8">
                        <ul className="flex items-center space-x-4">
                            {navItems.map((item) => (
                                <motion.li
                                    key={item.path}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ y: 0 }}
                                >
                                    <Link
                                        to={item.path}
                                        onClick={item.onClick}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                                            ${
                                                isActive(item.path)
                                                    ? "bg-white text-emerald-700 shadow-lg"
                                                    : "text-white hover:bg-emerald-700/50"
                                            }
                                        `}
                                    >
                                        <item.icon
                                            className={`w-5 h-5 transition-colors
                                                ${
                                                    isActive(item.path)
                                                        ? "text-emerald-600"
                                                        : "text-current"
                                                }
                                            `}
                                        />
                                        <span className="font-medium">
                                            {translate(item.label)}
                                        </span>
                                        {isActive(item.path) && (
                                            <motion.div
                                                layoutId="navbar-indicator"
                                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                                                initial={false}
                                            />
                                        )}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Border Gradient */}
            {/* <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-400 opacity-50" /> */}
        </nav>
    );
};

export default Navbar;





