import React, { createContext, useState, useEffect } from "react";

export const FavouritesContext = createContext();

export const FavouritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        // Retrieve favorites from local storage if available
        const savedFavorites = localStorage.getItem("favorites");
        return savedFavorites ? JSON.parse(savedFavorites) : {};
    });

    useEffect(() => {
        // Save favorites to local storage whenever it changes
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavouritesContext.Provider value={{ favorites, setFavorites }}>
            {children}
        </FavouritesContext.Provider>
    );
};
