import React from "react";
import { vehicles } from "../data/vehicles"; // Import the vehicle data

// Sample data for filtering options (you can import this from vehicles.js if needed)
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
    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-80">
            <h2 className="text-lg font-bold mb-4">Filters</h2>

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

            <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                    Price Range
                </label>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    onChange={(e) =>
                        onFilterChange("priceRange", e.target.value)
                    }
                    className="w-full"
                />
                <span className="text-sm">Max Price: ${1000}</span>
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
