import type React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", weight: ["400", "500"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", weight: ["600", "700"] });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jitenmohanty.in"),
  alternates: { canonical: "https://www.jitenmohanty.in" },
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
    url: "https://www.jitenmohanty.in",
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
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetBrainsMono.variable}`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
