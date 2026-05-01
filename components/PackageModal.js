"use client";
import Image from "next/image";

// We will export a few modals from this file that were previously in index.html

export function PackageModal({ pkg, isOpen, onClose }) {
  if (!isOpen || !pkg) return null;

  const handleNext = () => {
    // Logic for slider
  };

  const handlePrev = () => {
    // Logic for slider
  };

  return (
    <div className={`package-modal ${isOpen ? "active" : ""}`} onClick={onClose}>
      <div className="modal-content glass-effect" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div className="modal-body">
          <div className="modal-slider-container">
            <Image src={pkg.images[0]} alt="Package View" fill style={{ objectFit: "cover", transition: "opacity 0.5s ease" }} />
            <button className="slider-btn prev-btn"><i className="fas fa-chevron-left"></i></button>
            <button className="slider-btn next-btn"><i className="fas fa-chevron-right"></i></button>
            <div className="modal-thumbnails">
              {pkg.images.map((img, idx) => (
                <Image key={idx} src={img} className={idx === 0 ? "active" : ""} alt="Thumbnail" width={50} height={50} style={{ objectFit: "cover" }} />
              ))}
            </div>
          </div>
          <div className="modal-details">
            <h2>{pkg.title}</h2>
            <div className="modal-meta">
              <span><i className="far fa-clock"></i> {pkg.duration}</span>
              <span><i className="fas fa-users"></i> {pkg.groupSize}</span>
            </div>
            <div className="modal-price">
              <h3>{pkg.totalPrice}</h3>
              <p>{pkg.perPerson}</p>
            </div>
            <div className="modal-includes">
              <h3>What's Included</h3>
              <ul>
                {pkg.features.map((feature, idx) => (
                  <li key={idx}><i className="fas fa-check-circle"></i> <span>{feature}</span></li>
                ))}
              </ul>
            </div>
            <button className="btn btn-primary btn-block mt-4">Book This Package</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BookNowModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className={`package-modal ${isOpen ? "active" : ""}`} onClick={onClose}>
      <div
        className="modal-content glass-effect"
        style={{ maxWidth: "450px", margin: "auto", borderRadius: "12px", padding: "30px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close-modal" onClick={onClose} style={{ top: "15px", right: "15px" }}>&times;</span>
        <div className="modal-details" style={{ padding: "10px 0 0 0" }}>
          <h2 style={{ marginBottom: "20px", fontSize: "1.8rem", textAlign: "center" }}>Request a Callback</h2>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px" }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: "20px" }}>
              <input
                type="tel"
                name="phone"
                placeholder="Contact Number"
                required
                style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px" }}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block" style={{ padding: "12px" }}>
              Request a Callback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
