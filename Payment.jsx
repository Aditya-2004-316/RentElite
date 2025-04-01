import { useState } from "react";
import { processPayment } from "../services/payment.service";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Payment = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className="text-3xl font-bold">Payment</h1>
                    {/* Payment form will go here */}
                </div>
            </div>
        </div>
    );
};

export default Payment;
