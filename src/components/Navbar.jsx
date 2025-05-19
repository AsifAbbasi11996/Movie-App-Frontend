import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMenuOpen(false);
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-semibold cursor-pointer"
        >
          MovieApp
        </h1>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <button
            className="hover:underline cursor-pointer"
            onClick={() => navigate("/movies")}
          >
            Top Movies
          </button>

          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search Movies..."
              className="bg-white text-black rounded px-3 py-1 w-48 outline-none"
            />
            <button
              onClick={handleSearchSubmit}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-blue-600 cursor-pointer"
            >
              🔍
            </button>
          </div>

          {/* User Menu or Login/Register */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-white text-blue-600 rounded-full p-1 w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                👤
              </button>

              {/* Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg py-2 w-32">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hover:underline"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="hover:underline"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
