import React, { useState } from "react";
import {
    FaCar,
    FaTachometerAlt,
    FaCogs,
    FaGasPump,
    FaUsers,
    FaCalendarAlt,
} from "react-icons/fa";

const BookingModal = ({ car, isOpen, onClose, onConfirm }) => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [scale, setScale] = useState(1);

    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm({ car, startDate, endDate });
    };

    const handleZoomIn = () => {
        setScale((prevScale) => Math.min(prevScale + 0.1, 2));
    };

    const handleZoomOut = () => {
        setScale((prevScale) => Math.max(prevScale - 0.1, 0.5));
    };

    // Calculate number of days between start and end date
    const calculateDays = () => {
        if (!startDate || !endDate) return 0;
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    // Calculate total price
    const calculateTotalPrice = () => {
        const days = calculateDays();
        return days * car.price;
    };

    const carsNeedingContain = [
        "Ferrari SF90 Stradale",
        "Maserati MC20",
        "Porsche Taycan Turbo S",
        "Pininfarina Battista",
        "Aston Martin DBS",
        // "Lexus LC 500",
    ];

    const imageObjectFit = carsNeedingContain.includes(car.name)
        ? "object-contain"
        : "object-cover";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[86%] h-[86vh] overflow-hidden flex relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors z-50 text-3xl"
                >
                    ×
                </button>

                {/* Left section - Car Image */}
                <div className="w-[70%] p-4 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                    {/* Zoom controls */}
                    <div className="absolute top-6 left-6 flex space-x-2 z-10">
                        <button
                            onClick={handleZoomIn}
                            className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                        >
                            +
                        </button>
                        <button
                            onClick={handleZoomOut}
                            className="bg-white w-8 h-8 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                        >
                            −
                        </button>
                    </div>
                    <div className="w-full h-full flex items-center justify-center overflow-hidden">
                        <img
                            src={car.image}
                            alt={car.name}
                            className={`w-full h-full ${imageObjectFit} transition-transform duration-200`}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                width: "100%",
                                height: "100%",
                                transform: `scale(${scale})`,
                            }}
                        />
                    </div>
                </div>

                {/* Right section - Car Information and Booking Details */}
                <div className="w-[30%] p-6 bg-gray-50 overflow-y-auto">
                    {/* Car Name */}
                    <h2 className="text-2xl font-bold mb-6">{car.name}</h2>

                    {/* Car Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2">
                            <FaCar className="text-gray-600" />
                            <span>{car.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaGasPump className="text-gray-600" />
                            <span>{car.specifications.fuel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaTachometerAlt className="text-gray-600" />
                            <span>{car.specifications.topSpeed} mph</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaUsers className="text-gray-600" />
                            <span>{car.specifications.seats} seats</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCogs className="text-gray-600" />
                            <span>{car.specifications.transmission}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-gray-600" />
                            <span>{car.specifications.year}</span>
                        </div>
                    </div>

                    {/* Rental Duration */}
                    <div className="space-y-4 mb-6">
                        <h3 className="font-semibold">Rental Duration</h3>
                        <div>
                            <label className="block text-gray-600 mb-1">
                                Start Date
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full border rounded-md p-2"
                                min={new Date().toISOString().split("T")[0]}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-600 mb-1">
                                End Date
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full border rounded-md p-2"
                                min={
                                    startDate ||
                                    new Date().toISOString().split("T")[0]
                                }
                            />
                        </div>
                    </div>

                    {/* Total Price */}
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Total Price</h3>
                        <p className="text-2xl font-bold text-[#0fa16d]">
                            ${calculateTotalPrice()}
                        </p>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col space-y-3">
                        <button
                            onClick={handleConfirm}
                            className="bg-[#0fa16d] text-white px-6 py-2 rounded hover:bg-green-600 w-full"
                            disabled={!startDate || !endDate}
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
    );
};

export default BookingModal;

