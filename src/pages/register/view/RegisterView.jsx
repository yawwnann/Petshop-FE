// src/pages/RegisterPage.jsx
import React, { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckIcon,
  XMarkIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  TruckIcon,
  ChatBubbleLeftRightIcon,
  StarIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import logo from "../../../assets/logo.png";
import { RegisterPresenter } from "../presenter/RegisterPresenter";
import bannerLogin from "../../../assets/banner-login.jpg";
import PetshopImg from "../../../assets/petshop1.png";

function RegisterView() {
  const [presenter] = useState(() => new RegisterPresenter());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);
  const navigate = useNavigate();

  // Monitor loading state from presenter
  useEffect(() => {
    setLoading(presenter.getLoading());
    setError(presenter.getError());
    setIsSuccessModalOpen(presenter.getIsSuccessModalOpen());
  }, [presenter]);

  const closeModalAndNavigate = () => {
    presenter.closeModalAndNavigate(navigate);
    setIsSuccessModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set loading state immediately
    setLoading(true);
    setError(null);

    presenter.setName(name);
    presenter.setEmail(email);
    presenter.setPassword(password);
    presenter.setPasswordConfirmation(passwordConfirmation);
    presenter.setAgree(agree);

    await presenter.handleRegister();

    // Update state after registration
    setError(presenter.getError());
    setLoading(presenter.getLoading());
    setIsSuccessModalOpen(presenter.getIsSuccessModalOpen());
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "", color: "" };

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    const levels = [
      { strength: 0, label: "", color: "" },
      { strength: 1, label: "Sangat Lemah", color: "bg-red-500" },
      { strength: 2, label: "Lemah", color: "bg-orange-500" },
      { strength: 3, label: "Cukup", color: "bg-yellow-500" },
      { strength: 4, label: "Baik", color: "bg-blue-500" },
      { strength: 5, label: "Kuat", color: "bg-green-500" },
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Left: Register Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white px-6 py-12 shadow-2xl md:shadow-none relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 "></div>

        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <img src={logo} alt="Petshop Logo" className="h-34 w-34" />
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold mb-3 text-gray-900">
              Bergabung dengan Buana PetShop
            </h2>
            <p className="text-gray-600">
              Buat akun Anda untuk mulai merawat hewan peliharaan
            </p>
          </div>

          {/* Login Link */}
          <div className="text-center mb-6">
            <span className="text-sm text-gray-600">Sudah punya akun? </span>
            <a
              href="/login"
              className="text-sm font-medium text-[#8CBCC7] hover:text-[#7AB3C0] transition-colors hover:underline"
            >
              Masuk di sini
            </a>
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

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[var(--petshop-pink-dark)] mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  placeholder="Masukkan nama lengkap Anda"
                  className={`w-full px-4 py-3 pl-11 border border-[var(--petshop-pink-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petshop-pink-dark)] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoComplete="name"
                  disabled={loading}
                />
                <UserIcon className="absolute left-3 top-3.5 h-5 w-5 text-[var(--petshop-pink-dark)]" />
              </div>
            </div>

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
                  className={`w-full px-4 py-3 pl-11 border border-[var(--petshop-pink-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petshop-pink-dark)] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
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

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                        style={{
                          width: `${(passwordStrength.strength / 5) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600">
                      {/* Password strength label translation */}
                      {passwordStrength.label === "Sangat Lemah" &&
                        "Sangat Lemah"}
                      {passwordStrength.label === "Lemah" && "Lemah"}
                      {passwordStrength.label === "Cukup" && "Cukup"}
                      {passwordStrength.label === "Baik" && "Baik"}
                      {passwordStrength.label === "Kuat" && "Kuat"}
                      {![
                        "Sangat Lemah",
                        "Lemah",
                        "Cukup",
                        "Baik",
                        "Kuat",
                      ].includes(passwordStrength.label) &&
                        passwordStrength.label}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Password Confirmation Field */}
            <div className="relative">
              <label
                htmlFor="passwordConfirmation"
                className="block text-sm font-medium text-[var(--petshop-pink-dark)] mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="passwordConfirmation"
                  type={showPasswordConfirmation ? "text" : "password"}
                  placeholder="Konfirmasi kata sandi Anda"
                  className={`w-full px-4 py-3 pl-11 border border-[var(--petshop-pink-dark)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--petshop-pink-dark)] focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                  autoComplete="new-password"
                  disabled={loading}
                />
                <LockClosedIcon className="absolute left-3 top-3.5 h-5 w-5 text-[var(--petshop-pink-dark)]" />
                <button
                  type="button"
                  className={`absolute right-3 top-3.5 h-5 w-5 text-[var(--petshop-pink-dark)] hover:text-[var(--petshop-pink-accent)] transition-colors ${
                    loading ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  onClick={() =>
                    setShowPasswordConfirmation(!showPasswordConfirmation)
                  }
                  disabled={loading}
                >
                  {showPasswordConfirmation ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Password Match Indicator */}
              {passwordConfirmation && (
                <div className="mt-2">
                  {password === passwordConfirmation ? (
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckIcon className="w-4 h-4" />
                      <span className="text-xs">Kata sandi cocok</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-red-600">
                      <XMarkIcon className="w-4 h-4" />
                      <span className="text-xs">Kata sandi tidak cocok</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-3">
              <div className="flex items-center h-5">
                <input
                  id="agree"
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className={`w-4 h-4 rounded border-[var(--petshop-pink-dark)] text-[var(--petshop-pink-dark)] focus:ring-[var(--petshop-pink-dark)] focus:ring-2 ${
                    loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                  }`}
                  disabled={loading}
                />
              </div>
              <label
                htmlFor="agree"
                className="text-sm text-[var(--petshop-pink-dark)] select-none"
              >
                Saya setuju dengan{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--petshop-pink-dark)] hover:text-[var(--petshop-pink-accent)] font-medium hover:underline"
                >
                  Syarat Layanan
                </a>{" "}
                dan{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--petshop-pink-dark)] hover:text-[var(--petshop-pink-accent)] font-medium hover:underline"
                >
                  Kebijakan Privasi
                </a>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={!agree || loading || password !== passwordConfirmation}
              className={`w-full py-3 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none bg-[var(--petshop-pink-dark)] hover:bg-[var(--petshop-pink-accent)] relative overflow-hidden ${
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
                      Membuat Akun...
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
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Buat Akun
              </div>
            </button>
          </form>
        </div>
      </div>

      {/* Right: Illustration & Promo */}
      <div className="hidden md:flex w-1/2 items-center justify-center flex-col relative bg-gradient-to-br from-[#8CBCC7] to-[#A8D0DB] overflow-hidden">
        {/* Background Image */}
        <img
          src={bannerLogin}
          alt="Petshop Banner"
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#8CBCC7]/80 to-[#A8D0DB]/80"></div>

        {/* Background decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 right-0 w-16 h-16 bg-white opacity-10 rounded-full blur-xl"></div>

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
              Semua kebutuhan hewan peliharaan Anda dalam satu tempat.
            </h3>
            <p className="text-lg opacity-90 leading-relaxed mb-6">
              Bergabunglah dengan ribuan pemilik hewan peliharaan yang
              mempercayai kami untuk kebutuhan perawatan hewan mereka. Cepat,
              aman, dan terpercaya!
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

      {/* Success Modal */}
      <Transition appear show={isSuccessModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={closeModalAndNavigate}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className="fixed inset-0 backdrop-blur-sm bg-black/50"
              aria-hidden="true"
            />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <CheckCircleIcon
                        className="h-8 w-8 text-green-600"
                        aria-hidden="true"
                      />
                    </div>

                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-bold text-gray-900 mb-2"
                    >
                      Selamat datang di PetShop!
                    </Dialog.Title>

                    <p className="text-center text-gray-600 mb-6 leading-relaxed">
                      Akun Anda berhasil dibuat. Anda sekarang siap untuk
                      menjelajahi produk dan layanan perawatan hewan peliharaan
                      terbaik dari kami.
                    </p>

                    <button
                      type="button"
                      className="w-full py-3 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                      onClick={closeModalAndNavigate}
                    >
                      Mulai
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default RegisterView;
