import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Toast from "./Toast";
import CarImageModal from "./CarImageModal";

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const savedBookings = JSON.parse(
            localStorage.getItem("bookings") || "[]"
        );
        setBookings(savedBookings);
    }, []);

    const handleCancelBooking = (bookingId) => {
        // Filter out the cancelled booking
        const updatedBookings = bookings.filter(
            (booking) => booking.bookingId !== bookingId
        );
        // Update localStorage
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));
        // Update state
        setBookings(updatedBookings);
        // Show toast
        setShowToast(true);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    My Bookings
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bookings.map((booking) => (
                        <div
                            key={booking.bookingId}
                            className="bg-white rounded-lg shadow-lg overflow-hidden"
                        >
                            <img
                                src={booking.image}
                                alt={booking.name}
                                className="w-full h-48 object-cover cursor-pointer"
                                onClick={() => setSelectedImage(booking.image)}
                            />
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {booking.name}
                                </h3>
                                <p className="text-emerald-600 font-semibold mb-4">
                                    ${booking.price}/day
                                </p>
                                <div className="text-gray-600 space-y-2 mb-4">
                                    <p>
                                        Booked on:{" "}
                                        {new Date(
                                            booking.bookingDate
                                        ).toLocaleDateString()}
                                    </p>
                                    <p>Type: {booking.type}</p>
                                    <p>Year: {booking.specifications.year}</p>
                                </div>
                                <button
                                    onClick={() =>
                                        handleCancelBooking(booking.bookingId)
                                    }
                                    className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 
                                             transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                                >
                                    Cancel Booking
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Toast
                message="Booking cancelled successfully!"
                isVisible={showToast}
                onClose={() => setShowToast(false)}
            />

            <CarImageModal
                image={selectedImage}
                isOpen={!!selectedImage}
                onClose={() => setSelectedImage(null)}
            />
        </div>
    );
};

export default MyBookings;
