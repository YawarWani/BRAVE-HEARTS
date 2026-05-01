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

export const metadata = {
  title: "Brave Hearts Tour & Travels | Explore Paradise on Earth",
  description: "Discover the natural beauty of Kashmir with Brave Hearts Tour & Travels. We offer premium, luxurious, and unforgettable tour packages.",
  icons: {
    icon: '/fav/fav.png',
  }
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
