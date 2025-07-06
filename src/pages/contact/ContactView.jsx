import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import gambar1 from "../../assets/gambar1.jpg";
import gambar2 from "../../assets/gambar2.jpg";
import gambar3 from "../../assets/gambar3.jpg";
import dokter1 from "../../assets/dokter1.png";
import dokter2 from "../../assets/dokter2.png";

const CONTACT = {
  address: "Kasihan, Kabupaten Bantul, Daerah Istimewa Yogyakarta",
  phones: ["+971 4 8848847", "+971 4 8848849"],
  email: "buana@gmail.com",
  opening: ["Weekdays: 9:00am – 5.00pm", "Weekends: 9:00am – 12:00pm"],
  pickup: [
    "Weekdays: 9:30am – 11:00am and 4:00pm – 5:00pm",
    "Weekdays: 9:30am – 11:00am",
  ],
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
    <div className="min-h-screen bg-gradient-to-br from-[#8CBCC7]/10 via-white to-[#6BA4B0]/10">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${gambar2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#8CBCC7]/80 to-[#6BA4B0]/80"></div>
        </div>
        {/* Dekorasi lingkaran */}
        <div className="absolute top-10 right-10 opacity-20">
          <img
            src={gambar1}
            alt=""
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        <div className="absolute bottom-10 left-10 opacity-20">
          <img
            src={gambar3}
            alt=""
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <div className="relative px-4 md:px-12 py-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                Contact Us
              </h1>
              <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-lg">
                Reach out to us for any questions, bookings, or just to say
                hello!
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-16 relative grid md:grid-cols-2 gap-16 items-start">
        {/* Dekorasi lingkaran tambahan */}
        <div className="absolute top-0 left-1/4 opacity-10 pointer-events-none">
          <img
            src={gambar1}
            alt=""
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <img
            src={gambar3}
            alt=""
            className="w-48 h-48 rounded-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 left-0 opacity-10 pointer-events-none">
          <img
            src={dokter1}
            alt=""
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        <div className="absolute bottom-0 right-1/4 opacity-10 pointer-events-none">
          <img
            src={dokter2}
            alt=""
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        {/* Left: Info & Maps */}
        <div className="flex flex-col gap-8">
          {/* Maps */}
          <div className="rounded-3xl overflow-hidden mb-2 shadow-lg">
            <iframe
              title="Buana Petshop Location"
              src="https://www.google.com/maps?q=Kasihan,+Kabupaten+Bantul,+Daerah+Istimewa+Yogyakarta&output=embed"
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          {/* Info Section */}
          <div className="flex flex-col gap-4">
            <div className="bg-white/70 border border-[#8CBCC7] rounded-2xl px-6 py-5 flex items-start gap-4">
              <MapPin className="w-7 h-7 text-[#6BA4B0] mt-1" />
              <div>
                <div className="font-bold text-lg">Address</div>
                <div className="text-gray-700 leading-snug">
                  {CONTACT.address}
                </div>
              </div>
            </div>
            <div className="bg-white/70 border border-[#8CBCC7] rounded-2xl px-6 py-5 flex items-start gap-4">
              <Phone className="w-7 h-7 text-[#6BA4B0] mt-1" />
              <div>
                <div className="font-bold text-lg">Telephone</div>
                <div className="text-gray-700 leading-snug">
                  {CONTACT.phones.map((p) => (
                    <div key={p}>{p}</div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-white/70 border border-[#8CBCC7] rounded-2xl px-6 py-5 flex items-start gap-4">
              <Mail className="w-7 h-7 text-[#6BA4B0] mt-1" />
              <div>
                <div className="font-bold text-lg">E-mail</div>
                <div className="text-gray-700 leading-snug">
                  {CONTACT.email}
                </div>
              </div>
            </div>
            <div className="bg-white/70 border border-[#8CBCC7] rounded-2xl px-6 py-5">
              <div className="font-bold text-lg mb-1 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#6BA4B0]" /> Opening Hours
              </div>
              <div className="text-gray-700">
                {CONTACT.opening.map((o) => (
                  <div key={o}>{o}</div>
                ))}
              </div>
              <div className="font-bold text-lg mt-4 mb-1">
                Pickup and Collection Times
              </div>
              <div className="text-gray-700">
                {CONTACT.pickup.map((p) => (
                  <div key={p}>{p}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Right: Email Form */}
        <div className="flex flex-col justify-center">
          <div className="bg-[#E0F2F7]/80 border border-[#8CBCC7] rounded-3xl px-8 py-10 shadow-md w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-[#6BA4B0] mb-6 text-center">
              Contact Us
            </h2>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="block font-semibold mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-[#6BA4B0] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6BA4B0] bg-white/80"
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
                  className="w-full border border-[#6BA4B0] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6BA4B0] bg-white/80"
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full border border-[#6BA4B0] rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6BA4B0] bg-white/80"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#6BA4B0] text-white font-bold py-2 rounded-lg hover:bg-[#8CBCC7] transition-colors"
              >
                Send Email
              </button>
              {success && (
                <div className="text-green-600 font-semibold text-center mt-2">
                  Email sent successfully!
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
