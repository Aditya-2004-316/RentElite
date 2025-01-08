import React, { useState } from "react";
import Navbar from "./Navbar";
import FiltersSidebar from "./FiltersSidebar";

const Dashboard = () => {
    const [filters, setFilters] = useState({
        company: "",
        priceRange: "",
        fuelType: "",
        transmission: "",
        carType: "",
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
        <div className="min-h-screen" style={{ backgroundColor: "#ccf2e3" }}>
            <Navbar />
            <div className="flex h-[calc(100vh-80px)]">
                <FiltersSidebar
                    onFilterChange={handleFilterChange}
                    // className="mt-4"
                />
                <div className="flex-grow p-4">
                    <h1 className="text-4xl font-bold text-black mb-4">
                        Dashboard
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;




