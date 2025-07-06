// src/pages/RegisterPage.jsx
import React, { useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import logo from "../../../assets/logo.png";
import { RegisterPresenter } from "../presenter/RegisterPresenter";
import PetshopImg from "../../../assets/Petshop.png";

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
  const navigate = useNavigate();

  const closeModalAndNavigate = () => {
    presenter.closeModalAndNavigate(navigate);
    setIsSuccessModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    presenter.setName(name);
    presenter.setEmail(email);
    presenter.setPassword(password);
    presenter.setPasswordConfirmation(passwordConfirmation);
    presenter.setAgree(agree);

    await presenter.handleRegister();
    setError(presenter.getError());
    setLoading(presenter.getLoading());
    setIsSuccessModalOpen(presenter.getIsSuccessModalOpen());
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Register Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white px-6 py-12">
        <div className="max-w-sm w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-6">
            <img src={logo} alt="Petshop Logo" className="h-43" />
          </div>
          {/* Title */}
          <h2 className="text-2xl font-bold mb-2 text-gray-900">
            Create your Account
          </h2>
          <p className="text-gray-500 mb-6">
            Sign up to get started with Petshopku!
          </p>
          {/* Link to login */}
          <div className="mb-6 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium hover:underline"
              style={{ color: "#8CBCC7" }}
            >
              Log in
            </a>
          </div>
          {/* Error */}
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
              type="text"
              placeholder="Nama Lengkap"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: "#8CBCC7",
                color: "#222",
                fontWeight: 500,
                background: "#F8FAFC",
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            />
            <input
              type="password"
              placeholder="Konfirmasi Password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2"
              style={{
                borderColor: "#8CBCC7",
                color: "#222",
                fontWeight: 500,
                background: "#F8FAFC",
              }}
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="mt-1 mr-2 h-4 w-4 accent-[#8CBCC7]"
              />
              <label
                htmlFor="agree"
                className="text-sm"
                style={{ color: "#8CBCC7" }}
              >
                I agree to the{" "}
                <a
                  href="/terms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: "#8CBCC7" }}
                >
                  Terms
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: "#8CBCC7" }}
                >
                  Privacy Policy
                </a>
                .
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-3 text-white font-bold rounded-lg transition shadow-md"
              style={{
                background: "#8CBCC7",
                cursor: agree ? "pointer" : "not-allowed",
              }}
              disabled={!agree || loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
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
            Everything for your pet in one place.
          </h3>
          <p className="text-base opacity-90">
            Sign up and enjoy a fast, easy, and secure shopping experience for
            your beloved pets!
          </p>
        </div>
      </div>

      {/* === Modal Sukses Registrasi === */}
      <Transition appear show={isSuccessModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={closeModalAndNavigate}
        >
          {/* Latar belakang (overlay) */}
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
              className="fixed inset-0 backdrop-blur-sm bg-black/30"
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
                leaveFrom="opacity-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 sm:p-8 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl sm:text-2xl font-semibold leading-6 text-slate-900 text-center"
                  >
                    Registrasi Berhasil!
                  </Dialog.Title>
                  <div className="mt-5 flex flex-col items-center">
                    <CheckCircleIcon
                      className="h-20 w-20 sm:h-24 sm:w-24 text-emerald-500 mb-5"
                      aria-hidden="true"
                    />
                    <p className="text-sm sm:text-base text-slate-600 text-center leading-relaxed">
                      Akun Anda telah berhasil dibuat. Anda akan diarahkan ke
                      halaman login.
                    </p>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
                      onClick={closeModalAndNavigate}
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      {/* === Akhir Modal Sukses Registrasi === */}
    </div>
  );
}

export default RegisterView;
