import React, { useState } from "react";
import { vehicles } from "../data/vehicles"; // Import the vehicle data

// Sample data for filtering options
const carCompanies = [
    "McLaren",
    "Porsche",
    "Mercedes",
    "Audi",
    "BMW",
    "Ferrari",
    "Lamborghini",
    "Aston Martin",
    "Rolls-Royce",
    "Bentley",
    "Maserati",
    "Lexus",
    "Bugatti",
    "Pagani",
    "Koenigsegg",
    "Rimac",
    "Lotus",
];

const fuelTypes = ["Petrol", "Electric", "Hybrid"];

const transmissions = ["Automatic", "Manual"];

// Extract unique car types from vehicles data
const carTypes = [...new Set(vehicles.map((vehicle) => vehicle.type))];

const FiltersSidebar = ({ onFilterChange }) => {
    const [priceRange, setPriceRange] = useState(0); // State to track the price range

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPriceRange(value); // Update the state with the current value
        onFilterChange("priceRange", value); // Call the filter change handler
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-80">
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Car Company
                </label>
                <select
                    onChange={(e) => onFilterChange("company", e.target.value)}
                    className="border border-gray-300 rounded-lg w-full p-2"
                >
                    <option value="">All</option>
                    {carCompanies.map((company) => (
                        <option key={company} value={company}>
                            {company}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4 relative">
                <label className="block text-sm font-medium mb-2">
                    Price Range
                </label>
                <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange} // Set the current value
                    onChange={handlePriceChange} // Update the state on change
                    className="w-full"
                />
                <div
                    className="absolute -top-2 transform -translate-x-1/2"
                    style={{ left: `${(priceRange / 5000) * 100}%` }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-mint-500" // Adjust the color as needed
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 11h18l-1.5 6H4.5L3 11zM3 11l1.5-4.5h15L21 11M3 11v6a2 2 0 002 2h12a2 2 0 002-2v-6"
                        />
                    </svg>
                </div>
                <span className="text-sm">Current Price: ${priceRange}</span>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Fuel Type
                </label>
                <select
                    onChange={(e) => onFilterChange("fuelType", e.target.value)}
                    className="border border-gray-300 rounded-lg w-full p-2"
                >
                    <option value="">All</option>
                    {fuelTypes.map((fuel) => (
                        <option key={fuel} value={fuel}>
                            {fuel}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Transmission
                </label>
                <select
                    onChange={(e) =>
                        onFilterChange("transmission", e.target.value)
                    }
                    className="border border-gray-300 rounded-lg w-full p-2"
                >
                    <option value="">All</option>
                    {transmissions.map((transmission) => (
                        <option key={transmission} value={transmission}>
                            {transmission}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Car Type
                </label>
                <select
                    onChange={(e) => onFilterChange("carType", e.target.value)}
                    className="border border-gray-300 rounded-lg w-full p-2"
                >
                    <option value="">All</option>
                    {carTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default FiltersSidebar;

