import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white">
            {" "}
            {/* Change background color to lime */}
            <Navbar /> {/* Include the Navbar component */}
            {/* No additional text or content */}
        </div>
    );
};

export default Dashboard;

