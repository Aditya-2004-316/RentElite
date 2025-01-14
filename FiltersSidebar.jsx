import React, { useState } from "react";
import { vehicles } from "../data/vehicles";
import { FaSearch } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";

const fuelTypes = ["Petrol", "Electric", "Hybrid"];
const transmissions = ["Automatic", "Manual"];

// Extract unique car types from vehicles data
const carTypes = [...new Set(vehicles.map((vehicle) => vehicle.type))];

// Extract unique companies and filter out any undefined values
const companies = [
    ...new Set(vehicles.map((vehicle) => vehicle.company).filter(Boolean)),
];

const FiltersSidebar = ({ onFilterChange }) => {
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedFuelType, setSelectedFuelType] = useState("");
    const [selectedTransmission, setSelectedTransmission] = useState("");
    const [selectedCarType, setSelectedCarType] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState(5000);

    // Filter companies based on the search term
    const searchFilteredCompanies = companies.filter(
        (company) =>
            company && company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCompanyChange = (e) => {
        const company = e.target.value;
        setSelectedCompany(company);
        onFilterChange({
            company,
            fuelType: selectedFuelType,
            transmission: selectedTransmission,
            carType: selectedCarType,
            searchTerm,
            priceRange,
        });
    };

    const handleFuelTypeChange = (e) => {
        const fuelType = e.target.value;
        setSelectedFuelType(fuelType);
        onFilterChange({
            company: selectedCompany,
            fuelType,
            transmission: selectedTransmission,
            carType: selectedCarType,
            searchTerm,
            priceRange,
        });
    };

    const handleTransmissionChange = (e) => {
        const transmission = e.target.value;
        setSelectedTransmission(transmission);
        onFilterChange({
            company: selectedCompany,
            fuelType: selectedFuelType,
            transmission,
            carType: selectedCarType,
            searchTerm,
            priceRange,
        });
    };

    const handleCarTypeChange = (e) => {
        const carType = e.target.value;
        setSelectedCarType(carType);
        onFilterChange({
            company: selectedCompany,
            fuelType: selectedFuelType,
            transmission: selectedTransmission,
            carType,
            searchTerm,
            priceRange,
        });
    };

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onFilterChange({
            company: selectedCompany,
            fuelType: selectedFuelType,
            transmission: selectedTransmission,
            carType: selectedCarType,
            searchTerm: term,
            priceRange,
        });
    };

    const handlePriceChange = (e) => {
        const price = e.target.value;
        setPriceRange(price);
        onFilterChange({
            company: selectedCompany,
            fuelType: selectedFuelType,
            transmission: selectedTransmission,
            carType: selectedCarType,
            searchTerm,
            priceRange: price,
        });
    };

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
                <FaSearch className="absolute right-3 top-2.5 text-gray-500 cursor-pointer" />
            </div>

            <div className="mb-4">
                <label className="block text-lg font-medium mb-2">
                    Car Company
                </label>
                <select
                    onChange={handleCompanyChange}
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
                    onChange={handleFuelTypeChange}
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
                    onChange={handleTransmissionChange}
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
                    onChange={handleCarTypeChange}
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


