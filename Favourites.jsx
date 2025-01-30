import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import { FaHeart } from "react-icons/fa";
import { vehicles } from "../data/vehicles";
import {
    FavouritesContext,
    FavouritesProvider,
} from "../context/FavouritesContext";
import CarDetailsModal from "./CarDetailsModal";
// import "../styles/modal.css"; // Import the modal styles

const Favourites = () => {
    const { favorites, setFavorites } = useContext(FavouritesContext);
    const [selectedCar, setSelectedCar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const favoriteCars = vehicles.filter((car) => favorites[car.id]);

    const removeFavorite = (carId) => {
        setFavorites((prevFavorites) => {
            const updatedFavorites = { ...prevFavorites };
            delete updatedFavorites[carId];
            return updatedFavorites;
        });
        setIsModalOpen(false);
    };

    const openModal = (car) => {
        setSelectedCar(car);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCar(null);
    };

    return (
        <div className="min-h-screen flex flex-col bg-emerald-50">
            <div className="fixed top-0 left-0 right-0 z-10">
                <Navbar />
            </div>
            <div className="flex-grow mt-24 p-4 ml-24">
                <h2 className="text-4xl font-bold mb-8 flex items-center">
                    Favourites
                </h2>
                {favoriteCars.length === 0 ? (
                    <p className="text-gray-600 text-center">
                        No favourite cars added.
                    </p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {favoriteCars.map((car) => (
                            <div
                                key={car.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 relative group cursor-pointer"
                                onClick={() => openModal(car)}
                            >
                                <img
                                    src={car.image}
                                    alt={car.name}
                                    className="w-full h-56 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-bold mb-2">
                                        {car.name}
                                    </h3>
                                    <p className="text-gray-600 mb-2">
                                        {car.type}
                                    </p>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[#0fa16d] font-bold text-lg">
                                            ${car.price}/day
                                        </p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                removeFavorite(car.id);
                                            }}
                                            className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <CarDetailsModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                car={selectedCar}
                removeFavorite={removeFavorite}
            />
            <Footer />
        </div>
    );
};

const FavouritesPage = () => (
    <FavouritesProvider>
        <Favourites />
    </FavouritesProvider>
);

export default FavouritesPage;


