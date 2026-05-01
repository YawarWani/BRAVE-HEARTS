"use client";
import { useState, useEffect } from "react";

export default function PackageAdmin() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    duration: "",
    groupSize: "",
    totalPrice: "",
    perPerson: "",
    features: ""
  });

  const fetchPackages = async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }
    try {
      const res = await fetch("/api/packages");
      const data = await res.json();
      setPackages(data);
    } catch (err) {
      console.error("Failed to fetch packages", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadPackages = async () => {
      try {
        const res = await fetch("/api/packages");
        const data = await res.json();
        if (!ignore) {
          setPackages(data);
        }
      } catch (err) {
        console.error("Failed to fetch packages", err);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadPackages();

    return () => {
      ignore = true;
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = (pkg) => {
    setEditingId(pkg.id);
    setFormData({
      title: pkg.title,
      duration: pkg.duration,
      groupSize: pkg.groupSize,
      totalPrice: pkg.totalPrice,
      perPerson: pkg.perPerson,
      features: pkg.features.join("\n")
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this package?")) return;
    
    try {
      const res = await fetch(`/api/packages/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPackages(packages.filter(p => p.id !== id));
      } else {
        alert("Failed to delete package");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingId ? `/api/packages/${editingId}` : "/api/packages";
    const method = editingId ? "PUT" : "POST";

    // Format Prices to ensure ₹ symbol exists
    let formattedTotalPrice = formData.totalPrice.trim();
    if (formattedTotalPrice && !formattedTotalPrice.includes('₹')) {
      formattedTotalPrice = '₹' + formattedTotalPrice;
    }

    let formattedPerPerson = formData.perPerson.trim();
    if (formattedPerPerson && !formattedPerPerson.includes('₹')) {
      // If they typed something like "(16,400 per person)", try to inject it gracefully
      if (formattedPerPerson.startsWith('(')) {
        formattedPerPerson = '(₹' + formattedPerPerson.slice(1);
      } else {
        formattedPerPerson = '₹' + formattedPerPerson;
      }
    }

    const submissionData = {
      ...formData,
      totalPrice: formattedTotalPrice,
      perPerson: formattedPerPerson,
      features: formData.features.split("\n").filter(f => f.trim() !== "")
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData)
      });

      if (res.ok) {
        setFormData({ title: "", duration: "", groupSize: "", totalPrice: "", perPerson: "", features: "" });
        setEditingId(null);
        fetchPackages();
      } else {
        alert("Failed to save package");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: "", duration: "", groupSize: "", totalPrice: "", perPerson: "", features: "" });
  };

  return (
    <div className="package-admin-container">
      {/* Editor Section */}
      <div className="editor-card glass-panel">
        <div className="card-header">
          <div className="icon-badge">
            <i className={`fas ${editingId ? "fa-edit" : "fa-plus"}`}></i>
          </div>
          <h2>{editingId ? "Edit Package" : "Create New Package"}</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-row">
            <div className="form-group full-width">
              <label>Package Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required placeholder="e.g. Premium Group Experience" />
              <small className="helper-text">Example: Premium Group Experience</small>
            </div>
          </div>
          
          <div className="form-row two-cols">
            <div className="form-group">
              <label>Duration</label>
              <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} required placeholder="e.g. 4 Nights / 5 Days" />
              <small className="helper-text">Example: 4 Nights / 5 Days</small>
            </div>
            <div className="form-group">
              <label>Group Size</label>
              <input type="text" name="groupSize" value={formData.groupSize} onChange={handleInputChange} required placeholder="e.g. 30 Persons" />
              <small className="helper-text">Example: 30 Persons</small>
            </div>
          </div>

          <div className="form-row two-cols">
            <div className="form-group">
              <label>Total Price</label>
              <input type="text" name="totalPrice" value={formData.totalPrice} onChange={handleInputChange} required placeholder="e.g. ₹4,92,000" />
              <small className="helper-text">Example: ₹4,92,000 (Rupee sign added automatically if missing)</small>
            </div>
            <div className="form-group">
              <label>Price Per Person</label>
              <input type="text" name="perPerson" value={formData.perPerson} onChange={handleInputChange} required placeholder="e.g. (₹16,400 per person)" />
              <small className="helper-text">Example: (₹16,400 per person)</small>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>Features (One per line)</label>
              <textarea name="features" value={formData.features} onChange={handleInputChange} required rows="4" placeholder="Daily Breakfast and Dinner&#10;Shikara Ride&#10;Pickup and Drop" />
              <small className="helper-text">Format: Enter one feature per line. Do not use commas or bullet points.</small>
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary-action">
              <i className={`fas ${editingId ? "fa-save" : "fa-check"}`}></i>
              {editingId ? "Update Package" : "Save Package"}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEdit} className="btn-secondary-action">
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="packages-list-section">
        <h3 className="section-title">Live Packages</h3>
        {loading ? (
          <div className="loading-state">
            <i className="fas fa-spinner fa-spin"></i> Loading...
          </div>
        ) : packages.length === 0 ? (
          <div className="empty-state glass-panel">
            <i className="fas fa-box-open"></i>
            <p>No packages found in the database.</p>
          </div>
        ) : (
          <div className="admin-packages-grid">
            {packages.map(pkg => (
              <div key={pkg.id} className="admin-package-card glass-panel">
                <div className="card-top">
                  <div className="pkg-status">Active</div>
                  <div className="pkg-actions">
                    <button onClick={() => handleEdit(pkg)} className="action-btn edit" title="Edit">
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button onClick={() => handleDelete(pkg.id)} className="action-btn delete" title="Delete">
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <h4>{pkg.title}</h4>
                <div className="pkg-meta">
                  <span><i className="far fa-clock"></i> {pkg.duration}</span>
                  <span><i className="fas fa-users"></i> {pkg.groupSize}</span>
                </div>
                <div className="pkg-price-bar">
                  <span className="total">{pkg.totalPrice}</span>
                  <span className="per">{pkg.perPerson}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .package-admin-container {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .glass-panel {
          background: white;
          border-radius: 16px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          overflow: hidden;
        }

        /* Editor Styles */
        .editor-card {
          padding: 30px;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 1px solid #f1f5f9;
        }

        .icon-badge {
          width: 45px;
          height: 45px;
          background: #e0f2fe;
          color: var(--primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .card-header h2 {
          font-size: 1.4rem;
          color: #0f172a;
          margin: 0;
        }

        .admin-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-row.two-cols {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #475569;
        }

        .form-group input,
        .form-group textarea {
          padding: 12px 16px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: all 0.2s;
          background: #f8fafc;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary);
          background: white;
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
        }

        .helper-text {
          font-size: 0.8rem;
          color: #94a3b8;
          margin-top: 2px;
          display: block;
        }

        .form-actions {
          display: flex;
          gap: 15px;
          margin-top: 10px;
          padding-top: 20px;
          border-top: 1px solid #f1f5f9;
        }

        .btn-primary-action {
          background: var(--primary);
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s;
        }

        .btn-primary-action:hover {
          background: var(--primary-dark);
          transform: translateY(-1px);
        }

        .btn-secondary-action {
          background: white;
          color: #64748b;
          border: 1px solid #cbd5e1;
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary-action:hover {
          background: #f1f5f9;
          color: #0f172a;
        }

        /* List Section Styles */
        .section-title {
          font-size: 1.3rem;
          color: #0f172a;
          margin-bottom: 20px;
          font-family: var(--font-heading);
        }

        .admin-packages-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }

        .admin-package-card {
          padding: 20px;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .admin-package-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .pkg-status {
          background: #dcfce7;
          color: #166534;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 20px;
          text-transform: uppercase;
        }

        .pkg-actions {
          display: flex;
          gap: 8px;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .action-btn.edit {
          background: #fef3c7;
          color: #d97706;
        }

        .action-btn.edit:hover {
          background: #fde68a;
        }

        .action-btn.delete {
          background: #fee2e2;
          color: #dc2626;
        }

        .action-btn.delete:hover {
          background: #fecaca;
        }

        .admin-package-card h4 {
          font-size: 1.1rem;
          color: #0f172a;
          margin: 0 0 12px 0;
          line-height: 1.4;
        }

        .pkg-meta {
          display: flex;
          gap: 15px;
          color: #64748b;
          font-size: 0.85rem;
          margin-bottom: 20px;
        }

        .pkg-meta span {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .pkg-price-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 15px;
          border-top: 1px dashed #e2e8f0;
        }

        .pkg-price-bar .total {
          font-weight: 700;
          color: var(--primary);
          font-size: 1.1rem;
        }

        .pkg-price-bar .per {
          font-size: 0.8rem;
          color: #94a3b8;
        }

        .empty-state {
          text-align: center;
          padding: 60px 20px;
          color: #94a3b8;
        }

        .empty-state i {
          font-size: 3rem;
          margin-bottom: 15px;
          color: #cbd5e1;
        }

        @media (max-width: 768px) {
          .editor-card {
            padding: 22px;
          }

          .form-row.two-cols {
            grid-template-columns: 1fr;
          }

          .form-actions {
            flex-direction: column;
          }

          .btn-primary-action,
          .btn-secondary-action {
            width: 100%;
            justify-content: center;
          }

          .admin-packages-grid {
            grid-template-columns: 1fr;
          }

          .pkg-price-bar {
            align-items: flex-start;
            flex-direction: column;
            gap: 4px;
          }
        }
      `}</style>
    </div>
  );
}
