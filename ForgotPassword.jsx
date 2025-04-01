import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";
import logo from "../assets/logo.png";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/forgot-password",
                { email }
            );

            if (response.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate("/login");
                }, 3000); // Redirect after 3 seconds
            }
        } catch (err) {
            setError(
                err.response?.data?.message ||
                    "Failed to send reset email. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50 py-12 px-4 sm:px-6 lg:px-8">
            {/* Logo and Website Name */}
            <div className="flex items-center justify-center space-x-4 mb-8">
                <img src={logo} alt="RentElite Logo" className="h-16 w-auto" />
                <h1 className="text-4xl font-bold text-emerald-600">
                    RentElite
                </h1>
            </div>

            {/* Main Content */}
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900">
                        Reset your password
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Enter your email address and we'll send you a link to
                        reset your password.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-red-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {success && (
                    <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg
                                    className="h-5 w-5 text-green-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-green-700">
                                    Password reset instructions have been sent
                                    to your email. Redirecting to login page...
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaEnvelope className="h-5 w-5 text-emerald-500" />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="pl-10 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:z-10 sm:text-sm"
                            placeholder="Enter your email address"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <Link
                            to="/login"
                            className="text-sm font-medium text-emerald-600 hover:text-emerald-500 transition-colors duration-200"
                        >
                            Back to login
                        </Link>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-colors duration-200 ${
                                isLoading
                                    ? "bg-emerald-400 cursor-not-allowed"
                                    : "bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                            }`}
                        >
                            {isLoading ? (
                                <span className="flex items-center">
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Sending...
                                </span>
                            ) : (
                                "Send Reset Link"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
