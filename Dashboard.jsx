import React, { useState } from "react";
import Navbar from "./Navbar";
import FiltersSidebar from "./FiltersSidebar";

const Dashboard = () => {
    const [filters, setFilters] = useState({
        carType: "",
        priceRange: "",
        availability: "",
    });

    const handleFilterChange = (filterName, value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [filterName]: value,
        }));
        // Here you can add logic to filter the car listings based on the selected filters
        console.log("Current filters:", { ...filters, [filterName]: value });
    };

    return (
        <div className="min-h-screen bg-lime-500">
            <Navbar />
            <div className="flex">
                <FiltersSidebar onFilterChange={handleFilterChange} />
                <div className="flex-grow p-4">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Dashboard
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;


