import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Placeholder for form submission logic
        console.log("Form submitted:", formData);

        // Simulate a successful submission
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });

        // Optionally reset success message after a delay
        setTimeout(() => setSuccess(false), 5000);
    };

    return (
        <div className="min-h-screen bg-emerald-50">
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
                    Contact Us
                </h2>

                <p className="text-lg text-center text-gray-600 mb-12">
                    We'd love to hear from you! Feel free to get in touch with
                    us using the form below.
                </p>

                <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-8">
                    {success && (
                        <div className="mb-6 text-green-600 text-center font-semibold">
                            Thank you for reaching out! We will get back to you
                            shortly.
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label
                                htmlFor="name"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-md p-3 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Enter your full name"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="email"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-md p-3 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Enter your email address"
                            />
                        </div>

                        <div className="mb-6">
                            <label
                                htmlFor="message"
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                className="w-full border rounded-md p-3 focus:ring-emerald-500 focus:border-emerald-500"
                                placeholder="Write your message here"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-emerald-600 text-white py-3 rounded-md text-lg font-semibold hover:bg-emerald-700 transition duration-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <p className="mb-4 mt-8 text-center text-gray-600">
                    If you have any questions, concerns, or feedback, please
                    feel free to reach out to us. We are here to help!
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default ContactUs;
