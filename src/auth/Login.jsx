import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from '../utils/baseUrl.js';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        `${API_URL}/auth/login`,
        { email, password }
      );
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-sm sm:max-w-md">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4">Login</h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 text-sm sm:text-base">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm sm:text-base">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition text-sm sm:text-base"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate("/register")}
            className="cursor-pointer w-full border border-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-100 transition text-sm sm:text-base"
          >
            Don't have an account? <span className="underline text-blue-700">Register</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
