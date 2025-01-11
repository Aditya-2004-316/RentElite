import React from "react";
import { useBookings } from "../context/BookingContext";
import Navbar from "./Navbar";

const MyBookings = () => {
    const { bookings, cancelBooking } = useBookings();

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
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
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
                                <div className="space-y-2 text-gray-600">
                                    <p>
                                        Start Date:{" "}
                                        {new Date(
                                            booking.startDate
                                        ).toLocaleDateString()}
                                    </p>
                                    <p>
                                        End Date:{" "}
                                        {new Date(
                                            booking.endDate
                                        ).toLocaleDateString()}
                                    </p>
                                    <p className="font-semibold text-[#0fa16d]">
                                        Total Price: ${booking.totalPrice}
                                    </p>
                                </div>
                                <button
                                    onClick={() => cancelBooking(booking.id)}
                                    className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                >
                                    Cancel Booking
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyBookings;


