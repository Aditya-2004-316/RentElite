import React, { useState } from "react";

const BookingModal = ({ car, isOpen, onClose, onConfirm }) => {
    const [rentalDuration, setRentalDuration] = useState(1);

    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm({ car, rentalDuration });
    };

    // List of cars that need object-contain
    const carsNeedingContain = [
        "Ferrari SF90 Stradale",
        "Maserati MC20",
        "Porsche Taycan Turbo S",
        "Pininfarina Battista",
        "Aston Martin DBS",
        "Lexus LC 500",
    ];

    // Determine if current car needs object-contain
    const imageObjectFit = carsNeedingContain.includes(car.name)
        ? "object-contain"
        : "object-cover";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[86%] h-[86vh] overflow-hidden flex">
                {/* Left section - Car Image */}
                <div className="w-[70%] p-4 bg-gray-100 flex items-center justify-center">
                    <img
                        src={car.image}
                        alt={car.name}
                        className={`w-full h-full ${imageObjectFit}`}
                        style={{
                            maxWidth: "100%",
                            maxHeight: "100%",
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </div>

                {/* Right section - Car Information and Booking Details */}
                <div className="w-[30%] p-6 bg-gray-50 overflow-y-auto">
                    <h2 className="text-2xl font-bold mb-4">{car.name}</h2>
                    <div className="space-y-4">
                        <div>
                            <p className="text-gray-600">Type: {car.type}</p>
                            <p className="text-gray-600">
                                Price per day: ${car.price}
                            </p>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-2">
                                Rental Duration (days):
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={rentalDuration}
                                onChange={(e) =>
                                    setRentalDuration(Number(e.target.value))
                                }
                                className="border rounded px-3 py-2 w-full"
                            />
                        </div>

                        <div className="mt-4">
                            <p className="text-lg font-semibold">
                                Total Price: ${car.price * rentalDuration}
                            </p>
                        </div>

                        <div className="flex flex-col space-y-3 mt-6">
                            <button
                                onClick={handleConfirm}
                                className="bg-[#0fa16d] text-white px-6 py-2 rounded hover:bg-green-600 w-full"
                            >
                                Confirm Booking
                            </button>
                            <button
                                onClick={onClose}
                                className="bg-gray-300 text-gray-700 px-6 py-2 rounded hover:bg-gray-400 w-full"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;

