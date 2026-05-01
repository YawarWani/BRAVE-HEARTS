"use client";

import Link from "next/link";
import { useState } from "react";
import AdminControls from "./AdminControls";
import PackageAdmin from "./PackageAdmin";

export default function AdminDashboardShell({ username }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className={`admin-dashboard ${sidebarOpen ? "sidebar-open" : ""}`}>
      <div
        className="admin-sidebar-backdrop"
        onClick={closeSidebar}
        aria-hidden="true"
      />

      <aside className="admin-sidebar" aria-label="Admin navigation">
        <div className="sidebar-brand">
          <i className="fas fa-compass"></i>
          <span>Brave Hearts</span>
          <button
            type="button"
            className="admin-sidebar-close"
            onClick={closeSidebar}
            aria-label="Close admin menu"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link href="/admin/dashboard" className="nav-item active" onClick={closeSidebar}>
            <i className="fas fa-box"></i> Manage Packages
          </Link>
          <Link href="/" className="nav-item" onClick={closeSidebar}>
            <i className="fas fa-home"></i> View Live Site
          </Link>
        </nav>

        <div className="sidebar-footer">
          <div className="admin-profile">
            <div className="avatar">
              <i className="fas fa-user-shield"></i>
            </div>
            <div className="info">
              <span className="role">Administrator</span>
              <span className="name">@{username}</span>
            </div>
          </div>

          <div className="sidebar-controls">
            <AdminControls username={username} />
          </div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-mobile-topbar">
          <button
            type="button"
            className="admin-menu-button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open admin menu"
          >
            <i className="fas fa-bars"></i>
          </button>
          <div>
            <span className="mobile-kicker">Admin</span>
            <strong>Brave Hearts</strong>
          </div>
        </header>

        <header className="admin-header">
          <div>
            <h1>Package Management</h1>
            <p>Add, update, or remove tour packages from the database.</p>
          </div>
          <div className="header-actions">
            <span className="live-status">
              <span className="pulse-dot"></span> Database Connected
            </span>
          </div>
        </header>

        <div className="admin-content">
          <PackageAdmin />
        </div>
      </main>
    </div>
  );
}
