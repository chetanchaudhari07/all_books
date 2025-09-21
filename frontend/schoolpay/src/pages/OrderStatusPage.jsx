import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "../components/navBar";
import api from "../api/axios";

export default function OrderStatusPage() {
    const { orderId } = useParams();
    
    // const navigate = useNavigate();

    const [form, setForm] = useState({
        transactionAmount: "",
        paymentMode: "",
        paymentDetails: "",
        bankReference: "",
        paymentMessage: "",
    });

    const currentOrderId = localStorage.getItem("currentOrderId");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) =>
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));



    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await api.post(`orders/${currentOrderId}/status`, {
                collectId: currentOrderId,
                orderamount: form.transactionAmount,
                transactionAmount: form.transactionAmount,
                paymentMode: form.paymentMode,
                paymentDetails: form.paymentDetails,
                bankReference: form.bankReference,
                paymentMessage: form.paymentMessage,

            });
            alert("Payment details saved successfully! Please Copy Order ID for future reference.");
            setStatusId(res.data.orderStatus._id);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to save status");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
            <Navbar />

            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                Complete Payment Details
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

                <input
                    type="number"
                    name="transactionAmount"
                    value={form.transactionAmount}
                    onChange={handleChange}
                    placeholder="Transaction Amount"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />


                <select
                    name="paymentMode"
                    value={form.paymentMode}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                >
                    <option value="">Select Payment Mode</option>
                    <option value="UPI">UPI</option>
                    <option value="NetBanking">Net Banking</option>
                    <option value="Card">Card</option>
                </select>


                <input
                    name="paymentDetails"
                    value={form.paymentDetails}
                    onChange={handleChange}
                    placeholder="Payment Details"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />


                <input
                    name="bankReference"
                    value={form.bankReference}
                    onChange={handleChange}
                    placeholder="Bank Reference"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />


                <textarea
                    name="paymentMessage"
                    value={form.paymentMessage}
                    onChange={handleChange}
                    placeholder="Payment Message"
                    rows="3"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />


                {error && <p className="text-red-600 text-sm">{error}</p>}


                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-300"
                >
                    {loading ? "Saving..." : "Save Payment"}
                </button>


                {currentOrderId && (
                    <div className="mt-4 p-4 bg-gray-50 border rounded-lg">
                        <p className="text-gray-700">
                            <strong>Order ID:</strong> {currentOrderId}
                        </p>
                    </div>
                )}


                <div className="text-center mt-4">
                    <Link
                        to="/webhook"
                        className="text-blue-600 hover:underline text-sm font-medium"
                    >
                        Go to Webhook Page
                    </Link>
                </div>
            </form>
        </div>

    );
}
