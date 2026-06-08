import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AnimatedBackground from "@/components/animated-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://jitenmohanty.vercel.app"),
  title: "Jiten Mohanty | Full Stack Developer",
  description:
    "Portfolio of Jiten Mohanty — Full Stack Developer specializing in Next.js, React, Node.js, PostgreSQL, and AI integrations. Building scalable web apps and AI-powered platforms from Bhubaneswar, India.",
  keywords: [
    "Jiten Mohanty",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript Developer",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Docker",
    "AWS",
    "AI Developer",
    "AgentHub",
    "Web Developer India",
    "Bhubaneswar Developer",
    "ShelfEx",
  ],
  openGraph: {
    title: "Jiten Mohanty | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, React, Node.js, and AI integrations. View projects, experience, and get in touch.",
    url: "https://jitenmohanty.vercel.app",
    siteName: "Jiten Mohanty Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jiten Mohanty — Full Stack Developer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jiten Mohanty | Full Stack Developer",
    description:
      "Full Stack Developer specializing in Next.js, React, Node.js, and AI integrations.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnimatedBackground />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
