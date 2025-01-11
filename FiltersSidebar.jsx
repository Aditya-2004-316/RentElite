import React, { useState } from "react";
import { vehicles } from "../data/vehicles";
import { FaSearch } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";

const fuelTypes = ["Petrol", "Electric", "Hybrid"];
const transmissions = ["Automatic", "Manual"];

// Extract unique car types from vehicles data
const carTypes = [...new Set(vehicles.map((vehicle) => vehicle.type))];

// Company name mappings
const companyNameMappings = {
    Mercedes: "Mercedes",
    "Mercedes-AMG": "Mercedes",
    "Mercedes-Maybach": "Mercedes",
    Aston: "Aston Martin",
};

const FiltersSidebar = ({ onFilterChange }) => {
    const [priceRange, setPriceRange] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPriceRange(value);
        onFilterChange("priceRange", value);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSearch = () => {
        console.log("Searching for:", searchTerm);
    };

    // Get unique companies from vehicles data with proper naming
    const filteredCompanies = [
        ...new Set(
            vehicles.map((vehicle) => {
                const firstWord = vehicle.name.split(" ")[0];
                return companyNameMappings[firstWord] || firstWord;
            })
        ),
    ].sort();

    // Filter companies based on search term
    const searchFilteredCompanies = filteredCompanies.filter((company) =>
        company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-80">
            <h2 className="text-2xl font-bold mb-4">Filters</h2>

            {/* Search Input with Icon */}
            <div className="mb-4 relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by company..."
                    className="border border-gray-300 rounded-lg w-full p-2 pr-10"
                />
                <FaSearch
                    className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
                    onClick={handleSearch}
                />
            </div>

            <div className="mb-4">
                <label className="block text-lg font-medium mb-2">
                    Car Company
                </label>
                <select
                    onChange={(e) => onFilterChange("company", e.target.value)}
                    className="border border-gray-300 rounded-lg w-full p-2"
                >
                    <option value="">All</option>
                    {searchFilteredCompanies.map((company) => (
                        <option key={company} value={company}>
                            {company}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mb-4 relative">
                <label className="block text-lg font-medium mb-2">
                    Price Range
                </label>
                <div className="relative">
                    <input
                        type="range"
                        min="0"
                        max="5000"
                        value={priceRange}
                        onChange={handlePriceChange}
                        className="w-full h-2 bg-[#ccf2e3] rounded-lg appearance-none cursor-pointer"
                    />
                    <div
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-10"
                        style={{ left: `${(priceRange / 5000) * 100}%` }}
                    >
                        <FaDollarSign className="text-green-500" />
                    </div>
                </div>
                <span className="text-sm mt-2 block">
                    Current Price: ${priceRange}
                </span>
                <style>
                    {`
                        input[type="range"] {
                            -webkit-appearance: none;
                            appearance: none;
                        }
                        input[type="range"]::-webkit-slider-thumb {
                            -webkit-appearance: none;
                            appearance: none;
                            width: 24px;
                            height: 24px;
                            background: transparent;
                            cursor: pointer;
                            margin-top: -8px;
                            position: relative;
                            z-index: 1;
                        }
                        input[type="range"]::-moz-range-thumb {
                            width: 24px;
                            height: 24px;
                            background: transparent;
                            cursor: pointer;
                            border: none;
                            position: relative;
                            z-index: 1;
                        }
                        input[type="range"]::-webkit-slider-runnable-track {
                            height: 8px;
                            background: #ccf2e3;
                            border-radius: 4px;
                        }
                        input[type="range"]::-moz-range-track {
                            height: 8px;
                            background: #ccf2e3;
                            border-radius: 4px;
                        }
                    `}
                </style>
            </div>

            <div className="mb-4">
                <label className="block text-lg font-medium mb-2">
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
                <label className="block text-lg font-medium mb-2">
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
                <label className="block text-lg font-medium mb-2">
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
