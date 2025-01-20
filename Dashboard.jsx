import React, { useState, useEffect } from "react";
import {
    FaStar,
    FaRegClock,
    FaCar,
    FaFacebook,
    FaTwitter,
    FaInstagram,
    FaLinkedin,
} from "react-icons/fa";
import Navbar from "./Navbar";
import FiltersSidebar from "./FiltersSidebar";
import CarImageModal from "./CarImageModal";
import { vehicles } from "../data/vehicles";
import BookingModal from "./BookingModal";
import MyBookings from "./MyBookings";
import { useBookings } from "../context/BookingContext";
import { v4 as uuidv4 } from "uuid";

const companyNameMappings = {
    Mercedes: "Mercedes",
    "Mercedes-AMG": "Mercedes",
    "Mercedes-Maybach": "Mercedes",
    Aston: "Aston Martin",
};

const getCompanyName = (carName) => {
    const firstWord = carName.split(" ")[0];
    return companyNameMappings[firstWord] || firstWord;
};

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

const Dashboard = () => {
    const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
    const [selectedCar, setSelectedCar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [selectedBookingCar, setSelectedBookingCar] = useState(null);
    const { bookings, addBooking, cancelBooking } = useBookings();

    const handleFilterChange = (filters) => {
        let filtered = [...vehicles];

        // Company filter
        if (filters.company) {
            filtered = filtered.filter((vehicle) => {
                const companyName = getCompanyName(vehicle.name);
                return (
                    companyName.toLowerCase() === filters.company.toLowerCase()
                );
            });
        }

        // Search term filter
        if (filters.searchTerm) {
            filtered = filtered.filter((vehicle) => {
                const companyName = getCompanyName(vehicle.name);
                return companyName
                    .toLowerCase()
                    .includes(filters.searchTerm.toLowerCase());
            });
        }

        // Price filter (minimum price)
        if (filters.priceRange > 0) {
            filtered = filtered.filter(
                (vehicle) => vehicle.price >= parseInt(filters.priceRange)
            );
        }

        // Fuel type filter
        if (filters.fuelType) {
            filtered = filtered.filter(
                (vehicle) => vehicle.specifications.fuel === filters.fuelType
            );
        }

        // Transmission filter
        if (filters.transmission) {
            filtered = filtered.filter(
                (vehicle) =>
                    vehicle.specifications.transmission === filters.transmission
            );
        }

        // Car type filter
        if (filters.carType) {
            filtered = filtered.filter(
                (vehicle) => vehicle.type === filters.carType
            );
        }

        setFilteredVehicles(filtered);
    };

    const handleCarClick = (car) => {
        setSelectedCar(car);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCar(null);
    };

    const handleBooking = (car) => {
        setSelectedBookingCar(car);
        setIsBookingModalOpen(true);
    };

    const handleBookingConfirm = (bookingDetails) => {
        const { startDate, endDate, totalPrice } = bookingDetails;
        const newBooking = {
            id: uuidv4(),
            car: selectedBookingCar,
            startDate,
            endDate,
            totalPrice,
        };
        addBooking(newBooking);
        setIsBookingModalOpen(false);
        setSelectedBookingCar(null);
    };

    const handleBookingClose = () => {
        setIsBookingModalOpen(false);
        setSelectedBookingCar(null);
    };

    const renderVehicles = (vehicles) => {
        return vehicles.map((car) => (
            <div
                key={car.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
                <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover"
                    onClick={() => handleCarClick(car)}
                />
                <div className="p-4">
                    <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                    <p className="text-gray-600 mb-2">{car.type}</p>
                    <div className="flex items-center justify-between">
                        <p className="text-[#0fa16d] font-bold text-lg">
                            ${car.price}/day
                        </p>
                        <button
                            onClick={() => handleBooking(car)}
                            className="bg-[#0fa16d] text-white py-1 px-3 rounded hover:bg-green-600 transition-colors"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        ));
    };

    const featuredCars = filteredVehicles.filter((vehicle) =>
        featuredVehicles.includes(vehicle.name)
    );

    const newArrivalCars = filteredVehicles.filter((vehicle) =>
        newArrivals.includes(vehicle.name)
    );

    const otherOptions = filteredVehicles.filter(
        (vehicle) =>
            !featuredVehicles.includes(vehicle.name) &&
            !newArrivals.includes(vehicle.name)
    );

    return (
        <div className="min-h-screen flex flex-col bg-emerald-50">
            <div className="fixed top-0 left-0 right-0 z-10">
                <Navbar />
            </div>
            <div className="flex mt-24">
                <div className="fixed bottom-0 left-0 h-[calc(100vh-105px)] w-72 z-10">
                    {" "}
                    {/* Adjusted width and margin */}
                    <FiltersSidebar onFilterChange={handleFilterChange} />
                </div>
                <div className="flex-grow ml-80 p-4">
                    {" "}
                    {/* Adjusted margin-left */}
                    {filteredVehicles.length === 0 ? (
                        <p className="text-gray-600 text-center">
                            Sorry, there are no cars in this price range. Try
                            searching for a different price range.
                        </p>
                    ) : (
                        <>
                            {featuredCars.length > 0 && (
                                <>
                                    <h2 className="text-3xl font-bold mb-6 flex items-center">
                                        {" "}
                                        {/* Increased margin-bottom */}
                                        <FaStar className="mr-2 text-yellow-500" />{" "}
                                        Featured Cars
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {renderVehicles(featuredCars)}
                                    </div>
                                </>
                            )}
                            {newArrivalCars.length > 0 && (
                                <>
                                    <h2 className="text-3xl font-bold mt-8 mb-6 flex items-center">
                                        {" "}
                                        {/* Increased margin-bottom */}
                                        <FaRegClock className="mr-2 text-blue-500" />{" "}
                                        New Arrivals
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {renderVehicles(newArrivalCars)}
                                    </div>
                                </>
                            )}
                            {otherOptions.length > 0 && (
                                <>
                                    <h2 className="text-3xl font-bold mt-8 mb-6 flex items-center">
                                        {" "}
                                        {/* Increased margin-bottom */}
                                        <FaCar className="mr-2 text-green-500" />{" "}
                                        Other Options
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {renderVehicles(otherOptions)}
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
            {selectedCar && (
                <CarImageModal
                    image={selectedCar.image}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                />
            )}
            {isBookingModalOpen && selectedBookingCar && (
                <BookingModal
                    car={selectedBookingCar}
                    isOpen={isBookingModalOpen}
                    onClose={handleBookingClose}
                    onConfirm={handleBookingConfirm}
                />
            )}
            <footer className="bg-gray-800 text-white py-8 mt-8">
                <div className="container mx-auto text-center">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            &copy; {new Date().getFullYear()} Rent Elite. All
                            rights reserved.
                        </div>
                        <div className="flex space-x-4">
                            <a
                                href="#"
                                className="text-white hover:text-gray-400"
                            >
                                <FaFacebook size={24} />
                            </a>
                            <a
                                href="#"
                                className="text-white hover:text-gray-400"
                            >
                                <FaTwitter size={24} />
                            </a>
                            <a
                                href="#"
                                className="text-white hover:text-gray-400"
                            >
                                <FaInstagram size={24} />
                            </a>
                            <a
                                href="#"
                                className="text-white hover:text-gray-400"
                            >
                                <FaLinkedin size={24} />
                            </a>
                        </div>
                    </div>
                    <div className="mt-4">
                        <a
                            href="#"
                            className="text-white hover:text-gray-400 mx-2"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-gray-400 mx-2"
                        >
                            Terms of Service
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-gray-400 mx-2"
                        >
                            Contact Us
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Dashboard;


