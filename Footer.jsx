import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import xtwitterIcon from "../assets/xtwitter.svg";
import facebookIcon from "../assets/facebook.png";
import twitterIcon from "../assets/twitter.png";
import instagramIcon from "../assets/instagram.png";
import linkedinIcon from "../assets/linkedin.png";

const Footer = () => {
    const location = useLocation();

    return (
        <footer className="bg-emerald-600 text-white py-8 mt-8 w-full">
            <div className="container mx-auto text-center px-4">
                <div className="flex flex-col md:flex-row justify-between items-start space-x-8 border-b border-gray-400 pb-4">
                    <div className="flex flex-col items-center md:items-start mb-4 md:mb-4 h-full justify-center mt-4 -ml-12">
                        <h4 className="text-lg font-bold mb-4">
                            Contact Information
                        </h4>
                        <p>Email : renteliteservice@gmail.com</p>
                        <p>Phone : (123) 456-7890</p>
                    </div>
                    <div className="flex flex-col items-center md:items-start mb-4 md:mb-4">
                        <h4 className="text-lg font-bold mb-4">
                            Rent Elite Policies
                        </h4>
                        <a
                            href="/privacy-policy"
                            className={`mx-2 mb-2 ${
                                location.pathname === "/privacy-policy"
                                    ? "text-black"
                                    : "text-white hover:text-black"
                            }`}
                        >
                            Privacy Policy
                        </a>
                        <a
                            href="/terms-of-service"
                            className={`mx-2 mb-2 ${
                                location.pathname === "/terms-of-service"
                                    ? "text-black"
                                    : "text-white hover:text-black"
                            }`}
                        >
                            Terms of Service
                        </a>
                        <a
                            href="/contact-us"
                            className={`mx-2 mb-2 ${
                                location.pathname === "/contact-us"
                                    ? "text-black"
                                    : "text-white hover:text-black"
                            }`}
                        >
                            Contact Us
                        </a>
                    </div>
                    <div className="flex flex-col items-center md:items-start mb-4 md:mb-4">
                        <h4 className="text-lg font-bold mb-4">
                            Support and Queries
                        </h4>
                        <a
                            href="/about-us"
                            className="text-white hover:text-black mx-10 mb-2"
                        >
                            About Us
                        </a>
                        <a
                            href="/faqs"
                            className="text-white hover:text-black mx-10 mb-2"
                        >
                            FAQs
                        </a>
                        <a
                            href="/support"
                            className="text-white hover:text-black mx-10 mb-2"
                        >
                            Support
                        </a>
                    </div>
                    <div className="flex flex-col items-center md:items-start mb-4 md:mb-0 h-full justify-center ml-12">
                        <h4 className="text-lg font-bold mb-4 mt-4 ml-8">
                            Follow Us
                        </h4>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.facebook.com"
                                className="relative text-white"
                            >
                                <FaFacebook
                                    size={24}
                                    className="default-icon"
                                />
                                <img
                                    src={facebookIcon}
                                    alt="Facebook Icon"
                                    className="hover-icon absolute top-0 left-0"
                                />
                            </a>
                            <a
                                href="https://www.twitter.com"
                                className="relative text-white"
                            >
                                <img
                                    src={xtwitterIcon}
                                    alt="xTwitter Icon"
                                    className="default-icon w-6 h-6 text-white filter-white"
                                />
                                {/* <FaTwitter size={24} className="default-icon" /> */}
                                <img
                                    src={twitterIcon}
                                    alt="Twitter Icon"
                                    className="hover-icon absolute top-0 left-0"
                                />
                                {/* <img
                                    src={xtwitterIcon}
                                    alt="xTwitter Icon"
                                    className="hover-icon absolute top-0 left-0"
                                /> */}
                            </a>
                            <a
                                href="https://www.instagram.com/rent_elite?igsh=Ym90amJtczJnMDll"
                                className="relative text-white"
                            >
                                <FaInstagram
                                    size={24}
                                    className="default-icon"
                                />
                                <img
                                    src={instagramIcon}
                                    alt="Instagram Icon"
                                    className="hover-icon absolute top-0 left-0"
                                />
                            </a>
                            <a
                                href="https://www.linkedin.com"
                                className="relative text-white"
                            >
                                <FaLinkedin
                                    size={24}
                                    className="default-icon"
                                />
                                <img
                                    src={linkedinIcon}
                                    alt="LinkedIn Icon"
                                    className="hover-icon absolute top-0 left-0"
                                />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-4 text-center">
                    &copy; {new Date().getFullYear()} Rent Elite. All rights
                    reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;



