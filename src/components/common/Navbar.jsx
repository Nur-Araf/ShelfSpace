import { AuthContext } from "@/providers/AuthProvider";
import { useContext, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom"; // Make sure react-router-dom is installed

// make with cretancial true in axios

const Navbar = () => {
  const { singOut, user } = useContext(AuthContext);
  console.log(user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-black z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FaBars className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-between sm:items-stretch sm:justify-between">
            {/* Logo on the left for larger screens, on the right for mobile */}
            <div className="flex-shrink-0 text-white text-xl font-bold ">
              Logo
            </div>

            {/* Centered Navigation Items */}
            <div className="hidden sm:flex sm:ml-6 md:flex md:justify-center md:items-center flex-1">
              <div className="flex space-x-4">
                <NavLink
                  to="/"
                  className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  activeclassname="bg-blue-700"
                >
                  Home
                </NavLink>
                <NavLink
                  to="/about"
                  className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  activeclassname="bg-blue-700"
                >
                  About
                </NavLink>
                <NavLink
                  to="/services"
                  className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  activeclassname="bg-blue-700"
                >
                  Services
                </NavLink>
                <NavLink
                  to="/contact"
                  className="text-white hover:bg-blue-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  activeclassname="bg-blue-700"
                >
                  Contact
                </NavLink>
              </div>
            </div>

            {/* Right-aligned Sign In and Log In for larger screens */}
            <div className="hidden sm:flex space-x-4">
              {user ? (
                <>
                  <div className="relative inline-block group">
                    <img
                      src={user?.photoURL}
                      alt="profile"
                      className="w-10 h-10 rounded-full mr-4 cursor-pointer"
                    />
                    <span className="absolute w-52 bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 text-sm text-white bg-gray-800 border border-white p-2 rounded mt-2 z-50">
                      {user?.displayName}
                    </span>
                  </div>
                  <button
                    className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                    onClick={() => singOut()}
                  >
                    Log-out
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/sign-up"
                    className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium"
                    activeclassname="bg-blue-700"
                  >
                    Sign Up
                  </NavLink>
                  <NavLink
                    to="/log-in"
                    className="text-white bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md text-sm font-medium"
                    activeclassname="bg-gray-700"
                  >
                    Log In
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } fixed inset-0 bg-black sm:hidden transition-opacity duration-300 ease-in-out z-50 `}
        id="mobile-menu"
      >
        <div
          className={`${
            isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          } transform transition-all duration-300 ease-in-out px-2 pt-2 pb-3 space-y-1`}
        >
          <div className="flex justify-between items-center my-2">
            <div className="px-3 py-2">logo</div>
            <button onClick={toggleMenu} className="text-white">
              <FaTimes className="h-6 w-6" />
            </button>
          </div>
          <NavLink
            to="/"
            className="text-white hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            activeclassname="bg-blue-700"
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="text-white hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            activeclassname="bg-blue-700"
            onClick={toggleMenu}
          >
            About
          </NavLink>
          <NavLink
            to="/services"
            className="text-white hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            activeclassname="bg-blue-700"
            onClick={toggleMenu}
          >
            Services
          </NavLink>
          <NavLink
            to="/contact"
            className="text-white hover:bg-blue-600 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            activeclassname="bg-blue-700"
            onClick={toggleMenu}
          >
            Contact
          </NavLink>
          {user ? (
            <>
              <div className="flex items-center ml-2">
                <div className="relative inline-block group">
                  <img
                    src={user?.photoURL}
                    alt="profile"
                    className="w-6 h-6 rounded-full mr-4 cursor-pointer"
                  />
                  <span className="absolute w-52 -bottom-6 left-1/2 transform translate-y-full opacity-0 group-hover:opacity-100 text-sm text-white bg-gray-800 border border-white p-2 rounded mt-2 z-50">
                    {user?.displayName}
                  </span>
                </div>
                <button
                  className="text-white text-center bg-gray-600 hover:bg-gray-700 block px-4 py-2 rounded-md text-base font-medium"
                  onClick={() => singOut()}
                >
                  Log-out
                </button>
              </div>
            </>
          ) : (
            <>
              <NavLink
                to="/sign-up"
                className="text-white text-center bg-blue-600 hover:bg-blue-700 block px-4 py-2 rounded-md text-base font-medium"
                activeclassname="bg-blue-700"
                onClick={toggleMenu}
              >
                Sign In
              </NavLink>
              <NavLink
                to="/log-in"
                className="text-white text-center bg-gray-600 hover:bg-gray-700 block px-4 py-2 rounded-md text-base font-medium"
                activeclassname="bg-gray-700"
                onClick={toggleMenu}
              >
                Log In
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
