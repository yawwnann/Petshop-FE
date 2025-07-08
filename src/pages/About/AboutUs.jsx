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
    color: "var(--petshop-blue)",
  },
  {
    icon: Award,
    title: "FUN ACTIVITIES",
    description:
      "We provide a variety of fun activities to keep your pets active, happy and stress-free. From play sessions to relaxing times, everything is designed to keep them happy throughout the day.",
    color: "var(--petshop-pink-accent)",
  },
  {
    icon: HeartHandshake,
    title: "SERVICE WITH HEART",
    description:
      "We are not just here for today. With a professional team and a sincere spirit of service, we are ready to be your partner in caring for your beloved furry friends for the long term.",
    color: "var(--petshop-pink-dark)",
  },
];

export default function AboutUs() {
  useEffect(() => {
    AOS.init({ once: true, duration: 700 });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div
        className="relative min-h-[500px] flex items-center justify-center overflow-hidden"
        style={{ backgroundColor: "var(--petshop-pink-dark)" }}
      >
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url(${gambar2})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Decorative Elements */}
        <div className="absolute top-20 right-20 opacity-20">
          <img
            src={gambar1}
            alt=""
            className="w-40 h-40 rounded-full object-cover"
          />
        </div>
        <div className="absolute bottom-20 left-20 opacity-20">
          <img
            src={gambar3}
            alt=""
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>

        <div className="relative px-6 py-20 max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 drop-shadow-lg">
            About Buana Petshop
          </h1>
          <p className="text-2xl text-white max-w-3xl mx-auto drop-shadow-lg opacity-95">
            Where every pet is family, and every moment is filled with love
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <div className="order-2 lg:order-1" data-aos="fade-right">
            <div className="bg-white rounded-3xl p-12 shadow-lg border-4 border-[var(--petshop-blue-light)] hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: "var(--petshop-pink-accent)" }}
                >
                  <Heart className="text-white" size={32} />
                </div>
                <h2 className="text-4xl font-bold text-[var(--petshop-pink-dark)]">
                  Our Story
                </h2>
              </div>
              <p className="text-gray-700 text-xl leading-relaxed mb-8">
                At Buana Petshop, we believe that every pet is part of the
                family. With love, we create a safe, comfortable, and fun
                environment for your furry friends.
              </p>
              <p className="text-gray-700 text-xl leading-relaxed">
                Our team not only cares for, but also interacts and understands
                the unique needs of each animal. From playing, feeding, to
                grooming and health services, we are here to ensure their
                happiness when you are not by their side.
              </p>
            </div>
          </div>
          <div className="order-1 lg:order-2" data-aos="fade-left">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-3xl transform rotate-6"
                style={{ backgroundColor: "var(--petshop-blue-light)" }}
              ></div>
              <img
                src={gambar2}
                alt="Buana Petshop Team"
                className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover transform hover:scale-105 transition-transform duration-300 z-10"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-32">
          <div className="text-center mb-20" data-aos="fade-up">
            <h2 className="text-5xl font-bold text-[var(--petshop-pink-dark)] mb-6">
              Our Values
            </h2>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
              What makes us different and special
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {VALUES.map((value, idx) => (
              <div
                key={idx}
                className="group"
                data-aos="fade-up"
                data-aos-delay={idx * 150}
              >
                <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 h-full border-4 border-gray-100">
                  <div
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: value.color }}
                  >
                    <value.icon className="text-white" size={36} />
                  </div>
                  <h3 className="font-bold text-2xl text-[var(--petshop-pink-dark)] mb-6">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-32">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold text-[var(--petshop-pink-dark)] mb-6">
              Meet Our Expert Team
            </h2>
            <p className="text-2xl text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals who love what they do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {TEAM.map((member, idx) => (
              <div
                key={idx}
                className="group"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="bg-white rounded-3xl p-10 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 text-center border-4 border-[var(--petshop-blue-light)]">
                  <div className="relative mb-8">
                    <div
                      className="absolute inset-0 rounded-full transform group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: "var(--petshop-pink)" }}
                    ></div>
                    <img
                      src={member.img}
                      alt={member.name}
                      className="relative w-40 h-40 rounded-full object-cover mx-auto border-6 border-white shadow-lg"
                    />
                  </div>
                  <h3 className="font-bold text-2xl text-gray-800 mb-3">
                    {member.name}
                  </h3>
                  <p
                    className="font-semibold mb-3 text-lg"
                    style={{ color: "var(--petshop-blue)" }}
                  >
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-lg mb-2">
                    {member.specialty}
                  </p>
                  <p className="text-gray-500 text-base mb-6">
                    {member.experience}
                  </p>
                  <div className="flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        style={{ color: "var(--petshop-pink-accent)" }}
                        className="fill-current"
                        size={20}
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
          className="relative rounded-3xl p-12 md:p-16 border-4 overflow-hidden"
          style={{
            backgroundColor: "var(--petshop-blue-light)",
            borderColor: "var(--petshop-blue)",
          }}
          data-aos="fade-up"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 opacity-10">
            <img
              src={gambar1}
              alt=""
              className="w-80 h-80 rounded-full object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-0 opacity-10">
            <img
              src={gambar3}
              alt=""
              className="w-64 h-64 rounded-full object-cover"
            />
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <h3 className="text-4xl font-bold text-[var(--petshop-pink-dark)] mb-10">
              A Story of Dedication
            </h3>
            <p className="text-gray-700 text-xl leading-relaxed mb-8 relative z-10">
              Robert is a NYC native from the Upper East Side and takes care of
              our pups in Pawsitive Pet Hotel & Spa in Astoria, Queens.
            </p>
            <p className="text-gray-700 text-xl leading-relaxed relative z-10">
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
