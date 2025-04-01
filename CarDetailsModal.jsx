import React from "react";
import Modal from "react-modal";
import {
    FaCar,
    FaTachometerAlt,
    FaCogs,
    FaGasPump,
    FaUsers,
    FaCalendarAlt,
    FaTimes,
} from "react-icons/fa";

Modal.setAppElement("#root"); // Set the app element for accessibility

const CarDetailsModal = ({ isOpen, onRequestClose, car, removeFavorite }) => {
    if (!car) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Car Details"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <div className="flex h-full relative">
                <button
                    onClick={onRequestClose}
                    className="absolute -top-2 -right-2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                    <FaTimes className="text-2xl" />
                </button>
                <div className="w-8-10 p-4">
                    <img
                        src={car.image}
                        alt={car.name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="w-2-10 p-4 flex flex-col justify-between">
                    <div>
                        <h2 className="text-2xl font-bold mb-4">{car.name}</h2>
                        <p className="text-gray-600 mb-4 flex items-center">
                            <FaCar className="mr-2" /> Type: {car.type}
                        </p>
                        <p className="text-gray-600 mb-4 flex items-center">
                            <FaTachometerAlt className="mr-2" /> Top Speed:{" "}
                            {car.specifications.topSpeed} mph
                        </p>
                        <p className="text-gray-600 mb-4 flex items-center">
                            <FaCogs className="mr-2" /> Transmission:{" "}
                            {car.specifications.transmission}
                        </p>
                        <p className="text-gray-600 mb-4 flex items-center">
                            <FaGasPump className="mr-2" /> Fuel Type:{" "}
                            {car.specifications.fuel}
                        </p>
                        <p className="text-gray-600 mb-4 flex items-center">
                            <FaUsers className="mr-2" /> Seats:{" "}
                            {car.specifications.seats}
                        </p>
                        <p className="text-gray-600 mb-4 flex items-center">
                            <FaCalendarAlt className="mr-2" /> Year:{" "}
                            {car.specifications.year}
                        </p>
                        <p className="text-[#0fa16d] font-bold text-2xl mb-4 mt-44 flex items-center">
                            ${car.price}/day
                        </p>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <button
                            onClick={() => removeFavorite(car.id)}
                            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
                        >
                            Remove
                        </button>
                        <button
                            onClick={onRequestClose}
                            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors"
                        >
                            Exit
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CarDetailsModal;

