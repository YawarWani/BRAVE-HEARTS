"use client";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import { PackageModal, BookNowModal } from "../components/PackageModal";
import Link from "next/link";
import Image from "next/image";
import pahalgamImg from "../public/images/about_pahalgam_1776581424655.png";
import gulmargSnowImg from "../public/images/gulmarg_snow_1776581444972.png";
import heroKashmirImg from "../public/images/hero_kashmir_1776581409040.png";
import gandolaImg from "../public/images/Gandola.jpg";
import dalLakeImg from "../public/grid_images/Dal-lake.jpg";
import sonmargImg from "../public/grid_images/sonmarg.jpg";

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isPackageModalOpen, setPackageModalOpen] = useState(false);
  const [isBookNowModalOpen, setBookNowModalOpen] = useState(false);

  const [packages, setPackages] = useState([]);
  const [loadingPackages, setLoadingPackages] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await fetch("/api/packages");
        const data = await res.json();
        setPackages(data);
      } catch (err) {
        console.error("Failed to fetch packages:", err);
      } finally {
        setLoadingPackages(false);
      }
    };
    fetchPackages();
  }, []);

  const openPackage = (pkg) => {
    setSelectedPackage(pkg);
    setPackageModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    // Scroll Animation Observer
    const scrollElements = document.querySelectorAll(".scroll-anim");

    const elementInView = (el, dividend = 1) => {
      const elementTop = el.getBoundingClientRect().top;
      return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
    };

    const displayScrollElement = (element) => {
      element.classList.add("is-visible");
      // The old script used is-visible in one place, active in another. 
      // It also had a revealOnScroll intersection observer adding 'active'
      element.classList.add("active");
    };

    const handleScrollAnimation = () => {
      scrollElements.forEach((el) => {
        if (elementInView(el, 1.15)) {
          displayScrollElement(el);
        }
      });
    };

    window.addEventListener("scroll", handleScrollAnimation);
    handleScrollAnimation(); // Initial check

    // Counter Animation
    const counters = document.querySelectorAll(".counter");
    let hasCounted = false;

    const animateCounters = () => {
      counters.forEach((counter) => {
        const target = +counter.getAttribute("data-target");
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.innerText = Math.ceil(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target + (target > 100 ? "+" : "");
          }
        };

        updateCounter();
      });
    };

    const statsSection = document.querySelector(".stats");
    const statsObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasCounted) {
          animateCounters();
          hasCounted = true;
        }
      },
      { threshold: 0.5 }
    );

    if (statsSection) {
      statsObserver.observe(statsSection);
    }

    return () => {
      window.removeEventListener("scroll", handleScrollAnimation);
      if (statsSection) {
        statsObserver.disconnect();
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero onPlanMyTrip={() => {
        setBookNowModalOpen(true);
        document.body.style.overflow = "hidden";
      }} />

      {/* Trust Bar */}
      <div className="trust-bar">
        <div className="container">
          <div className="trust-items">
            <div className="trust-item scroll-anim fade-in-up">
              <div className="trust-icon"><i className="fas fa-shield-alt"></i></div>
              <div className="trust-text">
                <h4>Govt. Approved</h4>
                <p>J&K Tourism Dept. (<span style={{ color: "#F59E0B", fontWeight: "bold", letterSpacing: "0.5px" }}>JKEA00004318</span>)</p>
              </div>
            </div>
            <div className="trust-item scroll-anim fade-in-up" style={{ transitionDelay: "0.1s" }}>
              <div className="trust-icon"><i className="fas fa-star"></i></div>
              <div className="trust-text">
                <h4>5-Star Rated</h4>
                <p>Consistently loved by travelers</p>
              </div>
            </div>
            <div className="trust-item scroll-anim fade-in-up" style={{ transitionDelay: "0.2s" }}>
              <div className="trust-icon"><i className="fas fa-user-tie"></i></div>
              <div className="trust-text">
                <h4>Local Experts</h4>
                <p>10+ years of Kashmir experience</p>
              </div>
            </div>
            <div className="trust-item scroll-anim fade-in-up" style={{ transitionDelay: "0.3s" }}>
              <div className="trust-icon"><i className="fas fa-headset"></i></div>
              <div className="trust-text">
                <h4>24/7 Support</h4>
                <p>Always here when you need us</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="about section-padding">
        <div className="container">
          <div className="about-grid">
            <div className="about-text scroll-anim fade-in-left">
              <h2 className="section-title">Discover the Magic of <span>Kashmir</span></h2>
              <p className="lead-text">
                Brave Hearts Tour & Travels is an officially recognized and trusted Excursion Agent, proudly registered with the Department of Tourism, Government of Jammu and Kashmir (Reg: <span style={{ color: "var(--primary)", fontWeight: "700", background: "rgba(15, 118, 110, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>JKEA00004318</span>).
              </p>
              <p>With years of experience in curating premium travel experiences, we believe in creating memories that last a lifetime. Whether you seek the serene waters of Dal Lake, the snow-capped peaks of Gulmarg, or the lush green meadows of Pahalgam, we provide luxurious, comfortable, and unforgettable journeys.</p>
              <ul className="about-features">
                <li><i className="fas fa-check-circle"></i> Experienced Local Guides</li>
                <li><i className="fas fa-check-circle"></i> Premium Accommodation</li>
                <li><i className="fas fa-check-circle"></i> 24/7 Customer Support</li>
                <li><i className="fas fa-check-circle"></i> Customized Itineraries</li>
              </ul>
              <Link href="/#packages" className="btn btn-primary mt-3">Our Services</Link>
            </div>
            <div className="about-image scroll-anim fade-in-right">
              <div className="img-wrapper glass-effect">
                <Image src={pahalgamImg} alt="Pahalgam Valley" placeholder="blur" sizes="(max-width: 768px) 100vw, 50vw" style={{ width: "100%", height: "auto" }} />
                <div className="experience-badge">
                  <span className="number">10+</span>
                  <span className="text">Years of<br />Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services section-padding">
        <div className="container">
          <div className="section-header text-center scroll-anim fade-in-up">
            <span className="subtitle">What We Offer</span>
            <h2 className="section-title">Our Premium <span>Services</span></h2>
            <p>Everything you need for a perfect, hassle-free journey in Kashmir.</p>
          </div>
          <div className="services-grid">
            <div className="service-card scroll-anim fade-in-up">
              <div className="service-icon"><i className="fas fa-car-side"></i></div>
              <h3>Travel & Transport</h3>
              <ul>
                <li><i className="fas fa-check"></i> Transport Services</li>
                <li><i className="fas fa-check"></i> Flight Tickets</li>
                <li><i className="fas fa-check"></i> Helicopter Tours</li>
              </ul>
            </div>
            <div className="service-card scroll-anim fade-in-up" style={{ transitionDelay: "0.1s" }}>
              <div className="service-icon"><i className="fas fa-hotel"></i></div>
              <h3>Stay & Planning</h3>
              <ul>
                <li><i className="fas fa-check"></i> Hotel Bookings</li>
                <li><i className="fas fa-check"></i> Custom Tour Planning</li>
                <li><i className="fas fa-check"></i> Complete Packages</li>
              </ul>
            </div>
            <div className="service-card scroll-anim fade-in-up" style={{ transitionDelay: "0.2s" }}>
              <div className="service-icon"><i className="fas fa-skiing"></i></div>
              <h3>Experiences & Activities</h3>
              <ul>
                <li><i className="fas fa-check"></i> Gondola Bookings</li>
                <li><i className="fas fa-check"></i> Shikara Rides</li>
                <li><i className="fas fa-check"></i> Paragliding</li>
                <li><i className="fas fa-check"></i> Trekking & Adventure</li>
              </ul>
            </div>
            <div className="service-card scroll-anim fade-in-up" style={{ transitionDelay: "0.3s" }}>
              <div className="service-icon"><i className="fas fa-glass-cheers"></i></div>
              <h3>Special Services</h3>
              <ul>
                <li><i className="fas fa-check"></i> Destination Parties</li>
                <li><i className="fas fa-check"></i> Corporate Events</li>
                <li><i className="fas fa-check"></i> VIP Arrangements</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="packages section-padding bg-light">
        <div className="container">
          <div className="section-header text-center scroll-anim fade-in-up">
            <span className="subtitle">Popular Tours</span>
            <h2 className="section-title">Our Best <span>Packages</span></h2>
            <p>Choose from our handpicked tour packages designed for every kind of traveler.</p>
          </div>
          <div className="packages-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 350px), 1fr))" }}>
            {loadingPackages ? (
              <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "50px" }}>Loading packages...</div>
            ) : packages.length === 0 ? (
              <div style={{ textAlign: "center", gridColumn: "1 / -1", padding: "50px", fontSize: "1.2rem", color: "var(--text-muted)" }}>
                No packages available
              </div>
            ) : (
              packages.map((pkg, index) => {
                // Alternate between the statically imported images
                const staticImg = index % 2 === 0 ? pahalgamImg : gulmargSnowImg;
                
                return (
                  <div className="package-card" style={{ transitionDelay: `${0.1 * (index + 1)}s`, opacity: 1, transform: "none" }} key={pkg.id}>
                    <div className="card-img">
                      <Image src={staticImg} alt={pkg.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" style={{ objectFit: "cover" }} placeholder="blur" />
                      <div className="price-tag">{pkg.perPerson}</div>
                    </div>
                  <div className="card-content">
                    <div className="card-meta">
                      <span><i className="far fa-clock"></i> {pkg.duration}</span>
                      <span><i className="fas fa-users"></i> {pkg.groupSize}</span>
                    </div>
                    <h3 style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis", height: "auto" }}>{pkg.title}</h3>
                    <p style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", textOverflow: "ellipsis", margin: "10px 0", height: "auto" }}>
                      {(pkg.features && pkg.features.length > 0) ? pkg.features[0] : "Explore our premium package."}
                    </p>
                    <div className="card-footer">
                      <div className="rating">
                        <strong>Total: {pkg.totalPrice}</strong>
                      </div>
                      <button className="btn-text view-package-btn" onClick={() => openPackage(pkg)}>
                        View Details <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats section-padding parallax" style={{ overflow: "hidden" }}>
        <Image src={heroKashmirImg} alt="Stats Background" fill style={{ objectFit: "cover", zIndex: -1 }} placeholder="blur" />
        <div className="stats-overlay"></div>
        <div className="container relative">
          <div className="stats-grid">
            <div className="stat-item scroll-anim fade-in-up">
              <i className="fas fa-users stat-icon"></i>
              <h3 className="counter" data-target="5000">0</h3>
              <p>Happy Clients</p>
            </div>
            <div className="stat-item scroll-anim fade-in-up" style={{ transitionDelay: "0.1s" }}>
              <i className="fas fa-route stat-icon"></i>
              <h3 className="counter" data-target="850">0</h3>
              <p>Tours Completed</p>
            </div>
            <div className="stat-item scroll-anim fade-in-up" style={{ transitionDelay: "0.2s" }}>
              <i className="fas fa-map-marked-alt stat-icon"></i>
              <h3 className="counter" data-target="25">0</h3>
              <p>Destinations</p>
            </div>
            <div className="stat-item scroll-anim fade-in-up" style={{ transitionDelay: "0.3s" }}>
              <i className="fas fa-award stat-icon"></i>
              <h3 className="counter" data-target="15">0</h3>
              <p>Awards Won</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="gallery section-padding">
        <div className="container">
          <div className="section-header text-center scroll-anim fade-in-up">
            <span className="subtitle">Photo Gallery</span>
            <h2 className="section-title">Glimpses of <span>Paradise</span></h2>
          </div>
          <div 
            className="gallery-grid" 
            style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", 
              gap: "20px" 
            }}
          >
            <div className="gallery-item scroll-anim fade-in-up" style={{ height: "300px" }}>
              <Image src={dalLakeImg} alt="Dal Lake" placeholder="blur" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              <div className="gallery-overlay">
                <i className="fas fa-search-plus"></i>
                <span>Dal Lake, Srinagar</span>
              </div>
            </div>
            <div className="gallery-item scroll-anim fade-in-up" style={{ transitionDelay: "0.1s", height: "300px" }}>
              <Image src={gulmargSnowImg} alt="Gulmarg" placeholder="blur" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              <div className="gallery-overlay">
                <i className="fas fa-search-plus"></i>
                <span>Gulmarg Ski Resort</span>
              </div>
            </div>
            <div className="gallery-item scroll-anim fade-in-up" style={{ transitionDelay: "0.2s", height: "300px" }}>
              <Image src={pahalgamImg} alt="Pahalgam" placeholder="blur" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              <div className="gallery-overlay">
                <i className="fas fa-search-plus"></i>
                <span>Pahalgam Valley</span>
              </div>
            </div>
            <div className="gallery-item scroll-anim fade-in-up" style={{ transitionDelay: "0.3s", height: "300px" }}>
              <Image src={sonmargImg} alt="Sonmarg" placeholder="blur" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
              <div className="gallery-overlay">
                <i className="fas fa-search-plus"></i>
                <span>Sonmarg Glaciers</span>
              </div>
            </div>
          </div>
          <div className="text-center" style={{ marginTop: "50px" }}>
            <Link href="/gallery" className="btn btn-primary">View Full Gallery</Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact section-padding">
        <div className="container">
          <div className="section-header text-center scroll-anim fade-in-up">
            <span className="subtitle">Get in Touch</span>
            <h2 className="section-title">Plan Your <span>Trip</span></h2>
          </div>
          <div className="contact-grid">
            <div className="contact-info scroll-anim fade-in-up" style={{ gridColumn: '1 / -1', maxWidth: '800px', margin: '0 auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                <div className="info-item glass-effect">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <h4>Location</h4>
                    <p>Boulevard Road, Opp. Ghat No. 7, Dal Lake, Srinagar, J&K - 190001</p>
                  </div>
                </div>
                <div className="info-item glass-effect">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h4>Email Us</h4>
                    <p>bravehearttourandtravel321@gmail.com</p>
                  </div>
                </div>
                <div className="info-item glass-effect">
                  <i className="fas fa-phone-alt"></i>
                  <div>
                    <h4>Call Us</h4>
                    <p>+91 95960 41720<br />+91 95416 91319</p>
                  </div>
                </div>
              </div>
              
              <div className="map-container glass-effect mt-4" style={{ height: '400px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.123456789!2d74.838!3d34.085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDA1JzA2LjAiTiA3NMKwNTAnMTYuOCJF!5e0!3m2!1sen!2sin!4v1684323547842!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div style={{ textAlign: 'center', marginTop: '40px' }}>
                <a href="https://wa.me/919596041720" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '15px 40px', fontSize: '1.1rem' }}>
                  <i className="fab fa-whatsapp"></i> Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <PackageModal 
        pkg={selectedPackage} 
        isOpen={isPackageModalOpen} 
        onClose={() => {
          setPackageModalOpen(false);
          document.body.style.overflow = "auto";
        }} 
        onBookNow={() => {
          setPackageModalOpen(false);
          setBookNowModalOpen(true);
        }}
      />
      
      <BookNowModal 
        isOpen={isBookNowModalOpen} 
        onClose={() => {
          setBookNowModalOpen(false);
          document.body.style.overflow = "auto";
        }} 
      />
    </>
  );
}
