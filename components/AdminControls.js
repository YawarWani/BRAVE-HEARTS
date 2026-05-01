"use client";

import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

const themes = [
  { id: "light", label: "Light", icon: "fa-sun" },
  { id: "dark", label: "Dark", icon: "fa-moon" },
  { id: "midnight", label: "Midnight", icon: "fa-star" },
];

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  return localStorage.getItem("admin-theme") || "light";
}

export default function AdminControls({ username }) {
  const [showModal, setShowModal] = useState(false);
  const [theme, setTheme] = useState(getInitialTheme);
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [status, setStatus] = useState({ msg: "", type: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-admin-theme", theme);
    localStorage.setItem("admin-theme", theme);
  }, [theme]);

  const updateForm = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const closeModal = () => {
    setShowModal(false);
    setStatus({ msg: "", type: "" });
    setForm({ current: "", next: "", confirm: "" });
  };

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
        body: JSON.stringify({
          currentPassword: form.current,
          newPassword: form.next,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus({ msg: "Password changed successfully.", type: "success" });
        setForm({ current: "", next: "", confirm: "" });
        setTimeout(() => setShowModal(false), 1400);
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
      <section className="admin-control-panel" aria-label="Admin settings">
        <div className="control-panel-header">
          <div>
            <span className="control-kicker">Settings</span>
            <h3>Admin Controls</h3>
          </div>
        </div>

        <div className="theme-picker" aria-label="Theme selector">
          {themes.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`theme-option ${theme === item.id ? "active" : ""}`}
              onClick={() => setTheme(item.id)}
              aria-pressed={theme === item.id}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="control-actions">
          <button
            type="button"
            onClick={() => {
              setShowModal(true);
              setStatus({ msg: "", type: "" });
            }}
            className="control-action"
          >
            <span className="action-icon password">
              <i className="fas fa-key"></i>
            </span>
            <span>
              <strong>Change Password</strong>
              <small>Update @{username}</small>
            </span>
          </button>

          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="control-action logout"
          >
            <span className="action-icon logout">
              <i className="fas fa-sign-out-alt"></i>
            </span>
            <span>
              <strong>Logout</strong>
              <small>Exit dashboard</small>
            </span>
          </button>
        </div>
      </section>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div>
                <h3>Change Password</h3>
                <p>Secure your account @{username}</p>
              </div>
              <button type="button" className="modal-close" onClick={closeModal}>
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
                  onChange={(e) => updateForm("current", e.target.value)}
                  required
                />
              </div>

              <div className="modal-field">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Min. 6 characters"
                  value={form.next}
                  onChange={(e) => updateForm("next", e.target.value)}
                  required
                />
              </div>

              <div className="modal-field">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Repeat new password"
                  value={form.confirm}
                  onChange={(e) => updateForm("confirm", e.target.value)}
                  required
                />
              </div>

              {status.msg && (
                <div className={`modal-status ${status.type}`}>{status.msg}</div>
              )}

              <div className="modal-actions">
                <button type="submit" className="btn-save" disabled={loading}>
                  {loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin"></i> Saving...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-lock"></i> Update Password
                    </>
                  )}
                </button>
                <button type="button" className="btn-cancel" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .admin-control-panel {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 14px;
        }

        .control-panel-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .control-kicker {
          display: block;
          color: #94a3b8;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .control-panel-header h3 {
          margin: 0;
          color: #f8fafc;
          font-size: 0.95rem;
        }

        .theme-picker {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          padding: 4px;
          background: rgba(15, 23, 42, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          margin-bottom: 12px;
        }

        .theme-option {
          border: none;
          border-radius: 9px;
          background: transparent;
          color: #94a3b8;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 5px;
          min-height: 58px;
          font-family: inherit;
          font-size: 0.72rem;
          font-weight: 700;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }

        .theme-option i {
          font-size: 0.95rem;
        }

        .theme-option:hover,
        .theme-option.active {
          background: #f8fafc;
          color: #0f172a;
        }

        .theme-option.active {
          box-shadow: 0 8px 18px rgba(0, 0, 0, 0.18);
        }

        .control-actions {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .control-action {
          width: 100%;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.06);
          color: #e2e8f0;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px;
          text-align: left;
          font-family: inherit;
          transition: background 0.2s, transform 0.2s, border-color 0.2s;
        }

        .control-action:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.18);
          transform: translateY(-1px);
        }

        .control-action strong,
        .control-action small {
          display: block;
        }

        .control-action strong {
          color: #f8fafc;
          font-size: 0.86rem;
        }

        .control-action small {
          color: #94a3b8;
          font-size: 0.74rem;
          margin-top: 1px;
        }

        .action-icon {
          width: 34px;
          height: 34px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .action-icon.password {
          background: #fef3c7;
          color: #b45309;
        }

        .action-icon.logout {
          background: #fee2e2;
          color: #dc2626;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(2, 6, 23, 0.68);
          backdrop-filter: blur(8px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px;
          animation: fadeIn 0.2s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-box {
          background: var(--modal-bg, #ffffff);
          border-radius: 18px;
          padding: 26px;
          width: 100%;
          max-width: 440px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.24);
          animation: slideUp 0.25s ease;
          border: 1px solid var(--modal-border, #e2e8f0);
        }

        @keyframes slideUp {
          from { transform: translateY(24px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .modal-header {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 24px;
        }

        .modal-icon {
          width: 46px;
          height: 46px;
          border-radius: 14px;
          background: linear-gradient(135deg, #0f766e, #0ea5e9);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .modal-header h3 {
          font-size: 1.15rem;
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
          border-radius: 10px;
          cursor: pointer;
          color: var(--modal-muted, #64748b);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .modal-close:hover {
          background: var(--modal-close-hover, #e2e8f0);
        }

        .modal-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .modal-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .modal-field label {
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--modal-label, #475569);
        }

        .modal-field input {
          padding: 12px 14px;
          border: 1.5px solid var(--modal-input-border, #cbd5e1);
          border-radius: 10px;
          font-size: 0.94rem;
          background: var(--modal-input-bg, #f8fafc);
          color: var(--modal-text, #0f172a);
          transition: all 0.2s;
          font-family: inherit;
        }

        .modal-field input:focus {
          outline: none;
          border-color: #0f766e;
          background: var(--modal-bg, #fff);
          box-shadow: 0 0 0 3px rgba(15, 118, 110, 0.14);
        }

        .modal-status {
          padding: 10px 14px;
          border-radius: 10px;
          font-size: 0.85rem;
          font-weight: 600;
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
          gap: 10px;
          padding-top: 4px;
        }

        .btn-save,
        .btn-cancel {
          border: none;
          padding: 12px 16px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          font-family: inherit;
        }

        .btn-save {
          flex: 1;
          background: #0f766e;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-save:hover:not(:disabled) {
          background: #115e59;
        }

        .btn-save:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .btn-cancel {
          background: var(--modal-cancel-bg, #f1f5f9);
          color: var(--modal-muted, #64748b);
        }

        .btn-cancel:hover {
          background: var(--modal-cancel-hover, #e2e8f0);
        }

        @media (max-width: 480px) {
          .modal-box {
            padding: 22px;
          }

          .modal-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
