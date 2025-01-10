import { useState, useEffect } from "react";
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
        // Here you would typically make an API call to save the new payment method
        setShowAddPayment(false);
        setNewPayment({
            cardNumber: "",
            expiryDate: "",
            cvv: "",
            cardholderName: "",
        });
    };

    // Update the rental history state
    const [rentalHistory, setRentalHistory] = useState(() => {
        const savedRentals = localStorage.getItem("rentalHistory");
        return savedRentals ? JSON.parse(savedRentals) : [];
    });

    // Add useEffect to keep rental history updated
    useEffect(() => {
        const handleStorageChange = () => {
            const savedRentals = localStorage.getItem("rentalHistory");
            if (savedRentals) {
                setRentalHistory(JSON.parse(savedRentals));
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

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
                                        Total Rentals: {rentalHistory.length}
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
                                <div className="space-y-4">
                                    {rentalHistory
                                        .slice(
                                            0,
                                            showAllRentals
                                                ? rentalHistory.length
                                                : 2
                                        )
                                        .map((rental) => (
                                            <div
                                                key={rental.id}
                                                className="border rounded-lg p-4"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h4 className="font-semibold">
                                                            {rental.carName}
                                                        </h4>
                                                        <p className="text-sm text-gray-500">
                                                            Rented:{" "}
                                                            {rental.dates}
                                                        </p>
                                                        <p className="text-sm text-gray-500">
                                                            Price: $
                                                            {rental.price}/day
                                                        </p>
                                                    </div>
                                                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                                        {rental.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        )}

                        {activeTab === "preferences" && (
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">
                                        Preferred Vehicles
                                    </h3>
                                    <div className="space-y-3">
                                        {userData.preferredCars.map(
                                            (car, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center space-x-3"
                                                >
                                                    <FaCar className="text-emerald-600" />
                                                    <span>{car}</span>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">
                                        Notification Preferences
                                    </h3>
                                    <div className="space-y-3">
                                        <label className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox text-emerald-600"
                                                checked
                                            />
                                            <span>Email notifications</span>
                                        </label>
                                        <label className="flex items-center space-x-3">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox text-emerald-600"
                                                checked
                                            />
                                            <span>SMS notifications</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
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
                                                        onChange={(e) =>
                                                            setNewPayment(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    expiryDate:
                                                                        e.target
                                                                            .value,
                                                                })
                                                            )
                                                        }
                                                        className="w-full p-2 border rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                                        placeholder="MM/YY"
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
                                    <div className="border rounded-lg p-4 flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <FaCreditCard className="text-emerald-600 text-2xl" />
                                            <div>
                                                <p className="font-semibold">
                                                    Visa ending in 4242
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Expires 12/25
                                                </p>
                                            </div>
                                        </div>
                                        <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded">
                                            Default
                                        </span>
                                    </div>
                                    <div className="border rounded-lg p-4 flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <FaCreditCard className="text-emerald-600 text-2xl" />
                                            <div>
                                                <p className="font-semibold">
                                                    Mastercard ending in 8888
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    Expires 09/24
                                                </p>
                                            </div>
                                        </div>
                                        <button className="text-gray-500 hover:text-gray-700">
                                            Make Default
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
