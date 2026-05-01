"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import hero1 from "../public/hero_images/1.jpg";
import hero2 from "../public/hero_images/2.jpg";
import hero3 from "../public/hero_images/3.jpg";
import hero4 from "../public/hero_images/4.jpg";
import hero5 from "../public/hero_images/5.jpg";

export default function Hero({ onPlanMyTrip }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    hero1,
    hero2,
    hero3,
    hero4,
    hero5
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section id="home" className="hero">
      <div className="hero-bg" id="heroBgSlider">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
          >
            <Image src={slide} alt={`Hero Image ${index + 1}`} fill style={{ objectFit: "cover" }} priority={index === 0} placeholder="blur" />
          </div>
        ))}
        <div className="overlay"></div>
      </div>
      <div className="hero-content fade-in-up">
        <h1 className="hero-title">
          Explore <span className="text-highlight">Paradise</span> on Earth
        </h1>
        <p className="hero-tagline typewriter">Welcome to Brave Hearts Tour & Travels</p>
        <div className="hero-btns">
          <Link href="/#packages" className="btn btn-primary">
            <i className="fas fa-globe-asia"></i> Explore Packages
          </Link>
          <div className="hero-sub-btns">
            <button 
              onClick={onPlanMyTrip}
              className="btn btn-outline"
              style={{ cursor: 'pointer' }}
            >
              Plan My Trip
            </button>
            <a href="tel:+919596041720" className="btn btn-outline">
              Let's Talk <i className="fas fa-phone-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
