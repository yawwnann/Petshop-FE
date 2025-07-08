import React, { useState, useEffect, Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Dialog, Transition, Menu } from "@headlessui/react";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ShoppingCartIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
  ArchiveBoxIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import apiClient from "../api/apiClient";
import logo from "../assets/logo.png";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const NAV_LINKS = [
    { to: "/dashboard", label: "Dashboard", icon: HomeIcon },
    { to: "/konsultasi", label: "Konsultasi", icon: ChatBubbleLeftRightIcon },
    { to: "/katalog", label: "Shop", icon: ShoppingCartIcon },
    { to: "/about", label: "About", icon: HomeIcon }, // Changed from BuildingStorefrontIcon to HomeIcon
    { to: "/contact", label: "Contact", icon: UserCircleIcon },
  ];

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const storedUser = localStorage.getItem("authUser");
      try {
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        setUser({
          name: parsedUser?.name || "",
          email: parsedUser?.email || "",
          profile_photo_url: parsedUser?.profile_photo_url || null,
        });
      } catch {
        setUser({ name: " ", email: "", profile_photo_url: null });
      }
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // setScrolled(window.scrollY > 20); // Removed as per edit hint
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await apiClient.post("/logout");
    } finally {
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
      setUser(null);
      setIsLoggingOut(false);
      setIsMobileMenuOpen(false);
      navigate("/login");
    }
  };

  // const getMobileNavLinkClass = ({ isActive }) =>
  //   `flex items-center gap-3 px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg ${
  //     isActive
  //       ? "text-[var(--petshop-blue)] bg-[var(--petshop-blue-light)]/40"
  //       : "text-gray-600 hover:text-[var(--petshop-blue)] hover:bg-[var(--petshop-blue-light)]/30"
  //   }`;

  const handleNavbarImageError = (e) => {
    e.target.onerror = null;
    e.target.style.display = "none";
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-[var(--petshop-blue-light)]/50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Logo & Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-lg text-[var(--petshop-blue)] lg:hidden hover:bg-[var(--petshop-blue-light)]/30 hover:text-[var(--petshop-pink-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--petshop-blue)] transition-all duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Buka menu</span>
              {isMobileMenuOpen ? (
                <XMarkIcon className="block h-6 w-6" />
              ) : (
                <Bars3Icon className="block h-6 w-6" />
              )}
            </button>
            <NavLink to="/" className="flex items-center gap-2 select-none">
              <img
                src={logo}
                alt="Petshop Logo"
                className="h-15 w-15 object-contain"
              />
              <div className="hidden sm:block">
                <span
                  className="text-xl font-bold"
                  style={{ color: "var(--petshop-pink-dark)" }}
                >
                  Buana PetShop
                </span>
              </div>
            </NavLink>
          </div>

          {/* Center: Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {NAV_LINKS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-2 text-base font-medium transition-all duration-200 rounded-lg ` +
                    (isActive
                      ? "text-[var(--petshop-pink-dark)] bg-[var(--petshop-pink-dark)]/10"
                      : "text-[var(--petshop-blue)] hover:text-[var(--petshop-pink-dark)] hover:bg-[var(--petshop-blue-light)]/30")
                  }
                  end={item.to === "/"}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </div>

          {/* Right Side: Actions & Profile */}
          <div className="flex items-center gap-2">
            {user ? (
              <>
                {/* Cart */}
                <NavLink
                  to="/keranjang"
                  className="p-2 rounded-lg text-[var(--petshop-blue)] hover:bg-[var(--petshop-blue-light)]/30 hover:text-[var(--petshop-pink-dark)] transition-all duration-200 relative"
                >
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-[var(--petshop-pink-dark)] rounded-full border-2 border-white"></span>
                </NavLink>

                {/* Profile Menu */}
                <Menu as="div" className="relative">
                  <Menu.Button className="flex items-center gap-2 p-1 rounded-lg hover:bg-[var(--petshop-blue-light)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--petshop-blue)] transition-all duration-200">
                    <div className="relative">
                      {user.profile_photo_url ? (
                        <img
                          src={user.profile_photo_url}
                          alt={user.name || "User profile"}
                          className="h-8 w-8 rounded-lg object-cover border-2 border-white"
                          onError={handleNavbarImageError}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-lg bg-[var(--petshop-blue)] flex items-center justify-center">
                          <UserCircleIcon className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-[var(--petshop-blue)]">
                        {user.name}
                      </p>
                    </div>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-150"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-lg shadow-lg ring-1 ring-black/5 focus:outline-none border border-gray-200">
                      <div className="p-1">
                        <Menu.Item>
                          {({ active }) => (
                            <NavLink
                              to="/profile"
                              className={`${
                                active
                                  ? "bg-[var(--petshop-blue-light)]/30 text-[var(--petshop-blue)]"
                                  : "text-gray-700"
                              } group flex rounded-lg items-center w-full px-3 py-2 text-sm font-medium transition-all duration-200`}
                            >
                              <UserCircleIcon className="h-4 w-4 mr-3" />
                              Profile
                            </NavLink>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={`${
                                active
                                  ? "bg-[var(--petshop-pink)]/40 text-[var(--petshop-pink-dark)]"
                                  : "text-gray-700"
                              } group flex rounded-lg items-center w-full px-3 py-2 text-sm font-medium transition-all duration-200`}
                              disabled={isLoggingOut}
                            >
                              <ArrowRightOnRectangleIcon className="h-4 w-4 mr-3" />
                              {isLoggingOut ? "Logging out..." : "Logout"}
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </>
            ) : (
              <NavLink
                to="/login"
                className="px-4 py-2 rounded-lg font-bold text-white bg-[var(--petshop-pink-dark)] hover:bg-[var(--petshop-pink-accent)] transition-all duration-200"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <Transition
        show={isMobileMenuOpen}
        as={Fragment}
        enter="transition-all duration-300 ease-out"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-all duration-300 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog
          as="div"
          className="lg:hidden"
          open={isMobileMenuOpen}
          onClose={setIsMobileMenuOpen}
        >
          <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
          <div className="fixed inset-0 z-50 flex items-start justify-start">
            <Transition.Child
              as={Fragment}
              enter="transition-all duration-300 ease-out"
              enterFrom="transform -translate-x-full"
              enterTo="transform translate-x-0"
              leave="transition-all duration-300 ease-in"
              leaveFrom="transform translate-x-0"
              leaveTo="transform -translate-x-full"
            >
              <div className="w-80 bg-white h-full shadow-xl p-6 flex flex-col gap-6 border-r border-[var(--petshop-blue-light)]">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <NavLink
                    to="/"
                    className="flex items-center gap-2 select-none"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <img
                      src={logo}
                      alt="Petshop Logo"
                      className="h-12 w-12 object-contain"
                    />
                    <span
                      className="text-xl font-bold"
                      style={{ color: "var(--petshop-pink-dark)" }}
                    >
                      Buana PetShop
                    </span>
                  </NavLink>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-[var(--petshop-blue)] hover:bg-[var(--petshop-blue-light)]/30 hover:text-[var(--petshop-pink-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--petshop-blue)] transition-all duration-200"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                {/* User Info (jika sudah login) */}
                {user && (
                  <div className="flex items-center gap-3 p-3 bg-[var(--petshop-blue-light)]/20 rounded-lg mb-4">
                    <div className="relative">
                      {user.profile_photo_url ? (
                        <img
                          src={user.profile_photo_url}
                          alt={user.name || "User profile"}
                          className="h-10 w-10 rounded-lg object-cover border-2 border-white"
                          onError={handleNavbarImageError}
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-lg bg-[var(--petshop-blue)] flex items-center justify-center">
                          <UserCircleIcon className="h-6 w-6 text-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[var(--petshop-blue)]">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                <div className="flex flex-col gap-2">
                  {NAV_LINKS.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg ${
                            isActive
                              ? "text-[var(--petshop-pink-dark)] bg-[var(--petshop-pink-dark)]/10"
                              : "text-gray-600 hover:text-[var(--petshop-blue)] hover:bg-[var(--petshop-blue-light)]/30"
                          }`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </NavLink>
                    );
                  })}

                  {/* Keranjang (jika sudah login) */}
                  {user && (
                    <NavLink
                      to="/keranjang"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg ${
                          isActive
                            ? "text-[var(--petshop-pink-dark)] bg-[var(--petshop-pink-dark)]/10"
                            : "text-gray-600 hover:text-[var(--petshop-blue)] hover:bg-[var(--petshop-blue-light)]/30"
                        }`
                      }
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <ShoppingCartIcon className="h-5 w-5" />
                      <span>Keranjang</span>
                    </NavLink>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-auto pt-4 border-t border-[var(--petshop-blue-light)]/20">
                  {user ? (
                    <div className="flex flex-col gap-2">
                      <NavLink
                        to="/profile"
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium text-[var(--petshop-blue)] hover:bg-[var(--petshop-blue-light)]/30 rounded-lg transition-all duration-200"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <UserCircleIcon className="h-5 w-5" />
                        Profile
                      </NavLink>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium text-[var(--petshop-pink-dark)] hover:bg-[var(--petshop-pink)]/40 rounded-lg transition-all duration-200"
                        disabled={isLoggingOut}
                      >
                        <ArrowRightOnRectangleIcon className="h-5 w-5" />
                        {isLoggingOut ? "Logging out..." : "Logout"}
                      </button>
                    </div>
                  ) : (
                    <NavLink
                      to="/login"
                      className="flex items-center justify-center gap-3 px-4 py-3 text-base font-bold text-white bg-[var(--petshop-pink-dark)] hover:bg-[var(--petshop-pink-accent)] rounded-lg transition-all duration-200"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </NavLink>
                  )}
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
}

export default Navbar;
