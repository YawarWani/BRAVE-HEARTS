import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import MobileSocials from "@/components/MobileSocials";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

import { Metadata } from "next";

const BASE_URL = "https://bravehearttourandtravel.com";
const SITE_NAME = "Brave Hearts Tour & Travels";
// const OG_IMAGE = "/og/kashmir-hero.jpg"; // ⚠️ Uncomment and replace with a 1200×630 Kashmir landscape image

export const metadata = {
  metadataBase: new URL(BASE_URL),

  // ── Core SEO ──────────────────────────────────────────────────────────────
  title: `${SITE_NAME} | Kashmir Tour Packages & Holiday Deals`,
  description:
    "Book premium Kashmir tour packages with Brave Hearts Tour & Travels. Explore Dal Lake houseboats, Gulmarg ski slopes, Pahalgam valleys & Srinagar gardens. Best prices guaranteed.",
  keywords: [
    "Kashmir tour packages",
    "Kashmir holiday packages",
    "Srinagar tourism",
    "Dal Lake houseboat stay",
    "Gulmarg snow activities",
    "Pahalgam tour packages",
    "best travel agency Kashmir",
    "Jammu Kashmir tourism",
    "Kashmir honeymoon packages",
    "Kashmir family tour",
    "Brave Hearts Tour and Travels",
    "luxury Kashmir holiday",
  ],

  // ── Canonical ─────────────────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Robots ────────────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Authors & Creator ─────────────────────────────────────────────────────
  authors: [{ name: SITE_NAME, url: BASE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "travel",

  // ── Open Graph ────────────────────────────────────────────────────────────
  openGraph: {
    title: `${SITE_NAME} | Kashmir Tour Packages & Holiday Deals`,
    description:
      "Explore Kashmir like never before. Premium tour packages covering Dal Lake, Gulmarg, Pahalgam & Sonamarg. Book now for the best experience.",
    url: BASE_URL,
    siteName: SITE_NAME,
    // images: [
    //   {
    //     url: OG_IMAGE,
    //     width: 1200,
    //     height: 630,
    //     alt: "Scenic view of Dal Lake, Kashmir — Brave Hearts Tour & Travels",
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },

  // ── Twitter Card ──────────────────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Kashmir Tour Packages`,
    description:
      "Discover Kashmir's paradise with Brave Hearts. Houseboats, snow, valleys & more — all in one package.",
    site: "@heart12385",
    creator: "@heart12385",
    // images: [OG_IMAGE],
  },

  // ── Favicon & Icons ───────────────────────────────────────────────────────
  icons: {
    icon: [
      { url: "/logo/logo.png", sizes: "48x48", type: "image/png" },
      { url: "/logo/logo.png", sizes: "96x96", type: "image/png" },
      { url: "/logo/logo.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/logo/logo.png",
    apple: "/logo/logo.png",
  },

  // ── Google Search Console ─────────────────────────────────────────────────
  verification: {
    google: "qfO7WVmk7kA3d8QLC8H_v_SbYCXZtSSngWal-sOxGWc",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} antialiased`}
    >
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body>
        {children}
        <MobileSocials />
      </body>
    </html>
  );
}
