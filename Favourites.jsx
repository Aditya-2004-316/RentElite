import React, { useContext } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
// import { FaHeart } from "react-icons/fa";
import { vehicles } from "../data/vehicles";
import {
    FavouritesContext,
    FavouritesProvider,
} from "../context/FavouritesContext";

const Favourites = () => {
    const { favorites } = useContext(FavouritesContext);

    const favoriteCars = vehicles.filter((car) => favorites[car.id]);

    return (
        <div className="min-h-screen flex flex-col bg-emerald-50">
            <div className="fixed top-0 left-0 right-0 z-10">
                <Navbar />
            </div>
            <div className="flex-grow mt-24 p-4">
                <h2 className="text-4xl font-bold mb-8 ml-24 flex items-center">
                    {/* <FaHeart className="mr-2 text-red-500" /> */}
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
                                className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 relative group"
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
                                    <p className="text-gray-600 mb-2">
                                        {car.type}
                                    </p>
                                    <p className="text-[#0fa16d] font-bold text-lg">
                                        ${car.price}/day
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
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
