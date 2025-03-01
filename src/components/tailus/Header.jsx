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
  FaHistory,
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
      <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md z-50">
        <div className="px-4 md:px-8 flex justify-between items-center py-3">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold text-gray-600 dark:text-white hover:text-yellow-600 transition duration-300"
          >
            E-Shopp
          </Link>

          {/* Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-600 dark:text-white"
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>

          <ul className="hidden md:flex space-x-8">
            {["Home", "About", "Product", "Contact"].map((menu, i) => {
              const path = menu === "Home" ? "/" : `/${menu.toLowerCase()}`;
              return (
                <li key={i}>
                  <Link
                    to={path}
                    className={`${
                      location.pathname === path
                        ? "text-yellow-600"
                        : "text-gray-600 dark:text-white"
                    } hover:text-yellow-600 transition duration-300`}
                  >
                    {menu}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* User & Cart Icons */}
          <div className="hidden md:flex items-center space-x-4">
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
                  <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-gray-800 rounded-xl shadow-xl z-10">
                    <ul className="divide-y divide-gray-100 dark:divide-gray-700">
                      <li>
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <FaUser className="w-5 h-5 mr-3" />
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/riwayat"
                          className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <FaHistory className="w-5 h-5 mr-3" />
                          Riwayat
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="flex items-center px-4 py-3 text-red-600 w-full hover:bg-red-100 dark:hover:bg-red-700"
                        >
                          <FaSignOutAlt className="w-5 h-5 mr-3" />
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500"
              >
                Login
              </button>
            )}

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

            <Theme />
          </div>
        </div>

        {isMenuOpen && (
          <div className="fixed inset-0  z-40 md:hidden flex flex-col items-end">
            <div className="w-64 bg-white dark:bg-gray-800 h-screen shadow-lg p-5">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-600 dark:text-white absolute top-4 right-4"
              >
                <FaTimes className="w-6 h-6" />
              </button>

              {userProfile ? (
                <div className="relative flex flex-col items-center">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center space-x-3 mb-2"
                  >
                    <img
                      src={profileData?.avatar_url || "/default-avatar.png"}
                      alt="Profile"
                      className="w-10 h-10 rounded-full border"
                    />
                    <span className="text-gray-600 dark:text-white text-sm font-medium">
                      {profileData?.full_name || "User"}
                    </span>
                  </button>
                  {dropdownOpen && (
                    <div className="absolute top-12 right-0 w-40 bg-white dark:bg-gray-700 shadow-lg rounded-md p-2">
                      <Link
                        to="/profile"
                        className="px-4 py-2 block hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/riwayat"
                        className="px-4 py-2 block hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        Riwayat
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-red-600 w-full text-left hover:bg-red-100 dark:hover:bg-red-700"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => navigate("/login")}
                  className="w-full py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 mb-6"
                >
                  Login
                </button>
              )}

              <ul className="space-y-4">
                {["Home", "About", "Product", "Contact"].map((menu, i) => {
                  const path = menu === "Home" ? "/" : `/${menu.toLowerCase()}`;
                  return (
                    <li key={i}>
                      <Link
                        to={path}
                        className={`${
                          location.pathname === path
                            ? "text-yellow-600"
                            : "text-gray-600 dark:text-white"
                        } hover:text-yellow-600 transition duration-300 block`}
                      >
                        {menu}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Cart & Theme Toggle */}
              <div className="flex items-center space-x-4 mt-6">
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
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
