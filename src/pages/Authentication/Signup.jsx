import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Signup = ({ onSignIn }) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [jobType, setJobType] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    const credentials = { name, email, password, jobType };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, credentials, { withCredentials: true });
      const data = response.data;

      onSignIn(data.user);
      navigate("/");
      console.log("Signup successful", data);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Signup failed");
        console.log("Signup failed:", err.response.data);
      } else if (err.request) {
        console.error("No response from the server:", err.request);
        setError("No response from the server. Please try again.");
      } else {
        console.error("Error during signup:", err.message);
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50 w-full h-full">
      <div className="bg-white/10 p-6 rounded-xl shadow-lg backdrop-blur-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[35%] h-auto">
        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <h2 className="text-white text-lg mb-1">UserName</h2>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <h2 className="text-white text-lg mb-1">Email</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <h2 className="text-white text-lg mb-1">Password</h2>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <h2 className="text-white text-lg mb-1">Job Type</h2>
            <input
              type="text"
              placeholder="Your Job Type"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full p-3 rounded-md bg-white/20 text-white placeholder-white/60 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-blue-500 hover:bg-blue-700 text-white font-semibold transition"
            >
              Sign Up
            </button>
          </div>
          <Link to="/">
            <button
              type="button"
              className="w-full py-3 rounded-md bg-red-500 hover:bg-red-700 text-white font-semibold transition mt-2"
            >
              Go Back
            </button>
          </Link>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Signup;
