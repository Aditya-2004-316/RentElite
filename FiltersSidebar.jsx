import React, { useState } from "react";
import { vehicles } from "../data/vehicles"; // Import the vehicle data
import CustomCarIcon from "../assets/icons/car-icon.png"; // Adjust the path as necessary
import { FaSearch } from "react-icons/fa"; // Importing the magnifying glass icon from react-icons

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
    const [searchTerm, setSearchTerm] = useState(""); // State to track the search input

    const handlePriceChange = (e) => {
        const value = e.target.value;
        setPriceRange(value); // Update the state with the current value
        onFilterChange("priceRange", value); // Call the filter change handler
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value); // Update the search term state
    };

    const handleSearch = () => {
        // Implement search logic here if needed
        console.log("Searching for:", searchTerm);
        // You can also call onFilterChange or any other function to filter results
    };

    // Filter vehicle companies based on the search term
    const filteredCompanies = vehicles
        .map((vehicle) => vehicle.company) // Assuming vehicles have a 'company' property
        .filter(
            (company, index, self) => self.indexOf(company) === index && company // Ensure company is defined
        )
        .filter(
            (company) =>
                company &&
                company.toLowerCase().includes(searchTerm.toLowerCase()) // Check if company is defined
        );

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-80">
            <h2 className="text-2xl font-bold mb-4">Filters</h2>

            {/* Search Input with Icon on the Right */}
            <div className="mb-4 relative">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Search by company..."
                    className="border border-gray-300 rounded-lg w-full p-2 pr-10" // Added padding to the right for the icon
                />
                <FaSearch
                    className="absolute right-3 top-2.5 text-gray-500 cursor-pointer" // Positioning the icon inside the input on the right
                    onClick={handleSearch} // Optional: You can make the icon clickable to trigger search
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
                    {filteredCompanies.length > 0 ? (
                        filteredCompanies.map((company) => (
                            <option key={company} value={company}>
                                {company}
                            </option>
                        ))
                    ) : (
                        <option value="">No companies found</option>
                    )}
                </select>
            </div>

            <div className="mb-4 relative">
                <label className="block text-lg font-medium mb-2">
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
                    className="absolute"
                    style={{
                        left: `${(priceRange / 5000) * 100}%`,
                        top: "-12px",
                        transform: "translateX(-50%)",
                    }}
                >
                    <img
                        src={CustomCarIcon}
                        alt="Car Icon"
                        className="h-8 w-8" // Adjust size as needed (increase size for better visibility)
                    />
                </div>
                <span className="text-sm">Current Price: ${priceRange}</span>
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



