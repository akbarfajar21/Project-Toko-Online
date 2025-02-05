import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import supabase from "../../utils/supaClient";
import Theme from "../daisyui/Theme";
import Swal from "sweetalert2";
import {
  FaShoppingCart,
  FaSignOutAlt,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Header = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: user } = await supabase.auth.getUser();
      setUserProfile(user || null);
      setIsLoading(false);
    };

    fetchUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUserProfile(session?.user || null);
        setProfileData(null);
        setIsLoading(false);
      }
    );

    return () => authListener?.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (userProfile && !profileData) {
      const fetchProfile = async () => {
        const { data, error } = await supabase
          .from("profiles")
          .select("full_name, avatar_url")
          .eq("id", userProfile.id)
          .single();

        if (!error) setProfileData(data);
      };

      fetchProfile();
    }
  }, [userProfile, profileData]);

  useEffect(() => {
    if (userProfile) {
      const fetchCartCount = async () => {
        const { data, error } = await supabase
          .from("keranjang")
          .select("quantity")
          .eq("profile_id", userProfile.id);

        if (!error) {
          const totalQuantity = data.reduce(
            (total, item) => total + item.quantity,
            0
          );
          setCartCount(totalQuantity);
        }
      };
      fetchCartCount();
    }
  }, [userProfile]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUserProfile(null);
    setProfileData(null);
    setDropdownOpen(false);

    Swal.fire({
      icon: "success",
      title: "Logged out successfully!",
      showConfirmButton: false,
      timer: 1500,
    });

    navigate("/");
  };

  const handleMenuClick = () => {
    setIsMenuOpen(false); // Close the menu on link click in mobile view
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  if (isLoading) {
    return null;
  }

  return (
    <header>
      <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur navbar shadow-md z-50">
        <div className="px-4 md:px-8 w-full flex justify-between items-center py-3">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold text-gray-600 dark:text-white hover:text-yellow-600 transition duration-300"
          >
            E-Shopp
          </Link>

          {/* Hamburger Menu (Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 dark:text-white"
            >
              <FaBars className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <ul
            className={`${
              isMenuOpen
                ? "flex flex-col space-y-3 ml-0 opacity-100 transition-all duration-500 ease-out"
                : "hidden md:flex space-x-8 ml-20"
            } flex-col md:flex-row space-x-8 md:space-x-8`}
          >
            <li>
              <Link
                to="/"
                onClick={handleMenuClick}
                className={`${
                  location.pathname === "/"
                    ? "text-yellow-600"
                    : "text-gray-600 dark:text-white"
                } hover:text-yellow-600 transition duration-300`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                onClick={handleMenuClick}
                className={`${
                  location.pathname === "/about"
                    ? "text-yellow-600"
                    : "text-gray-600 dark:text-white"
                } hover:text-yellow-600 transition duration-300`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/product"
                onClick={handleMenuClick}
                className={`${
                  location.pathname === "/product"
                    ? "text-yellow-600"
                    : "text-gray-600 dark:text-white"
                } hover:text-yellow-600 transition duration-300`}
              >
                Product
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={handleMenuClick}
                className={`${
                  location.pathname === "/contact"
                    ? "text-yellow-600"
                    : "text-gray-600 dark:text-white"
                } hover:text-yellow-600 transition duration-300`}
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Cart Icon (Outside Hamburger) */}
          <div className="hidden md:flex items-center space-x-4">
            {/* User Profile or Login Button */}
            {userProfile ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2"
                >
                  <img
                    src={profileData?.avatar_url || "/default-avatar.png"}
                    alt="Profile"
                    className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700"
                  />
                  <span className="text-gray-600 dark:text-white text-sm font-medium">
                    {profileData?.full_name || "User"}
                  </span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10">
                    <ul>
                      <li>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 dark:text-gray-200 w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center space-x-2"
                        >
                          <FaUser className="w-5 h-5 text-gray-600 dark:text-white" />
                          <span>Profile</span>
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block px-4 py-2 text-gray-700 dark:text-gray-200 w-full text-left hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center space-x-2"
                        >
                          <FaSignOutAlt className="w-5 h-5 text-gray-600 dark:text-white" />
                          <span>Logout</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-yellow-400 text-white text-sm rounded-lg hover:bg-yellow-500"
              >
                Login
              </button>
            )}

            {/* Cart Icon with Count */}
            <Link
              to="/cart"
              className="relative text-gray-600 dark:text-white hover:text-yellow-600"
            >
              <FaShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="flex">
              <Theme />
            </div>
          </div>
        </div>

        {/* Mobile Menu (Hamburger) */}
        {isMenuOpen && (
          <div className="absolute top-0 right-0 w-64 h-screen bg-white dark:bg-gray-800 shadow-lg z-50 flex flex-col items-center py-4 space-y-6">
            {/* Tombol Close Hamburger Menu */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-600 dark:text-white"
            >
              <FaTimes className="w-6 h-6" />
            </button>

            {/* User Profile (if logged in) */}
            {userProfile ? (
              <div className="relative flex flex-col items-center">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center space-x-3 mb-2 focus:outline-none"
                >
                  <img
                    src={profileData?.avatar_url || "/default-avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700"
                  />
                  <span className="text-gray-600 dark:text-white text-sm font-medium">
                    {profileData?.full_name || "User"}
                  </span>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute top-12 right-0 w-40 bg-white dark:bg-gray-700 shadow-lg rounded-md p-2 flex flex-col text-sm">
                    <Link
                      to="/profile"
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md text-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-yellow-400 text-white text-sm rounded-lg hover:bg-yellow-500 mb-6"
              >
                Login
              </button>
            )}

            {/* Navigation Links */}
            <ul className="flex flex-col space-y-4 mb-6 w-full px-4">
              <li>
                <Link
                  to="/"
                  onClick={handleMenuClick}
                  className={`${
                    location.pathname === "/"
                      ? "text-yellow-600"
                      : "text-gray-600 dark:text-white"
                  } hover:text-yellow-600 transition duration-300`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  onClick={handleMenuClick}
                  className={`${
                    location.pathname === "/about"
                      ? "text-yellow-600"
                      : "text-gray-600 dark:text-white"
                  } hover:text-yellow-600 transition duration-300`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/product"
                  onClick={handleMenuClick}
                  className={`${
                    location.pathname === "/product"
                      ? "text-yellow-600"
                      : "text-gray-600 dark:text-white"
                  } hover:text-yellow-600 transition duration-300`}
                >
                  Product
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={handleMenuClick}
                  className={`${
                    location.pathname === "/contact"
                      ? "text-yellow-600"
                      : "text-gray-600 dark:text-white"
                  } hover:text-yellow-600 transition duration-300`}
                >
                  Contact
                </Link>
              </li>
            </ul>

            {/* Theme Toggle & Cart Icon */}
            <div className="flex items-center space-x-4 mb-6">
              <Theme />
              <Link
                to="/cart"
                className="relative text-gray-600 dark:text-white hover:text-yellow-600"
              >
                <FaShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
