import { Outlet, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import LoginModal from "../components/LoginModal";

const Layout = () => {
  // state variables
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // handle profile click
  const handleProfileClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowLoginModal(true);
    }
  };

  return (
    <>
      <nav className="bg-blue-600 p-4">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left section: App name and links */}
          <div className="flex items-center space-x-8">
            <div className="text-white text-lg font-bold">
              <Link to="/">ACM@UIC Minigames</Link>
            </div>
            <ul className="flex space-x-2">
              <li className="text-white hover:text-gray-200">
                <Link to="/all-games">All Minigames</Link>
              </li>
              <li className="text-white hover:text-gray-200">
                <Link to="/contributors">Contributors</Link>
              </li>
            </ul>
          </div>

          {/* Right section: Profile icon & Sign in button */}
          <div className="flex items-center space-x-4">
            <div className="text-white hover:text-gray-200">
              {/* If user is not logged in, show profile icon */}
              {!isLoggedIn && (
                <div onClick={handleProfileClick} className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
      {/* Login modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default Layout;
