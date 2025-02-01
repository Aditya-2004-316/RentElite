import { useState, useEffect, useCallback } from "react";
import Navbar from "./Navbar";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaIdCard,
    FaCar,
    FaHistory,
    FaCreditCard,
    FaEdit,
    FaSave,
    FaTimes,
    FaTrash,
} from "react-icons/fa";

const Profile = () => {
    const [activeTab, setActiveTab] = useState("personal");
    const [isEditing, setIsEditing] = useState(false);
    const [showAddPayment, setShowAddPayment] = useState(false);
    const [newPayment, setNewPayment] = useState({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardholderName: "",
    });
    const [showAllRentals, setShowAllRentals] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(true);
    const [notification, setNotification] = useState(null);
    const [notificationVisible, setNotificationVisible] = useState(false);

    // Sample user data (replace with actual user data)
    const [userData, setUserData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+1 234 567 8900",
        address: "123 Main St, New York, NY 10001",
        license: "DL-123456789",
        joinDate: "January 2024",
        totalBookings: 8,
        preferredCars: ["Mercedes-Benz S-Class", "BMW 7 Series"],
    });

    // State for edited data
    const [editedData, setEditedData] = useState({ ...userData });

    // Add this new state for payment methods near other useState declarations
    const [paymentMethods, setPaymentMethods] = useState([
        {
            id: 1,
            type: "Visa",
            lastFour: "4242",
            expiryDate: "12/25",
            isDefault: true,
        },
        {
            id: 2,
            type: "Mastercard",
            lastFour: "8888",
            expiryDate: "09/24",
            isDefault: false,
        },
    ]);

    // Add these new states for settings
    const [darkMode, setDarkMode] = useState(false);
    const [language, setLanguage] = useState("english");
    const [currency, setCurrency] = useState("usd");

    const [preferences, setPreferences] = useState([]); // Add this line

    const handleEdit = () => {
        setIsEditing(true);
        setEditedData({ ...userData });
    };

    const handleSave = () => {
        setUserData({ ...editedData });
        setIsEditing(false);
        // Here you would typically make an API call to update the user data
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedData({ ...userData });
    };

    const handleChange = (field, value) => {
        setEditedData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleAddPayment = (e) => {
        e.preventDefault();

        // Validate card number (basic validation)
        if (newPayment.cardNumber.length !== 16) {
            showNotification("Invalid card number");
            return;
        }

        // Create new payment method object
        const lastFour = newPayment.cardNumber.slice(-4);
        const cardType = newPayment.cardNumber.startsWith("4")
            ? "Visa"
            : "Mastercard"; // Simple card type detection

        const newPaymentMethod = {
            id: Date.now(), // Generate unique ID
            type: cardType,
            lastFour: lastFour,
            expiryDate: newPayment.expiryDate,
            isDefault: paymentMethods.length === 0, // Make default if it's the first card
        };

        // Add new payment method to the list
        setPaymentMethods((prevMethods) => [...prevMethods, newPaymentMethod]);

        // Reset form and close modal
        setNewPayment({
            cardNumber: "",
            expiryDate: "",
            cvv: "",
            cardholderName: "",
        });
        setShowAddPayment(false);

        // Show success notification
        showNotification("New payment method added successfully");
    };

    // Update the rental history state
    const [rentalHistory, setRentalHistory] = useState(() => {
        const savedBookings = localStorage.getItem("bookings");
        return savedBookings ? JSON.parse(savedBookings) : [];
    });

    // Add useEffect to keep rental history updated
    useEffect(() => {
        const handleStorageChange = () => {
            const savedBookings = localStorage.getItem("bookings");
            if (savedBookings) {
                setRentalHistory(JSON.parse(savedBookings));
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Add this function to calculate most booked cars
    const getMostBookedCars = () => {
        const savedBookings = localStorage.getItem("bookings");
        if (!savedBookings) return [];

        const bookings = JSON.parse(savedBookings);

        // Count frequency of each car
        const carFrequency = bookings.reduce((acc, booking) => {
            const carName = booking?.car?.name;
            if (carName) {
                acc[carName] = (acc[carName] || 0) + 1;
            }
            return acc;
        }, {});

        // Convert to array and sort by frequency
        const sortedCars = Object.entries(carFrequency)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([carName]) => carName);

        return sortedCars;
    };

    // Add this state for preferred cars
    const [preferredCars, setPreferredCars] = useState(() =>
        getMostBookedCars()
    );

    // Add this useEffect to keep preferred cars updated
    useEffect(() => {
        const handleStorageChange = () => {
            setPreferredCars(getMostBookedCars());
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Add this function to handle notifications
    const showNotification = useCallback((message) => {
        setNotification(message);
        setNotificationVisible(true);
        setTimeout(() => {
            setNotificationVisible(false);
        }, 3000); // Hide after 3 seconds
    }, []);

    // Add this function to handle setting default payment method
    const handleSetDefaultPayment = (paymentId) => {
        setPaymentMethods((prevMethods) =>
            prevMethods.map((method) => ({
                ...method,
                isDefault: method.id === paymentId,
            }))
        );
        showNotification("Default payment method updated");
    };

    // Add this function to handle removing payment methods
    const handleRemovePayment = (paymentId) => {
        setPaymentMethods((prevMethods) => {
            const updatedMethods = prevMethods.filter(
                (method) => method.id !== paymentId
            );

            // If we removed the default card and there are other cards, make the first one default
            if (
                prevMethods.find((m) => m.id === paymentId)?.isDefault &&
                updatedMethods.length > 0
            ) {
                updatedMethods[0].isDefault = true;
            }

            return updatedMethods;
        });
        showNotification("Payment method removed successfully");
    };

    useEffect(() => {
        // Fetch rental history data from local storage when the component mounts
        const getRentalHistory = () => {
            const data = JSON.parse(localStorage.getItem("bookings")) || [];
            console.log("Fetched rental history:", data); // Debugging line
            setRentalHistory(data);
        };

        getRentalHistory();
    }, []);

    useEffect(() => {
        // Calculate the most booked cars
        const carCount = rentalHistory.reduce((acc, rental) => {
            const carName = rental?.car?.name || "Unknown Car";
            acc[carName] = (acc[carName] || 0) + 1;
            return acc;
        }, {});

        const sortedCars = Object.entries(carCount)
            .sort(([, a], [, b]) => b - a)
            .map(([carName]) => carName);

        setPreferences(sortedCars);
    }, [rentalHistory]);

    useEffect(() => {
        // Save user data to local storage whenever it changes
        localStorage.setItem("userData", JSON.stringify(userData));
    }, [userData]);

    useEffect(() => {
        // Save rental history to local storage whenever it changes
        localStorage.setItem("myBookings", JSON.stringify(rentalHistory));
    }, [rentalHistory]);

    useEffect(() => {
        // Save preferences to local storage whenever they change
        localStorage.setItem("preferences", JSON.stringify(preferences));
    }, [preferences]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center">
                            <span className="text-4xl text-white font-bold">
                                {userData.name.charAt(0)}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                {userData.name}
                            </h1>
                            <p className="text-gray-600">
                                Member since {userData.joinDate}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Profile Navigation */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
                    <div className="flex border-b">
                        <button
                            onClick={() => setActiveTab("personal")}
                            className={`flex-1 py-4 px-6 text-center ${
                                activeTab === "personal"
                                    ? "bg-emerald-600 text-white"
                                    : "hover:bg-gray-50"
                            }`}
                        >
                            Personal Info
                        </button>
                        <button
                            onClick={() => setActiveTab("rentals")}
                            className={`flex-1 py-4 px-6 text-center ${
                                activeTab === "rentals"
                                    ? "bg-emerald-600 text-white"
                                    : "hover:bg-gray-50"
                            }`}
                        >
                            Rental History
                        </button>
                        <button
                            onClick={() => setActiveTab("preferences")}
                            className={`flex-1 py-4 px-6 text-center ${
                                activeTab === "preferences"
                                    ? "bg-emerald-600 text-white"
                                    : "hover:bg-gray-50"
                            }`}
                        >
                            Preferences
                        </button>
                        <button
                            onClick={() => setActiveTab("payment")}
                            className={`flex-1 py-4 px-6 text-center ${
                                activeTab === "payment"
                                    ? "bg-emerald-600 text-white"
                                    : "hover:bg-gray-50"
                            }`}
                        >
                            Payment Methods
                        </button>
                        <button
                            onClick={() => setActiveTab("settings")}
                            className={`flex-1 py-4 px-6 text-center ${
                                activeTab === "settings"
                                    ? "bg-emerald-600 text-white"
                                    : "hover:bg-gray-50"
                            }`}
                        >
                            Settings
                        </button>
                    </div>

                    {/* Tab Content */}
                    <div className="p-6">
                        {activeTab === "personal" && (
                            <div className="space-y-6">
                                <div className="flex items-center space-x-4">
                                    <FaUser className="text-emerald-600 text-xl" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">
                                            Full Name
                                        </p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editedData.name}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">
                                                {userData.name}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <FaEnvelope className="text-emerald-600 text-xl" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">
                                            Email
                                        </p>
                                        {isEditing ? (
                                            <input
                                                type="email"
                                                value={editedData.email}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "email",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">
                                                {userData.email}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <FaPhone className="text-emerald-600 text-xl" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">
                                            Phone
                                        </p>
                                        {isEditing ? (
                                            <input
                                                type="tel"
                                                value={editedData.phone}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "phone",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">
                                                {userData.phone}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <FaMapMarkerAlt className="text-emerald-600 text-xl" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">
                                            Address
                                        </p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editedData.address}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "address",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">
                                                {userData.address}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <FaIdCard className="text-emerald-600 text-xl" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">
                                            Driver's License
                                        </p>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={editedData.license}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "license",
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            />
                                        ) : (
                                            <p className="text-gray-900">
                                                {userData.license}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Edit/Save/Cancel Buttons */}
                                <div className="flex justify-end space-x-4">
                                    {isEditing ? (
                                        <>
                                            <button
                                                onClick={handleCancel}
                                                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                            >
                                                <FaTimes />
                                                <span>Cancel</span>
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                                            >
                                                <FaSave />
                                                <span>Save Changes</span>
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            onClick={handleEdit}
                                            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                                        >
                                            <FaEdit />
                                            <span>Edit Profile</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "rentals" && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">
                                        Total Rentals:{" "}
                                        {rentalHistory.length - 1}
                                    </h3>
                                    <button
                                        onClick={() =>
                                            setShowAllRentals(!showAllRentals)
                                        }
                                        className="text-emerald-600 hover:text-emerald-700"
                                    >
                                        {showAllRentals
                                            ? "Show Less"
                                            : "View All"}
                                    </button>
                                </div>
                                {rentalHistory.length === 0 ? (
                                    <p>No rental history available.</p>
                                ) : (
                                    <ul className="space-y-4">
                                        {rentalHistory
                                            .filter(
                                                (rental) => rental?.car?.name
                                            ) // Filter out invalid entries
                                            .sort(
                                                (a, b) =>
                                                    new Date(b.startDate) -
                                                    new Date(a.startDate)
                                            ) // Sort by start date (latest to oldest)
                                            .slice(
                                                0,
                                                showAllRentals
                                                    ? rentalHistory.length
                                                    : 3
                                            ) // Show only the latest 3 rentals initially
                                            .map((rental) => (
                                                <li
                                                    key={rental.id}
                                                    className="p-4 border rounded-lg shadow-sm"
                                                >
                                                    <h3 className="text-xl font-bold mb-2">
                                                        {rental.car.name}
                                                    </h3>
                                                    <p className="text-gray-700">
                                                        <span className="font-semibold">
                                                            Start Date:
                                                        </span>{" "}
                                                        {rental.startDate}
                                                    </p>
                                                    <p className="text-gray-700">
                                                        <span className="font-semibold">
                                                            End Date:
                                                        </span>{" "}
                                                        {rental.endDate}
                                                    </p>
                                                    <p className="text-gray-700">
                                                        <span className="font-semibold">
                                                            Total Price:
                                                        </span>{" "}
                                                        ${rental.totalPrice}
                                                    </p>
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {activeTab === "preferences" && (
                            <>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">
                                            Preferred Vehicles
                                        </h3>
                                        <div className="space-y-3">
                                            {preferredCars.length > 0 ? (
                                                preferredCars.map(
                                                    (car, index) => (
                                                        <div
                                                            key={index}
                                                            className="flex items-center space-x-3"
                                                        >
                                                            <FaCar className="text-emerald-600" />
                                                            <span>{car}</span>
                                                        </div>
                                                    )
                                                )
                                            ) : (
                                                <p className="text-gray-500">
                                                    No booking history available
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">
                                            Notification Preferences
                                        </h3>
                                        <div className="space-y-3">
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-emerald-600"
                                                    checked={emailNotifications}
                                                    onChange={(e) => {
                                                        setEmailNotifications(
                                                            e.target.checked
                                                        );
                                                        showNotification(
                                                            e.target.checked
                                                                ? "Email notifications enabled"
                                                                : "Email notifications disabled"
                                                        );
                                                    }}
                                                />
                                                <span>Email notifications</span>
                                            </label>
                                            <label className="flex items-center space-x-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="form-checkbox text-emerald-600"
                                                    checked={smsNotifications}
                                                    onChange={(e) => {
                                                        setSmsNotifications(
                                                            e.target.checked
                                                        );
                                                        showNotification(
                                                            e.target.checked
                                                                ? "SMS notifications enabled"
                                                                : "SMS notifications disabled"
                                                        );
                                                    }}
                                                />
                                                <span>SMS notifications</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Add notification toast */}
                                {notificationVisible && notification && (
                                    <div
                                        className={`fixed bottom-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
                                            notificationVisible
                                                ? "translate-y-0 opacity-100"
                                                : "translate-y-10 opacity-0"
                                        }`}
                                    >
                                        {notification}
                                    </div>
                                )}
                            </>
                        )}

                        {activeTab === "payment" && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">
                                        Saved Payment Methods
                                    </h3>
                                    <button
                                        onClick={() => setShowAddPayment(true)}
                                        className="text-emerald-600 hover:text-emerald-700"
                                    >
                                        Add New
                                    </button>
                                </div>

                                {/* Add Payment Form */}
                                {showAddPayment && (
                                    <div className="border rounded-lg p-6 mb-6 bg-gray-50">
                                        <form
                                            onSubmit={handleAddPayment}
                                            className="space-y-4"
                                        >
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Cardholder Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        newPayment.cardholderName
                                                    }
                                                    onChange={(e) =>
                                                        setNewPayment(
                                                            (prev) => ({
                                                                ...prev,
                                                                cardholderName:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        )
                                                    }
                                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Card Number
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        newPayment.cardNumber
                                                    }
                                                    onChange={(e) =>
                                                        setNewPayment(
                                                            (prev) => ({
                                                                ...prev,
                                                                cardNumber:
                                                                    e.target.value
                                                                        .replace(
                                                                            /\D/g,
                                                                            ""
                                                                        )
                                                                        .slice(
                                                                            0,
                                                                            16
                                                                        ),
                                                            })
                                                        )
                                                    }
                                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                                    placeholder="XXXX XXXX XXXX XXXX"
                                                    required
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        Expiry Date
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={
                                                            newPayment.expiryDate
                                                        }
                                                        onChange={(e) => {
                                                            let value =
                                                                e.target.value.replace(
                                                                    /\D/g,
                                                                    ""
                                                                );
                                                            if (
                                                                value.length >=
                                                                2
                                                            ) {
                                                                value =
                                                                    value.slice(
                                                                        0,
                                                                        2
                                                                    ) +
                                                                    "/" +
                                                                    value.slice(
                                                                        2,
                                                                        4
                                                                    );
                                                            }
                                                            setNewPayment(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    expiryDate:
                                                                        value,
                                                                })
                                                            );
                                                        }}
                                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                                        placeholder="MM/YY"
                                                        maxLength="5"
                                                        required
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                                        CVV
                                                    </label>
                                                    <input
                                                        type="text"
                                                        value={newPayment.cvv}
                                                        onChange={(e) =>
                                                            setNewPayment(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    cvv: e.target.value
                                                                        .replace(
                                                                            /\D/g,
                                                                            ""
                                                                        )
                                                                        .slice(
                                                                            0,
                                                                            3
                                                                        ),
                                                                })
                                                            )
                                                        }
                                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                                        placeholder="123"
                                                        maxLength="3"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-end space-x-4 pt-4">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowAddPayment(false)
                                                    }
                                                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                                                >
                                                    Add Payment Method
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {/* Existing Payment Methods */}
                                <div className="space-y-4">
                                    {paymentMethods.map((method) => (
                                        <div
                                            key={method.id}
                                            className="border rounded-lg p-4 flex items-center justify-between"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <FaCreditCard className="text-emerald-600 text-2xl" />
                                                <div>
                                                    <p className="font-semibold">
                                                        {method.type} ending in{" "}
                                                        {method.lastFour}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        Expires{" "}
                                                        {method.expiryDate}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                {method.isDefault ? (
                                                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">
                                                        Default
                                                    </span>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            handleSetDefaultPayment(
                                                                method.id
                                                            )
                                                        }
                                                        className="text-emerald-600 hover:text-emerald-700 transition-colors"
                                                    >
                                                        Make Default
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() =>
                                                        handleRemovePayment(
                                                            method.id
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-700 transition-colors ml-4"
                                                    title="Remove payment method"
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "settings" && (
                            <div className="space-y-8">
                                {/* Account Settings */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">
                                        Account Settings
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-700">
                                                Dark Mode
                                            </span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={darkMode}
                                                    onChange={(e) => {
                                                        setDarkMode(
                                                            e.target.checked
                                                        );
                                                        showNotification(
                                                            `Dark mode ${
                                                                e.target.checked
                                                                    ? "enabled"
                                                                    : "disabled"
                                                            }`
                                                        );
                                                    }}
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                            </label>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Language
                                            </label>
                                            <select
                                                value={language}
                                                onChange={(e) => {
                                                    setLanguage(e.target.value);
                                                    showNotification(
                                                        `Language changed to ${e.target.value}`
                                                    );
                                                }}
                                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            >
                                                <option value="english">
                                                    English
                                                </option>
                                                <option value="spanish">
                                                    Spanish
                                                </option>
                                                <option value="french">
                                                    French
                                                </option>
                                                <option value="german">
                                                    German
                                                </option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Currency
                                            </label>
                                            <select
                                                value={currency}
                                                onChange={(e) =>
                                                    setCurrency(e.target.value)
                                                }
                                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                            >
                                                <option value="usd">
                                                    USD ($)
                                                </option>
                                                <option value="eur">
                                                    EUR (€)
                                                </option>
                                                <option value="gbp">
                                                    GBP (£)
                                                </option>
                                                <option value="jpy">
                                                    JPY (¥)
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Privacy Settings */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">
                                        Privacy Settings
                                    </h3>
                                    <div className="space-y-4">
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox text-emerald-600"
                                                onChange={(e) => {
                                                    showNotification(
                                                        `Profile visibility ${
                                                            e.target.checked
                                                                ? "enabled"
                                                                : "disabled"
                                                        }`
                                                    );
                                                }}
                                            />
                                            <span>
                                                Make profile visible to other
                                                users
                                            </span>
                                        </label>
                                        <label className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox text-emerald-600"
                                                onChange={(e) => {
                                                    showNotification(
                                                        `Activity status ${
                                                            e.target.checked
                                                                ? "enabled"
                                                                : "disabled"
                                                        }`
                                                    );
                                                }}
                                            />
                                            <span>Show activity status</span>
                                        </label>
                                    </div>
                                </div>

                                {/* Security Settings */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">
                                        Security Settings
                                    </h3>
                                    <div className="flex flex-col space-y-2">
                                        <button
                                            onClick={() =>
                                                showNotification(
                                                    "Password change functionality will be added soon"
                                                )
                                            }
                                            className="w-72 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                                        >
                                            Change Password
                                        </button>
                                        <button
                                            onClick={() =>
                                                showNotification(
                                                    "Two-factor authentication functionality will be added soon"
                                                )
                                            }
                                            className="w-72 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                                        >
                                            Enable 2-Factor Authentication
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;


