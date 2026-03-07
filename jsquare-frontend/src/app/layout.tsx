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
  openGraph: {
    title: "J Square Photography",
    description: "Crafting Timeless Media, Video, and Photo Moments for Singapore.",
    url: "https://jsquarephotography.com",
    siteName: "J Square Photography",
    locale: "en_SG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "J Square Photography",
    description: "Crafting Timeless Media, Video, and Photo Moments for Singapore.",
  },
  other: {
    "geo.region": "SG",
    "geo.placename": "Singapore",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "J Square Photography",
              url: "https://jsquarephotography.com",
              telephone: "+6580373735",
              email: "Jsquarephotographysg@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressCountry: "SG",
                addressLocality: "Singapore",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "11",
              },
              sameAs: [
                "https://www.instagram.com/jsquarephotographysg",
                "https://www.facebook.com/jsquarephotographySG/",
                "https://youtube.com/@jsquarephotography",
                "https://www.linkedin.com/company/j-square-photography/",
                "https://t.me/JSquarePhotography",
                "https://www.carousell.sg/jsquarephotography/",
              ],
            }),
          }}
        />
      </head>
      <body className={`${montserrat.variable} font-sans antialiased bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-200`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
