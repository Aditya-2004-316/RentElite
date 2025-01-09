import React, { useState } from "react";
import Navbar from "./Navbar";
import FiltersSidebar from "./FiltersSidebar";
import { vehicles } from "../data/vehicles";

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

    // Group vehicles by section
    const groupedVehicles = vehicles.reduce((acc, vehicle) => {
        if (vehicle.section) {
            if (!acc[vehicle.section]) {
                acc[vehicle.section] = [];
            }
            acc[vehicle.section].push(vehicle);
        }
        return acc;
    }, {});

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#ccf2e3" }}>
            <Navbar />
            <div className="flex h-[calc(100vh-80px)]">
                <FiltersSidebar
                    onFilterChange={handleFilterChange}
                    // className="mt-4"
                />
                <div className="flex-grow p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {vehicles.map((car) => (
                            <div
                                key={car.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold mb-2">
                                        {car.name}
                                    </h3>
                                    <p className="text-gray-600 mb-2">
                                        {car.type}
                                    </p>
                                    <p className="text-2xl font-bold mb-4">
                                        ${car.price}/day
                                    </p>
                                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;






