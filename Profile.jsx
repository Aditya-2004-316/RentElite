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
import styled from "styled-components";
import { useSettings } from "../context/SettingsContext";
import ChatBot from "./ChatBot";

const Button = styled.button`
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
    color: white;

    &:hover {
        background-color: ${(props) => {
            switch (props.buttonType) {
                case "edit":
                    return "#047857";
                case "save":
                    return "#047857";
                case "cancel":
                    return "#b91c1c";
                default:
                    return "#1d4ed8";
            }
        }};
    }

    background-color: ${(props) => {
        switch (props.buttonType) {
            case "edit":
                return "#059669";
            case "save":
                return "#059669";
            case "cancel":
                return "#dc2626";
            default:
                return "#2563eb";
        }
    }};
`;

const Profile = () => {
    const {
        darkMode,
        setDarkMode,
        currency,
        setCurrency,
        language,
        setLanguage,
        translate,
        formatCurrency,
    } = useSettings();

    const [activeTab, setActiveTab] = useState("personal");
    const [isEditing, setIsEditing] = useState(false);
    const [showAddPayment, setShowAddPayment] = useState(false);
    const [newPayment, setNewPayment] = useState({
        cardholderName: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });
    const [showAllRentals, setShowAllRentals] = useState(false);
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(true);
    const [notification, setNotification] = useState(null);
    const [notificationVisible, setNotificationVisible] = useState(false);

    // Modify the initial userData state setup
    const [userData, setUserData] = useState(() => {
        const userEmail = localStorage.getItem("userEmail");
        // Try to get user-specific data using email as key
        const savedUserData = localStorage.getItem(`userData_${userEmail}`);

        if (savedUserData && userEmail) {
            return JSON.parse(savedUserData);
        }

        // Default state if no saved data exists
        return {
            name: "",
            email: userEmail || "",
            phone: "",
            address: "",
            license: "",
            joinDate: new Date().toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
            }),
            emailNotifications: false,
            smsNotifications: false,
            darkMode: false,
            profileVisibility: false,
            activityStatus: false,
            language: "english",
            currency: "usd",
        };
    });

    const [editedData, setEditedData] = useState({ ...userData });

    // Add this new state for payment methods near other useState declarations
    const [paymentMethods, setPaymentMethods] = useState(() => {
        const savedPaymentMethods = localStorage.getItem("paymentMethods");
        return savedPaymentMethods ? JSON.parse(savedPaymentMethods) : [];
    });

    // Add these new states for settings
    const [preferences, setPreferences] = useState([]);
    const [preferencesChanged, setPreferencesChanged] = useState(false);
    const [settingsChanged, setSettingsChanged] = useState(false);

    // Modify the useEffect that handles user data persistence
    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
            // Save user data with email-specific key
            localStorage.setItem(
                `userData_${userEmail}`,
                JSON.stringify(userData)
            );
        }
    }, [userData]);

    const handleEdit = () => {
        setIsEditing(true);
        setEditedData({ ...userData });
    };

    // Modify the handleSave function
    const handleSave = () => {
        // Existing validation checks...
        if (!editedData.name || !editedData.email || !editedData.phone) {
            showNotification(
                "Please fill in all required fields (Name, Email, and Phone)"
            );
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(editedData.email)) {
            showNotification("Please enter a valid email address");
            return;
        }

        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(editedData.phone)) {
            showNotification("Please enter a valid phone number");
            return;
        }

        // Update the userData state with edited data
        const updatedData = { ...editedData };
        setUserData(updatedData);
        setIsEditing(false);

        // Save to localStorage with email-specific key
        const userEmail = localStorage.getItem("userEmail");
        if (userEmail) {
            localStorage.setItem(
                `userData_${userEmail}`,
                JSON.stringify(updatedData)
            );
        }

        showNotification("Changes saved successfully!");
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

        // Basic validation
        if (
            !newPayment.cardholderName ||
            !newPayment.cardNumber ||
            !newPayment.expiryDate ||
            !newPayment.cvv
        ) {
            showNotification("Please fill in all fields");
            return;
        }

        // Create new payment method object
        const newPaymentMethod = {
            id: Date.now(), // Unique ID
            type: "Credit Card",
            lastFour: newPayment.cardNumber.slice(-4),
            cardholderName: newPayment.cardholderName,
            expiryDate: newPayment.expiryDate,
            isDefault: paymentMethods.length === 0, // Make first card default
        };

        // Update state and localStorage
        const updatedPaymentMethods = [...paymentMethods, newPaymentMethod];
        setPaymentMethods(updatedPaymentMethods);
        localStorage.setItem(
            "paymentMethods",
            JSON.stringify(updatedPaymentMethods)
        );

        // Reset form and close
        setNewPayment({
            cardholderName: "",
            cardNumber: "",
            expiryDate: "",
            cvv: "",
        });
        setShowAddPayment(false);
        showNotification("Payment method added successfully!");
    };

    const handleRemovePayment = (paymentId) => {
        const updatedPaymentMethods = paymentMethods.filter(
            (method) => method.id !== paymentId
        );
        setPaymentMethods(updatedPaymentMethods);
        localStorage.setItem(
            "paymentMethods",
            JSON.stringify(updatedPaymentMethods)
        );
    };

    const handleSetDefaultPayment = (paymentId) => {
        const updatedPaymentMethods = paymentMethods.map((method) => ({
            ...method,
            isDefault: method.id === paymentId,
        }));
        setPaymentMethods(updatedPaymentMethods);
        localStorage.setItem(
            "paymentMethods",
            JSON.stringify(updatedPaymentMethods)
        );
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

        setEditedData((prev) => ({
            ...prev,
            preferences: sortedCars,
        }));
    }, [rentalHistory]);

    useEffect(() => {
        // Save rental history to local storage whenever it changes
        localStorage.setItem("myBookings", JSON.stringify(rentalHistory));
    }, [rentalHistory]);

    useEffect(() => {
        // Save preferences to local storage whenever they change
        localStorage.setItem(
            "preferences",
            JSON.stringify(editedData.preferences)
        );
    }, [editedData.preferences]);

    // Handlers for Preferences Tab
    const handlePreferencesChange = (field, value) => {
        setEditedData((prev) => ({
            ...prev,
            [field]: value,
        }));
        setPreferencesChanged(true);
    };

    const handlePreferencesSave = () => {
        const updatedData = {
            ...userData,
            emailNotifications: editedData.emailNotifications,
            smsNotifications: editedData.smsNotifications,
        };

        setUserData(updatedData);
        setPreferencesChanged(false);
        localStorage.setItem("userData", JSON.stringify(updatedData));
        showNotification("Preferences saved successfully!");
    };

    // Handlers for Settings Tab
    const handleSettingsChange = (field, value) => {
        setEditedData((prev) => ({
            ...prev,
            [field]: value,
        }));
        setSettingsChanged(true);
    };

    const handleSettingsSave = () => {
        const updatedData = {
            ...userData,
            darkMode: editedData.darkMode,
            profileVisibility: editedData.profileVisibility,
            activityStatus: editedData.activityStatus,
            language: editedData.language,
            currency: editedData.currency,
        };

        setUserData(updatedData);
        setSettingsChanged(false);
        localStorage.setItem("userData", JSON.stringify(updatedData));
        showNotification("Settings saved successfully!");
    };

    // Make sure editedData is initialized with userData when component mounts
    useEffect(() => {
        setEditedData(userData);
    }, []);

    // Update the settings tab section
    const renderSettingsTab = () => (
        <div
            className={`space-y-8 ${
                darkMode ? "text-dark-text" : "text-gray-700"
            }`}
        >
            <div>
                <h3 className="text-lg font-semibold mb-4">
                    {translate("settings")}
                </h3>
                <div className="space-y-4">
                    {/* Dark Mode Toggle */}
                    <div className="flex items-center justify-between">
                        <span>{translate("darkMode")}</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={darkMode}
                                onChange={(e) => {
                                    setDarkMode(e.target.checked);
                                    handleSettingsChange(
                                        "darkMode",
                                        e.target.checked
                                    );
                                }}
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                    </div>

                    {/* Profile Visibility */}
                    <div className="flex items-center justify-between">
                        <span>Profile Visibility</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={editedData.profileVisibility}
                                onChange={(e) =>
                                    handleSettingsChange(
                                        "profileVisibility",
                                        e.target.checked
                                    )
                                }
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                    </div>

                    {/* Activity Status */}
                    <div className="flex items-center justify-between">
                        <span>Show Activity Status</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={editedData.activityStatus}
                                onChange={(e) =>
                                    handleSettingsChange(
                                        "activityStatus",
                                        e.target.checked
                                    )
                                }
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                    </div>

                    {/* Email Notifications */}
                    {/* <div className="flex items-center justify-between">
                        <span>Email Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={editedData.emailNotifications}
                                onChange={(e) =>
                                    handleSettingsChange(
                                        "emailNotifications",
                                        e.target.checked
                                    )
                                }
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                    </div> */}

                    {/* SMS Notifications */}
                    {/* <div className="flex items-center justify-between">
                        <span>SMS Notifications</span>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                checked={editedData.smsNotifications}
                                onChange={(e) =>
                                    handleSettingsChange(
                                        "smsNotifications",
                                        e.target.checked
                                    )
                                }
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                        </label>
                    </div> */}

                    {/* Language Selection */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {translate("language")}
                        </label>
                        <select
                            value={language}
                            onChange={(e) => {
                                setLanguage(e.target.value);
                                handleSettingsChange(
                                    "language",
                                    e.target.value
                                );
                            }}
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                                darkMode
                                    ? "bg-dark-card border-dark-border text-dark-text"
                                    : "bg-white"
                            }`}
                        >
                            <option value="english">English</option>
                            <option value="spanish">Español</option>
                            <option value="french">Français</option>
                            <option value="hindi">हिंदी</option>
                        </select>
                    </div>

                    {/* Currency Selection */}
                    <div>
                        <label className="block text-sm font-medium mb-1">
                            {translate("currency")}
                        </label>
                        <select
                            value={currency}
                            onChange={(e) => {
                                setCurrency(e.target.value);
                                handleSettingsChange(
                                    "currency",
                                    e.target.value
                                );
                            }}
                            className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                                darkMode
                                    ? "bg-dark-card border-dark-border text-dark-text"
                                    : "bg-white"
                            }`}
                        >
                            <option value="usd">USD ($)</option>
                            <option value="eur">EUR (€)</option>
                            <option value="gbp">GBP (£)</option>
                            <option value="inr">INR (₹)</option>
                        </select>
                    </div>

                    {/* Privacy Settings Section */}
                    <div className="mt-8">
                        <h4 className="text-lg font-semibold mb-4">
                            Privacy Settings
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Who can see my profile
                                </label>
                                <select
                                    value={
                                        editedData.profilePrivacy || "everyone"
                                    }
                                    onChange={(e) =>
                                        handleSettingsChange(
                                            "profilePrivacy",
                                            e.target.value
                                        )
                                    }
                                    className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                                        darkMode
                                            ? "bg-dark-card border-dark-border text-dark-text"
                                            : "bg-white"
                                    }`}
                                >
                                    <option value="everyone">Everyone</option>
                                    <option value="contacts">
                                        Contacts Only
                                    </option>
                                    <option value="private">Private</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Security Settings Section */}
                    <div className="mt-8">
                        <h4 className="text-lg font-semibold mb-4">
                            Security Settings
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span>Two-Factor Authentication</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={editedData.twoFactorAuth}
                                        onChange={(e) =>
                                            handleSettingsChange(
                                                "twoFactorAuth",
                                                e.target.checked
                                            )
                                        }
                                    />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Save Button */}
            {settingsChanged && (
                <div className="flex justify-end mt-6">
                    <button
                        onClick={handleSettingsSave}
                        className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                    >
                        <FaSave />
                        <span>{translate("save")}</span>
                    </button>
                </div>
            )}
        </div>
    );

    // Add a cleanup effect to handle user logout
    useEffect(() => {
        const handleStorageChange = (e) => {
            if (e.key === "userEmail" && !e.newValue) {
                // User logged out, clear the current state
                setUserData({
                    name: "",
                    email: "",
                    phone: "",
                    address: "",
                    license: "",
                    joinDate: new Date().toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                    }),
                    emailNotifications: false,
                    smsNotifications: false,
                    darkMode: false,
                    profileVisibility: false,
                    activityStatus: false,
                    language: "english",
                    currency: "usd",
                });
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    return (
        <div
            className={`min-h-screen ${
                darkMode ? "bg-dark text-dark-text" : "bg-gray-50 text-gray-900"
            }`}
        >
            <div className="fixed top-0 left-0 right-0 z-10">
                <Navbar />
            </div>
            <div className="max-w-7xl mx-auto px-4 py-8 mt-24">
                {/* Profile Header */}
                <div
                    className={`rounded-lg shadow-lg p-6 mb-8 ${
                        darkMode ? "bg-dark-lighter text-dark-text" : "bg-white"
                    }`}
                >
                    <div className="flex items-center space-x-6">
                        <div className="w-24 h-24 bg-emerald-600 rounded-full flex items-center justify-center">
                            <span className="text-4xl text-white font-bold">
                                {userData.name ? userData.name.charAt(0) : "?"}
                            </span>
                        </div>
                        <div>
                            <h1
                                className={`text-2xl font-bold ${
                                    darkMode
                                        ? "text-dark-text"
                                        : "text-gray-900"
                                }`}
                            >
                                {userData.name || "Your Name"}
                            </h1>
                            <p
                                className={
                                    darkMode
                                        ? "text-dark-muted"
                                        : "text-gray-600"
                                }
                            >
                                Member since {userData.joinDate}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Profile Navigation */}
                <div
                    className={`${
                        darkMode ? "bg-dark-lighter" : "bg-white"
                    } rounded-lg shadow-lg overflow-hidden mb-8`}
                >
                    <div className="flex border-b border-gray-200 dark:border-dark-border">
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
                                            {translate("fullName")}
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
                                                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                                                    darkMode
                                                        ? "bg-dark-card border-dark-border text-dark-text"
                                                        : "bg-white"
                                                }`}
                                            />
                                        ) : (
                                            <p
                                                className={
                                                    darkMode
                                                        ? "text-dark-text"
                                                        : "text-gray-900"
                                                }
                                            >
                                                {userData.name || "Not set"}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <FaEnvelope className="text-emerald-600 text-xl" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">
                                            {translate("email")}
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
                                                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                                                    darkMode
                                                        ? "bg-dark-card border-dark-border text-dark-text"
                                                        : "bg-white"
                                                }`}
                                            />
                                        ) : (
                                            <p
                                                className={
                                                    darkMode
                                                        ? "text-dark-text"
                                                        : "text-gray-900"
                                                }
                                            >
                                                {userData.email || "Not set"}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <FaPhone className="text-emerald-600 text-xl" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">
                                            {translate("phone")}
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
                                                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                                                    darkMode
                                                        ? "bg-dark-card border-dark-border text-dark-text"
                                                        : "bg-white"
                                                }`}
                                            />
                                        ) : (
                                            <p
                                                className={
                                                    darkMode
                                                        ? "text-dark-text"
                                                        : "text-gray-900"
                                                }
                                            >
                                                {userData.phone || "Not set"}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <FaMapMarkerAlt className="text-emerald-600 text-xl" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">
                                            {translate("address")}
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
                                                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                                                    darkMode
                                                        ? "bg-dark-card border-dark-border text-dark-text"
                                                        : "bg-white"
                                                }`}
                                            />
                                        ) : (
                                            <p
                                                className={
                                                    darkMode
                                                        ? "text-dark-text"
                                                        : "text-gray-900"
                                                }
                                            >
                                                {userData.address || "Not set"}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <FaIdCard className="text-emerald-600 text-xl" />
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-500">
                                            {translate("driversLicense")}
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
                                                className={`w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${
                                                    darkMode
                                                        ? "bg-dark-card border-dark-border text-dark-text"
                                                        : "bg-white"
                                                }`}
                                            />
                                        ) : (
                                            <p
                                                className={
                                                    darkMode
                                                        ? "text-dark-text"
                                                        : "text-gray-900"
                                                }
                                            >
                                                {userData.license || "Not set"}
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
                                                <span>
                                                    {translate("cancel")}
                                                </span>
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                                            >
                                                <FaSave />
                                                <span>
                                                    {translate("saveChanges")}
                                                </span>
                                            </button>
                                        </>
                                    ) : (
                                        <Button
                                            buttonType="edit"
                                            onClick={handleEdit}
                                        >
                                            {translate("editProfile")}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === "rentals" && (
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold">
                                        {translate("totalRentals")}:{" "}
                                        {rentalHistory.length - 1}
                                    </h3>
                                    <button
                                        onClick={() =>
                                            setShowAllRentals(!showAllRentals)
                                        }
                                        className="text-emerald-600 hover:text-emerald-700"
                                    >
                                        {showAllRentals
                                            ? translate("showLess")
                                            : translate("viewAll")}
                                    </button>
                                </div>
                                {rentalHistory.length === 0 ? (
                                    <p>{translate("noBookings")}</p>
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
                                                            {translate(
                                                                "startDate"
                                                            )}
                                                            :
                                                        </span>{" "}
                                                        {rental.startDate}
                                                    </p>
                                                    <p className="text-gray-700">
                                                        <span className="font-semibold">
                                                            {translate(
                                                                "endDate"
                                                            )}
                                                            :
                                                        </span>{" "}
                                                        {rental.endDate}
                                                    </p>
                                                    <p className="text-gray-700">
                                                        <span className="font-semibold">
                                                            {translate(
                                                                "totalPrice"
                                                            )}
                                                            :
                                                        </span>{" "}
                                                        {formatCurrency(
                                                            rental.totalPrice
                                                        )}
                                                    </p>
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {activeTab === "preferences" && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">
                                        {translate("preferredVehicles")}
                                    </h3>
                                    <div className="space-y-3">
                                        {preferredCars.length > 0 ? (
                                            preferredCars.map((car, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center space-x-3"
                                                >
                                                    <FaCar className="text-emerald-600" />
                                                    <span>{car}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">
                                                {translate("noBookings")}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">
                                        {translate("notificationPreferences")}
                                    </h3>
                                    <div className="space-y-4">
                                        {/* Email Notifications Toggle */}
                                        <div className="flex items-center justify-between">
                                            <span>
                                                {translate(
                                                    "emailNotifications"
                                                )}
                                            </span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={
                                                        editedData.emailNotifications
                                                    }
                                                    onChange={(e) => {
                                                        handlePreferencesChange(
                                                            "emailNotifications",
                                                            e.target.checked
                                                        );
                                                        setPreferencesChanged(
                                                            true
                                                        );
                                                    }}
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                            </label>
                                        </div>

                                        {/* SMS Notifications Toggle */}
                                        <div className="flex items-center justify-between">
                                            <span>
                                                {translate("smsNotifications")}
                                            </span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    className="sr-only peer"
                                                    checked={
                                                        editedData.smsNotifications
                                                    }
                                                    onChange={(e) => {
                                                        handlePreferencesChange(
                                                            "smsNotifications",
                                                            e.target.checked
                                                        );
                                                        setPreferencesChanged(
                                                            true
                                                        );
                                                    }}
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                {preferencesChanged && (
                                    <div className="flex justify-end">
                                        <button
                                            onClick={handlePreferencesSave}
                                            className="flex items-center space-x-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                                        >
                                            <FaSave />
                                            <span>
                                                {translate("saveChanges")}
                                            </span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === "payment" && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold">
                                        {translate("savedPaymentMethods")}
                                    </h3>
                                    <button
                                        onClick={() => setShowAddPayment(true)}
                                        className="text-emerald-600 hover:text-emerald-700"
                                    >
                                        {translate("addNew")}
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
                                                    {translate(
                                                        "cardholderName"
                                                    )}
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
                                                    {translate("cardNumber")}
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
                                                        {translate(
                                                            "expiryDate"
                                                        )}
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
                                                        {translate("cvv")}
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
                                                    {translate("cancel")}
                                                </button>
                                                <button
                                                    type="submit"
                                                    className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
                                                >
                                                    {translate("addNew")}
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
                                                        {translate("default")}
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
                                                        {translate(
                                                            "makeDefault"
                                                        )}
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() =>
                                                        handleRemovePayment(
                                                            method.id
                                                        )
                                                    }
                                                    className="text-red-600 hover:text-red-700 transition-colors ml-4"
                                                    title={translate("remove")}
                                                >
                                                    <FaTrash />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "settings" && renderSettingsTab()}
                    </div>
                </div>
            </div>

            {/* Fix notification toast */}
            {notificationVisible && notification && (
                <div
                    className={`fixed bottom-4 right-4 bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 z-[100] ${
                        notificationVisible
                            ? "translate-y-0 opacity-100"
                            : "translate-y-10 opacity-0"
                    }`}
                >
                    {notification}
                </div>
            )}
            <ChatBot />
        </div>
    );
};

export default Profile;





