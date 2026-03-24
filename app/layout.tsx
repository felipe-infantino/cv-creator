'use client';
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { useEffect } from "react";
import { CVProvider } from "./context/CVContext";
import { ThemeProvider } from "./context/ThemeContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    const stored = localStorage.getItem('cv-lang');
    if (stored === 'en' || stored === 'de') {
      i18n.changeLanguage(stored);
    }
  }, []);

  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex h-full flex-col">
        <I18nextProvider i18n={i18n}>
          <ThemeProvider>
            <CVProvider>{children}</CVProvider>
          </ThemeProvider>
        </I18nextProvider>
      </body>
    </html>
  );
}
