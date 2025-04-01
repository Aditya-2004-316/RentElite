import React, { useState } from "react";
import { vehicles } from "../data/vehicles";
// import {
//     FaSearch,
//     FaDollarSign,
//     FaFilter,
//     FaCar,
//     FaGasPump,
//     FaCogs,
//     FaCarSide,
// } from "react-icons/fa";
import { FaSearch, FaDollarSign } from "react-icons/fa";
import filter from "../assets/filter.jpg";
import carCompany from "../assets/carcompany.png";
import price from "../assets/price.png";
import fuel from "../assets/fuel.png";
import transmission from "../assets/transmission.png";
import carType from "../assets/cartype.png";

const fuelTypes = ["Petrol", "Electric", "Hybrid"];
const transmissions = ["Automatic", "Manual"];

// Extract unique car types from vehicles data
const carTypes = [...new Set(vehicles.map((vehicle) => vehicle.type))];

// Extract unique companies and filter out any undefined values
const companies = [
    ...new Set(vehicles.map((vehicle) => vehicle.company).filter(Boolean)),
];

const FiltersSidebar = ({ onFilterChange, darkMode }) => {
    const [selectedCompany, setSelectedCompany] = useState("");
    const [selectedFuelType, setSelectedFuelType] = useState("");
    const [selectedTransmission, setSelectedTransmission] = useState("");
    const [selectedCarType, setSelectedCarType] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [priceRange, setPriceRange] = useState(0);

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
        <div
            className={`${
                darkMode ? "bg-dark-card text-dark-text" : "bg-white"
            } shadow-md rounded-lg p-4 w-80`}
        >
            {/* Heading with Filter Icon */}
            <div className="flex items-center space-x-2 mb-4">
                {/* <FaFilter className="text-2xl text-emerald-600" /> */}
                <img src={filter} alt="Filter" className="w-6 h-6" />
                <h2 className="text-2xl font-bold">Filters</h2>
            </div>

            {/* Search Input with Icon */}
            <div className="mb-4 relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by company..."
                    className={`border ${
                        darkMode
                            ? "border-dark-lighter bg-dark-lighter text-dark-text"
                            : "border-gray-300"
                    } rounded-lg w-full p-2 pr-10`}
                />
                <FaSearch className="absolute right-3 top-2.5 text-gray-500 cursor-pointer" />
                {/* <img src={search} alt="Search" className="w-6 h-6" /> */}
            </div>

            {/* Car Company with Icon */}
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2 flex items-center space-x-2">
                    {/* <FaCar className="text-emerald-600" /> */}
                    <img
                        src={carCompany}
                        alt="Car Company"
                        className="w-6 h-6"
                    />
                    <span>Car Company</span>
                </label>
                <select
                    onChange={handleCompanyChange}
                    className={`border ${
                        darkMode
                            ? "border-dark-lighter bg-dark-lighter text-dark-text"
                            : "border-gray-300"
                    } rounded-lg w-full p-2`}
                >
                    <option value="">All</option>
                    {searchFilteredCompanies.map((company) => (
                        <option key={company} value={company}>
                            {company}
                        </option>
                    ))}
                </select>
            </div>

            {/* Price Range with Icon */}
            <div className="mb-4 relative">
                <label className="block text-lg font-medium mb-2 flex items-center space-x-2">
                    {/* <FaDollarSign className="text-emerald-600" /> */}
                    <img src={price} alt="Price" className="w-6 h-6" />
                    <span>Price Range</span>
                </label>
                <div className="relative">
                    <input
                        type="range"
                        min="0"
                        max="600"
                        value={priceRange}
                        onChange={handlePriceChange}
                        className="w-full h-2 bg-[#ccf2e3] rounded-lg appearance-none cursor-pointer"
                    />
                    <div
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none z-10"
                        style={{ left: `${(priceRange / 600) * 100}%` }}
                    >
                        <FaDollarSign className="text-emerald-600" />
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

            {/* Fuel Type with Icon */}
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2 flex items-center space-x-2">
                    {/* <FaGasPump className="text-emerald-600" /> */}
                    <img src={fuel} alt="Fuel" className="w-6 h-6" />
                    <span>Fuel Type</span>
                </label>
                <select
                    onChange={handleFuelTypeChange}
                    className={`border ${
                        darkMode
                            ? "border-dark-lighter bg-dark-lighter text-dark-text"
                            : "border-gray-300"
                    } rounded-lg w-full p-2`}
                >
                    <option value="">All</option>
                    {fuelTypes.map((fuel) => (
                        <option key={fuel} value={fuel}>
                            {fuel}
                        </option>
                    ))}
                </select>
            </div>

            {/* Transmission with Icon */}
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2 flex items-center space-x-2">
                    {/* <FaCogs className="text-emerald-600" /> */}
                    <img
                        src={transmission}
                        alt="Transmission"
                        className="w-6 h-6"
                    />
                    <span>Transmission</span>
                </label>
                <select
                    onChange={handleTransmissionChange}
                    className={`border ${
                        darkMode
                            ? "border-dark-lighter bg-dark-lighter text-dark-text"
                            : "border-gray-300"
                    } rounded-lg w-full p-2`}
                >
                    <option value="">All</option>
                    {transmissions.map((transmission) => (
                        <option key={transmission} value={transmission}>
                            {transmission}
                        </option>
                    ))}
                </select>
            </div>

            {/* Car Type with Icon */}
            <div className="mb-4">
                <label className="block text-lg font-medium mb-2 flex items-center space-x-2">
                    {/* <FaCarSide className="text-emerald-600" /> */}
                    <img src={carType} alt="Car Type" className="w-6 h-6" />
                    <span>Car Type</span>
                </label>
                <select
                    onChange={handleCarTypeChange}
                    className={`border ${
                        darkMode
                            ? "border-dark-lighter bg-dark-lighter text-dark-text"
                            : "border-gray-300"
                    } rounded-lg w-full p-2`}
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


