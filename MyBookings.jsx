import React, { useEffect, useState } from "react";
import { useBookings } from "../context/BookingContext";
import Navbar from "./Navbar";
import BookingModal from "./BookingModal";
import { vehicles } from "../data/vehicles";

const MyBookings = () => {
    const { bookings, cancelBooking, setBookings } = useBookings();
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    if (bookings.length === 0) {
        return (
            <div className="min-h-screen bg-emerald-50">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <h2 className="text-4xl font-bold mb-8">My Bookings</h2>
                    <p className="text-gray-600">No bookings found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-emerald-50">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-4xl font-bold mb-8">My Bookings</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings
                        .filter((booking) => booking.car)
                        .map((booking) => (
                            <div
                                key={booking.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer"
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
                                    <p className="text-gray-600 mb-2">
                                        Start Date:{" "}
                                        {new Date(
                                            booking.startDate
                                        ).toLocaleDateString()}
                                    </p>
                                    <p className="text-gray-600 mb-2">
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
                                            cancelBooking(booking.id);
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
                    onCancelBooking={() => cancelBooking(selectedBooking.id)}
                    startDate={selectedBooking.startDate}
                    endDate={selectedBooking.endDate}
                    totalPrice={selectedBooking.totalPrice}
                    isBookingView={true}
                />
            )}
        </div>
    );
};

export default MyBookings;


