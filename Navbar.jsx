import React from "react";
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from "react-router-dom";
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
    const location = useLocation();

    const handleLogout = () => {
        navigate("/");
    };

    const handleProfileClick = () => {
        navigate("/profile");
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
                        <ul
                            style={{
                                listStyleType: "none",
                                padding: 0,
                                margin: 0,
                            }}
                            className="flex items-center"
                        >
                            <li>
                                <Link
                                    to="/dashboard"
                                    style={{
                                        color:
                                            location.pathname === "/dashboard"
                                                ? "#000000"
                                                : "white",
                                        textDecoration: "none",
                                    }}
                                    className="flex items-center gap-3"
                                >
                                    <FaHistory className="text-2xl" /> Dashboard
                                </Link>
                            </li>
                            <li style={{ margin: "0 15px" }}>
                                <Link
                                    to="/my-bookings"
                                    style={{
                                        color:
                                            location.pathname === "/my-bookings"
                                                ? "#000000"
                                                : "white",
                                        textDecoration: "none",
                                    }}
                                    className="flex items-center gap-3"
                                >
                                    <FaUser className="text-2xl" /> My Bookings
                                </Link>
                            </li>
                            <li style={{ margin: "0 15px" }}>
                                <Link
                                    to="/profile"
                                    style={{
                                        color:
                                            location.pathname === "/profile"
                                                ? "#000000"
                                                : "white",
                                        textDecoration: "none",
                                    }}
                                    className="flex items-center gap-3"
                                >
                                    <FaSignOutAlt className="text-2xl" />{" "}
                                    Profile
                                </Link>
                            </li>
                            <li style={{ margin: "0 15px" }}>
                                <Link
                                    to="/"
                                    style={{
                                        color:
                                            location.pathname === "/logout"
                                                ? "#000000"
                                                : "white",
                                        textDecoration: "none",
                                    }}
                                    className="flex items-center gap-3"
                                >
                                    <FaSignOutAlt className="text-2xl" /> Logout
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
