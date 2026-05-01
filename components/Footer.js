"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-about">
            <Link href="/" className="logo footer-logo">
              <img src="/logo/logo.png" alt="Brave Hearts Logo" style={{ height: "50px", width: "auto" }} />
            </Link>
            <p>
              Your ultimate companion in exploring the breathtaking beauty of Kashmir. We provide premium, luxurious, and hassle-free travel experiences.
            </p>
            <div
              className="footer-trust"
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                padding: "12px",
                background: "rgba(255,255,255,0.05)",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.1)",
                display: "inline-block",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <i className="fas fa-shield-alt" style={{ color: "#10B981", fontSize: "1.5rem" }}></i>
                <div style={{ textAlign: "left" }}>
                  <h4 style={{ color: "#fff", fontSize: "0.95rem", marginBottom: "2px" }}>Govt. Approved Excursion Agent</h4>
                  <p style={{ color: "#cbd5e1", fontSize: "0.8rem", margin: "0" }}>
                    J&K Tourism Dept. (Reg: <span style={{ color: "#F59E0B", fontWeight: "bold", letterSpacing: "0.5px" }}>JKEA00004318</span>)
                  </p>
                </div>
              </div>
            </div>

          </div>
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/#home">Home</Link></li>
              <li><Link href="/#about">About Us</Link></li>
              <li><Link href="/#packages">Tour Packages</Link></li>
              <li><Link href="/gallery">Gallery</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h3>Popular Destinations</h3>
            <ul>
              <li><a href="#">Srinagar</a></li>
              <li><a href="#">Gulmarg</a></li>
              <li><a href="#">Pahalgam</a></li>
              <li><a href="#">Sonmarg</a></li>
              <li><a href="#">Yusmarg</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; <span>{currentYear}</span> Brave Hearts Tour & Travels. All Rights Reserved.</p>
          <p>Designed with <i className="fas fa-heart" style={{ color: "#e74c3c" }}></i> for Kashmir.</p>
          <div style={{ marginTop: "15px" }}>
            <Link href="/admin/login" style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem", textDecoration: "none", transition: "color 0.3s" }} onMouseOver={(e) => e.target.style.color = "var(--primary-light)"} onMouseOut={(e) => e.target.style.color = "rgba(255,255,255,0.3)"}>
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
