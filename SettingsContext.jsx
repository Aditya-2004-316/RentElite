import React, { createContext, useState, useContext, useEffect } from "react";

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    // Initialize state from localStorage or defaults
    const [darkMode, setDarkMode] = useState(() => {
        const saved = localStorage.getItem("darkMode");
        return saved ? JSON.parse(saved) : false;
    });

    const [currency, setCurrency] = useState(() => {
        const saved = localStorage.getItem("currency");
        return saved || "usd";
    });

    const [language, setLanguage] = useState(() => {
        const saved = localStorage.getItem("language");
        return saved || "english";
    });

    // Save dark mode preference to localStorage
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        // Save to localStorage
        localStorage.setItem("darkMode", darkMode);
    }, [darkMode]);

    useEffect(() => {
        localStorage.setItem("currency", currency);
    }, [currency]);

    useEffect(() => {
        localStorage.setItem("language", language);
        document.documentElement.lang = language;
    }, [language]);

    // Update conversion rates (using approximate rates)
    const conversionRates = {
        usd: 1,
        eur: 0.85,
        gbp: 0.73,
        inr: 87.0, // Indian Rupee conversion rate
    };

    // Update currency symbols
    const symbols = {
        usd: "$",
        eur: "€",
        gbp: "£",
        inr: "₹",
    };

    // Update the formatCurrency function to handle Indian Rupees formatting
    const formatCurrency = (amount) => {
        const convertedAmount = amount * conversionRates[currency];

        if (currency === "inr") {
            // Indian number formatting (e.g., 1,00,000)
            return `₹${convertedAmount.toLocaleString("en-IN")}`;
        }

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency.toUpperCase(),
            currencyDisplay: "symbol",
        }).format(convertedAmount);
    };

    // Update the translations object
    const translations = {
        english: {
            // Profile Page Tabs
            personalInfo: "Personal Info",
            rentalHistory: "Rental History",
            preferences: "Preferences",
            paymentMethods: "Payment Methods",
            settings: "Settings",

            // Profile Page Content
            fullName: "Full Name",
            email: "Email",
            phone: "Phone",
            address: "Address",
            driversLicense: "Driver's License",
            joinDate: "Member since",
            editProfile: "Edit Profile",
            saveChanges: "Save Changes",
            cancel: "Cancel",

            // Rental History
            totalRentals: "Total Rentals",
            viewAll: "View All",
            showLess: "Show Less",
            startDate: "Start Date",
            endDate: "End Date",
            totalPrice: "Total Price",
            cancelBooking: "Cancel Booking",
            noBookings: "No bookings found",

            // Preferences
            preferredVehicles: "Preferred Vehicles",
            notificationPreferences: "Notification Preferences",
            emailNotifications: "Email Notifications",
            smsNotifications: "SMS Notifications",

            // Payment Methods
            savedPaymentMethods: "Saved Payment Methods",
            addNew: "Add New",
            cardholderName: "Cardholder Name",
            cardNumber: "Card Number",
            expiryDate: "Expiry Date",
            cvv: "CVV",

            // Settings
            darkMode: "Dark Mode",
            language: "Language",
            currency: "Currency",
            profileVisibility: "Profile Visibility",
            activityStatus: "Show Activity Status",

            // Navigation
            dashboard: "Dashboard",
            myBookings: "My Bookings",
            favourites: "Favourites",
            profile: "Profile",
            logout: "Logout",

            // Dashboard Sections
            premiumFleet: "Premium Fleet",
            latestAdditions: "Latest Additions",
            classicCollection: "Classic Collection",
            bookNow: "Book Now",
            noVehicles: "No vehicles available",

            // Footer
            contactUs: "Contact Us",
            support: "Support",
            privacyPolicy: "Privacy Policy",
            termsOfService: "Terms of Service",

            // Common
            save: "Save",
            remove: "Remove",
            default: "Default",
            makeDefault: "Make Default",
        },
        spanish: {
            // Same structure as English but with Spanish translations
            personalInfo: "Información Personal",
            rentalHistory: "Historial de Alquiler",
            preferences: "Preferencias",
            paymentMethods: "Métodos de Pago",
            settings: "Configuración",
            // ... add all other Spanish translations
        },
        french: {
            // Same structure as English but with French translations
            personalInfo: "Informations Personnelles",
            rentalHistory: "Historique des Locations",
            preferences: "Préférences",
            paymentMethods: "Moyens de Paiement",
            settings: "Paramètres",
            // ... add all other French translations
        },
        hindi: {
            // Profile Page Tabs
            personalInfo: "व्यक्तिगत जानकारी",
            rentalHistory: "किराये का इतिहास",
            preferences: "प्राथमिकताएं",
            paymentMethods: "भुगतान विधियां",
            settings: "सेटिंग्स",

            // Profile Page Content
            fullName: "पूरा नाम",
            email: "ईमेल",
            phone: "फ़ोन",
            address: "पता",
            driversLicense: "ड्राइविंग लाइसेंस",
            joinDate: "सदस्यता तिथि",
            editProfile: "प्रोफ़ाइल संपादित करें",
            saveChanges: "परिवर्तन सहेजें",
            cancel: "रद्द करें",

            // Rental History
            totalRentals: "कुल किराये",
            viewAll: "सभी देखें",
            showLess: "कम देखें",
            startDate: "आरंभ तिथि",
            endDate: "समाप्ति तिथि",
            totalPrice: "कुल कीमत",
            cancelBooking: "बुकिंग रद्द करें",
            noBookings: "कोई बुकिंग नहीं मिली",

            // Preferences
            preferredVehicles: "पसंदीदा वाहन",
            notificationPreferences: "सूचना प्राथमिकताएं",
            emailNotifications: "ईमेल सूचनाएं",
            smsNotifications: "एसएमएस सूचनाएं",

            // Payment Methods
            savedPaymentMethods: "सहेजी गई भुगतान विधियां",
            addNew: "नया जोड़ें",
            cardholderName: "कार्डधारक का नाम",
            cardNumber: "कार्ड नंबर",
            expiryDate: "समाप्ति तिथि",
            cvv: "सीवीवी",

            // Settings
            darkMode: "डार्क मोड",
            language: "भाषा",
            currency: "मुद्रा",
            profileVisibility: "प्रोफ़ाइल दृश्यता",
            activityStatus: "गतिविधि स्थिति दिखाएं",

            // Navigation
            dashboard: "डैशबोर्ड",
            myBookings: "मेरी बुकिंग",
            favourites: "पसंदीदा",
            profile: "प्रोफ़ाइल",
            logout: "लॉग आउट",

            // Dashboard Sections
            premiumFleet: "प्रीमियम फ्लीट",
            latestAdditions: "नई कारें",
            classicCollection: "क्लासिक कलेक्शन",
            bookNow: "अभी बुक करें",
            noVehicles: "कोई वाहन उपलब्ध नहीं",

            // Footer
            contactUs: "संपर्क करें",
            support: "सहायता",
            privacyPolicy: "गोपनीयता नीति",
            termsOfService: "सेवा की शर्तें",
            companyInfo: "कंपनी की जानकारी",

            // Common
            save: "सहेजें",
            remove: "हटाएं",
            default: "डिफ़ॉल्ट",
            makeDefault: "डिफ़ॉल्ट बनाएं",

            // Chatbot translations
            chatbotWelcome:
                "नमस्ते! मैं आपका रेंट एलीट सहायक हूं। मैं आपकी कैसे मदद कर सकता हूं?",
            chatbotPlaceholder: "अपना संदेश यहां टाइप करें...",
            chatbotSend: "भेजें",
            chatbotClose: "चैट बंद करें",

            // Profile Page Section Headers
            personalInfoSection: "व्यक्तिगत जानकारी",
            rentalHistorySection: "किराये का इतिहास",
            preferencesSection: "प्राथमिकताएं",
            paymentMethodsSection: "भुगतान विधियां",
            settingsSection: "सेटिंग्स",

            // Rental History
            noRentals: "कोई किराया इतिहास नहीं",
            viewDetails: "विवरण देखें",
            rentedOn: "किराए की तिथि",
            returnedOn: "वापसी की तिथि",
            rentalDuration: "किराये की अवधि",
            rentalStatus: "किराये की स्थिति",

            // Preferences
            generalPreferences: "सामान्य प्राथमिकताएं",
            communicationPreferences: "संचार प्राथमिकताएं",
            privacyPreferences: "गोपनीयता प्राथमिकताएं",

            // Payment Methods
            addPaymentMethod: "भुगतान विधि जोड़ें",
            editPaymentMethod: "भुगतान विधि संपादित करें",
            deletePaymentMethod: "भुगतान विधि हटाएं",
            defaultPaymentMethod: "डिफ़ॉल्ट भुगतान विधि",

            // Settings
            accountSettings: "खाता सेटिंग्स",
            securitySettings: "सुरक्षा सेटिंग्स",
            notificationSettings: "सूचना सेटिंग्स",
        },
    };

    // Function to get translation
    const translate = (key) => {
        return (
            translations[language]?.[key] || translations.english[key] || key
        );
    };

    return (
        <SettingsContext.Provider
            value={{
                darkMode,
                setDarkMode,
                currency,
                setCurrency,
                language,
                setLanguage,
                formatCurrency,
                translate,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => useContext(SettingsContext);
