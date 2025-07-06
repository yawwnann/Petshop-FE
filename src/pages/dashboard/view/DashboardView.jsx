import { DashboardPresenter } from "../presenter/DashboardPresenter";
import {
  CheckCircleIcon,
  ShoppingCartIcon,
  TruckIcon,
  TagIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

import {
  Stethoscope,
  Utensils,
  PawPrint,
  User,
  Star,
  HeartHandshake,
  Dog,
  Cat,
  Mail,
  HelpCircle,
  Syringe,
  ArrowRight,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

import gambar1 from "../../../assets/gambar1.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";

export default function DashboardView() {
  useEffect(() => {
    AOS.init({ once: true, duration: 700 });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* 1. HERO SECTION - Background Image */}
      <section className="relative w-full min-h-[340px] md:min-h-[480px] flex items-center justify-center overflow-hidden">
        <img
          src={gambar1}
          alt="Petshop Banner"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#8CBCC7]/80 to-[#6BA4B0]/80 z-10" />
        <div className="relative z-20 w-full max-w-4xl mx-auto text-center text-white py-20 px-4 flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight drop-shadow-lg">
            Buana Petshop
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 font-light drop-shadow">
            Solusi terpercaya untuk kesehatan & kebahagiaan hewan peliharaan
            Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#8CBCC7] px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors">
              Mulai Konsultasi
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-[#8CBCC7] transition-colors">
              Lihat Layanan
            </button>
          </div>
        </div>
      </section>

      {/* 2. LAYANAN SECTION - Modern Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Layanan Kami
            </h2>
            <p className="text-gray-600 text-lg">
              Pelayanan terbaik untuk sahabat berbulu Anda
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Card 1 dengan gambar2 */}
            <div
              className="bg-[#8CBCC7]/5 p-8 rounded-2xl hover:shadow-lg transition-shadow group cursor-pointer flex flex-col items-center"
              data-aos="fade-up"
            >
              <div className="text-[#8CBCC7] mb-4 group-hover:scale-110 transition-transform">
                <Stethoscope size={32} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">
                Konsultasi Dokter
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                Konsultasi kesehatan online & offline
              </p>
              {/* <img
                src={gambar1}
                alt="Konsultasi"
                className="rounded-xl shadow w-full max-w-[120px] mt-2"
              /> */}
              <div className="text-[#8CBCC7] flex items-center text-sm font-semibold mt-4">
                Pelajari lebih lanjut <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
            {/* Card 2-4 tetap icon */}
            <div
              className="bg-pink-50 p-8 rounded-2xl hover:shadow-lg transition-shadow group cursor-pointer flex flex-col items-center"
              data-aos="fade-up"
            >
              <div className="text-pink-500 mb-4 group-hover:scale-110 transition-transform">
                <Dog size={32} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Grooming</h3>
              <p className="text-gray-600 mb-4 text-center">
                Perawatan lengkap untuk hewan kesayangan
              </p>
              <div className="text-pink-500 flex items-center text-sm font-semibold mt-4">
                Pelajari lebih lanjut <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
            <div
              className="bg-[#8CBCC7]/5 p-8 rounded-2xl hover:shadow-lg transition-shadow group cursor-pointer flex flex-col items-center"
              data-aos="fade-up"
            >
              <div className="text-[#8CBCC7] mb-4 group-hover:scale-110 transition-transform">
                <Cat size={32} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">
                Penitipan
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                Penitipan aman dengan pengawasan profesional
              </p>
              <div className="text-[#8CBCC7] flex items-center text-sm font-semibold mt-4">
                Pelajari lebih lanjut <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
            <div
              className="bg-pink-50 p-8 rounded-2xl hover:shadow-lg transition-shadow group cursor-pointer flex flex-col items-center"
              data-aos="fade-up"
            >
              <div className="text-pink-500 mb-4 group-hover:scale-110 transition-transform">
                <HeartHandshake size={32} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Adopsi</h3>
              <p className="text-gray-600 mb-4 text-center">
                Bantu hewan menemukan rumah baru
              </p>
              <div className="text-pink-500 flex items-center text-sm font-semibold mt-4">
                Pelajari lebih lanjut <ArrowRight size={16} className="ml-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. EDUKASI SECTION - Clean Cards */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Edukasi Kesehatan
            </h2>
            <p className="text-gray-600 text-lg">
              Tips penting untuk merawat hewan peliharaan
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 dengan gambar3 */}
            <div
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
              data-aos="fade-up"
            >
              <div className="text-[#8CBCC7] mb-4">
                <Syringe size={40} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">
                Vaksinasi Rutin
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Lindungi hewan dari penyakit menular dengan jadwal vaksinasi
                yang tepat
              </p>
              {/* <img
                src={gambar1}
                alt="Vaksinasi"
                className="rounded-xl shadow w-full max-w-[120px] mt-2"
              /> */}
            </div>
            {/* Card 2-3 tetap icon */}
            <div
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
              data-aos="fade-up"
            >
              <div className="text-pink-500 mb-4">
                <Utensils size={40} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">
                Nutrisi Seimbang
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Berikan makanan bergizi sesuai kebutuhan spesies dan usia hewan
              </p>
            </div>
            <div
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col items-center"
              data-aos="fade-up"
            >
              <div className="text-[#8CBCC7] mb-4">
                <PawPrint size={40} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">
                Kebersihan Harian
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Jaga kebersihan hewan dan lingkungan untuk kesehatan optimal
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TESTIMONI SECTION - Modern Layout */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Kata Mereka
            </h2>
            <p className="text-gray-600 text-lg">
              Testimoni dari pelanggan yang puas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rina",
                location: "Surabaya",
                text: "Setelah rutin vaksin dan perawatan, kucing saya jadi lebih sehat dan aktif!",
                color: "border-[#8CBCC7]",
              },
              {
                name: "Budi",
                location: "Jakarta",
                text: "Tips nutrisinya sangat bermanfaat, anjing saya sekarang lebih lahap makan.",
                color: "border-pink-500",
              },
              {
                name: "Sari",
                location: "Bandung",
                text: "Dashboard ini sangat membantu, edukasinya mudah dipahami. Terima kasih!",
                color: "border-[#8CBCC7]",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className={`bg-white p-8 rounded-2xl border-l-4 ${testimonial.color} shadow-sm`}
                data-aos="fade-up"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-yellow-400 fill-current"
                      size={16}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                    <User size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION - Minimal */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pertanyaan Umum
            </h2>
            <p className="text-gray-600 text-lg">
              Jawaban untuk pertanyaan yang sering diajukan
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Bagaimana cara booking layanan grooming?",
                a: "Anda bisa booking melalui aplikasi/website atau langsung datang ke cabang terdekat.",
              },
              {
                q: "Apakah konsultasi dokter hewan berbayar?",
                a: "Tersedia konsultasi gratis & berbayar, tergantung promo dan jenis layanan.",
              },
              {
                q: "Bagaimana cara adopsi hewan?",
                a: "Lihat daftar hewan adopsi, isi formulir dan tunggu verifikasi tim kami.",
              },
              {
                q: "Apakah penitipan hewan aman?",
                a: "Penitipan dijaga staf profesional dengan update harian via WhatsApp.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm"
                data-aos="fade-up"
              >
                <div className="flex items-start gap-4">
                  <HelpCircle
                    className="text-[#8CBCC7] mt-1 flex-shrink-0"
                    size={20}
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
