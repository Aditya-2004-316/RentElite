import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login"; // Ensure this import matches your file structure
import SignUp from "./components/SignUp"; // Import the SignUp component
import ForgotPassword from "./components/ForgotPassword"; // Import the ForgotPassword component
import Dashboard from "./components/Dashboard"; // Import the Dashboard component
import Profile from "./components/Profile";
import { BookingProvider } from "./context/BookingContext";
import MyBookings from "./components/MyBookings";

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
                </Routes>
            </Router>
        </BookingProvider>
    );
};

export default App;



