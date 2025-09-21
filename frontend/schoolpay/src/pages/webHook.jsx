import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/navBar";

export default function WebhookForm() {
    const [orderId, setOrderId] = useState("");
    const [event, setEvent] = useState("payment.succeeded");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("success");
    const [result, setResult] = useState(null);

    const submitForm = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post("/webhook/payment", {
                orderId,
                event,
                status,
                message,
            });
            setResult(data);
        } catch (err) {
            console.error(err);
            setResult({ error: err.response?.data?.message || err.message });
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow">
            <Navbar />

            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Make Payment
            </h1>

            <form onSubmit={submitForm} className="space-y-5">

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Add Your Order ID
                    </label>
                    <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="Enter Order ID"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Event
                    </label>
                    <input
                        type="text"
                        value={event}
                        onChange={(e) => setEvent(e.target.value)}
                        placeholder="e.g., payment.captured"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                    </label>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter message"
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                    </label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="success">Success</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>


                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
                >
                    Send Payment Information
                </button>
            </form>


           
        </div>

    );
}
