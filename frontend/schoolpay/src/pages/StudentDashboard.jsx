import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder, clearMessages } from "../features/orders/orderSlice";
import Navbar from "../components/navBar";

export default function StudentDashboard() {
    const [schoolid, setSchoolid] = useState("");
    const [trusteeid, setTrusteeid] = useState("");
    const [gatewayName, setGatewayName] = useState("razorpay");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, successMessage, orders } = useSelector(
        (state) => state.orders
    );


    useEffect(() => {
        console.log("successMessage:", successMessage);
        console.log("orders:", orders);
        if (successMessage && orders.length > 0) {
            const lastOrder = orders[orders.length - 1];
            localStorage.setItem("currentOrderId", lastOrder._id);
            console.log("lastOrder:", lastOrder);
            navigate(`/order-status/${lastOrder._id}`);
            dispatch(clearMessages());
        }
    }, [successMessage, orders, navigate, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createOrder({ schoolid, trusteeid, gatewayName }));
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow">
            <Navbar />

            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Create Order
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
                
                <div>
                    <label
                        htmlFor="schoolid"
                        className="block mb-1 text-sm font-medium text-gray-700"
                    >
                        School ID
                    </label>
                    <input
                        id="schoolid"
                        type="text"
                        placeholder="Enter School ID"
                        value={schoolid}
                        onChange={(e) => setSchoolid(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

               
                <div>
                    <label
                        htmlFor="trusteeid"
                        className="block mb-1 text-sm font-medium text-gray-700"
                    >
                        Trustee ID
                    </label>
                    <input
                        id="trusteeid"
                        type="text"
                        placeholder="Enter Trustee ID"
                        value={trusteeid}
                        onChange={(e) => setTrusteeid(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                    />
                </div>

               
                <div>
                    <label
                        htmlFor="gatewayName"
                        className="block mb-1 text-sm font-medium text-gray-700"
                    >
                        Payment Method
                    </label>
                    <input
                        id="gatewayName"
                        type="text"
                        placeholder="e.g. UPI, Card, NetBanking"
                        value={gatewayName}
                        onChange={(e) => setGatewayName(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>

                
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-60"
                >
                    {loading ? "Creating..." : "Create Order"}
                </button>

                {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
            </form>
        </div>

    );
}
