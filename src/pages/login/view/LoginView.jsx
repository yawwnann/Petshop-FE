// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  TruckIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import logo from "../../../assets/logo.png";
import { LoginPresenter } from "../presenter/LoginPresenter";
import bannerLogin from "../../../assets/banner-login.jpg";
import PetshopImg from "../../../assets/petshop1.png";

export default function LoginView() {
  const [presenter] = useState(() => new LoginPresenter());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set loading state immediately
    setLoading(true);
    setError(null);

    presenter.setEmail(email);
    presenter.setPassword(password);

    await presenter.handleLogin(navigate);
    setLoading(presenter.getLoading());
    setError(presenter.getError());
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Left: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white px-6 py-12 shadow-2xl md:shadow-none relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 "></div>

        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <img src={logo} alt="Petshop Logo" className="h-34 w-34" />
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">
              Selamat Datang Kembali!
            </h2>
            <p className="text-gray-600">
              Masuk untuk mengakses dashboard perawatan hewan peliharaan Anda
            </p>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="bg-[var(--petshop-pink-accent)]/10 border border-[var(--petshop-pink-dark)] text-[var(--petshop-pink-dark)] px-4 py-3 rounded-xl relative shadow-sm mb-6 animate-pulse">
              <div className="flex items-center">
                <ExclamationTriangleIcon className="w-5 h-5 mr-2 text-[var(--petshop-pink-dark)]" />
                <span className="font-medium">{error}</span>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--petshop-pink-dark)] mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="Masukkan email Anda"
                  className={`w-full px-4 py-3 pl-11 border border-[var(--petshop-pink-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petshop-pink-dark)] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  disabled={loading}
                />
                <EnvelopeIcon className="absolute left-3 top-3.5 h-5 w-5 text-[var(--petshop-pink-dark)]" />
              </div>
            </div>

            {/* Password Field */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[var(--petshop-pink-dark)] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan kata sandi Anda"
                  className={`w-full px-4 py-3 pl-11 pr-11 border border-[var(--petshop-pink-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petshop-pink-dark)] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  disabled={loading}
                />
                <LockClosedIcon className="absolute left-3 top-3.5 h-5 w-5 text-[var(--petshop-pink-dark)]" />
                <button
                  type="button"
                  className={`absolute right-3 top-3.5 h-5 w-5 text-[var(--petshop-pink-dark)] hover:text-[var(--petshop-pink-accent)] transition-colors ${
                    loading ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className={`w-4 h-4 rounded border-[var(--petshop-pink-dark)] text-[var(--petshop-pink-dark)] focus:ring-[var(--petshop-pink-dark)] focus:ring-2 ${
                    loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                  }`}
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                />
                <span className="text-sm text-[var(--petshop-pink-dark)]">
                  Ingat saya
                </span>
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none bg-[var(--petshop-pink-dark)] hover:bg-[var(--petshop-pink-accent)] relative overflow-hidden ${
                loading ? "cursor-not-allowed" : ""
              }`}
            >
              {/* Loading overlay */}
              {loading && (
                <div className="absolute inset-0 bg-[var(--petshop-pink-dark)] opacity-90 flex items-center justify-center">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <div className="absolute inset-0 w-6 h-6 border-2 border-white border-opacity-30 rounded-full"></div>
                    </div>
                    <span className="text-white font-medium">
                      Sedang masuk...
                    </span>
                  </div>
                </div>
              )}

              {/* Button content */}
              <div
                className={`flex items-center justify-center gap-2 ${
                  loading ? "opacity-0" : ""
                }`}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Masuk
              </div>
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                Baru di PetShop?
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <a
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#8CBCC7] text-[#8CBCC7] font-medium rounded-xl hover:bg-[#8CBCC7] hover:text-white transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                />
              </svg>
              Buat Akun Baru
            </a>
          </div>
        </div>
      </div>

      {/* Right: Illustration & Promo */}
      <div className="hidden md:flex w-1/2 items-center justify-center flex-col relative  overflow-hidden">
        {/* Background Image */}
        <img
          src={bannerLogin}
          alt="Petshop Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#8CBCC7]/80 to-[#A8D0DB]/80"></div>{" "}
        {/* Background decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-0 w-16 h-16 bg-white opacity-10 rounded-full blur-xl"></div>
        {/* Main content */}
        <div className="relative z-10 text-center px-8 max-w-lg">
          <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
            <img
              src={PetshopImg}
              alt="Petshop"
              className="w-full max-w-sm mx-auto drop-shadow-2xl rounded-2xl"
            />
          </div>

          <div className="text-white">
            <h3 className="text-3xl font-bold mb-4 leading-tight">
              Terhubung dengan semua kebutuhan hewan peliharaan Anda.
            </h3>
            <p className="text-lg opacity-90 leading-relaxed mb-6">
              Semua yang Anda butuhkan untuk hewan peliharaan tercinta dalam
              satu tempat. Pengalaman belanja mudah, cepat, dan aman!
            </p>

            {/* Feature highlights */}
            <div className="flex flex-col items-center gap-4 mt-8">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 bg-opacity-20 rounded-full flex items-center justify-center">
                  <ShieldCheckIcon className="w-10 h-10" />
                </div>
                <span>Belanja Aman</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 bg-opacity-20 rounded-full flex items-center justify-center">
                  <ClockIcon className="w-10 h-10" />
                </div>
                <span>Dukungan 24/7</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 bg-opacity-20 rounded-full flex items-center justify-center">
                  <StarIcon className="w-10 h-10" />
                </div>
                <span>Kualitas Terbaik</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
