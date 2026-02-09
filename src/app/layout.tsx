import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Inter, Newsreader } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import {Toaster} from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  variable: "--font-newsreader",
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "Sayit - Anonymous Messaging Platform",
  description: "Send and receive anonymous messages securely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${inter.variable} ${newsreader.variable} antialiased`}
        >
          {children}
          <Toaster/>
        </body>
      </AuthProvider>
    </html>
  );
}
