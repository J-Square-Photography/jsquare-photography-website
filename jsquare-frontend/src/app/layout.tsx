import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['200', '300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "J Square Photography - Professional Photography & Videography",
  description: "Capturing moments since 2017. Professional photography and videography services for weddings, corporate events, graduations, and more.",
  keywords: ["photography", "videography", "wedding photography", "corporate events", "professional photographer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans antialiased bg-white text-[#3a3a3c]`}>
        {children}
      </body>
    </html>
  );
}
