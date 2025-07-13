import React, { useEffect } from "react";
import { CheckCircle, Stethoscope, Home, Award, PawPrint } from "lucide-react";
import { useNavigate } from "react-router-dom";
import gambar1 from "../../assets/gambar1.webp";
import gambar2 from "../../assets/gambar2.webp";
import gambar3 from "../../assets/gambar3.webp";
import dokter1 from "../../assets/dokter1.png";
import dokter2 from "../../assets/dokter2.png";
import AOS from "aos";
import "aos/dist/aos.css";

const SERVICES = [
  {
    icon: <PawPrint className="text-white w-10 h-10" />,
    title: "Grooming",
    points: [
      "Seamlessly enhancing pet appearance and comfort",
      "Provide pet wellness through expert handling",
      "Efficiently maintaining hygiene and style",
    ],
    img: gambar1,
  },
  {
    icon: <Award className="text-white w-10 h-10" />,
    title: "Vaccination",
    points: [
      "Maintain health with pet immunization coverage",
      "Prevent disease proactively with precision",
      "Provide timely and reliable vaccination services",
    ],
    img: gambar2,
  },
  {
    icon: <Stethoscope className="text-white w-10 h-10" />,
    title: "Medical Examination",
    points: [
      "Thoroughly assessing pet well-being",
      "Collaboratively managing health risks",
      "Efficiently delivering accurate diagnostic insights",
    ],
    img: gambar3,
  },
  {
    icon: <Home className="text-white w-10 h-10" />,
    title: "Pet Boarding",
    points: [
      "Providing secure and caring stay solutions",
      "Empowering pet comfort with attentive care",
      "Collaboratively ensuring peace of mind for owners",
    ],
    img: gambar2, // Using gambar2 for consistency in demo, consider unique image
  },
];

const PRICES = [
  {
    title: "GROOMING KUTU + JAMUR KITTEN",
    price: "20K",
    highlight: true,
    desc: `This grooming service for kittens includes bathing, fur brushing, ear cleaning, nail trimming, and dental care. It also covers flea and fungus treatment to ensure your kitten stays clean, healthy, and comfortable.`,
  },
  {
    title: "GROOMING KUTU + JAMUR ADULT",
    price: "40K",
    highlight: true,
    desc: `This adult cat grooming package includes bathing, fur brushing, ear cleaning, nail trimming, and dental care. Flea and fungus treatment is also provided to maintain your cat's hygiene, health, and overall well-being.`,
  },
  {
    title: "VACCINATION",
    price: "180K",
    desc: `Vaccination protects cats from dangerous diseases by boosting their immune system. It helps prevent infections like rabies, flu, and other viruses.`,
  },
  {
    title: "MEDICAL EXAMINATION",
    price: "50K",
    desc: `We assess pet well-being thoroughly, manage health risks with owners, and provide fast, accurate diagnostics for effective care.`,
  },
];

export default function ServiceView() {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ once: true, duration: 700 });
  }, []);

  const handleMulaiKonsultasi = () => {
    navigate("/konsultasi");
  };

  const handleLihatLayanan = () => {
    navigate("/katalog");
  };

  return (
    <div className="min-h-screen mt-10 bg-gray-50 pb-16">
      {/* Hero Section */}
      <div className="relative min-h-[320px] flex items-center justify-center overflow-hidden mb-16">
        <img
          src={gambar2}
          alt="Service Hero"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-[#6BA4B0]/60 z-10" />
        <div className="relative z-20 text-center py-16 px-4">
          <h1 className="text-5xl font-extrabold text-white drop-shadow mb-4">
            Our Services & Pricing
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Discover the comprehensive care we offer for your beloved pets, from
            grooming to medical examinations, all at transparent prices.
          </p>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleMulaiKonsultasi}
              className="group relative px-8 py-4 bg-white text-[#6BA4B0] font-bold rounded-2xl shadow-lg hover:shadow-xl active:shadow-md transform hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white hover:bg-[#6BA4B0] hover:text-white"
            >
              <span className="flex items-center gap-2">
                <Stethoscope className="w-5 h-5" />
                Mulai Konsultasi
              </span>
            </button>

            <button
              onClick={handleLihatLayanan}
              className="group relative px-8 py-4 bg-transparent text-white font-bold rounded-2xl shadow-lg hover:shadow-xl active:shadow-md transform hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white hover:bg-white hover:text-[#6BA4B0]"
            >
              <span className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Lihat Layanan
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Services Section */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-[#6BA4B0] mb-12 text-center tracking-tight">
            Comprehensive Pet Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="group relative overflow-hidden rounded-3xl bg-white shadow-xl p-7 flex flex-col items-center justify-between text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-gray-100"
                data-aos="fade-up"
              >
                {/* Image Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30 transition-opacity duration-300 group-hover:opacity-10"
                  style={{ backgroundImage: `url(${service.img})` }}
                />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center">
                  <div className="bg-[#6BA4B0] p-4 rounded-full shadow-lg mb-5 transform group-hover:rotate-6 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="font-extrabold text-2xl text-[#6BA4B0] mb-3 leading-tight">
                    {service.title}
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm list-none p-0">
                    {service.points.map((point, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 justify-center"
                      >
                        <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prices Section */}
        <div className="relative">
          {/* Dekorasi lingkaran gambar hewan */}
          <div className="absolute -top-10 -left-10 opacity-20 z-0">
            <img
              src={gambar1}
              alt="dekorasi"
              className="w-28 h-28 rounded-full object-cover"
            />
          </div>
          <div className="absolute -bottom-10 right-0 opacity-20 z-0">
            <img
              src={gambar2}
              alt="dekorasi"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
          <div className="absolute top-1/2 -right-16 opacity-10 z-0">
            <img
              src={dokter1}
              alt="dekorasi"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-1/2 opacity-10 z-0">
            <img
              src={dokter2}
              alt="dekorasi"
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>

          <h2 className="text-4xl font-bold text-[#6BA4B0] mb-12 text-center tracking-tight relative z-10">
            Transparent Pricing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
            {PRICES.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl p-7 shadow-lg transition-all duration-300 hover:shadow-xl border border-[#6BA4B0] bg-white scale-[1.02]"
                data-aos="fade-up"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-extrabold text-xl md:text-2xl tracking-wide text-[#6BA4B0]">
                    {item.title}
                  </h3>
                  <span className="font-extrabold text-2xl md:text-4xl text-[#6BA4B0] tracking-tighter">
                    {item.price}
                  </span>
                </div>
                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
