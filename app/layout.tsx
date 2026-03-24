'use client';
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CVProvider } from "./context/CVContext";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem('cv-theme')!=='light')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        /> */}
      </head>
      <body className="flex h-full flex-col">
        <ThemeProvider>
          <LanguageProvider>
            <CVProvider>{children}</CVProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
