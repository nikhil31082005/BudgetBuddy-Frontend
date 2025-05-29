import React, { useState } from "react";
import { useLocation, useNavigate, Link  } from "react-router-dom"; // Import useLocation
import axios from 'axios';


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    const credentials = {
      email,
      password,
    };
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, credentials, {
        withCredentials: true, // Important: include this to allow cookies
      });
  
      const { token, data }= response;
      // console.log("hii",data);
  
      if (response.status === 200) {
        onLogin(response.data.user);
        navigate('/');
        // console.log("Login successful", data);
      }
    } 
    catch (err) {
      if (err.response) {
        setError(err.response.data.message || "Login failed");
      } 
      else if (err.request) {
        console.log(err.request);
        setError("No response from the server. Please try again.");
      } 
      else {
        console.log(err.message);
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/30 z-50">
      <div className="bg-transparent p-8 rounded-xl shadow-lg backdrop-blur-md w-96">
        <form onSubmit={handleLogin}>
          <div>
            <h2 className="text-white mb-2">Email</h2>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded-md mb-4 bg-white/20 text-white placeholder-white/60 outline-none"
            />
          </div>
          <div>
            <h2 className="text-white mb-2">Password</h2>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded-md mb-4 bg-white/20 text-white placeholder-white/60 outline-none"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full p-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
            >
              Login
            </button>
          </div>
          <Link to="/">
            <button
              type="button"
              className="mt-2 w-full p-2 rounded-md bg-red-500 hover:bg-red-700 text-white"
            >
              Go back
            </button>
          </Link>
        </form>
        {error && <p className="text-red-500 mb-4">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
