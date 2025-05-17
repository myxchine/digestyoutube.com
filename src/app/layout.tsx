import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Header from "@/components/header";
import Footer from "@/components/footer";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const accent = localFont({
  src: "./fonts/accent.woff2",
  variable: "--font-accent",
  weight: "100 900",
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: {
    template: "%s | DIGEST YOUTUBE",
    default: "Free YouTube Video Summariser | DIGEST YOUTUBE",
  },
  description:
    "Generate an accurate summary that preserves important details from youtube videos of any length. Try it Now for free.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${accent.variable} antialiased`}
      >
        <Header />
        <main id="site-main">{children}</main>
        <Footer />
        <Toaster position="top-center" richColors />
      </body>
      <GoogleAnalytics gaId={"G-3THKT5D5N2"} />
    </html>
  );
}
