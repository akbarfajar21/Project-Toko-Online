import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supaClient";
import { Helmet } from "react-helmet";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      // Register user
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Ambil user ID yang baru terdaftar
      const user = data.user;
      if (!user) {
        throw new Error("User registration failed. Please try again.");
      }

      const defaultAvatarUrl =
        "https://mir-s3-cdn-cf.behance.net/project_modules/hd/d95c1f148207527.62d1246c25004.jpg";
      const { error: profileError } = await supabase.from("profiles").upsert({
        id: user.id,
        full_name: formData.fullName,
        email: formData.email,
        avatar_url: defaultAvatarUrl,
      });

      if (profileError) {
        throw new Error("Failed to save profile data.");
      }

      setSuccessMessage(
        "Registration successful! Redirecting to login page..."
      );
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Helmet>
        <title>Toko Online | Register</title>
      </Helmet>
      <div className="max-w-md w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md p-8 shadow-2xl rounded-2xl transition-all duration-300">
        {/* Judul */}
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
          Register
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-6">
          Buat akun baru Anda sekarang.
        </p>

        {/* Notifikasi */}
        {errorMessage && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 p-3 rounded-md border border-red-500">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 text-sm text-green-600 bg-green-100 p-3 rounded-md border border-green-500">
            {successMessage}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Nama */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Full Name
            </label>
            <div className="flex items-center mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm px-4 py-3">
              <FaUser className="text-gray-400 dark:text-gray-300 mr-3" />
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                required
                className="w-full bg-transparent focus:outline-none dark:text-white"
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <div className="flex items-center mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm px-4 py-3">
              <FaEnvelope className="text-gray-400 dark:text-gray-300 mr-3" />
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full bg-transparent focus:outline-none dark:text-white"
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="flex items-center mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm px-4 py-3 relative">
              <FaLock className="text-gray-400 dark:text-gray-300 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                required
                className="w-full bg-transparent focus:outline-none dark:text-white"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-500 dark:text-gray-300"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <div className="flex items-center mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm px-4 py-3 relative">
              <FaLock className="text-gray-400 dark:text-gray-300 mr-3" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
                className="w-full bg-transparent focus:outline-none dark:text-white"
                placeholder="Re-enter your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 text-gray-500 dark:text-gray-300"
              >
                {showConfirmPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Tombol Register */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-4 text-white text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 hover:scale-[1.02]"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600`}
          >
            {isLoading ? "Registering..." : "Register Now"}
          </button>
        </form>

        {/* Link ke login */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Sudah mempunyai akun?{" "}
            <a
              href="/login"
              className="text-indigo-600 font-medium hover:text-indigo-500 transition-all"
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
