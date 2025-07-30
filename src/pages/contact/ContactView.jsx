import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import gambar1 from '../../assets/gambar1.webp';

// Constants
const CONTACT = {
  address: 'Jl. Siluk Panggang, Siuk 1, Selopamioro, Kec. Imogiri, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55782',
  phone: '+6282134346802',
  phoneDisplay1: '0821-3434-6802',
  email: 'buanapetshop19@gmail.com',
  hours: 'Setiap hari 09:00 - 20:00 WIB',
};

const ContactView = () => {
  // State
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    message: '' 
  });
  const [success, setSuccess] = useState(false);

  // Handlers
  const handleChange = (e) => {
    setForm({ 
      ...form, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="w-full py-16 px-4 bg-[var(--petshop-blue)] text-white text-center relative overflow-hidden mt-10">
        <img
          src={gambar1}
          alt="Petshop background"
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Ada pertanyaan, ingin booking, atau butuh bantuan? Tim kami siap membantu Anda!
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8 mt-8">
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-2 text-lg font-semibold hover:underline justify-center"
            >
              <Phone size={28} /> {CONTACT.phoneDisplay1}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-2 text-lg font-semibold hover:underline justify-center"
            >
              <Mail size={28} /> {CONTACT.email}
            </a>
          </div>
        </div>
      </section>

      {/* Contact Info & Form Section */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 py-20 px-4">
        {/* Contact Information Cards */}
        <div className="space-y-6">
          {/* Address Card */}
          <div className="bg-white rounded-2xl border-l-8 border-[var(--petshop-blue)] p-6 flex items-start gap-4 shadow">
            <MapPin size={36} className="text-[var(--petshop-blue)] mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-1">Alamat</h3>
              <p className="text-gray-700">{CONTACT.address}</p>
            </div>
          </div>

          {/* Phone Card */}
          <div className="bg-white rounded-2xl border-l-8 border-[var(--petshop-pink-accent)] p-6 flex items-start gap-4 shadow">
            <Phone size={36} className="text-[var(--petshop-pink-accent)] mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-1">Telepon</h3>
              <a 
                href={`tel:${CONTACT.phone}`}
                className="text-gray-700 hover:text-[var(--petshop-blue)] transition-colors"
              >
                {CONTACT.phoneDisplay1}
              </a>
            </div>
          </div>

          {/* Email Card */}
          <div className="bg-white rounded-2xl border-l-8 border-[var(--petshop-pink-dark)] p-6 flex items-start gap-4 shadow">
            <Mail size={36} className="text-[var(--petshop-pink-dark)] mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-1">Email</h3>
              <a 
                href={`mailto:${CONTACT.email}`}
                className="text-gray-700 hover:text-[var(--petshop-blue)] transition-colors"
              >
                {CONTACT.email}
              </a>
            </div>
          </div>

          {/* Hours Card */}
          <div className="bg-white rounded-2xl border-l-8 border-[var(--petshop-blue-dark)] p-6 flex items-start gap-4 shadow">
            <Clock size={36} className="text-[var(--petshop-blue-dark)] mt-1" />
            <div className="w-full">
              <h3 className="font-bold text-lg mb-3">Jam Operasional</h3>
              <p className="text-gray-700">{CONTACT.hours}</p>
            </div>
          </div>
        </div>
        {/* Contact Form */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-[var(--petshop-blue)]">
          <h2 className="text-2xl font-bold mb-6 text-[var(--petshop-blue)] text-center">
            Kirim Pesan
          </h2>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block font-semibold mb-1 text-gray-700">
                Nama
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--petshop-blue)] focus:border-transparent transition-all"
                placeholder="Nama lengkap Anda"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block font-semibold mb-1 text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--petshop-blue)] focus:border-transparent transition-all"
                placeholder="email@contoh.com"
                required
              />
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block font-semibold mb-1 text-gray-700">
                Pesan
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--petshop-blue)] focus:border-transparent transition-all resize-none"
                placeholder="Tulis pesan Anda di sini..."
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[var(--petshop-blue)] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[var(--petshop-blue-dark)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--petshop-blue)]"
            >
              Kirim Pesan
            </button>

            {/* Success Message */}
            {success && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-center">
                Pesan Anda telah terkirim. Kami akan segera menghubungi Anda!
              </div>
            )}
          </form>
        </div>
      </section>

      {/* MAPS */}
      <section className="max-w-4xl mx-auto pb-20 px-4">
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252982.0530239896!2d110.21211512311547!3d-7.806272877433629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a5551b5a15a07%3A0x55297fa1daf66ade!2sBuana%20klinik%20dan%20petshop!5e0!3m2!1sid!2sid!4v1753709387012!5m2!1sid!2sid"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
