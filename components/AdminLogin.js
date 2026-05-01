"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      // Handle successful login
      console.log("Login successful");
      // Redirect or handle auth state
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" disabled={loading} className="btn btn-primary btn-block">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <style jsx>{`
        .login-container {
          max-width: 400px;
          margin: 100px auto;
          padding: 30px;
          border-radius: var(--border-radius);
          box-shadow: var(--box-shadow);
          background-color: var(--white);
          border: 1px solid rgba(0,0,0,0.05);
        }
        .login-container h2 {
          text-align: center;
          margin-bottom: 24px;
          color: var(--dark);
          font-family: var(--font-heading);
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: var(--text-main);
          font-weight: 500;
        }
        .form-control {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 16px;
          font-family: var(--font-primary);
          transition: var(--transition);
        }
        .form-control:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(15, 118, 110, 0.2);
        }
        .error-message {
          color: #ef4444;
          text-align: center;
          margin-bottom: 16px;
          padding: 10px;
          background-color: #fee2e2;
          border-radius: 6px;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}
