"use client";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Gallery() {
  const [filter, setFilter] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImg, setLightboxImg] = useState("");
  const [lightboxCaption, setLightboxCaption] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const openLightbox = (imgSrc, caption) => {
    setLightboxImg(imgSrc);
    setLightboxCaption(caption);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    // Scroll Animation Observer for Gallery Page
    const scrollElements = document.querySelectorAll(".scroll-anim");

    const elementInView = (el, dividend = 1) => {
      const elementTop = el.getBoundingClientRect().top;
      return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
    };

    const displayScrollElement = (element) => {
      element.classList.add("is-visible");
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

    return () => {
      window.removeEventListener("scroll", handleScrollAnimation);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .gallery-page-hero {
            height: 50vh;
            background: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)), url('https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1600&q=80') center/cover;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            padding-top: 80px;
        }
        .gallery-page-title {
            font-size: 3.5rem;
            font-weight: 800;
            margin-bottom: 10px;
            animation: fadeInDown 1s ease;
        }
        .gallery-page-subtitle {
            font-size: 1.2rem;
            font-weight: 300;
            animation: fadeInUp 1s ease;
        }
        .gallery-filter-container {
            text-align: center;
            margin-bottom: 40px;
        }
        .gallery-select {
            padding: 12px 25px;
            font-size: 1.1rem;
            border: 2px solid var(--primary);
            border-radius: 30px;
            background-color: var(--white);
            color: var(--dark);
            font-family: var(--font-primary);
            cursor: pointer;
            outline: none;
            transition: var(--transition);
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            appearance: none;
            -webkit-appearance: none;
            background-image: url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%230F766E%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E");
            background-repeat: no-repeat;
            background-position: right 20px top 50%;
            background-size: 12px auto;
            padding-right: 50px;
        }
        .gallery-select:focus {
            box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.2);
        }
        .location-header {
            text-align: center;
            margin-bottom: 40px;
        }
        .location-header h2 {
            font-size: 2.5rem;
            color: var(--primary);
            margin-bottom: 10px;
        }
        .location-header p {
            color: var(--text-muted);
            max-width: 700px;
            margin: 0 auto;
            font-size: 1.1rem;
        }
        .gallery-item {
            display: none;
        }
        .gallery-item.show {
            display: block;
            animation: fadeIn 0.5s ease forwards;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .gallery-reviews-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
            gap: 30px;
            margin-top: 30px;
        }
        .gallery-review-card {
            background: var(--light);
            padding: 30px;
            border-radius: var(--border-radius);
            box-shadow: var(--box-shadow);
            position: relative;
            text-align: left;
            border: 1px solid #E2E8F0;
        }
        .review-section {
            display: none;
            margin-top: 60px;
            border-top: 1px solid #E2E8F0;
            padding-top: 40px;
        }
        .review-section.show {
            display: block;
            animation: fadeIn 0.5s ease forwards;
        }
      `}} />

      <Navbar />

      <section className="gallery-page-hero">
        <div className="container">
          <h1 className="gallery-page-title">Our Visual Diary</h1>
          <p className="gallery-page-subtitle">A glimpse into the untouched beauty of Kashmir</p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="gallery-filter-container">
            <select id="galleryFilter" className="gallery-select" value={filter} onChange={handleFilterChange}>
              <option value="all">View All Destinations</option>
              <option value="gulmarg">Gulmarg - The Meadow of Flowers</option>
              <option value="sonmarg">Sonmarg - The Meadow of Gold</option>
            </select>
          </div>

          {(filter === "all" || filter === "gulmarg") && (
            <div id="gulmargHeader" className="location-header" style={{ marginTop: filter === 'all' ? '0' : '0' }}>
              <h2>Gulmarg</h2>
              <p>Gulmarg, the "Meadow of Flowers," is a majestic hill station nestled in the Pir Panjal Range. Famous for its world-class skiing, pristine snow-covered landscapes, and the exhilarating Gondola ride, it is a paradise for adventurers and peace-seekers alike.</p>
            </div>
          )}

          {(filter === "all" || filter === "sonmarg") && (
            <div id="sonmargHeader" className="location-header" style={{ marginTop: filter === 'all' ? '60px' : '0' }}>
              <h2>Sonmarg</h2>
              <p>Sonmarg, meaning the "Meadow of Gold," is adorned with breathtaking glaciers, alpine meadows, and serene lakes. It serves as the gateway to Ladakh and offers spectacular views of the Himalayan peaks touching the clear blue skies.</p>
            </div>
          )}

          <div className="gallery-masonry" id="galleryContainer">
            {/* Gulmarg Images */}
            {(filter === "all" || filter === "gulmarg") && (
              <>
                <div className="gallery-item gulmarg show" onClick={() => openLightbox("/Gulmarg/pexels-imadclicks-10679349.jpg", "Gulmarg Beauty")}>
                  <img src="/Gulmarg/pexels-imadclicks-10679349.jpg" alt="Gulmarg Landscape" loading="lazy" />
                  <div className="gallery-overlay">
                    <i className="fas fa-search-plus"></i>
                    <span>Gulmarg Beauty</span>
                  </div>
                </div>
                <div className="gallery-item gulmarg show" onClick={() => openLightbox("/Gulmarg/pexels-imadclicks-10679579.jpg", "Snowy Peaks")}>
                  <img src="/Gulmarg/pexels-imadclicks-10679579.jpg" alt="Gulmarg Snow" loading="lazy" />
                  <div className="gallery-overlay">
                    <i className="fas fa-search-plus"></i>
                    <span>Snowy Peaks</span>
                  </div>
                </div>
                {/* Adding a few more for representation */}
                <div className="gallery-item gulmarg show" onClick={() => openLightbox("/Gulmarg/pexels-imadclicks-15344120.jpg", "Winter Wonderland")}>
                  <img src="/Gulmarg/pexels-imadclicks-15344120.jpg" alt="Gulmarg Trees" loading="lazy" />
                  <div className="gallery-overlay">
                    <i className="fas fa-search-plus"></i>
                    <span>Winter Wonderland</span>
                  </div>
                </div>
              </>
            )}

            {/* Sonmarg Images */}
            {(filter === "all" || filter === "sonmarg") && (
              <>
                <div className="gallery-item sonmarg show" onClick={() => openLightbox("/Sonmarg/pexels-faiz-ul-mushtaq-449363837-19975733.jpg", "Meadow of Gold")}>
                  <img src="/Sonmarg/pexels-faiz-ul-mushtaq-449363837-19975733.jpg" alt="Sonmarg" loading="lazy" />
                  <div className="gallery-overlay">
                    <i className="fas fa-search-plus"></i>
                    <span>Meadow of Gold</span>
                  </div>
                </div>
                <div className="gallery-item sonmarg show" onClick={() => openLightbox("/Sonmarg/pexels-imadclicks-31204203.jpg", "Glacial Streams")}>
                  <img src="/Sonmarg/pexels-imadclicks-31204203.jpg" alt="Sonmarg" loading="lazy" />
                  <div className="gallery-overlay">
                    <i className="fas fa-search-plus"></i>
                    <span>Glacial Streams</span>
                  </div>
                </div>
                <div className="gallery-item sonmarg show" onClick={() => openLightbox("/Sonmarg/pexels-imadclicks-35414086.jpg", "Mountain Echoes")}>
                  <img src="/Sonmarg/pexels-imadclicks-35414086.jpg" alt="Sonmarg" loading="lazy" />
                  <div className="gallery-overlay">
                    <i className="fas fa-search-plus"></i>
                    <span>Mountain Echoes</span>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Reviews Section */}
          {(filter === "all" || filter === "gulmarg") && (
            <div id="gulmargReviews" className="review-section gulmarg show">
              <div className="text-center mb-4">
                <span className="subtitle">Client Reviews</span>
                <h3 className="section-title" style={{ fontSize: "2rem" }}>What Travelers Say About <span>Gulmarg</span></h3>
              </div>
              <div className="gallery-reviews-grid">
                <div className="gallery-review-card">
                  <div className="quote-icon" style={{ position: "absolute", top: "15px", left: "15px", fontSize: "2rem", opacity: "0.2" }}><i className="fas fa-quote-left"></i></div>
                  <p className="review-text" style={{ marginBottom: "20px", fontSize: "1rem" }}>"An absolutely magical experience! The snow-covered peaks and the thrilling Gulmarg gondola ride were unforgettable. Best trip ever!"</p>
                  <div className="client-info" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "15px" }}>
                    <img src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80" alt="Zahoor Ahmed" className="client-img" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                    <div className="client-details">
                      <h4 style={{ fontSize: "1rem", marginBottom: "2px" }}>Zahoor Ahmed</h4>
                      <div className="rating" style={{ fontSize: "0.8rem", color: "#F59E0B" }}>
                        <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Other reviews... */}
              </div>
            </div>
          )}

          {(filter === "all" || filter === "sonmarg") && (
            <div id="sonmargReviews" className="review-section sonmarg show">
              <div className="text-center mb-4">
                <span className="subtitle">Client Reviews</span>
                <h3 className="section-title" style={{ fontSize: "2rem" }}>What Travelers Say About <span>Sonmarg</span></h3>
              </div>
              <div className="gallery-reviews-grid">
                <div className="gallery-review-card">
                  <div className="quote-icon" style={{ position: "absolute", top: "15px", left: "15px", fontSize: "2rem", opacity: "0.2" }}><i className="fas fa-quote-left"></i></div>
                  <p className="review-text" style={{ marginBottom: "20px", fontSize: "1rem" }}>"Kashmir truly is paradise on earth, and Sonmarg is its golden crown. The local guides were knowledgeable and polite."</p>
                  <div className="client-info" style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "15px" }}>
                    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Tariq Bhat" className="client-img" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                    <div className="client-details">
                      <h4 style={{ fontSize: "1rem", marginBottom: "2px" }}>Tariq Bhat</h4>
                      <div className="rating" style={{ fontSize: "0.8rem", color: "#F59E0B" }}>
                        <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      <Footer />

      {/* Lightbox */}
      {lightboxOpen && (
        <div id="lightbox" className="lightbox" style={{ display: "block" }} onClick={closeLightbox}>
          <span className="close-lightbox" onClick={closeLightbox}>&times;</span>
          <img className="lightbox-content" src={lightboxImg} alt="Lightbox View" onClick={(e) => e.stopPropagation()} />
          <div id="lightbox-caption">{lightboxCaption}</div>
        </div>
      )}
    </>
  );
}
