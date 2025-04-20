import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import LoginModal from "../components/LoginModal";
import { UserContext } from "../domain/UserContext";

import logo from "../images/gglogo2.png";

const Layout = () => {
  // state variables
  const { isLoggedIn, username } = useContext(UserContext);
  const [showLoginModal, setShowLoginModal] = useState(false);

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
      <nav className="bg-blue-600 p-1 h-[60px] w-full">
        <div className="w-full h-full px-2 md:mx-auto flex justify-between items-center box-border">
          {/* Left section: App name and links */}
          <div className="flex items-center space-x-8 h-full">
            <Link to="/" className="h-full">
              <img className="h-full min-w-[130px]" src={logo} />
            </Link>
            <ul className="flex space-x-2">
              <li className="text-white hover:text-gray-200">
                <Link to="/all-games">All Minigames</Link>
              </li>
              <li className="text-white hover:text-gray-200 hidden md:block">
                <Link to="/contributors">Contributors</Link>
              </li>
            </ul>
          </div>

          {/* Right section: Profile icon & Sign in button */}
          <div className="flex flex-row items-center space-x-4 text-white">
            {isLoggedIn && <div>Hello {username}!</div>}
            <div className="hover:text-gray-200">
              {/* If user is not logged in, show profile icon */}
              {isLoggedIn ? (
                <Link to="/profile" className="text-white hover:text-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </Link>
              ) : (
                <div onClick={handleProfileClick} className="cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
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
      <footer className="bg-blue-600 p-1 h-[60px] w-full flex justify-center">
        <ul>
          <li className="text-black hover:text-gray-200">
            <Link to="/contributors">Contributors</Link>
          </li>
        </ul>
      </footer>
      {/* Login modal */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
};

export default Layout;
