"use client";
import { useState } from "react";
import Image from "next/image";
import img1 from "../public/images/about_pahalgam_1776581424655.png";
import img2 from "../public/images/gulmarg_snow_1776581444972.png";
import img3 from "../public/images/Gandola.jpg";
import img4 from "../public/images/hero_kashmir_1776581409040.png";

// We will export a few modals from this file that were previously in index.html

export function PackageModal({ pkg, isOpen, onClose, onBookNow }) {
  if (!isOpen || !pkg) return null;

  const handleNext = () => {
    // Logic for slider
  };

  const handlePrev = () => {
    // Logic for slider
  };

  const staticImages = [img1, img2, img3, img4];

  return (
    <div className={`package-modal ${isOpen ? "active" : ""}`} onClick={onClose}>
      <div className="modal-content glass-effect" onClick={(e) => e.stopPropagation()}>
        <span className="close-modal" onClick={onClose}>&times;</span>
        <div className="modal-body">
          <div className="modal-slider-container">
            <Image src={staticImages[0]} alt="Package View" fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover", transition: "opacity 0.5s ease" }} />
            <button className="slider-btn prev-btn"><i className="fas fa-chevron-left"></i></button>
            <button className="slider-btn next-btn"><i className="fas fa-chevron-right"></i></button>
            <div className="modal-thumbnails">
              {staticImages.map((img, idx) => (
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
            <button className="btn btn-primary btn-block mt-4" onClick={onBookNow}>Book This Package</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function BookNowModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // REPLACE THESE WITH YOUR ACTUAL GOOGLE FORM DETAILS
    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScP_Y-D8kLw89_r_vG6S8S899S8S8S8S8S8S8S8S8S8S8S8S8/formResponse";
    const ENTRY_NAME = "entry.123456789"; // Replace with your entry ID for Name
    const ENTRY_PHONE = "entry.987654321"; // Replace with your entry ID for Phone
    const ENTRY_MESSAGE = "entry.112233445"; // Replace with your entry ID for Message

    const formBody = new URLSearchParams();
    formBody.append(ENTRY_NAME, formData.name);
    formBody.append(ENTRY_PHONE, formData.phone);
    formBody.append(ENTRY_MESSAGE, formData.message);

    try {
      // Note: Google Forms uses no-cors which means we won't get a "success" response 
      // but the data will be sent.
      await fetch(GOOGLE_FORM_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody.toString(),
      });
      
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setFormData({ name: "", phone: "", message: "" });
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error. Please try again or call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`package-modal ${isOpen ? "active" : ""}`} onClick={onClose}>
      <div
        className="modal-content glass-effect"
        style={{ maxWidth: "450px", margin: "auto", borderRadius: "12px", padding: "30px", border: '1px solid rgba(255,255,255,0.2)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <span className="close-modal" onClick={onClose} style={{ top: "15px", right: "15px" }}>&times;</span>
        <div className="modal-details" style={{ padding: "10px 0 0 0" }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <i className="fas fa-check-circle" style={{ fontSize: '3rem', color: '#4CAF50', marginBottom: '15px' }}></i>
              <h2>Thank You!</h2>
              <p>Your request has been sent. We will contact you shortly.</p>
            </div>
          ) : (
            <>
              <h2 style={{ marginBottom: "20px", fontSize: "1.8rem", textAlign: "center" }}>Plan Your Trip</h2>
              <p style={{ textAlign: 'center', color: '#666', marginBottom: '20px' }}>Enter your details and our team will get back to you with a custom plan.</p>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: "15px" }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: 'bold' }}>Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px" }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: "20px" }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', fontWeight: 'bold' }}>Contact Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    style={{ width: "100%", padding: "12px", border: "1px solid #ccc", borderRadius: "8px" }}
                  />
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary btn-block" 
                  disabled={isSubmitting}
                  style={{ padding: "12px", position: 'relative' }}
                >
                  {isSubmitting ? (
                    <span><i className="fas fa-spinner fa-spin"></i> Sending...</span>
                  ) : (
                    "Send Request"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
