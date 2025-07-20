import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Navs/header";
import Footer from "@/components/Navs/footer";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GraphViz",
  description: "A graph visualizer for educational purposes",
  icons: {
    icon: [
      { url: '/app_icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/app_icon.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [
      { url: '/app_icon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/app_icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
