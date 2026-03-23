import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { CVProvider } from "./context/CVContext";
import { LanguageProvider } from "./context/LanguageContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CV Creator",
  description: "Create, preview, and export your professional CV",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="flex h-full flex-col">
        <LanguageProvider>
          <CVProvider>{children}</CVProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
