import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Ensure this path is correct

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your sign-up logic here (e.g., API call)
        console.log("User signed up:", formData);
        navigate("/"); // Redirect to login page after sign-up
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="flex min-h-screen">
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

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-900">
                <div className="w-full max-w-md">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-white mb-2">
                            Create an Account
                        </h2>
                        <p className="text-gray-400">
                            Please fill in the details to sign up
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 font-semibold mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white 
                                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 
                                         transition-colors placeholder-gray-500"
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

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

                        <div>
                            <label className="block text-gray-300 font-semibold mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white 
                                         focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 
                                         transition-colors placeholder-gray-500"
                                placeholder="Confirm your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 
                                     transition-colors duration-300 font-semibold"
                        >
                            Sign Up
                        </button>

                        <div className="text-center mt-4">
                            <span className="text-gray-400">
                                Already have an account?{" "}
                            </span>
                            <button
                                onClick={() => navigate("/")} // Navigate back to login
                                className="text-indigo-400 hover:text-indigo-300 font-semibold"
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
