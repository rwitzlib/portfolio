import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Robert Witzlib | Portfolio",
  description: "Portfolio and resume of Robert Witzlib - Web Developer",
  keywords: ["Robert Witzlib", "portfolio", "web developer", "resume"],
  authors: [{ name: "Robert Witzlib" }],
  openGraph: {
    title: "Robert Witzlib | Portfolio",
    description: "Portfolio and resume of Robert Witzlib - Web Developer",
    url: "https://robwitzlib.com",
    siteName: "Robert Witzlib Portfolio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
