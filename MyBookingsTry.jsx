import React, { createContext, useState, useContext } from "react";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookings, setBookings] = useState([]);

    const addBooking = (booking) => {
        setBookings([...bookings, booking]);
    };

    const cancelBooking = (bookingId) => {
        setBookings(bookings.filter((booking) => booking.id !== bookingId));
    };

    return (
        <BookingContext.Provider
            value={{ bookings, addBooking, cancelBooking }}
        >
            {children}
        </BookingContext.Provider>
    );
};

export const useBookings = () => useContext(BookingContext);
