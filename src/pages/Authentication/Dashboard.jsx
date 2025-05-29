import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import About from "../../components/About";
import Home from "../../components/Home";
import Services from "../../components/Services";
import Contact from "../../components/Contact";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Dashboard({ user, setUser, onSession }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchDashboard = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
        withCredentials: true,
      });
    

      // console.log(response);


      setDashboardData(response.data); // Save the dashboard data to state
      // console.log("Dashboard data:", response.data);
      onSession(response.data);
    } 
    catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.error("Unauthorized: Redirecting to login");
          navigate("/"); // Redirect to login if not authorized
        } 
        else {
          setError("An error occurred while fetching the dashboard. Please try again later.");
          console.error("Error fetching dashboard", error.response.data);
        }
      } 
      else {
        setError("Network error. Please check your connection.");
        console.error("Error fetching dashboard", error.message);
      }
    }
    
  };

  // useEffect(() => {
  //   // console.log("Updated dashboard data:", dashboardData);
  // }, [dashboardData]);

  // Fetch dashboard data when the component mounts
  useEffect(() => {
    fetchDashboard();
  }, []);
  // In Dashboard.js, right before the return statement
  // console.log("Dashboard props:", { user, setUser });

  return (
    <>
      <div className="scroll-smooth">
      <Header user={user} setUser={setUser} />
        <hr className="h-1" />
        <Home />
        <hr className="h-1" />
        <About />
        <hr className="h-1" />
        <Services />
        <hr className="h-1" />
        <Contact />
        <hr className="h-1" />
        <Footer />
      </div>
    </>
  );
}

export default Dashboard;
