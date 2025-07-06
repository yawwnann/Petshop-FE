import React, { useEffect } from "react";
import { HeartHandshake, Smile, Award, Users, Star, Heart } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Import images from assets
import gambar1 from "../../assets/gambar1.jpg";
import gambar2 from "../../assets/gambar2.jpg";
import gambar3 from "../../assets/gambar3.jpg";

import dokter1 from "../../assets/dokter1.png";
import dokter2 from "../../assets/dokter2.png";
import dokter3 from "../../assets/dokter3.png";

const TEAM = [
  {
    name: "Dr. Rahayu",
    role: "PET INSTRUCTOR",
    img: dokter1,
    specialty: "Veterinary Medicine",
    experience: "8+ years",
  },
  {
    name: "Dr. Ninik",
    role: "PET INSTRUCTOR",
    img: dokter2,
    specialty: "Animal Behavior",
    experience: "6+ years",
  },
  {
    name: "Dr. Yuli",
    role: "ASSISTANT",
    img: dokter3,
    specialty: "Pet Grooming",
    experience: "4+ years",
  },
];

const VALUES = [
  {
    icon: Smile,
    title: "YOUR SATISFACTION",
    description:
      "We understand that entrusting your beloved pet to someone else is not an easy thing. Therefore, we always strive to provide the best service—not only for your pet, but also for you as a caring owner.",
    color: "from-[#8CBCC7] to-[#6BA4B0]",
  },
  {
    icon: Award,
    title: "FUN ACTIVITIES",
    description:
      "We provide a variety of fun activities to keep your pets active, happy and stress-free. From play sessions to relaxing times, everything is designed to keep them happy throughout the day.",
    color: "from-[#6BA4B0] to-[#8CBCC7]",
  },
  {
    icon: HeartHandshake,
    title: "SERVICE WITH HEART",
    description:
      "We are not just here for today. With a professional team and a sincere spirit of service, we are ready to be your partner in caring for your beloved furry friends for the long term.",
    color: "from-[#8CBCC7] to-[#5A8A96]",
  },
];

export default function AboutUs() {
  useEffect(() => {
    AOS.init({ once: true, duration: 700 });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8CBCC7]/10 via-white to-[#6BA4B0]/10">
      {/* Hero Section */}
      <div className="relative min-h-[320px] flex items-center justify-center overflow-hidden mb-16">
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

        {/* Additional background elements */}
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
                About Buana Petshop
              </h1>
              <p className="text-xl text-white max-w-3xl mx-auto drop-shadow-lg">
                Where every pet is family, and every moment is filled with love
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-12">
        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 relative">
          {/* Background decoration */}
          <div className="absolute top-0 left-1/4 opacity-10">
            <img
              src={gambar1}
              alt=""
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>

          <div className="order-2 lg:order-1" data-aos="fade-up">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-300 relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="text-[#8CBCC7]" size={32} />
                <h2 className="text-3xl font-bold bg-gradient-to-r from-[#8CBCC7] to-[#6BA4B0] bg-clip-text text-transparent">
                  Our Story
                </h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                At Buana Petshop, we believe that every pet is part of the
                family. With love, we create a safe, comfortable, and fun
                environment for your furry friends.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our team not only cares for, but also interacts and understands
                the unique needs of each animal. From playing, feeding, to
                grooming and health services, we are here to ensure their
                happiness when you are not by their side.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2" data-aos="fade-up">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#8CBCC7]/30 to-[#6BA4B0]/30 rounded-3xl transform rotate-6"></div>
              <img
                src={gambar2}
                alt="Buana Petshop Team"
                className="relative rounded-3xl shadow-2xl w-full h-96 object-cover transform hover:scale-105 transition-transform duration-300 z-10"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20 relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 opacity-10">
            <img
              src={gambar3}
              alt=""
              className="w-48 h-48 rounded-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 opacity-10">
            <img
              src={gambar1}
              alt=""
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>

          <div className="text-center mb-12 relative z-10" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our{" "}
              <span className="bg-gradient-to-r from-[#8CBCC7] to-[#6BA4B0] bg-clip-text text-transparent">
                Values
              </span>
            </h2>
            <p className="text-xl text-gray-600">What makes us different</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {VALUES.map((value, idx) => (
              <div key={idx} className="group" data-aos="fade-up">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full relative z-10">
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <value.icon className="text-white" size={28} />
                  </div>
                  <h3 className="font-bold text-xl bg-gradient-to-r from-[#8CBCC7] to-[#6BA4B0] bg-clip-text text-transparent mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20 relative">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 opacity-10">
            <img
              src={gambar2}
              alt=""
              className="w-40 h-40 rounded-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 opacity-10">
            <img
              src={gambar3}
              alt=""
              className="w-36 h-36 rounded-full object-cover"
            />
          </div>

          <div className="text-center mb-12 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-[#8CBCC7] to-[#6BA4B0] bg-clip-text text-transparent">
                Expert Team
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Dedicated professionals who love what they do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {TEAM.map((member, idx) => (
              <div key={idx} className="group" data-aos="fade-up">
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center relative z-10">
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#8CBCC7]/30 to-[#6BA4B0]/30 rounded-full transform group-hover:scale-110 transition-transform duration-300"></div>
                    <img
                      src={member.img}
                      alt={member.name}
                      className="relative w-32 h-32 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                    />
                  </div>
                  <h3 className="font-bold text-xl text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-[#8CBCC7] font-semibold mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-1">
                    {member.specialty}
                  </p>
                  <p className="text-gray-500 text-xs">{member.experience}</p>
                  <div className="flex justify-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-[#8CBCC7] fill-current"
                        size={16}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Story Section */}
        <div
          className="relative bg-gradient-to-r from-[#8CBCC7]/10 to-[#6BA4B0]/10 rounded-3xl p-8 md:p-12 border border-[#8CBCC7]/30 overflow-hidden"
          data-aos="fade-up"
        >
          {/* Background decoration */}
          <div className="absolute top-0 right-0 opacity-5">
            <img
              src={gambar1}
              alt=""
              className="w-64 h-64 rounded-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 opacity-5">
            <img
              src={gambar3}
              alt=""
              className="w-48 h-48 rounded-full object-cover"
            />
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-[#8CBCC7] to-[#6BA4B0] bg-clip-text text-transparent mb-6">
              A Story of Dedication
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6 relative z-10">
              Robert is a NYC native from the Upper East Side and takes care of
              our pups in Pawsitive Pet Hotel & Spa in Astoria, Queens.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed relative z-10">
              He grew up with hamsters, fish and cats. In his free time, he
              helps to read, explore and do photography. He set up Help a
              Homeless Dog which is a charity that collects food, sleeping bags
              and donation for dogs living on the streets, distributes vital
              items himself or via a distress shelter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
