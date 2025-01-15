import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const savedBookings =
            JSON.parse(localStorage.getItem("bookings")) || [];
        setBookings(savedBookings);
    }, []);

    const cancelBooking = (index) => {
        const updatedBookings = bookings.filter((_, i) => i !== index);
        setBookings(updatedBookings);
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));
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
                    {bookings.map((car, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
                        >
                            <img
                                src={car.image}
                                alt={car.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-bold mb-2">
                                    {car.name}
                                </h3>
                                <p className="text-gray-600 mb-2">{car.type}</p>
                                <p className="text-[#0fa16d] font-bold text-lg">
                                    ${car.price}/day
                                </p>
                                <button
                                    onClick={() => cancelBooking(index)}
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
