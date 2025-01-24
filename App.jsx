import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login"; // Ensure this import matches your file structure
import SignUp from "./components/SignUp"; // Import the SignUp component
import ForgotPassword from "./components/ForgotPassword"; // Import the ForgotPassword component
import Dashboard from "./components/Dashboard"; // Import the Dashboard component
import Profile from "./components/Profile";
import { BookingProvider } from "./context/BookingContext";
import MyBookings from "./components/MyBookings";
import PrivacyPolicy from "./components/PrivacyPolicy"; // Import the PrivacyPolicy component
import TermsOfService from "./components/TermsOfService";
import ContactUs from "./components/ContactUs"; // Import the TermsOfService component
import AboutUs from "./components/AboutUs";
import FAQs from "./components/FAQs";
import Support from "./components/Support";

const App = () => {
    return (
        <BookingProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />{" "}
                    {/* Set Login as the default route */}
                    <Route path="/signup" element={<SignUp />} />{" "}
                    {/* Add SignUp route */}
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />{" "}
                    {/* Add Forgot Password route */}
                    <Route path="/dashboard" element={<Dashboard />} />{" "}
                    {/* Add Dashboard route */}
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/my-bookings" element={<MyBookings />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route
                        path="/terms-of-service"
                        element={<TermsOfService />}
                    />
                    <Route path="/contact-us" element={<ContactUs />} />
                    <Route path="/about-us" element={<AboutUs />} />
                    <Route path="/faqs" element={<FAQs />} />
                    <Route path="/support" element={<Support />} />
                </Routes>
            </Router>
        </BookingProvider>
    );
};

export default App;




