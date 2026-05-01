"use client";
import { useState, useEffect } from "react";

export default function MobileSocials() {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hero section is 70vh (min 550px), showing buttons after 400px scroll
      if (window.scrollY > 400) {
        setShowButtons(true);
      } else {
        setShowButtons(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!showButtons) return null;

  return (
    <div className="mobile-social-tips" style={{ animation: "fadeIn 0.3s ease-in-out" }}>
      <a href="https://www.facebook.com/profile.php?id=61568945112556" className="mobile-social-tip tip-left-1" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
        <i className="fab fa-facebook-f"></i>
      </a>
      <a href="https://www.instagram.com/bravehearttourandtravel" className="mobile-social-tip tip-left-2" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        <i className="fab fa-instagram"></i>
      </a>
      <a href="https://x.com/heart12385" className="mobile-social-tip tip-right-1" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
        <i className="fab fa-twitter"></i>
      </a>
      <a href="https://wa.me/919596041720" className="mobile-social-tip tip-right-2" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
        <i className="fab fa-whatsapp"></i>
      </a>
    </div>
  );
}
