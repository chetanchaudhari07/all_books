import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate , Link } from "react-router-dom";
import { registerUser } from "../features/auth/authSlice";



export default function Register() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        id: "",
    });


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const handleChnage = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        dispatch(registerUser(form));
    };



    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Create a New Account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            name="username"
                            placeholder="Username"
                            onChange={handleChnage}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
                        />

                        <input
                            name="name"
                            placeholder="Full Name"
                            onChange={handleChnage}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
                        />

                        <input
                            name="id"
                            placeholder="Student ID"
                            onChange={handleChnage}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChnage}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChnage}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition"
                        >
                            {loading ? "Registering..." : "Register"}
                        </button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account?{" "}
                            <Link
                                to="/"
                                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                            >
                                Login
                            </Link>
                        </p>
                    </form>

                    {error && (
                        <p className="mt-4 text-center text-sm text-red-600">{error}</p>
                    )}
                </div>
            </div>
        </>

    );







}