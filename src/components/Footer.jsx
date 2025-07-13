import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{ background: "#598c96" }}
      className="pt-10 pb-6 px-4 sm:px-8 lg:px-16 text-white"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
        {/* Logo & Deskripsi */}
        <div className="flex flex-col items-center md:items-start gap-3 mb-6 md:mb-0">
          <div className="flex items-center gap-2 mb-3">
            <img
              src={logo}
              alt="Buana Petshop Logo"
              className="h-10 w-10 rounded-full bg-white shadow border-2 border-white"
            />
            <span className="text-2xl font-bold tracking-widest">
              Buana Petshop
            </span>
          </div>
          <p className="text-sm text-white/80 max-w-xs text-center md:text-left">
            Buana Petshop menyediakan kebutuhan hewan peliharaan Anda dengan
            produk terbaik, harga terjangkau, dan layanan ramah. Temukan hewan,
            makanan, aksesoris, dan perawatan di satu tempat!
          </p>
          <div className="flex items-center gap-3 mt-3">
            <a
              href="#"
              title="Instagram"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#8CBCC7] hover:bg-white/30 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25"
                />
              </svg>
            </a>
            <a
              href="#"
              title="Facebook"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#8CBCC7] hover:bg-white/30 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
              </svg>
            </a>
            <a
              href="#"
              title="WhatsApp"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-[#8CBCC7] hover:bg-white/30 transition-colors duration-200"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M16.6 14.2c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.7.8-.8.9-.1.1-.3.2-.5.1-.3-.1-1-.4-1.9-.9-.7-.7-1.2-1.5-1.3-1.8-.1-.2 0-.4.1-.5l.4-.5c.1-.1.2-.2.3-.3.1-.1.1-.2.1-.3s0-.4-.1-.5L8 7.8C7.8 7.3 7.6 7 7.4 7c-.1 0-.3.1-.5.1h-.5c-.2 0-.5.2-.6.7-.1.5-.7 2.2.2 4.1.8 1.6 2.1 3.1 3.7 4.1 1.9 1 2.8.9 3.7.8.4 0 1.3-.6 1.5-1.1.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.5-.3zM12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"></path>
              </svg>
            </a>
          </div>
        </div>
        {/* Link Navigasi */}
        <div>
          <p className="text-xs font-semibold tracking-widest text-white/60 uppercase mb-3">
            Perusahaan
          </p>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-white/90 hover:underline hover:text-[#8CBCC7] transition-colors duration-200"
              >
                Tentang Kami
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white/90 hover:underline hover:text-[#8CBCC7] transition-colors duration-200"
              >
                Cara Pesan
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white/90 hover:underline hover:text-[#8CBCC7] transition-colors duration-200"
              >
                Katalog Produk
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white/90 hover:underline hover:text-[#8CBCC7] transition-colors duration-200"
              >
                Hubungi Kami
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-widest text-white/60 uppercase mb-3">
            Bantuan
          </p>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-white/90 hover:underline hover:text-[#8CBCC7] transition-colors duration-200"
              >
                Tanya Jawab (FAQ)
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white/90 hover:underline hover:text-[#8CBCC7] transition-colors duration-200"
              >
                Syarat &amp; Ketentuan
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white/90 hover:underline hover:text-[#8CBCC7] transition-colors duration-200"
              >
                Kebijakan Privasi
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-white/90 hover:underline hover:text-[#8CBCC7] transition-colors duration-200"
              >
                Lacak Pengiriman
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-white/20 text-center text-white/70 text-xs">
        © {currentYear} Buana Petshop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
