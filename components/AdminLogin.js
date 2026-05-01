"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError(res.error);
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`page-wrapper ${mounted ? "mounted" : ""}`}>
      {/* ── Left brand panel ── */}
      <div className="brand-panel">
        <div className="brand-blur-circle c1" />
        <div className="brand-blur-circle c2" />
        <div className="brand-blur-circle c3" />

        <div className="brand-content">
          <div className="logo-mark">
            <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="28" r="28" fill="rgba(255,255,255,0.12)" />
              <path
                d="M28 10 C28 10 14 20 14 30 C14 37.7 20.3 44 28 44 C35.7 44 42 37.7 42 30 C42 20 28 10 28 10Z"
                fill="rgba(255,255,255,0.9)"
              />
              <path
                d="M28 18 C28 18 20 25 20 31 C20 35.4 23.6 39 28 39 C32.4 39 36 35.4 36 31 C36 25 28 18 28 18Z"
                fill="#0ea5e9"
              />
              <circle cx="28" cy="31" r="5" fill="white" />
            </svg>
          </div>

          <h1 className="brand-name">Brave Hearts</h1>
          <p className="brand-tagline">Tour & Travel</p>

          <div className="divider" />

          <div className="brand-footer">
            <span className="brand-badge">Admin Portal · v2.0</span>
          </div>
        </div>
      </div>

      {/* ── Right login panel ── */}
      <div className="form-panel">
        <div className="form-card">
          <div className="form-header">
            <div className="shield-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
            </div>
            <h2 className="form-title">Welcome back</h2>
            <p className="form-subtitle">Sign in to your admin dashboard</p>
          </div>

          {error && (
            <div className="error-banner">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            <div className="field">
              <label>Username</label>
              <div className="input-box">
                <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                <input
                  type="text"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="field">
              <label>Password</label>
              <div className="input-box">
                <svg className="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-pw"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? (
                <span className="btn-inner">
                  <span className="spinner" />
                  Authenticating…
                </span>
              ) : (
                <span className="btn-inner">
                  Access Dashboard
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              )}
            </button>
          </form>

          <p className="form-note">Protected area · Unauthorized access is prohibited</p>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .page-wrapper {
          min-height: 100vh;
          display: flex;
          font-family: 'DM Sans', sans-serif;
          background: #f7f3ef;
        }

        /* ── Brand Panel ── */
        .brand-panel {
          position: relative;
          width: 420px;
          min-width: 420px;
          background: linear-gradient(145deg, #0284c7 0%, #0ea5e9 40%, #38bdf8 100%);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
        }

        .brand-blur-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          pointer-events: none;
        }
        .c1 { width: 320px; height: 320px; background: rgba(255,255,255,0.12); top: -80px; left: -80px; }
        .c2 { width: 280px; height: 280px; background: rgba(0,0,0,0.12); bottom: -60px; right: -60px; }
        .c3 { width: 180px; height: 180px; background: rgba(255,200,100,0.15); top: 50%; left: 60%; transform: translate(-50%,-50%); }

        .brand-content {
          position: relative;
          z-index: 1;
          color: white;
          text-align: center;
        }

        .logo-mark {
          width: 72px;
          height: 72px;
          margin: 0 auto 20px;
          animation: floatY 4s ease-in-out infinite;
        }
        .logo-mark svg { width: 100%; height: 100%; }

        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }

        .brand-name {
          font-family: 'Playfair Display', serif;
          font-size: 2.6rem;
          font-weight: 800;
          letter-spacing: -0.5px;
          line-height: 1.1;
          color: white;
        }

        .brand-tagline {
          font-size: 1rem;
          font-weight: 300;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.75);
          margin-top: 6px;
        }

        .divider {
          width: 48px;
          height: 2px;
          background: rgba(255,255,255,0.4);
          margin: 28px auto;
          border-radius: 2px;
        }

        .feature-list {
          list-style: none;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.92rem;
          color: rgba(255,255,255,0.9);
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.18);
          border-radius: 10px;
          padding: 10px 14px;
          opacity: 0;
          transform: translateX(-16px);
          animation: slideInLeft 0.5s ease forwards;
          backdrop-filter: blur(4px);
        }

        @keyframes slideInLeft {
          to { opacity: 1; transform: translateX(0); }
        }

        .feature-icon {
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .brand-footer {
          margin-top: 32px;
        }

        .brand-badge {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.55);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* ── Form Panel ── */
        .form-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 32px;
          background: #f7f3ef;
        }

        .form-card {
          width: 100%;
          max-width: 440px;
          background: white;
          border-radius: 24px;
          padding: 48px 44px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.04), 0 12px 40px rgba(0,0,0,0.08);
          opacity: 0;
          transform: translateY(24px);
          animation: fadeUp 0.6s 0.15s ease forwards;
        }

        @keyframes fadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .form-header {
          text-align: center;
          margin-bottom: 36px;
        }

        .shield-icon {
          width: 56px;
          height: 56px;
          background: #f0f9ff;
          color: #0ea5e9;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          border: 1.5px solid #bae6fd;
        }
        .shield-icon svg { width: 26px; height: 26px; }

        .form-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          font-weight: 700;
          color: #1a1410;
          margin-bottom: 8px;
        }

        .form-subtitle {
          font-size: 0.92rem;
          color: #8a7f76;
          font-weight: 400;
        }

        /* Error */
        .error-banner {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff5f5;
          border: 1px solid #fcd5d5;
          color: #c0392b;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 500;
          margin-bottom: 24px;
        }

        /* Fields */
        .field {
          margin-bottom: 22px;
        }

        .field label {
          display: block;
          font-size: 0.85rem;
          font-weight: 600;
          color: #3d342c;
          margin-bottom: 8px;
          letter-spacing: 0.3px;
        }

        .input-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .field-icon {
          position: absolute;
          left: 14px;
          width: 17px;
          height: 17px;
          color: #b0a49a;
          pointer-events: none;
          flex-shrink: 0;
        }

        .input-box input {
          width: 100%;
          padding: 14px 14px 14px 44px;
          background: #faf9f7;
          border: 1.5px solid #e8e0d8;
          border-radius: 12px;
          color: #1a1410;
          font-size: 0.95rem;
          font-family: 'DM Sans', sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          outline: none;
        }

        .input-box input::placeholder { color: #c4bbb4; }

        .input-box input:focus {
          border-color: #0ea5e9;
          background: white;
          box-shadow: 0 0 0 4px rgba(14, 165, 233, 0.08);
        }

        .toggle-pw {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          cursor: pointer;
          color: #b0a49a;
          padding: 4px;
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }
        .toggle-pw:hover { color: #0ea5e9; }

        /* Submit */
        .submit-btn {
          width: 100%;
          padding: 16px;
          background: linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: transform 0.18s, box-shadow 0.18s, opacity 0.18s;
          margin-top: 8px;
          box-shadow: 0 4px 16px rgba(14, 165, 233, 0.32);
          position: relative;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
          pointer-events: none;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(14, 165, 233, 0.38);
        }

        .submit-btn:active:not(:disabled) {
          transform: translateY(0);
          box-shadow: 0 2px 8px rgba(14, 165, 233, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .spinner {
          width: 18px;
          height: 18px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
          display: inline-block;
          flex-shrink: 0;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .form-note {
          text-align: center;
          font-size: 0.78rem;
          color: #b0a49a;
          margin-top: 24px;
          letter-spacing: 0.2px;
        }

        /* Mounted animation trigger */
        .mounted .brand-panel { animation: none; }

        /* Responsive */
        @media (max-width: 800px) {
          .page-wrapper { flex-direction: column; }
          .brand-panel { width: 100%; min-width: unset; min-height: 280px; padding: 36px 28px; }
          .brand-name { font-size: 2rem; }
          .feature-list { display: grid; grid-template-columns: 1fr 1fr; }
          .form-panel { padding: 32px 20px; }
          .form-card { padding: 36px 28px; }
        }

        @media (max-width: 480px) {
          .feature-list { grid-template-columns: 1fr; }
          .form-card { padding: 28px 20px; }
        }
      `}</style>
    </div>
  );
}
