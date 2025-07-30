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

import gambar1 from "../../../assets/hero-dashboard.webp";
import AOS from "aos";
import "aos/dist/aos.css";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function DashboardView() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ once: true, duration: 700 });
  }, []);

  const handleMulaiKonsultasi = () => {
    navigate("/konsultasi");
  };

  const handleLihatLayanan = () => {
    navigate("/service");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <section
        className="relative w-full min-h-[300px] md:min-h-[480px] lg:min-h-[800px] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "var(--petshop-blue)" }}
      >
        <img
          src={gambar1}
          alt="Petshop Banner"
          className="absolute inset-0 w-full h-full object-cover object-[20%] md:object-center z-0"
        />
        <div className="relative z-20 w-full max-w-7xl mx-auto flex flex-col items-center md:items-end text-center md:text-right text-white py-24 px-6">
          <h1
            className="text-5xl md:text-7xl font-bold mb-8 tracking-tight drop-shadow-lg mx-auto md:ml-auto md:mr-0"
            data-aos="fade-left"
          >
            Buana Petshop
          </h1>
          <p
            className="text-xl md:text-2xl mb-12 opacity-95 font-light drop-shadow max-w-3xl mx-auto md:ml-auto md:mr-0 leading-relaxed"
            data-aos="fade-left"
            data-aos-delay="150"
          >
            Solusi terpercaya untuk kesehatan & kebahagiaan hewan peliharaan
            Anda
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center md:justify-end mx-auto md:ml-auto md:mr-0">
            <button
              onClick={handleMulaiKonsultasi}
              style={{ backgroundColor: "var(--petshop-pink-dark)" }}
              className="px-10 py-4 rounded-full font-semibold text-white hover:opacity-90 hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl active:shadow-md transform"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Mulai Konsultasi
            </button>
            <button
              onClick={handleLihatLayanan}
              style={{
                backgroundColor: "transparent",
                border: "3px solid white",
                color: "white",
              }}
              className="px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-[var(--petshop-blue)] hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl active:shadow-md transform"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              Lihat Layanan
            </button>
          </div>
        </div>
      </section>

      {/* LAYANAN SECTION */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-[var(--petshop-pink-dark)] mb-6">
              Layanan Kami
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Pelayanan terbaik untuk sahabat berbulu Anda
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Stethoscope size={40} />,
                title: "Konsultasi Dokter",
                desc: "Konsultasi kesehatan online & offline dengan dokter hewan berpengalaman",
                color: "var(--petshop-blue)",
                bg: "var(--petshop-blue)",
              },
              {
                icon: <Dog size={40} />,
                title: "Grooming",
                desc: "Perawatan lengkap untuk hewan kesayangan dengan peralatan modern",
                color: "var(--petshop-pink-accent)",
                bg: "var(--petshop-pink)",
              },
              {
                icon: <Cat size={40} />,
                title: "Penitipan",
                desc: "Penitipan aman dengan pengawasan profesional 24/7",
                color: "var(--petshop-blue)",
                bg: "var(--petshop-blue-light)",
              },
              {
                icon: <HeartHandshake size={40} />,
                title: "Adopsi",
                desc: "Bantu hewan menemukan rumah baru yang penuh kasih sayang",
                color: "var(--petshop-pink-dark)",
                bg: "var(--petshop-pink-accent)",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl hover:shadow-xl transition-all group cursor-pointer border-4 hover:border-opacity-50"
                style={{ borderColor: item.bg }}
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div
                  style={{
                    color: "white",
                    backgroundColor: item.bg,
                  }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-transform"
                >
                  {item.icon}
                </div>
                <h3 className="font-bold text-2xl mb-4 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {item.desc}
                </p>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EDUKASI SECTION */}
      <section
        className="py-24 px-6"
        style={{ backgroundColor: "var(--petshop-blue-light)" }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-[var(--petshop-pink-dark)] mb-6">
              Edukasi Kesehatan
            </h2>
            <p className="text-gray-700 text-xl max-w-2xl mx-auto">
              Tips penting untuk merawat hewan peliharaan
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: <Syringe size={48} />,
                title: "Vaksinasi Rutin",
                desc: "Lindungi hewan dari penyakit menular dengan jadwal vaksinasi yang tepat dan teratur",
                color: "var(--petshop-blue)",
              },
              {
                icon: <Utensils size={48} />,
                title: "Nutrisi Seimbang",
                desc: "Berikan makanan bergizi sesuai kebutuhan spesies dan usia hewan peliharaan",
                color: "var(--petshop-pink-accent)",
              },
              {
                icon: <PawPrint size={48} />,
                title: "Kebersihan Harian",
                desc: "Jaga kebersihan hewan dan lingkungan untuk kesehatan optimal setiap hari",
                color: "var(--petshop-pink-dark)",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-10 rounded-3xl shadow-lg hover:shadow-xl transition-all"
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
                <div
                  style={{
                    backgroundColor: item.color,
                    color: "white",
                  }}
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 mx-auto"
                >
                  {item.icon}
                </div>
                <h3 className="font-bold text-2xl mb-4 text-gray-900 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-center text-lg">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONI SECTION */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-[var(--petshop-pink-dark)] mb-6">
              Kata Mereka
            </h2>
            <p className="text-gray-600 text-xl max-w-2xl mx-auto">
              Testimoni dari pelanggan yang puas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Rina",
                location: "Yogyakarta",
                text: "Setelah rutin vaksin dan perawatan, kucing saya jadi lebih sehat dan aktif! Pelayanannya sangat memuaskan.",
                color: "var(--petshop-blue)",
              },
              {
                name: "Budi",
                location: "Yogyakarta",
                text: "Tips nutrisinya sangat bermanfaat, anjing saya sekarang lebih lahap makan dan terlihat lebih sehat.",
                color: "var(--petshop-pink-accent)",
              },
              {
                name: "Sari",
                location: "Yogyakarta",
                text: "Dashboard ini sangat membantu, edukasinya mudah dipahami. Tim yang profesional!",
                color: "var(--petshop-pink-dark)",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-3xl border-l-8 hover:shadow-lg transition-all"
                style={{ borderColor: testimonial.color }}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      style={{ color: "var(--petshop-pink-accent)" }}
                      className="fill-current"
                      size={20}
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 italic text-lg leading-relaxed">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                    style={{ backgroundColor: testimonial.color }}
                  >
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-500 text-sm">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section
        className="py-24 px-6"
        style={{ backgroundColor: "var(--petshop-pink)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-[var(--petshop-pink-dark)] mb-6">
              Pertanyaan Umum
            </h2>
            <p className="text-gray-700 text-xl max-w-2xl mx-auto">
              Jawaban untuk pertanyaan yang sering diajukan
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                q: "Bagaimana cara booking layanan grooming?",
                a: "Anda bisa booking melalui aplikasi/website atau langsung datang ke cabang terdekat. Tim kami siap membantu Anda.",
              },
              {
                q: "Apakah konsultasi dokter hewan berbayar?",
                a: "Tersedia konsultasi gratis & berbayar, tergantung promo dan jenis layanan yang Anda pilih.",
              },
              {
                q: "Bagaimana cara adopsi hewan?",
                a: "Lihat daftar hewan adopsi, isi formulir dan tunggu verifikasi tim kami. Proses adopsi dilakukan dengan prosedur yang ketat.",
              },
              {
                q: "Apakah penitipan hewan aman?",
                a: "Penitipan dijaga staf profesional dengan update harian via WhatsApp. Fasilitas kami dilengkapi CCTV dan dokter hewan standby.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-sm hover:shadow-md transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex items-start gap-6">
                  <div
                    style={{ backgroundColor: "var(--petshop-blue)" }}
                    className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  >
                    <HelpCircle className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 text-xl">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {faq.a}
                    </p>
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
