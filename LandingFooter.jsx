import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useSettings } from "../context/SettingsContext";
import logo from "../assets/logo.png";
import { Tooltip } from "react-tooltip";

const LandingFooter = () => {
    const location = useLocation();
    const { darkMode } = useSettings();

    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    // Social media links data
    const socialLinks = [
        {
            Icon: FaFacebookF,
            url: "https://www.facebook.com",
            name: "Facebook",
            id: "facebook-tooltip-landing",
        },
        {
            Icon: FaXTwitter,
            url: "https://www.x.com",
            name: "X",
            id: "x-tooltip-landing",
        },
        {
            Icon: FaInstagram,
            url: "https://www.instagram.com",
            name: "Instagram",
            id: "instagram-tooltip-landing",
        },
        {
            Icon: FaLinkedinIn,
            url: "https://www.linkedin.com",
            name: "LinkedIn",
            id: "linkedin-tooltip-landing",
        },
    ];

    const getLogoStyles = () => {
        if (darkMode) {
            return "brightness-0 invert sepia(100%) saturate(3000%) hue-rotate(120deg) brightness(0.8)";
        }
        return "brightness-0 sepia(100%) saturate(3000%) hue-rotate(120deg) brightness(0.8)";
    };

    return (
        <footer className={`${darkMode ? "bg-gray-900" : "bg-gray-100"} py-16`}>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Company Info */}
                    <div className="col-span-1">
                        <Link
                            to="/"
                            className="flex items-center space-x-2 mb-6"
                        >
                            <img
                                src={logo}
                                alt="Rent Elite Logo"
                                className={`h-12 w-auto filter ${getLogoStyles()}`}
                            />
                            <span
                                className={`text-2xl font-bold ${
                                    darkMode ? "text-white" : "text-gray-800"
                                }`}
                            >
                                Rent Elite
                            </span>
                        </Link>
                        <p
                            className={`${
                                darkMode ? "text-gray-300" : "text-gray-600"
                            } mb-6`}
                        >
                            Experience luxury on wheels with our premium car
                            rental service.
                        </p>
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => (
                                <div key={index}>
                                    <a
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Follow us on ${social.name}`}
                                        data-tooltip-id={social.id}
                                        data-tooltip-content={social.name}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                                        ${
                                            darkMode
                                                ? "border-gray-700 text-gray-300 hover:border-emerald-500 hover:text-emerald-500"
                                                : "border-gray-300 text-gray-600 hover:border-emerald-600 hover:text-emerald-600"
                                        } transition-colors duration-300`}
                                    >
                                        <social.Icon />
                                    </a>
                                    <Tooltip
                                        id={social.id}
                                        place="bottom"
                                        className="bg-emerald-800 text-white px-3 py-2 rounded text-sm"
                                        style={{
                                            backgroundColor: darkMode
                                                ? "#065f46"
                                                : "#059669",
                                            color: "white",
                                            borderRadius: "0.5rem",
                                            padding: "0.5rem 1rem",
                                            fontSize: "0.875rem",
                                            boxShadow:
                                                "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3
                            className={`text-lg font-semibold mb-6 ${
                                darkMode ? "text-white" : "text-gray-800"
                            }`}
                        >
                            Quick Links
                        </h3>
                        <ul className="space-y-4">
                            {["Home", "About Us", "Contact Us", "FAQs"].map(
                                (item) => {
                                    const path =
                                        item === "Home"
                                            ? "/"
                                            : `/${item
                                                  .toLowerCase()
                                                  .replace(/\s+/g, "-")}`;
                                    return (
                                        <li key={item}>
                                            <Link
                                                to={path}
                                                className={`${
                                                    isActiveLink(path)
                                                        ? "text-emerald-600"
                                                        : darkMode
                                                        ? "text-gray-300 hover:text-emerald-400"
                                                        : "text-gray-600 hover:text-emerald-600"
                                                } transition-colors duration-300`}
                                            >
                                                {item}
                                            </Link>
                                        </li>
                                    );
                                }
                            )}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3
                            className={`text-lg font-semibold mb-6 ${
                                darkMode ? "text-white" : "text-gray-800"
                            }`}
                        >
                            Contact Info
                        </h3>
                        <ul
                            className={`space-y-4 ${
                                darkMode ? "text-gray-300" : "text-gray-600"
                            }`}
                        >
                            <li>Phone: (123) 456-7890</li>
                            <li>Email: rentelite@gmail.com</li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3
                            className={`text-lg font-semibold mb-6 ${
                                darkMode ? "text-white" : "text-gray-800"
                            }`}
                        >
                            Newsletter
                        </h3>
                        <p
                            className={`${
                                darkMode ? "text-gray-300" : "text-gray-600"
                            } mb-4`}
                        >
                            Subscribe to our newsletter for updates and
                            exclusive offers.
                        </p>
                        <form className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500
                                ${
                                    darkMode
                                        ? "bg-gray-800 text-white"
                                        : "bg-white text-gray-800"
                                }`}
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-300"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div
                    className={`mt-12 pt-8 border-t ${
                        darkMode ? "border-gray-800" : "border-gray-200"
                    }`}
                >
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p
                            className={`${
                                darkMode ? "text-gray-400" : "text-gray-600"
                            } text-sm`}
                        >
                            Copyright © {new Date().getFullYear()} Rent Elite.
                            All rights reserved.
                        </p>
                        <div className="flex space-x-6 mt-4 md:mt-0">
                            <Link
                                to="/privacy-policy"
                                className={`text-sm ${
                                    darkMode
                                        ? "text-gray-400 hover:text-emerald-400"
                                        : "text-gray-600 hover:text-emerald-600"
                                } transition-colors duration-300`}
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                to="/terms-of-service"
                                className={`text-sm ${
                                    darkMode
                                        ? "text-gray-400 hover:text-emerald-400"
                                        : "text-gray-600 hover:text-emerald-600"
                                } transition-colors duration-300`}
                            >
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
