import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders } from "../features/admin/adminSlice";
import Navbar from "../components/navBar";

export default function AdminDashboard() {
    const dispatch = useDispatch();
    const { orders, loading, error } = useSelector((state) => state.admin);

    const [filters, setFilters] = useState({
        studentId: "",
        schoolId: "",
        from: "",
        to: "",
    });

    useEffect(() => {
        dispatch(fetchAllOrders(filters));
    }, [dispatch, filters]);

    const handleChange = (e) =>
        setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));

    return (



        <>
            <div className="p-6 max-w-7xl mx-auto">
                <Navbar />

                <header className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
                    <p className="text-gray-600 mt-1">
                        Monitor and filter payment records of students.
                    </p>
                </header>

                {/* Filters */}
                <div className="bg-gray-50 p-4 rounded shadow mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {/* <input
                        type="text"
                        name="studentId"
                        value={filters.studentId}
                        onChange={handleChange}
                        placeholder="Filter by Student ID"
                        className="border p-2 rounded w-full focus:ring focus:ring-blue-200"
                    /> */}
                    {/* <input
                        type="text"
                        name="schoolId"
                        value={filters.schoolId}
                        onChange={handleChange}
                        placeholder="Filter by School ID"
                        className="border p-2 rounded w-full focus:ring focus:ring-blue-200"
                    /> */}
                    <input
                        type="date"
                        name="from"
                        value={filters.from}
                        onChange={handleChange}
                        className="border p-2 rounded w-full focus:ring focus:ring-blue-200"
                    />
                    <input
                        type="date"
                        name="to"
                        value={filters.to}
                        onChange={handleChange}
                        className="border p-2 rounded w-full focus:ring focus:ring-blue-200"
                    />
                </div>

                {loading && <p className="text-blue-600 mb-4">Loading...</p>}
                {error && <p className="text-red-600 mb-4">{error}</p>}


                <div className="overflow-x-auto rounded shadow">
                    <table className="min-w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200 text-gray-800">
                                <th className="border px-3 py-2 text-left">Student ID</th> {/* Added */}
                                <th className="border px-3 py-2 text-left">Student Name</th>
                                <th className="border px-3 py-2 text-left">Email</th>
                                <th className="border px-3 py-2 text-left">School ID</th>
                                <th className="border px-3 py-2 text-left">Trustee ID</th>
                                <th className="border px-3 py-2 text-left">Amount</th>
                                <th className="border px-3 py-2 text-left">Payment Mode</th>
                                <th className="border px-3 py-2 text-left">Status</th>
                                <th className="border px-3 py-2 text-left">Message</th>
                                <th className="border px-3 py-2 text-left">Payment Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders && orders.length > 0 ? (
                                orders.map((o) => (
                                    <tr
                                        key={o._id}
                                        className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                                    >
                                        <td className="border px-3 py-2">
                                            {o.collectId?.studentinfo?.id || "-"}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {o.collectId?.studentinfo?.name || "-"}
                                        </td>
                                        <td className="border px-3 py-2">
                                            {o.collectId?.studentinfo?.email || "-"}
                                        </td>
                                        <td className="border px-3 py-2">{o.collectId?.schoolid || "-"}</td>
                                        <td className="border px-3 py-2">{o.collectId?.trusteeid || "-"}</td>
                                        <td className="border px-3 py-2">{o.transactionAmount ?? "-"}</td>
                                        <td className="border px-3 py-2">{o.paymentMode || "-"}</td>
                                        <td className="border px-3 py-2">
                                            <span
                                                className={`px-2 py-1 rounded text-sm ${o.status === "success"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {o.status || "-"}
                                            </span>
                                        </td>
                                        <td className="border px-3 py-2">{o.paymentMessage || "-"}</td>
                                        <td className="border px-3 py-2">
                                            {o.paymentTime
                                                ? new Date(o.paymentTime).toLocaleString()
                                                : "-"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="10"
                                        className="text-center py-4 text-gray-500 border"
                                    >
                                        No records found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
}
