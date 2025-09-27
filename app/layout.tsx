import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AnimatedBackground from "@/components/animated-background";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jiten Mohanty | Frontend Developer",
  description:
    "Portfolio of Jiten Mohanty, a dedicated full-stack web developer with expertise in React, Next.js, Node.js and more.",
  keywords: ["frontend developer", "full-stack developer", "React", "Next.js", "Node.js", "Jiten Mohanty"],
  openGraph: {
    title: "Jiten Mohanty | Frontend Developer",
    description:
      "Portfolio of Jiten Mohanty, a dedicated full-stack web developer with expertise in React, Next.js, Node.js and more.",
    url: "https://jitenmohanty.vercel.app",
    siteName: "Jiten Mohanty Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Jiten Mohanty Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  generator: "v0.dev",
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
