import React, { useState } from "react";
import supabase from "../utils/supaClient";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FaLock, FaUser } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        Swal.fire({
          title: "Login Gagal!",
          text: "Periksa kembali email dan password Anda.",
          icon: "error",
          confirmButtonText: "OK",
        });
      } else if (data) {
        Swal.fire({
          title: "Login Berhasil!",
          text: "Selamat datang kembali!",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/"); // Navigasi ke halaman utama setelah login berhasil
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Helmet>
        <title>Toko Online | Login</title>
      </Helmet>
      <div className="max-w-md w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-2xl rounded-2xl p-8 transition-all duration-300">
        {/* Judul */}
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Login
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-6">
          Masukkan email dan password Anda untuk masuk.
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <div className="flex items-center mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm px-4 py-3">
              <FaUser className="text-gray-400 dark:text-gray-300 mr-3" />
              <input
                type="email"
                name="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent focus:outline-none dark:text-white"
                placeholder="Masukkan email"
              />
            </div>
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Password
            </label>
            <div className="flex items-center mt-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm px-4 py-3 relative">
              <FaLock className="text-gray-400 dark:text-gray-300 mr-3" />
              <input
                type={showPassword ? "text" : "password"} // Toggle visibility
                name="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent focus:outline-none dark:text-white"
                placeholder="Masukkan password"
              />
              {/* Tombol hide/unhide */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 text-gray-500 dark:text-gray-300 focus:outline-none"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Tombol Login */}
          <button
            type="submit"
            className="w-full py-3 px-4 bg-indigo-600 text-white text-lg font-semibold rounded-lg shadow-md transition-all duration-300 hover:bg-indigo-700 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600"
          >
            Login Now
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium hover:text-indigo-500 transition-all"
          >
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
