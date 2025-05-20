import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../public/logo.webp";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
      setMobileMenuOpen(false); // Close mobile menu after search
      setSearchQuery("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMenuOpen(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <nav className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo & Name */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            className="w-[60px] h-[30px] md:w-[80px] md:h-[40px] object-contain"
          />
          <h1 className="text-xl font-semibold">MovieApp</h1>
        </div>

        {/* Hamburger Icon for mobile */}
        <button
          className="md:hidden text-white cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
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

          {/* User Menu */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="bg-white text-blue-600 rounded-full p-1 w-8 h-8 flex items-center justify-center cursor-pointer"
              >
                👤
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg py-2 w-32">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
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
                className="hover:underline cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="hover:underline cursor-pointer"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 flex flex-col space-y-3 bg-blue-700 text-white">
          <button
            onClick={() => {
              navigate("/movies");
              setMobileMenuOpen(false);
            }}
          >
            Top Movies
          </button>

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearchSubmit();
                }
              }}
              placeholder="Search Movies..."
              className="bg-white text-black rounded px-3 py-1 w-full outline-none"
            />

            <button
              onClick={handleSearchSubmit}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 cursor-pointer"
            >
              🔍
            </button>
          </div>

          {isLoggedIn ? (
            <button
              onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }}
              className="text-left hover:underline"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:underline"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/register");
                  setMobileMenuOpen(false);
                }}
                className="text-left hover:underline"
              >
                Register
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
