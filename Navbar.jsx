import React from "react";
import logo from "../assets/logo.png";
import racingCar from "../assets/racing-car.png";
import carBooking from "../assets/calendar.png";
import favorite from "../assets/favorite.png";
import profile from "../assets/user.png";
import logout from "../assets/logout.png";
import { useNavigate, useLocation } from "react-router-dom";
// import {
//     FaHeart,
//     FaUser,
//     FaCarAlt,
//     FaHistory,
//     FaSignOutAlt,
// } from "react-icons/fa";
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
            <div className="max-w-8xl mx-auto px-4">
                <div className="flex justify-between h-20">
                    <div className="flex items-center">
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
                    <div
                        className="flex items-center space-x-8"
                        style={{ marginLeft: "40px" }}
                    >
                        <ul
                            style={{
                                listStyleType: "none",
                                padding: 0,
                                margin: 0,
                            }}
                            className="flex items-center"
                        >
                            <li style={{ margin: "0 25px" }}>
                                <Link
                                    to="/"
                                    style={{
                                        color:
                                            location.pathname === "/"
                                                ? "#FFD700"
                                                : "white",
                                        textDecoration: "none",
                                    }}
                                    className="flex items-center gap-3"
                                ></Link>
                            </li>
                            <li style={{ margin: "0 25px" }}>
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
                                    <img
                                        src={racingCar}
                                        alt="Racing Car Icon"
                                        className="mr-2 w-8 h-8 text-2xl"
                                    />
                                    Dashboard
                                </Link>
                            </li>
                            <li style={{ margin: "0 25px" }}>
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
                                    <img
                                        src={carBooking}
                                        alt="Car Booking Icon"
                                        className="mr-2 w-8 h-8 text-2xl"
                                    />
                                    My Bookings
                                </Link>
                            </li>
                            <li style={{ margin: "0 25px" }}>
                                <Link
                                    to="/favourites"
                                    style={{
                                        color:
                                            location.pathname === "/favourites"
                                                ? "#000000"
                                                : "white",
                                        textDecoration: "none",
                                    }}
                                    className="flex items-center gap-3"
                                >
                                    <img
                                        src={favorite}
                                        alt="Favorite Icon"
                                        className="mr-2 w-8 h-8 text-2xl"
                                    />
                                    Favourites
                                </Link>
                            </li>
                            <li style={{ margin: "0 25px" }}>
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
                                    <img
                                        src={profile}
                                        alt="Profile Icon"
                                        className="mr-2 w-8 h-8 text-2xl"
                                    />
                                    Profile
                                </Link>
                            </li>
                            <li style={{ margin: "0 25px" }}>
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
                                    <img
                                        src={logout}
                                        alt="Logout Icon"
                                        className="mr-2 w-8 h-8 text-2xl"
                                    />
                                    Logout
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




