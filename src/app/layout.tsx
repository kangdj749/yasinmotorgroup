import "./globals.css";
import type { Metadata } from "next";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";

export const metadata: Metadata = {
  title: {
    default: "Yasin Motor Group",
    template: "%s | Jual Mobil Bekas Terbesar di Jawa Barat",
  },
  description: "Tampil Keren dan Nyaman dengan Garansi Mesin 1 Tahun",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-foreground font-body antialiased">

        {/* GLOBAL NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main>{children}</main>

        {/* MOBILE NAV — FIXED, OUTSIDE CONTAINER */}
        <MobileBottomNav />

        {/* FOOTER */}
        <Footer />
      </body>
    </html>
  );
}
