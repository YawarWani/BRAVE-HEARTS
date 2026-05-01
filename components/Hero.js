"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    "hero_images/1.jpg",
    "hero_images/2.jpg",
    "hero_images/3.jpg",
    "hero_images/4.jpg",
    "hero_images/5.jpg"
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
            key={slide}
            className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url('${slide}')` }}
          ></div>
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
            <a href="#" id="openBookNowModal" className="btn btn-outline">
              Plan My Trip
            </a>
            <a href="tel:+919596041720" className="btn btn-outline">
              Let's Talk <i className="fas fa-phone-alt"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
