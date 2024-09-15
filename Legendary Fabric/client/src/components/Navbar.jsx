import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const { products, logoutUser, isAuthenticated, cart } =
    useContext(AppContext);

  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${searchTerm}`);
    setSearchTerm("");
  };

  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // Handlers for toggling
  const toggleMenu = () => {
    setShowMenu(!showMenu);
    setShowSearch(false); // Ensure search bar closes when menu opens
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setShowMenu(false); // Ensure menu closes when search bar opens
  };

  return (
    <>
      <div className="top-0 fixed w-full z-[999] bg-zinc-900 text-zinc-100">
        <div className="flex justify-between py-4 px-6 items-center">
          {/* Left section - Logo */}
          <Link to={"/"}>
            <div className="text-xl md:text-2xl font-bold">
              Legendary Fabric
            </div>
          </Link>

          {/* Center - Search Bar */}
          <div className="hidden md:flex items-center w-[20vw] lg:w-[25vw]">
            <form onSubmit={submitHandler} className="flex items-center w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full py-[.5vh] px-[1vw]"
                  placeholder="Explore Legendary Materials..."
                  required
                />
              </div>
              <button
                type="submit"
                className="p-[.5vw] ml-[1vw] text-sm font-medium text-white bg-yellow-400 rounded-lg border border-yellow-700 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300"
              >
                <svg
                  className="w-4 h-4 text-zinc-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>

          {/* Right section - Buttons */}
          <div className="flex items-center gap-4 text-sm md:text-base max-md:hidden">
            <Link
              to={"/"}
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              to={"/product"}
              className="hover:text-yellow-400 transition-colors duration-300"
            >
              Products
            </Link>

            {isAuthenticated && (
              <>
                <Link
                  to={"/cart"}
                  className="hover:text-yellow-400 transition-colors duration-300 relative"
                >
                  <span>My Cart</span>
                  {cart?.items?.length > 0 && (
                    <>
                      <div className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-3 -end-3 dark:border-gray-900">
                        {cart?.items?.length}
                      </div>
                    </>
                  )}
                </Link>
                <Link
                  to={"/profile"}
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logoutUser();
                    navigate("/");
                  }}
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  Log Out
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link
                  to={"/register"}
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  Register
                </Link>
                <Link
                  to={"/login"}
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  Log In
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu (Search icon and hamburger menu) */}
          <div className="md:hidden flex items-center gap-3">
            <button onClick={toggleSearch} className="text-yellow-400">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z"
                />
              </svg>
            </button>
            <button onClick={toggleMenu} className="text-yellow-400">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile search input */}
        {showSearch && (
          <div className="flex md:hidden px-6 py-4">
            <form onSubmit={submitHandler} className="flex items-center w-full">
              <div className="relative w-full">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
                  placeholder="Explore Legendary Materials..."
                  required
                />
              </div>
              <button
                type="submit"
                className="p-2 ml-2 text-sm font-medium text-white bg-yellow-400 rounded-lg border border-yellow-700 hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300"
              >
                <svg
                  className="w-4 h-4 text-zinc-900"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </form>
          </div>
        )}

        {/* Mobile menu content */}
        {showMenu && (
          <div className="md:hidden px-6 py-4 flex flex-col gap-4">
            {isAuthenticated && (
              <>
                <button
                  className="text-yellow-400 hover:text-yellow-600"
                  onClick={toggleMenu}
                >
                  My Cart
                </button>
                <Link
                  to={"/profile"}
                  className="text-yellow-400 hover:text-yellow-600"
                  onClick={toggleMenu}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logoutUser();
                    navigate("/");
                    toggleMenu;
                  }}
                  className="hover:text-yellow-400 transition-colors duration-300"
                >
                  Log Out
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link
                  to={"/register"}
                  className="hover:text-yellow-400 transition-colors duration-300"
                  onClick={toggleMenu}
                >
                  Register
                </Link>
                <Link
                  to={"/login"}
                  className="hover:text-yellow-400 transition-colors duration-300"
                  onClick={toggleMenu}
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
