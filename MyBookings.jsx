import React, { useEffect, useState } from "react";
import { useBookings } from "../context/BookingContext";
import Navbar from "./Navbar";
import BookingModal from "./BookingModal";
import { vehicles } from "../data/vehicles";
import Footer from "./Footer";
import ChatBot from "./ChatBot";

const MyBookings = () => {
    const { bookings, cancelBooking, setBookings } = useBookings();
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const [notification, setNotification] = useState(null);
    const [notificationVisible, setNotificationVisible] = useState(false);

    const showNotification = (message) => {
        setNotification(message);
        setNotificationVisible(true);
        setTimeout(() => {
            setNotificationVisible(false);
        }, 3000);
    };

    useEffect(() => {
        // Update car images in local storage if they have changed
        const updatedBookings = bookings.map((booking) => {
            if (booking.car) {
                const updatedCar = vehicles.find(
                    (vehicle) => vehicle.id === booking.car.id
                );
                if (updatedCar && updatedCar.image !== booking.car.image) {
                    return {
                        ...booking,
                        car: { ...booking.car, image: updatedCar.image },
                    };
                }
            }
            return booking;
        });

        // Update local storage and state if there are any changes
        if (JSON.stringify(updatedBookings) !== JSON.stringify(bookings)) {
            setBookings(updatedBookings);
            localStorage.setItem("bookings", JSON.stringify(updatedBookings));
        }
    }, [bookings, setBookings]);

    const handleCardClick = (booking) => {
        setSelectedBooking(booking);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBooking(null);
    };

    const handleCancelBooking = (bookingId, carName) => {
        cancelBooking(bookingId);
        showNotification(
            `Booking for ${carName} has been cancelled successfully`
        );
    };

    if (bookings.length === 0) {
        return (
            <div
                className={`min-h-screen ${
                    darkMode ? "bg-dark" : "bg-emerald-50"
                }`}
            >
                <div className="fixed top-0 left-0 right-0 z-10">
                    <Navbar />
                </div>
                <div
                    className={`container mx-auto px-4 py-8 mt-24 ${
                        darkMode ? "text-dark-text" : ""
                    }`}
                >
                    <h2 className="text-4xl font-bold mb-8">My Bookings</h2>
                    <p className="text-gray-600">No bookings found.</p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen ${
                darkMode ? "bg-dark text-dark-text" : "bg-emerald-50"
            }`}
        >
            <div className="fixed top-0 left-0 right-0 z-10">
                <Navbar />
            </div>
            <div className={`container mx-auto px-4 py-8 mt-24`}>
                <h2 className="text-4xl font-bold mb-8">My Bookings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings
                        .filter((booking) => booking.car)
                        .map((booking) => (
                            <div
                                key={booking.id}
                                className={`rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer ${
                                    darkMode
                                        ? "bg-dark-card text-dark-text border border-dark-border"
                                        : "bg-white"
                                }`}
                                onClick={() => handleCardClick(booking)}
                            >
                                <img
                                    src={booking.car.image}
                                    alt={booking.car.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold mb-2">
                                        {booking.car.name}
                                    </h3>
                                    <p
                                        className={`mb-2 ${
                                            darkMode
                                                ? "text-dark-muted"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        Start Date:{" "}
                                        {new Date(
                                            booking.startDate
                                        ).toLocaleDateString()}
                                    </p>
                                    <p
                                        className={`mb-2 ${
                                            darkMode
                                                ? "text-dark-muted"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        End Date:{" "}
                                        {new Date(
                                            booking.endDate
                                        ).toLocaleDateString()}
                                    </p>
                                    <p className="font-semibold text-[#0fa16d]">
                                        Total Price: ${booking.totalPrice}
                                    </p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleCancelBooking(
                                                booking.id,
                                                booking.car.name
                                            );
                                        }}
                                        className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                    >
                                        Cancel Booking
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            {selectedBooking && (
                <BookingModal
                    car={selectedBooking.car}
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onCancelBooking={() => {
                        handleCancelBooking(
                            selectedBooking.id,
                            selectedBooking.car.name
                        );
                        closeModal();
                    }}
                    startDate={selectedBooking.startDate}
                    endDate={selectedBooking.endDate}
                    totalPrice={selectedBooking.totalPrice}
                    isBookingView={true}
                />
            )}
            {notificationVisible && notification && (
                <div
                    className={`fixed bottom-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 z-[100] flex items-center space-x-2 ${
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

export default MyBookings;




