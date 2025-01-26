import React, { useState, useEffect } from "react";
import { FaStar, FaRegClock, FaCar } from "react-icons/fa";
import Navbar from "./Navbar";
import FiltersSidebar from "./FiltersSidebar";
import CarImageModal from "./CarImageModal";
import { vehicles } from "../data/vehicles";
import BookingModal from "./BookingModal";
import { useBookings } from "../context/BookingContext";
import { v4 as uuidv4 } from "uuid";
import Footer from "./Footer";

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
    const { bookings, addBooking } = useBookings();

    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector("footer");
            const sidebar = document.querySelector("#filters-sidebar");
            const footerRect = footer.getBoundingClientRect();
            const sidebarRect = sidebar.getBoundingClientRect();

            if (footerRect.top <= window.innerHeight) {
                sidebar.style.position = "fixed";
                sidebar.style.top = "auto";
                sidebar.style.bottom = `${
                    window.innerHeight - footerRect.top
                }px`;
                sidebar.style.overflowY = "scroll";
            } else {
                sidebar.style.position = "fixed";
                sidebar.style.top = "6.5rem"; // Adjusted top margin to avoid hiding behind the navbar
                sidebar.style.bottom = "auto";
                sidebar.style.overflowY = "hidden";
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

    const renderVehicles = (vehicles, label) => {
        return vehicles.map((car) => (
            <div
                key={car.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 relative group"
            >
                <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover"
                    onClick={() => handleCarClick(car)}
                />
                {label && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs py-1 px-2 rounded hidden group-hover:block">
                        {label}
                    </div>
                )}
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

    const getVisibleSectionsCount = () => {
        let count = 0;
        if (featuredCars.length > 0) count++;
        if (newArrivalCars.length > 0) count++;
        if (otherOptions.length > 0) count++;
        return count;
    };

    return (
        <div className="min-h-screen flex flex-col bg-emerald-50">
            <div className="fixed top-0 left-0 right-0 z-10">
                <Navbar />
            </div>
            <div className="flex mt-24">
                <div
                    id="filters-sidebar"
                    className="fixed top-26 left-0 h-[calc(100vh-105px)] w-76 z-9 overflow-hidden custom-scrollbar"
                >
                    <FiltersSidebar onFilterChange={handleFilterChange} />
                </div>
                <div
                    className={`flex-grow ml-80 p-4 ${
                        getVisibleSectionsCount() > 1 ? "" : "mb-[100vh]"
                    }`}
                >
                    {filteredVehicles.length === 0 ? (
                        <p className="text-gray-600 text-center">
                            No vehicles available.
                        </p>
                    ) : (
                        <>
                            {featuredCars.length > 0 && (
                                <>
                                    <h2 className="text-3xl font-bold mb-6 flex items-center bg-yellow-100 p-2 rounded shadow">
                                        <FaStar className="mr-2 text-yellow-500" />
                                        Featured Cars
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {renderVehicles(
                                            featuredCars,
                                            "Featured"
                                        )}
                                    </div>
                                </>
                            )}
                            {newArrivalCars.length > 0 && (
                                <>
                                    <h2
                                        className={`text-3xl font-bold ${
                                            featuredCars.length === 0
                                                ? "mb-6"
                                                : "mt-8 mb-6"
                                        } flex items-center bg-violet-100 p-2 rounded shadow`}
                                    >
                                        <FaRegClock className="mr-2 text-blue-500" />
                                        New Arrivals
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {renderVehicles(newArrivalCars, "New")}
                                    </div>
                                </>
                            )}
                            {otherOptions.length > 0 && (
                                <>
                                    <h2
                                        className={`text-3xl font-bold ${
                                            featuredCars.length === 0 &&
                                            newArrivalCars.length === 0
                                                ? "mb-6"
                                                : "mt-8 mb-6"
                                        } flex items-center bg-green-100 p-2 rounded shadow`}
                                    >
                                        <FaCar className="mr-2 text-green-500" />
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
            <Footer />
        </div>
    );
};

export default Dashboard;


