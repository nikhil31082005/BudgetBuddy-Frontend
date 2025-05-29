import React from "react";
import { useNavigate, Link } from "react-router-dom";

function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signin");
  };

  const handleLogoutClick = async () => {
    try {
      const response = await fetch( `${import.meta.env.VITE_API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setUser(null);
        navigate("/login");
      } else {
        console.error("Failed to log out");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const gotoProfile = () => {
    navigate("/profile");
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 sticky top-0 w-full z-10">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo Section */}
        <a className="flex items-center space-x-2 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            BudgetBuddy
          </span>
        </a>

        {/* Hamburger Menu for Mobile */}
        <button
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-600"
          data-collapse-toggle="mobile-menu"
          aria-controls="mobile-menu"
          aria-expanded="false"
          onClick={() =>
            document
              .getElementById("mobile-menu")
              .classList.toggle("hidden")
          }
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <div
          className="hidden w-full md:flex md:items-center md:w-auto"
          id="navbar-default"
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 text-gray-700 dark:text-gray-300">
            <li>
              <a
                href="#home"
                className="block py-2 px-3 md:py-0 md:px-0 hover:text-blue-700 dark:hover:text-blue-500"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#about"
                className="block py-2 px-3 md:py-0 md:px-0 hover:text-blue-700 dark:hover:text-blue-500"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#services"
                className="block py-2 px-3 md:py-0 md:px-0 hover:text-blue-700 dark:hover:text-blue-500"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className="block py-2 px-3 md:py-0 md:px-0 hover:text-blue-700 dark:hover:text-blue-500"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* User Action Buttons */}
        <div className="hidden md:flex space-x-2">
          {user ? (
            <div className="flex items-center space-x-3">
              <Link to="/profile">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={gotoProfile}
                >
                  My Profile
                </button>
              </Link>
              <h2 className="text-gray-700 dark:text-white text-md font-semibold">
                {user.name}
              </h2>
              <button
                type="button"
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                onClick={handleLogoutClick}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-2">
              <Link to="/login">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
              </Link>
              <Link to="/signin">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={handleSignupClick}
                >
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="hidden md:hidden" id="mobile-menu">
        <ul className="flex flex-col p-4 space-y-2 bg-gray-100 rounded-lg dark:bg-gray-800">
          <li>
            <a
              href="#home"
              className="block py-2 px-3 text-gray-900 hover:bg-gray-200 rounded dark:text-white dark:hover:bg-gray-700"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className="block py-2 px-3 text-gray-900 hover:bg-gray-200 rounded dark:text-white dark:hover:bg-gray-700"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="block py-2 px-3 text-gray-900 hover:bg-gray-200 rounded dark:text-white dark:hover:bg-gray-700"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="block py-2 px-3 text-gray-900 hover:bg-gray-200 rounded dark:text-white dark:hover:bg-gray-700"
            >
              Contact
            </a>
          </li>
          {user ? (
            <>
              <li>
                <button
                  className="block w-full py-2 px-3 text-white bg-blue-700 hover:bg-blue-800 rounded dark:bg-blue-600 dark:hover:bg-blue-700"
                  onClick={gotoProfile}
                >
                  My Profile
                </button>
              </li>
              <li>
                <button
                  className="block w-full py-2 px-3 text-white bg-red-700 hover:bg-red-800 rounded dark:bg-red-600 dark:hover:bg-red-700"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <button
                  className="block w-full py-2 px-3 text-white bg-blue-700 hover:bg-blue-800 rounded dark:bg-blue-600 dark:hover:bg-blue-700"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
              </li>
              <li>
                <button
                  className="block w-full py-2 px-3 text-white bg-blue-700 hover:bg-blue-800 rounded dark:bg-blue-600 dark:hover:bg-blue-700"
                  onClick={handleSignupClick}
                >
                  Signup
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
