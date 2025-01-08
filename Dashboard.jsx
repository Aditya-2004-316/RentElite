import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-900">
            <Navbar />
            <div className="flex flex-col items-center justify-center py-20">
                <h1 className="text-4xl font-bold text-white mb-4">
                    Dashboard
                </h1>
                <p className="text-gray-400 mb-8">
                    Manage your rentals and bookings here.
                </p>
            </div>
        </div>
    );
};

export default Dashboard;
