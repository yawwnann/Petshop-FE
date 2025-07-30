import React from "react";
import logo from "../assets/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#598c96] text-white">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src={logo} 
                alt="Buana Petshop" 
                className="h-12 w-12 rounded-full bg-white p-1"
              />
              <h3 className="text-2xl font-bold">Buana Petshop</h3>
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              Menyediakan kebutuhan hewan peliharaan Anda dengan produk terbaik, harga terjangkau, dan layanan ramah.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="mailto:buanapetshop@gmail.com" 
                className="text-white/80 hover:text-white transition-colors"
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
              <a 
                href="https://wa.me/6282134346802" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.963-.94 1.16-.174.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.795-1.484-1.784-1.66-2.087-.173-.297-.018-.458.13-.606.136-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.005-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.015a7.937 7.937 0 01-4.26-1.244l-.319-.193-3.549.929.946-3.462-.224-.34a8.018 8.018 0 01-1.228-4.28 8.08 8.08 0 012.54-5.9 8.215 8.215 0 015.83-2.354 8.1 8.1 0 015.77 13.75 8.02 8.02 0 01-5.77 2.354"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-white/80 hover:text-white transition-colors">Tentang Kami</a></li>
              <li><a href="/service" className="text-white/80 hover:text-white transition-colors">Layanan</a></li>
              <li><a href="/katalog" className="text-white/80 hover:text-white transition-colors">Produk</a></li>
              <li><a href="/contact" className="text-white/80 hover:text-white transition-colors">Kontak</a></li>
            </ul>
          </div>

        

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Jam Operasional</h4>
            <ul className="space-y-2 text-white/80">
              <li className="flex justify-between">
                <span>Senin - Jumat</span>
                <span>08:00 - 21:00 WIB</span>
              </li>
              <li className="flex justify-between">
                <span>Sabtu - Minggu</span>
                <span>09:00 - 20:00 WIB</span>
              </li>
              <li className="flex justify-between">
                <span>Hari Libur</span>
                <span>10:00 - 18:00 WIB</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-white/60 text-sm">
              © {currentYear} Buana Petshop. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
