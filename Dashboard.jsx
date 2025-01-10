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
        <div
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: "#ccf2e3" }}
        >
            <div
                className="fixed top-0 left-0 right-0 z-10"
                style={{ height: "60px", width: "100%", marginBottom: "20px" }}
            >
                <Navbar />
            </div>
            <div className="flex" style={{ marginTop: "60px" }}>
                <div
                    className="fixed bottom-0 left-0 h-[calc(100vh-105px)] w-80 z-10"
                    style={{ overflow: "hidden" }}
                >
                    <FiltersSidebar
                        onFilterChange={handleFilterChange}
                        className="mt-4"
                    />
                </div>
                <div
                    className="flex-grow ml-80 p-4"
                    style={{ marginTop: "20px" }}
                >
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
                                        <div className="flex justify-between items-center">
                                            <p
                                                className="text-2xl font-bold"
                                                style={{ color: "#0fa16d" }}
                                            >
                                                ${car.price}
                                            </p>
                                            <button className="bg-[#0fa16d] text-white py-1 px-3 rounded hover:bg-green-600">
                                                Book Now
                                            </button>
                                        </div>
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
                                        <div className="flex justify-between items-center">
                                            <p
                                                className="text-2xl font-bold"
                                                style={{ color: "#0fa16d" }}
                                            >
                                                ${car.price}
                                            </p>
                                            <button className="bg-[#0fa16d] text-white py-1 px-3 rounded hover:bg-green-600">
                                                Book Now
                                            </button>
                                        </div>
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
                                        <div className="flex justify-between items-center">
                                            <p
                                                className="text-2xl font-bold"
                                                style={{ color: "#0fa16d" }}
                                            >
                                                ${car.price}
                                            </p>
                                            <button className="bg-[#0fa16d] text-white py-1 px-3 rounded hover:bg-green-600">
                                                Book Now
                                            </button>
                                        </div>
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










