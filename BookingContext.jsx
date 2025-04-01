import React, { createContext, useContext, useState, useEffect } from "react";

const BookingContext = createContext();

export const useBookings = () => {
    return useContext(BookingContext);
};

export const BookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const savedBookings =
            JSON.parse(localStorage.getItem("bookings")) || [];
        setBookings(savedBookings);
    }, []);

    const addBooking = (booking) => {
        const updatedBookings = [...bookings, booking];
        setBookings(updatedBookings);
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    };

    const cancelBooking = (id) => {
        const updatedBookings = bookings.filter((booking) => booking.id !== id);
        setBookings(updatedBookings);
        localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    };

    return (
        <BookingContext.Provider
            value={{ bookings, addBooking, cancelBooking, setBookings }}
        >
            {children}
        </BookingContext.Provider>
    );
};

