import React, { useState } from "react";
import { FaStar, FaRegClock, FaCar } from "react-icons/fa";
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

    // Define the cars for each section
    const featuredVehicles = [
        "Bugatti Chiron",
        "Pagani Huayra",
        "Koenigsegg Jesko",
        "Ferrari SF90 Stradale",
        "Aston Martin Valkyrie",
        "Mercedes-AMG ONE",
    ];

    const newArrivals = [
        "Lamborghini Huracán EVO",
        "BMW M4",
        "Maserati MC20",
        "Porsche Taycan Turbo S",
        "Pininfarina Battista",
        "Bentley Flying Spur",
    ];

    // Filter vehicles for each section
    const featuredCars = vehicles.filter((car) =>
        featuredVehicles.includes(car.name)
    );
    const newArrivalCars = vehicles.filter((car) =>
        newArrivals.includes(car.name)
    );

    // Create a set of IDs for cars already included in featured and new arrivals
    const includedCarIds = new Set(
        [...featuredCars, ...newArrivalCars].map((car) => car.id)
    );

    // Filter for Other Options, excluding those already included
    const otherOptionsCars = vehicles.filter(
        (car) => !includedCarIds.has(car.id)
    );

    // Remove duplicates from otherOptionsCars based on name
    const uniqueOtherOptionsCars = [];
    const seenCars = new Set();

    otherOptionsCars.forEach((car) => {
        if (!seenCars.has(car.name)) {
            seenCars.add(car.name);
            uniqueOtherOptionsCars.push(car);
        }
    });

    return (
        <div className="min-h-screen" style={{ backgroundColor: "#ccf2e3" }}>
            <Navbar />
            <div className="flex h-[calc(100vh-80px)]">
                <FiltersSidebar
                    onFilterChange={handleFilterChange}
                    // className="mt-4"
                />
                <div className="flex-grow p-4">
                    <div className="mb-8">
                        <h2 className="text-4xl font-bold mb-6 flex items-center text-black">
                            <FaStar className="mr-2 text-yellow-500" />
                            Featured Cars
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {featuredCars.map((car) => (
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

                    <div className="mb-8">
                        <h2 className="text-4xl font-bold mb-6 flex items-center text-black">
                            <FaRegClock className="mr-2 text-gray-500" />
                            New Arrivals
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {newArrivalCars.map((car) => (
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

                    <div className="mb-8">
                        <h2 className="text-4xl font-bold mb-6 flex items-center text-black">
                            <FaCar className="mr-2 text-blue-500" />
                            Other Options
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {otherOptionsCars.map((car) => (
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
        </div>
    );
};

export default Dashboard;








