import type { Metadata } from "next";
import { Montserrat } from 'next/font/google';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['200', '300', '400', '500', '600', '700']
});

export const metadata: Metadata = {
  title: "J Square Photography",
  description: "Crafting Timeless Media, Video, and Photo Moments for Singapore.",
  keywords: ["photography", "videography", "wedding photography", "corporate events", "professional photographer", "event videography", "portrait photography", "landscape photography", "J Square Photography", "jsquarephotography", "jsquarephotographysg", "photobooth services", "Film","Event photography","Event videography","Graduation photography","Graduation videography","Cinematic videography"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} font-sans antialiased bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
