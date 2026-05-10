import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import IntroAnimation from "@/components/IntroAnimation";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
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
      <body>
        <IntroAnimation />
        <ScrollProgress />
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
