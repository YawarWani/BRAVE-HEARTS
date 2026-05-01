import AdminLogin from "@/components/AdminLogin";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../../../public/logo/logo.png";

export const metadata = {
  title: "Admin Login | Brave Hearts Tour & Travels",
  description: "Admin login portal for Brave Hearts Tour & Travels",
};

export default function AdminLoginPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Simple header for login page */}
      <header style={{ padding: "20px", borderBottom: "1px solid #eaeaea", display: "flex", justifyContent: "center" }}>
        <Link href="/" className="logo">
          <Image src={logoImg} alt="Brave Hearts Logo" style={{ height: "50px", width: "auto" }} placeholder="blur" />
        </Link>
      </header>

      {/* Main content */}
      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "var(--light)", padding: "20px" }}>
        <div style={{ width: "100%" }}>
          <AdminLogin />
        </div>
      </main>

      {/* Simple footer for login page */}
      <footer style={{ padding: "20px", textAlign: "center", borderTop: "1px solid #eaeaea", color: "var(--text-muted)", fontSize: "0.9rem" }}>
        <p>&copy; {new Date().getFullYear()} Brave Hearts Tour & Travels.</p>
      </footer>
    </div>
  );
}
