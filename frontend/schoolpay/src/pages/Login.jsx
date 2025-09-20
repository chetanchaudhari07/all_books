import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useNavigate , Link } from 'react-router-dom';


function Login() {
    const [form, setForm] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const { user } = useSelector((s) => s.auth);

    useEffect(() => {

        if (!user) return;

        if (user.role === "student") navigate("/student");
        if (user.role === "admin") navigate("/admin-dashboard");
    }, [user, navigate]);


    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(form));
    };


    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                        Sign in to your account
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-gray-800"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 disabled:opacity-50 transition"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                         <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet?{" "}
                            <Link
                                to="/register"
                                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                            >
                                Register
                            </Link>
                        </p>
                    </form>

                    {error && (
                        <p className="mt-4 text-center text-sm text-red-600">{error}</p>
                    )}
                </div>
            </div>
        </>

    )
}

export default Login