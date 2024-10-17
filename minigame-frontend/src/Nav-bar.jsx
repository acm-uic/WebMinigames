// Nav-bar.jsx
import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left section: App name and links */}
        <div className="flex items-center space-x-8">
          <div className="text-white text-lg font-bold">
            <Link to="/home">ACM@UIC Minigames</Link>
          </div>
          <ul className="flex space-x-1">
            <li className="text-white hover:text-gray-200">
              <Link to="/all-games">All Minigames</Link>
            </li>
          </ul>
        </div>

        {/* Right section: Profile icon */}
        <div className="flex items-center">
          <Link to="/profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 text-white cursor-pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
