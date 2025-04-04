import React, { useState, useEffect, useContext } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import newCar from "../assets/newcar.png";
import carFleet from "../assets/carfleet.png";
import classic from "../assets/classic.png";
import Navbar from "./Navbar";
import FiltersSidebar from "./FiltersSidebar";
import CarImageModal from "./CarImageModal";
import { vehicles } from "../data/vehicles";
import BookingModal from "./BookingModal";
import { useBookings } from "../context/BookingContext";
import {
    FavouritesContext,
    FavouritesProvider,
} from "../context/FavouritesContext";
import { v4 as uuidv4 } from "uuid";
import Footer from "./Footer";
import { useSettings } from "../context/SettingsContext";
import ChatBot from "./ChatBot";

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
    const [notification, setNotification] = useState("");
    const [notificationVisible, setNotificationVisible] = useState(false);
    const { bookings, addBooking } = useBookings();
    const { favorites, setFavorites } = useContext(FavouritesContext);
    const [darkMode, setDarkMode] = useState(false);
    const { translate, formatCurrency } = useSettings();

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

    const showNotification = (message) => {
        setNotification(message);
        setNotificationVisible(true);
        setTimeout(() => {
            setNotificationVisible(false);
        }, 3000);
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

        // Show success notification
        showNotification(
            `Successfully booked ${selectedBookingCar.name} from ${new Date(
                startDate
            ).toLocaleDateString()} to ${new Date(
                endDate
            ).toLocaleDateString()}`
        );
    };

    const handleBookingClose = () => {
        setIsBookingModalOpen(false);
        setSelectedBookingCar(null);
    };

    const toggleFavorite = (carId, carName) => {
        setFavorites((prevFavorites) => {
            const isFavorite = !prevFavorites[carId];
            setNotification(
                `${carName} ${
                    isFavorite ? "added to" : "removed from"
                } favourites`
            );
            setNotificationVisible(true);
            setTimeout(() => {
                setNotificationVisible(false);
            }, 3000);
            return {
                ...prevFavorites,
                [carId]: isFavorite,
            };
        });
    };

    const renderVehicles = (vehicles, label) => {
        return vehicles.map((car) => (
            <div
                key={car.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden ${
                    darkMode ? "bg-dark-card text-dark-text" : ""
                } transform transition-transform duration-300 hover:scale-105 relative group`}
            >
                <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-48 object-cover"
                    onClick={() => handleCarClick(car)}
                />
                <div
                    className={`absolute top-2 right-2 text-white text-xs py-1 px-2 rounded hidden group-hover:block ${
                        label === "Featured"
                            ? "bg-yellow-500"
                            : label === "New"
                            ? "bg-orange-500"
                            : "bg-green-500"
                    }`}
                >
                    {label || "Classic"}
                </div>
                <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-bold">{car.name}</h3>
                        <button
                            onClick={() => toggleFavorite(car.id, car.name)}
                        >
                            {favorites[car.id] ? (
                                <FaHeart className="text-2xl text-red-500" />
                            ) : (
                                <FaRegHeart className="text-2xl text-gray-500" />
                            )}
                        </button>
                    </div>
                    <p className="text-gray-600 mb-2">{car.type}</p>
                    <div className="flex items-center justify-between">
                        <p className="text-[#0fa16d] font-bold text-lg">
                            {formatCurrency(car.price)}/day
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
        <div
            className={`min-h-screen ${
                darkMode ? "bg-dark" : "bg-emerald-50"
            } flex flex-col`}
        >
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
                                        <img
                                            src={carFleet}
                                            alt="Car Fleet Icon"
                                            className="mr-4 w-10 h-10"
                                        />
                                        Premium Fleet
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
                                        } flex items-center bg-orange-100 p-2 rounded shadow`}
                                    >
                                        <img
                                            src={newCar}
                                            alt="New Car Icon"
                                            className="mr-4 w-10 h-10"
                                        />
                                        {/* <FaRegClock className="mr-2 text-blue-500" /> */}
                                        Latest Additions
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
                                        <img
                                            src={classic}
                                            alt="Classic Icon"
                                            className="mr-4 w-8 h-8"
                                        />
                                        {/* <FaCar className="mr-2 text-green-500" /> */}
                                        Classic Collection
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
            {notificationVisible && notification && (
                <div
                    className={`fixed bottom-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 z-[60] flex items-center space-x-2 ${
                        notificationVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-10 opacity-0"
                    }`}
                >
                    <span className="text-xl">✓</span>
                    <span>{notification}</span>
                </div>
            )}
            <Footer />
            <ChatBot />
        </div>
    );
};

const DashboardPage = () => (
    <FavouritesProvider>
        <Dashboard />
    </FavouritesProvider>
);

export default DashboardPage;





