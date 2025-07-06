import React, { useState, useEffect, Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Dialog, Transition, Menu } from "@headlessui/react";
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  ShoppingCartIcon,
  BuildingStorefrontIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";
import apiClient from "../api/apiClient";
import logo from "../assets/logo.png";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const NAV_LINKS = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/about", label: "About Us" },
    { to: "/service", label: "Service" },
    { to: "/katalog", label: "Shop" },
    { to: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const storedUser = localStorage.getItem("authUser");
      try {
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        setUser({
          name: parsedUser?.name || "Pengguna",
          email: parsedUser?.email || "",
          profile_photo_url: parsedUser?.profile_photo_url || null,
        });
      } catch {
        setUser({ name: "Pengguna", email: "", profile_photo_url: null });
      }
    } else {
      setUser(null);
    }
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

  // Styling classes
  const getNavLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full text-base  transition-colors flex items-center gap-1 ` +
    (isActive
      ? "bg-white text-[#8CBCC7] shadow"
      : "text-white hover:bg-white hover:text-[#8CBCC7] hover:shadow");
  const getMobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-full text-lg  transition-colors flex items-center gap-2 ` +
    (isActive
      ? "bg-white text-[#8CBCC7] shadow"
      : "text-white hover:bg-white hover:text-[#598c96] hover:shadow");

  const handleNavbarImageError = (e) => {
    e.target.onerror = null;
    e.target.style.display = "none";
  };

  return (
    <nav
      style={{
        background: "#598c96",
        boxShadow: "0 2px 16px 0 rgba(44,44,44,0.08)",
      }}
      className="sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Logo & Brand */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white md:hidden hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
              {/* <img
                src={logo}
                alt="Buana Petshop Logo"
                className="h-8 w-8 rounded-full"
              /> */}
              <span className="text-white font-bold text-2xl tracking-widest hidden sm:inline drop-shadow">
                Buana Petshop
              </span>
            </NavLink>
          </div>

          {/* Center Links */}
          <div className="hidden md:flex md:justify-center md:flex-1 md:mx-6">
            <div className="flex items-center space-x-2">
              {NAV_LINKS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={getNavLinkClass}
                  end={item.to === "/"}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right Side: Login/Profile */}
          <div className="hidden md:ml-4 md:flex md:items-center md:space-x-4">
            {user ? (
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="flex items-center p-1 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#8CBCC7] focus:ring-white">
                  <span className="sr-only">Profile</span>
                  {user.profile_photo_url ? (
                    <img
                      src={user.profile_photo_url}
                      alt={user.name || "User profile"}
                      className="h-8 w-8 rounded-full object-cover"
                      onError={handleNavbarImageError}
                    />
                  ) : (
                    <UserCircleIcon className="h-8 w-8" aria-hidden="true" />
                  )}
                </Menu.Button>
                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white divide-y divide-gray-100 rounded-xl shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <NavLink
                          to="/profile"
                          className={`$${
                            active
                              ? "bg-[#8CBCC7]/10 text-[#598c96]"
                              : "text-gray-700"
                          } group flex rounded-md items-center w-full px-4 py-2 text-sm`}
                        >
                          Profile
                        </NavLink>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <NavLink
                          to="/keranjang"
                          className={`$${
                            active
                              ? "bg-[#8CBCC7]/10 text-[#598c96]"
                              : "text-gray-700"
                          } group flex rounded-md items-center w-full px-4 py-2 text-sm`}
                        >
                          Keranjang
                        </NavLink>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <NavLink
                          to="/pesanan"
                          className={`$${
                            active
                              ? "bg-[#8CBCC7]/10 text-[#598c96]"
                              : "text-gray-700"
                          } group flex rounded-md items-center w-full px-4 py-2 text-sm`}
                        >
                          Riwayat Pesanan
                        </NavLink>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleLogout}
                          type="button"
                          disabled={isLoggingOut}
                          className={`$${
                            active ? "bg-red-100 text-red-600" : "text-gray-700"
                          } group flex rounded-md items-center w-full px-4 py-2 text-sm`}
                        >
                          Logout
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Menu>
            ) : (
              <NavLink
                to="/login"
                className="px-6 py-2 rounded-full font-bold bg-white text-[#8CBCC7] hover:bg-pink-100 hover:text-pink-500 shadow transition-all"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1 inline" />
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
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Dialog
          as="div"
          className="md:hidden fixed inset-0 z-50"
          onClose={() => setIsMobileMenuOpen(false)}
        >
          <div className="fixed inset-0 bg-black/40" aria-hidden="true" />
          <div className="fixed top-0 left-0 right-0 bg-[#8CBCC7] shadow-lg rounded-b-2xl p-6 pt-4 z-50">
            <div className="flex items-center justify-between mb-6">
              <NavLink
                to="/"
                className="flex items-center gap-2 select-none"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <img
                  src={logo}
                  alt="Buana Petshop Logo"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-white font-bold text-2xl tracking-widest ml-2">
                  Buana Petshop
                </span>
              </NavLink>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-full text-white hover:bg-white/20"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-2 mb-6">
              {NAV_LINKS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={getMobileNavLinkClass}
                  end={item.to === "/"}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="pt-4 border-t border-white/20">
              {user ? (
                <button
                  onClick={handleLogout}
                  type="button"
                  disabled={isLoggingOut}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold bg-white text-[#8CBCC7] hover:bg-pink-100 hover:text-pink-500 shadow transition-all"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  Logout
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold bg-white text-[#8CBCC7] hover:bg-pink-100 hover:text-pink-500 shadow transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  Login
                </NavLink>
              )}
            </div>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
}

export default Navbar;
