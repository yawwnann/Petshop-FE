// src/pages/LoginPage.jsx
import React, { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { LoginPresenter } from "../presenter/LoginPresenter";
import PetshopImg from "../../../assets/Petshop.png";

export default function LoginView() {
  const [presenter] = useState(() => new LoginPresenter());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    presenter.setEmail(email);
    presenter.setPassword(password);

    await presenter.handleLogin(navigate);
    setLoading(presenter.getLoading());
    setError(presenter.getError());
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Login Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white px-6 py-12">
        <div className="max-w-sm w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <img src={logo} alt="Petshop Logo" className="h-43" />
          </div>
          {/* Title */}
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            Log in to your Account
          </h2>
          <p className="text-gray-500 mb-6">
            Welcome back! Select method to log in:
          </p>
          {/* Social Login */}
          <div className="flex gap-3 mb-4">
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 font-medium hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5"
              />
              Google
            </button>
            <button
              type="button"
              className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2 font-medium hover:bg-gray-50 transition"
            >
              <svg
                className="w-5 h-5"
                style={{ color: "#8CBCC7" }}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22.675 0h-21.35C.6 0 0 .6 0 1.326v21.348C0 23.4.6 24 1.326 24h11.495v-9.294H9.692v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.4 24 24 23.4 24 22.674V1.326C24 .6 23.4 0 22.675 0" />
              </svg>
              Facebook
            </button>
          </div>
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-200" />
            <span className="mx-2 text-gray-400 text-xs">
              or continue with email
            </span>
            <div className="flex-grow border-t border-gray-200" />
          </div>
          {/* Email/Password Form */}
          {error && (
            <div
              className="bg-red-50 border-l-4 border-red-400 text-red-700 px-4 py-3 rounded-md relative shadow-sm mb-4"
              role="alert"
            >
              <strong className="font-bold">Oops!</strong>
              <span className="block sm:inline ml-1">{error}</span>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: "#8CBCC7",
                color: "#222",
                fontWeight: 500,
                background: "#F8FAFC",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: "#8CBCC7",
                color: "#222",
                fontWeight: 500,
                background: "#F8FAFC",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="accent-[#8CBCC7]" /> Remember
                me
              </label>
              <a
                href="/forgot-password"
                className="font-medium hover:underline"
                style={{ color: "#8CBCC7" }}
              >
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white font-bold rounded-lg transition shadow-md"
              style={{ background: "#8CBCC7" }}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log in"}
            </button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?{" "}
            <a
              href="/register"
              className="font-medium hover:underline"
              style={{ color: "#8CBCC7" }}
            >
              Create an account
            </a>
          </div>
        </div>
      </div>
      {/* Right: Illustration & Promo */}
      <div
        className="hidden md:flex w-1/2 items-center justify-center flex-col relative"
        style={{ background: "#8CBCC7" }}
      >
        <img
          src={PetshopImg}
          alt="Petshop"
          className="max-w-md w-4/5 drop-shadow-2xl rounded-2xl mb-8"
        />
        <div className="text-white text-center px-8">
          <h3 className="text-2xl font-bold mb-2">
            Connect with every pet need.
          </h3>
          <p className="text-base opacity-90">
            Everything you need for your beloved pets in one place. Easy, fast,
            and secure shopping experience!
          </p>
        </div>
      </div>
    </div>
  );
}
