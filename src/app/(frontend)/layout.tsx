import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientShell from "@/components/ClientShell";
import "../globals.css";
const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://heymiftah.my.id'),
  alternates: {
    canonical: '/',
  },
  title: "Miftahudin Akbar | Portfolio",
  description: "Bridging the gap between complex financial systems and data-driven intelligence.",
  twitter: {
    card: 'summary_large_image',
    title: "Miftahudin Akbar | Portfolio",
    description: "Bridging the gap between complex financial systems and data-driven intelligence.",
  },
};

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${newsreader.variable}`} suppressHydrationWarning>
      <head>
        {/* Load Material Symbols font asynchronously without blocking render */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body suppressHydrationWarning>
        {/* Lock scrolling on homepage before React hydrates — prevents content flash behind intro */}
        <script
          dangerouslySetInnerHTML={{
            __html: `if(location.pathname==='/'){document.body.style.overflow='hidden'}`,
          }}
        />
        <ClientShell />
        <a href="#main-content" className="skip-to-content">Skip to content</a>
        <Navbar />
        <div id="main-content">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

