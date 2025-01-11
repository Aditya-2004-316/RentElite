import React, { useState, useEffect } from "react";

const Bookings = () => {
    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        // Load rentals when component mounts
        const loadRentals = () => {
            const savedRentals = localStorage.getItem("rentalHistory");
            if (savedRentals) {
                setRentals(JSON.parse(savedRentals));
            }
        };

        loadRentals();

        // Add event listener for storage changes
        window.addEventListener("storage", loadRentals);

        // Cleanup
        return () => {
            window.removeEventListener("storage", loadRentals);
        };
    }, []);

    return (
        <div className="min-h-screen bg-emerald-50 p-8">
            <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

            {rentals.length === 0 ? (
                <div className="text-center text-gray-600">
                    <p>No bookings found. Start by booking a vehicle!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rentals.map((rental) => (
                        <div
                            key={rental.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden"
                        >
                            <img
                                src={rental.image}
                                alt={rental.carName}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">
                                    {rental.carName}
                                </h3>
                                <div className="space-y-2">
                                    <p>
                                        <span className="font-medium">
                                            Booking Date:
                                        </span>{" "}
                                        {new Date(
                                            rental.bookingDate
                                        ).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            Status:
                                        </span>{" "}
                                        <span className="text-emerald-600">
                                            {rental.status}
                                        </span>
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            Price:
                                        </span>{" "}
                                        ${rental.price}/day
                                    </p>
                                    <p>
                                        <span className="font-medium">
                                            Type:
                                        </span>{" "}
                                        {rental.type}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bookings;
