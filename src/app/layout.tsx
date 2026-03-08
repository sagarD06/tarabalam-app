import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tarabalam — Daily Star Checker",
    template: "%s | Tarabalam",
  },
  description:
    "Check your daily Tarabalam based on Vedic astrology. Select your birth star to see how the universe will support you today.",
  keywords: [
    "tarabalam",
    "nakshatra",
    "vedic astrology",
    "daily panchang",
    "birth star",
    "janma nakshatra",
    "auspicious day",
    "indian astrology",
    "jyotish",
  ],
  authors: [{ name: "Sagar D" }],
  creator: "Sagar D",

  openGraph: {
    title: "Tarabalam — Daily Star Checker",
    description:
      "Check your daily Tarabalam based on Vedic astrology. Select your birth star to see how the universe will support you today.",
    url: "https://tarabalam-app.vercel.app",
    siteName: "Tarabalam",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tarabalam — Daily Star Checker",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: "/icon.svg",        // ← svg works directly in modern browsers
    shortcut: "/icon.svg",
    apple: "/apple-icon.png", // ← still need png for iOS
  },

  twitter: {
    card: "summary_large_image",
    title: "Tarabalam — Daily Star Checker",
    description:
      "Check your daily Tarabalam based on Vedic astrology.",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Tarabalam",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="max-w-md mx-auto px-4 py-8">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
