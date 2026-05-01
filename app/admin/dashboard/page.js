import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import Link from "next/link";
import PackageAdmin from "../../../components/PackageAdmin";
import AdminControls from "../../../components/AdminControls";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="admin-dashboard">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <i className="fas fa-compass"></i>
          <span>Brave Hearts</span>
        </div>

        <nav className="sidebar-nav">
          <Link href="/admin/dashboard" className="nav-item active">
            <i className="fas fa-box"></i> Manage Packages
          </Link>
          <Link href="/" className="nav-item">
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
              <span className="name">@{session.user.name}</span>
            </div>
          </div>

          {/* Controls: Theme + Change Password + Logout */}
          <div className="sidebar-controls">
            <AdminControls username={session.user.name} />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
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
