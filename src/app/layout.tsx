import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomNav from "@/components/MobileBottomNav";
import { getAllCars } from "@/lib/data/cars";

const cars = await getAllCars();

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
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-5MCSJ75J');
            `,
          }}
        />
      </head>

      <body className="min-h-screen bg-white text-foreground font-body antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5MCSJ75J"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* GLOBAL NAVBAR */}
  
        <Navbar
          cars={cars.map((c) => ({
            id: c.id,
            title: c.title,
          }))}
        />

        {/* PAGE CONTENT */}
        <main>{children}</main>

        {/* MOBILE NAV */}
        <MobileBottomNav />

        {/* FOOTER */}
        <Footer />
      </body>
    </html>
  );
}