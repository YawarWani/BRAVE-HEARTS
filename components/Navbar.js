"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMenu = () => setMobileMenuOpen(false);

  // Swipe logic for sidebar
  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e) => {
      touchEndX = e.changedTouches[0].screenX;
      
      if (Math.abs(touchStartX - touchEndX) > 40) {
        if (touchStartX - touchEndX > 40) {
          if (touchStartX > window.innerWidth - 100) {
            setMobileMenuOpen(true);
          }
        } else if (touchEndX - touchStartX > 40) {
          if (mobileMenuOpen) {
            setMobileMenuOpen(false);
          }
        }
      }
    };

    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [mobileMenuOpen]);

  const isActive = (path) => {
    // Basic active state logic. In the original, it used scroll spy, 
    // but for Next.js, matching pathname or hash is safer for links.
    if (path === "/gallery" && pathname === "/gallery") return "active";
    if (pathname === "/" && path.startsWith("/#")) return ""; // Handled by scroll spy later or just let it be
    return "";
  };

  return (
    <>
      <nav id="navbar" className={`navbar ${scrolled || pathname === '/gallery' ? "scrolled" : ""}`}>
        <div className="nav-container">
          <Link href="/" className="logo">
            <img
              src="/logo/logo.png"
              alt="Brave Hearts Logo"
              style={{ height: "80px", width: "auto", display: "block" }}
            />
          </Link>

          {!scrolled ? (
            <div className="header-socials">
              <a href="https://www.instagram.com/bravehearttourandtravel" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.facebook.com/profile.php?id=61568945112556" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://wa.me/919596041720" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          ) : (
            <div className="chevron-toggle header-socials" onClick={toggleMenu} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
               <i className={`fas fa-chevron-${mobileMenuOpen ? 'right' : 'left'}`} style={{ fontSize: '1.8rem', color: 'var(--primary)' }}></i>
            </div>
          )}

          <div className={`menu-toggle ${mobileMenuOpen ? "active" : ""}`} id="mobile-menu" onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>

          <ul className={`nav-menu ${mobileMenuOpen ? "active" : ""}`}>
            <div className="close-sidebar" onClick={closeMenu}>
              <i className="fas fa-chevron-right"></i>
            </div>
            <li><Link href="/#home" className={`nav-link`} onClick={closeMenu}>Home</Link></li>
            <li><Link href="/#about" className={`nav-link`} onClick={closeMenu}>About</Link></li>
            <li><Link href="/#services" className={`nav-link`} onClick={closeMenu}>Services</Link></li>
            <li><Link href="/#packages" className={`nav-link`} onClick={closeMenu}>Packages</Link></li>
            <li><Link href="/gallery" className={`nav-link ${pathname === '/gallery' ? 'active' : ''}`} onClick={closeMenu}>Gallery</Link></li>
          </ul>
        </div>
      </nav>


      {/* Back to top button */}
      <button 
        id="backToTop" 
        className={`back-to-top ${scrolled ? 'show' : ''}`} 
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </>
  );
}
