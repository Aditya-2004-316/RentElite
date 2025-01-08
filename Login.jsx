import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Navigating to dashboard...");
        navigate("/dashboard");
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSignUp = () => {
        navigate("/signup");
    };

    return (
        <div className="flex min-h-screen">
            {/* Left section - modified */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-blue-500 to-indigo-800">
                <div className="flex items-center justify-center w-full px-8">
                    <div className="flex items-center -gap-6">
                        <img
                            src={logo}
                            alt="Rent Elite Logo"
                            className="w-full h-full max-w-[160px] max-h-[160px] object-cover"
                        />
                        <h1 className="text-5xl font-bold text-white">
                            Rent Elite
                        </h1>
                    </div>
                </div>
            </div>

            {/* Right section - keep exactly the same */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-900">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Welcome Back
                        </h2>
                        <p className="text-gray-400">
                            Please sign in to continue
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 font-semibold mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white 
                                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 
                                         transition-colors placeholder-gray-500"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-gray-300 font-semibold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white 
                                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 
                                         transition-colors placeholder-gray-500"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="remember"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-700 rounded bg-gray-800"
                                />
                                <label
                                    htmlFor="remember"
                                    className="ml-2 block text-gray-300"
                                >
                                    Remember me
                                </label>
                            </div>
                            <div>
                                <button
                                    onClick={() => navigate("/forgot-password")}
                                    className="text-indigo-400 hover:text-indigo-300 text-sm"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 
                                     transition-colors duration-300 font-semibold"
                        >
                            Sign In
                        </button>

                        <div className="text-center mt-4">
                            <span className="text-gray-400">
                                Don't have an account?{" "}
                            </span>
                            <button
                                onClick={handleSignUp}
                                className="text-indigo-400 hover:text-indigo-300 font-semibold"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;


