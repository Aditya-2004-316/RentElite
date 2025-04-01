import React from "react";
import { useSettings } from "../context/SettingsContext";
import LandingNavbar from "./LandingNavbar";
import LandingFooter from "./LandingFooter";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import useScrollToTop from "../hooks/useScrollToTop";

const LandingContact = () => {
    useScrollToTop();
    const { darkMode } = useSettings();

    return (
        <div
            className={`min-h-screen ${
                darkMode ? "bg-dark text-white" : "bg-white text-gray-900"
            }`}
        >
            <LandingNavbar />

            <div className="container mx-auto px-4 py-28">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-6xl mx-auto"
                >
                    <h1 className="text-4xl font-bold text-center mb-12">
                        Contact Us
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Information */}
                        <div className="space-y-8">
                            <h2 className="text-2xl font-semibold mb-6">
                                Get in Touch
                            </h2>

                            {[
                                {
                                    icon: <FaPhone />,
                                    title: "Phone",
                                    info: "(123) 456-7890",
                                },
                                {
                                    icon: <FaEnvelope />,
                                    title: "Email",
                                    info: "rentelite@gmail.com",
                                },
                                {
                                    icon: <FaClock />,
                                    title: "Business Hours",
                                    info: "Mon - Sat: 9:00 AM - 8:00 PM",
                                },
                            ].map((item, index) => (
                                <div
                                    key={index}
                                    className="flex items-start space-x-4"
                                >
                                    <div
                                        className={`text-xl ${
                                            darkMode
                                                ? "text-emerald-400"
                                                : "text-emerald-600"
                                        }`}
                                    >
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold mb-1">
                                            {item.title}
                                        </h3>
                                        <p
                                            className={
                                                darkMode
                                                    ? "text-gray-300"
                                                    : "text-gray-600"
                                            }
                                        >
                                            {item.info}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact Form */}
                        <div
                            className={`p-6 rounded-lg ${
                                darkMode ? "bg-dark-lighter" : "bg-gray-50"
                            }`}
                        >
                            <h2 className="text-2xl font-semibold mb-6">
                                Send us a Message
                            </h2>
                            <form className="space-y-4">
                                <div>
                                    <label className="block mb-2">Name</label>
                                    <input
                                        type="text"
                                        className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500
                                        ${
                                            darkMode
                                                ? "bg-gray-800 text-white"
                                                : "bg-white text-gray-800"
                                        }`}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">Email</label>
                                    <input
                                        type="email"
                                        className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500
                                        ${
                                            darkMode
                                                ? "bg-gray-800 text-white"
                                                : "bg-white text-gray-800"
                                        }`}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        rows="4"
                                        className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500
                                        ${
                                            darkMode
                                                ? "bg-gray-800 text-white"
                                                : "bg-white text-gray-800"
                                        }`}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors duration-300"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </div>

            <LandingFooter />
        </div>
    );
};

export default LandingContact;
