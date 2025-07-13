import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import gambar1 from "../../assets/gambar1.webp";

const CONTACT = {
  address: "Kasihan, Kabupaten Bantul, Daerah Istimewa Yogyakarta",
  phone: "+62 812-3456-7890",
  email: "petshop@email.com",
};

export default function ContactView() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSuccess(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSuccess(false), 3000);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <section className="w-full py-16 px-4 bg-[var(--petshop-blue)] text-white text-center relative overflow-hidden mt-10">
        {/* Background Image */}
        <img
          src={gambar1}
          alt="Petshop background"
          className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none select-none"
          style={{ zIndex: 0 }}
        />
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Ada pertanyaan, ingin booking, atau butuh bantuan? Tim kami siap
            membantu Anda!
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-8 mt-8">
            <a
              href={`tel:${CONTACT.phone}`}
              className="flex items-center gap-2 text-lg font-semibold hover:underline justify-center"
            >
              <Phone size={28} /> {CONTACT.phone}
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

      {/* INFO & FORM */}
      <section className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 py-20 px-4">
        {/* Info Cards */}
        <div className="flex flex-col gap-6">
          <div className="bg-white rounded-2xl border-l-8 border-[var(--petshop-blue)] p-6 flex items-center gap-4 shadow">
            <MapPin size={36} className="text-[var(--petshop-blue)]" />
            <div>
              <div className="font-bold text-lg mb-1">Alamat</div>
              <div>{CONTACT.address}</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border-l-8 border-[var(--petshop-pink-accent)] p-6 flex items-center gap-4 shadow">
            <Phone size={36} className="text-[var(--petshop-pink-accent)]" />
            <div>
              <div className="font-bold text-lg mb-1">Telepon</div>
              <div>{CONTACT.phone}</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl border-l-8 border-[var(--petshop-pink-dark)] p-6 flex items-center gap-4 shadow">
            <Mail size={36} className="text-[var(--petshop-pink-dark)]" />
            <div>
              <div className="font-bold text-lg mb-1">Email</div>
              <div>{CONTACT.email}</div>
            </div>
          </div>
        </div>
        {/* Form */}
        <div className="bg-white rounded-3xl shadow-lg p-8 border border-[var(--petshop-blue)] flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-6 text-[var(--petshop-blue)] text-center">
            Kirim Pesan
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block font-semibold mb-1">Nama</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-[var(--petshop-blue)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--petshop-blue)] bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full border border-[var(--petshop-blue)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--petshop-blue)] bg-white"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Pesan</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full border border-[var(--petshop-blue)] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--petshop-blue)] bg-white"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-white bg-[var(--petshop-pink-dark)] hover:bg-[var(--petshop-pink-accent)] transition"
            >
              Kirim Pesan
            </button>
          </form>
          {success && (
            <div className="mt-4 text-green-600 font-semibold text-center">
              Pesan berhasil dikirim!
            </div>
          )}
        </div>
      </section>

      {/* MAPS */}
      <section className="max-w-4xl mx-auto pb-20 px-4">
        <div className="rounded-3xl overflow-hidden shadow-lg">
          <iframe
            title="Buana Petshop Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63241.62981113082!2d110.31295435183905!3d-7.8318930679675125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7af9119d1c2cc5%3A0xaffe62fa56ae8f5a!2sBuana%20PETSHOP%20dan%20KLINIK%203!5e0!3m2!1sid!2sid!4v1752402124371!5m2!1sid!2sid"
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
