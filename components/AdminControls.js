"use client";
import { signOut } from "next-auth/react";
import { useState, useEffect } from "react";

export default function AdminControls({ username }) {
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState("light");
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [status, setStatus] = useState({ msg: "", type: "" });
  const [loading, setLoading] = useState(false);

  // Load saved theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("admin-theme") || "light";
    setTheme(saved);
    document.documentElement.setAttribute("data-admin-theme", saved);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : theme === "dark" ? "midnight" : "light";
    setTheme(next);
    localStorage.setItem("admin-theme", next);
    document.documentElement.setAttribute("data-admin-theme", next);
  };

  const themeIcon = theme === "light" ? "fa-moon" : theme === "dark" ? "fa-star" : "fa-sun";
  const themeLabel = theme === "light" ? "Dark Mode" : theme === "dark" ? "Midnight" : "Light Mode";

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (form.next !== form.confirm) {
      setStatus({ msg: "New passwords do not match.", type: "error" });
      return;
    }
    if (form.next.length < 6) {
      setStatus({ msg: "Password must be at least 6 characters.", type: "error" });
      return;
    }
    setLoading(true);
    setStatus({ msg: "", type: "" });
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: form.current, newPassword: form.next }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ msg: "✅ Password changed successfully!", type: "success" });
        setForm({ current: "", next: "", confirm: "" });
        setTimeout(() => setShowModal(false), 1800);
      } else {
        setStatus({ msg: data.error || "Failed to change password.", type: "error" });
      }
    } catch {
      setStatus({ msg: "Network error. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="ctrl-btn theme-btn"
        title={`Switch to ${themeLabel}`}
      >
        <i className={`fas ${themeIcon}`}></i>
        <span>{themeLabel}</span>
      </button>

      {/* Change Password Button */}
      <button
        onClick={() => { setShowModal(true); setStatus({ msg: "", type: "" }); }}
        className="ctrl-btn pwd-btn"
        title="Change Password"
      >
        <i className="fas fa-key"></i>
        <span>Change Password</span>
      </button>

      {/* Logout Button */}
      <button
        onClick={() => signOut({ callbackUrl: "/admin/login" })}
        className="ctrl-btn logout-btn"
        title="Logout"
      >
        <i className="fas fa-sign-out-alt"></i>
        <span>Logout</span>
      </button>

      {/* Change Password Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div>
                <h3>Change Password</h3>
                <p>Secure your account @{username}</p>
              </div>
              <button className="modal-close" onClick={() => setShowModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handlePasswordChange} className="modal-form">
              <div className="modal-field">
                <label>Current Password</label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  value={form.current}
                  onChange={(e) => setForm({ ...form, current: e.target.value })}
                  required
                />
              </div>
              <div className="modal-field">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  value={form.next}
                  onChange={(e) => setForm({ ...form, next: e.target.value })}
                  required
                />
              </div>
              <div className="modal-field">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Repeat new password"
                  value={form.confirm}
                  onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                  required
                />
              </div>

              {status.msg && (
                <div className={`modal-status ${status.type}`}>{status.msg}</div>
              )}

              <div className="modal-actions">
                <button type="submit" className="btn-save" disabled={loading}>
                  {loading ? <><i className="fas fa-spinner fa-spin"></i> Saving...</> : <><i className="fas fa-lock"></i> Update Password</>}
                </button>
                <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        /* ── Control Buttons ── */
        .ctrl-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 11px 16px;
          border: none;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: inherit;
        }

        .theme-btn {
          background: var(--ctrl-theme-bg, #e0f2fe);
          color: var(--ctrl-theme-color, #0369a1);
        }
        .theme-btn:hover {
          background: var(--ctrl-theme-hover, #bae6fd);
          transform: translateX(3px);
        }

        .pwd-btn {
          background: var(--ctrl-pwd-bg, #fef3c7);
          color: var(--ctrl-pwd-color, #b45309);
        }
        .pwd-btn:hover {
          background: var(--ctrl-pwd-hover, #fde68a);
          transform: translateX(3px);
        }

        .logout-btn {
          background: var(--ctrl-logout-bg, #fee2e2);
          color: var(--ctrl-logout-color, #dc2626);
        }
        .logout-btn:hover {
          background: var(--ctrl-logout-hover, #fecaca);
          transform: translateX(3px);
        }

        /* ── Modal Overlay ── */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(6px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .modal-box {
          background: var(--modal-bg, #ffffff);
          border-radius: 20px;
          padding: 32px;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.2);
          animation: slideUp 0.25s ease;
          border: 1px solid var(--modal-border, #e2e8f0);
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }

        .modal-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 28px;
        }

        .modal-icon {
          width: 48px;
          height: 48px;
          border-radius: 14px;
          background: linear-gradient(135deg, #0ea5e9, #0284c7);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .modal-header h3 {
          font-size: 1.2rem;
          color: var(--modal-text, #0f172a);
          margin: 0 0 2px 0;
        }

        .modal-header p {
          font-size: 0.82rem;
          color: var(--modal-muted, #64748b);
          margin: 0;
        }

        .modal-close {
          margin-left: auto;
          background: var(--modal-close-bg, #f1f5f9);
          border: none;
          width: 34px;
          height: 34px;
          border-radius: 8px;
          cursor: pointer;
          color: var(--modal-muted, #64748b);
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .modal-close:hover { background: var(--modal-close-hover, #e2e8f0); }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .modal-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .modal-field label {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--modal-label, #475569);
        }

        .modal-field input {
          padding: 11px 14px;
          border: 1.5px solid var(--modal-input-border, #cbd5e1);
          border-radius: 10px;
          font-size: 0.93rem;
          background: var(--modal-input-bg, #f8fafc);
          color: var(--modal-text, #0f172a);
          transition: all 0.2s;
          font-family: inherit;
        }

        .modal-field input:focus {
          outline: none;
          border-color: #0ea5e9;
          background: var(--modal-bg, #fff);
          box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.12);
        }

        .modal-status {
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        .modal-status.success {
          background: #dcfce7;
          color: #166534;
          border: 1px solid #bbf7d0;
        }
        .modal-status.error {
          background: #fee2e2;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          padding-top: 4px;
        }

        .btn-save {
          flex: 1;
          background: linear-gradient(135deg, #0ea5e9, #0284c7);
          color: white;
          border: none;
          padding: 12px 20px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
          font-family: inherit;
        }
        .btn-save:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(14,165,233,0.35);
        }
        .btn-save:disabled { opacity: 0.65; cursor: not-allowed; }

        .btn-cancel {
          background: var(--modal-cancel-bg, #f1f5f9);
          color: var(--modal-muted, #64748b);
          border: none;
          padding: 12px 20px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s;
          font-family: inherit;
        }
        .btn-cancel:hover { background: var(--modal-cancel-hover, #e2e8f0); }
      `}</style>
    </>
  );
}
